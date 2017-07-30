'use strict'
var EventEmitter = require('ddv-restful-api/events')
var prototype = module.exports = Object.create(null)
var util = require('ddv-restful-api/util')
var AuthSha256 = require('ddv-auth/lib/AuthSha256')
var onAccessKey = require('ddv-restful-api/lib/onAccessKey.js')
var rowraw = require('ddv-rowraw')
var DdvWebSocket = require('./DdvWebSocket.js')
Object.assign(prototype, EventEmitter.prototype)
Object.assign(prototype, {
  constructor: function constructor (api) {
    Object.assign(this, new EventEmitter())
    this.api = api
    this.status = 'starting'
    this.connPromise = []
    this.trySignNum = 0
    this.processWs = Object.create(null)
    this.ws = this.ws || api.webSocketUrl || this.ws
    if ((!this.ws) && typeof window !== 'undefined') {
      this.ws = window.location && window.location.protocol === 'https:' ? 'wss:' : 'ws:'
      this.ws += '//' + window.location.host + '/v1_0/conn'
    }
    this.wsPushInit()
  },

  // 请求
  request: function request (options) {
    options.headers = options.headers || Object.create(null)
    options.request_id = options.headers.request_id || options.request_id || util.createRequestId()
    options.headers.request_id = options.request_id
    options.body = options.body || ''
    options.start = options.start || ''
    options.addtime = util.time()
    return rowraw.stringifyPromise(options.headers, options.body, options.start)
      // 编码后
      .then(function (raw) {
        options.raw = raw
        raw = undefined
      })
      // 连接
      .then(function () {
        return this.conn()
      }.bind(this))
      .then(function () {
        return new Promise(function (resolve, reject) {
          var requestId = options.request_id
          this.processWs[options.request_id] = [resolve, reject]
          this.webSocket.send(options.raw)
            .catch(function (e) {
              if (
                e && this &&
            this.processWs &&
            this.processWs[requestId] &&
            util.isArray(this.processWs[requestId]) &&
            this.processWs[requestId].length > 1 &&
            util.isFunction(this.processWs[requestId][1])
              ) {
                this.processWs[requestId][1](e)
              }
              requestId = void 0
            })
          options = resolve = reject = void 0
        }.bind(this))
      }.bind(this))
  },
  conn: function conn () {
    if (!util.isArray(this.connPromise)) {
      this.connPromise = []
    }
    // 标识可以断线重连
    this.connectionTime = 3000
    this.isAutomaticReconnection = true

    if (this.isWsConned) {
      return Promise.resolve()
    } else if (this.isWsConning === true) {
      return new Promise(function (resolve, reject) {
        this.connPromise.push([resolve, reject])
      }.bind(this))
    } else {
      this.isWsConning = true
      return Promise.all([
        new Promise(function (resolve, reject) {
          this.connPromise.push([resolve, reject])
        }.bind(this)),
        this.connRun()
      ])
    }
  },
  connCb: function connCb (e, res) {
    var t
    if (!Array.isArray(this.connPromise)) {
      return Promise.resolve()
    }
    while ((t = this.connPromise.splice(0, 1)[0]) && t && t.length > 1) {
      if (e) {
        t && util.isFunction(t[1]) && t[1](e)
      } else {
        t && util.isFunction(t[0]) && t[0](res)
      }
    }
  },
  connRun: function connRun () {
    return new Promise(function (resolve, reject) {
      try {
        this.webSocket = new DdvWebSocket(this.ws)
      } catch (e) {
        if (this) {
          this.isWsConned = false
          this._isTryNum = this._isTryNum || 0
          this._isTrySum = this._isTrySum || 3
          if (this._isTryNum++ < this._isTrySum) {
            util.nextTick(function () {
              this && this.connRun().then(resolve, reject)
            }.bind(this))
          } else {
            this.connCb(e)
          }
        }
        resolve(e)
      }

      // 连接成功
      this.webSocket.on('open', function () {
        if (this) {
          this.isWsConned = true
          this.isWsConning = false
          this.connCb()

          if (this.isAutoPushOpen) {
            this.pushOpen()
              .then(function res () {

              })
              .catch(function onError (e) {

              })
          }
          this.api.emit('wsOpen')
        }
      }.bind(this))
      this.webSocket.on('message', function (data) {
        if (this) {
          rowraw.parsePromise(data)
          // 解析成功
            .then(function (res) {
              var emitState
              if (!this) return
              if (res.type === 'response') {
                this.response(res)
              } else if (res.type === 'request') {
                emitState = this.emit(['request', (res.protocol || '').toLowerCase()], res)
              } else {
                emitState = this.emit(['message', 'unknown error'], (res.data || res))
              }
              if (!emitState) {
                if (res.type === 'request') {
                  emitState = this.api.emit(['request', (res.protocol || '').toLowerCase()], res)
                } else {
                  emitState = this.api.emit(['message', 'unknown error'], (res.data || res))
                }
              }
              if (!emitState) {
                if (!this.emit('wsmessage', res)) {
                  if (console && console.debug) {
                    console.debug('webSocket::message\n')
                    console.debug(res)
                  }
                }
              }
            }.bind(this))
            // 解析错误
            .catch(function (e) {
              console.error('webSocket.onmessage.catch', e, data)
            })
        }
      }.bind(this))
      // 关闭事件
      this.webSocket.on('close', function (e) {
        if (this) {
          var obj = {}
          this.isWsConned = false
          if (this.isAutomaticReconnection) {
            // 重连
            this.timer = setTimeout(function () {
              clearTimeout(this.timer)
              this.connRun()
            }.bind(this), this.connectionTime)

            obj = {
              time: this.connectionTime,
              type: 'accident'
            }
            this.api.emit('wsClose', obj)

            this.connectionTime = this.connectionTime === 3000 ? 5000 : 3000
          } else {
            this.isAutomaticReconnection = false
            this.isWsConning = false
            if (!(e instanceof Error)) {
              var olde = e
              e = new Error('The connection has been interrupted')
              e.olde = olde
            }
            this.connCb(e)

            obj = {
              time: 0,
              type: 'user'
            }
            this.api.emit('wsClose', obj)
          }
          obj = void 0
        }
      }.bind(this))
      // 错误事件
      this.webSocket.on('error', function (e) {
        if (this) {
          this.isWsConned = false
          this._isTryNum = this._isTryNum || 0
          this._isTrySum = this._isTrySum || 3
          if (this.isAutomaticReconnection) {
            this.isAutomaticReconnection = false
            // 重连
            this.timer = setTimeout(function () {
              clearTimeout(this.timer)
              this && this.connRun()
            }.bind(this), this.connectionTime)

            this.connectionTime = this.connectionTime === 3000 ? 5000 : 3000
          } else if (this._isTryNum++ < this._isTrySum) {
            setTimeout(function () {
              this.connRun()
            }.bind(this), this.connectionTime)
            this.connectionTime = this.connectionTime === 3000 ? 5000 : 3000
          } else {
            this.isWsConning = false
            if (!(e instanceof Error)) {
              var olde = e
              e = new Error('Connection closed before receiving a handshake response')
              e.olde = olde
            }
            this.connCb(e)
          }
        }
      }.bind(this))

      // window上线断线事件
      if (typeof window !== typeof void 0 && window === window.window) {
        // 断线
        window.onoffline = function (event) {
          this.api.emit('offline')
        }

        window.ononline = function (event) {
          if (this && !this.isWsConned) {
            this.connRun()
          }

          var checkedLine = setInterval(function () {
            if (!this || this.isWsConned) {
              clearInterval(checkedLine)
              return
            }
            this.connRun()
          }, 5000)
          this.api.emit('online')
        }.bind(this)
      }

      resolve()
    }.bind(this))
  },
  tryReConnCheck: function tryReConnCheck () {

  },
  response: function response (res) {
    var requestId, cbs, code, e
    if (!(res && res.headers && (requestId = (res.headers.requestId || res.headers.request_id || res.headers.requestid)))) {
      return
    }
    if (this.processWs && (cbs = this.processWs[requestId]) && util.isArray(cbs) && cbs.length > 1) {
      delete this.processWs[requestId]
      code = parseInt(res.status || 0) || 0
      if (code >= 200 && code < 300) {
        if (util.isFunction(cbs[0])) {
          cbs[0]({
            headers: res.headers || Object.create(null),
            body: res.body || '',
            res: res
          })
        }
      } else {
        if (util.isFunction(cbs[1])) {
          e = new Error(res.statusText || 'unknown error')
          Object.assign(e, res)
          cbs[1](e)
        }
      }
    }
    cbs = requestId = code = void 0
  },
  wsPushInit: function () {
    this.on(['request', 'push'], function (res) {
      if (!this.emit(['push', (res.method || '').toLowerCase(), (res.path || '/')], res.headers, res.body, res)) {
        if (!this.emit('wspush', res)) {
          if (!this.api.emit(['push', (res.method || '').toLowerCase(), (res.path || '/')], res.headers, res.body, res)) {
            if (console && console.debug) {
              console.debug('webSocket::push\n')
              console.debug(res)
            }
          }
        }
      }
    })
    this.on(['push', 'ping', '/v1_0/sign'], function (headers, body) {
      if (!headers.request_id) {
        console.error('推送系统故障！')
        console.error(headers)
      }
      var auth = new AuthSha256()
      auth.setUri(this.api.baseUrl)
      auth.setPath(headers.path || '/')
      auth.setMethod(headers.method || 'PUT')
      auth.setHeaders(JSON.parse(headers.headers))
      var key, isHost
      for (key in auth.headers) {
        if (key && key.toLowerCase() === 'host') {
          isHost = true
          break
        }
      }
      if (!isHost) {
        auth.headers.Host = auth.host
      }

      (this.api.onAccessKey ? this.api.onAccessKey : onAccessKey)(auth, null, null, this.trySignNum)
        .then(function () {
          if (auth.headers['authorization']) {
            delete auth.headers['authorization']
          }
          if (auth.headers['Authorization']) {
            delete auth.headers['Authorization']
          }
          var headers = {}
          headers = auth.headers
          headers['Authorization'] = auth.getAuthString()
          return headers
        })
        .then(function (headersR) {
          headersR.request_id = headers.request_id

          auth = void 0
          return rowraw.stringifyPromise(headersR, '', 'PUSH/1.0 200 OK')
        })
        .catch(function (e) {
          var headersR = Object.create(null)
          headersR = Object.assign(headersR, auth.headers)
          headersR.request_id = headers.request_id

          auth = void 0
          return rowraw.stringifyPromise(headersR, '', ('PUSH/1.0 ' + (e.code || 400) + ' ' + ((e && e.message) || 'OK')))
        })
        // 编码后
        .then(function (raw) {
          this.webSocket.send(raw).then(function () {
            this.trySignNum = 0
          }.bind(this)).catch(function (e) {
            this.trySignNum++
          }.bind(this))
          raw = void 0
        }.bind(this))
    }.bind(this))
  },
  closeWs: function closeWs () {

  },
  _pushOpenCheckAndAutoRun: function _pushOpenCheckAndAutoRun () {
    // 如果
    if (this.isPushOpenIng) {
      return
    }
    this.isPushOpenIng = true
    this.request({
      headers: {
        bodytype: 'string'
      },
      start: 'OPEN /v1_0/init PUSH/1.0'
    })
      .then(function (res) {
        if (this.pushOpenCb && util.isArray(this.pushOpenCb)) {
          this.pushOpenCb.forEach(function pushOpenCbOne (cbs) {
            if (cbs && util.isFunction(cbs[0])) {
              cbs[0](res)
            }
          })
        }
        this.api.emit(['pushsys', 'open'], res)
        return true
      }.bind(this))
      .catch(function (e) {
        if (this.pushOpenCb && util.isArray(this.pushOpenCb)) {
          this.pushOpenCb.forEach(function pushOpenCbOne (cbs) {
            if (cbs && util.isFunction(cbs[1])) {
              cbs[1](e)
            }
          })
        }
        this.api.emit(['pushsys', 'openfail'], e)
      }.bind(this))
      .then(function () {
        this.isPushOpenIng = false
      }.bind(this))
  },
  pushOpen: function pushOpen () {
    this.isAutoPushOpen = true
    if (!Array.isArray(this.pushOpenCb)) {
      this.pushOpenCb = []
    }
    return new Promise(function (resolve, reject) {
      this.pushOpenCb.push([resolve, reject])
      this._pushOpenCheckAndAutoRun()
    }.bind(this))
  },
  pushClose: function pushClose () {
    this.isAutoPushOpen = false
    return this.request({
      start: 'CLOSE /v1_0/init PUSH/1.0'
    }).then(function () {
      return true
    })
  }
})
