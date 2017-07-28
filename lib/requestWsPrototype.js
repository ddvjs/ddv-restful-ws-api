'use strict'
var EventEmitter = require('ddv-restful-api/events')
var prototype = module.exports = Object.create(null)
var api = require('./api.js')
var util = require('ddv-restful-api/util')
var AuthSha256 = require('ddv-auth/lib/AuthSha256')
var onAccessKey = require('ddv-restful-api/lib/onAccessKey.js')
var rowraw = require('ddv-rowraw')
var WebSocket = require('./clientWebSocket.js')
Object.assign(prototype, EventEmitter.prototype)
Object.assign(prototype, {
  constructor: function constructor (options) {
    Object.assign(this, new EventEmitter())
    this.status = 'starting'
    this.connPromise = []
    this.processWs = Object.create(null)
    this.ws = this.ws || api.webSocketUrl || (options && options.ws) || this.ws
    if ((!this.ws) && typeof window !== 'undefined') {
      this.ws = window.location && window.location.protocol === 'https:' ? 'wss:' : 'ws:'
      this.ws += '//' + window.location.host + '/v1_0/conn'
    }
    this.wsPushInit()
  },

  // 请求
  request: function request (options) {
    var self = this
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
      return self.conn()
    })
    .then(function () {
      return new Promise(function (resolve, reject) {
        var requestId = options.request_id
        self.processWs[options.request_id] = [resolve, reject]
        self.webSocket.send(options.raw, function sendCb (e) {
          if (
            e && self &&
            self.processWs &&
            self.processWs[requestId] &&
            util.isArray(self.processWs[requestId]) &&
            self.processWs[requestId].length > 1 &&
            util.isFunction(self.processWs[requestId][1])
          ) {
            self.processWs[requestId][1](e)
          }
          requestId = void 0
        })
        options = resolve = reject = void 0
      })
    })
  },
  conn: function conn () {
    if (!util.isArray(this.connPromise)) {
      this.connPromise = []
    }
    var self = this
    // 标识可以断线重连
    self.connectionTime = 3000
    self.isAutomaticReconnection = true

    if (this.isWsConned) {
      return Promise.resolve()
    } else if (this.isWsConning === true) {
      return new Promise(function (resolve, reject) {
        self.connPromise.push([resolve, reject])
      })
    } else {
      this.isWsConning = true
      return Promise.all([
        new Promise(function (resolve, reject) {
          self.connPromise.push([resolve, reject])
        }),
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
    var self = this

    return new Promise(function (resolve, reject) {
      try {
        self.webSocket = new WebSocket(self.ws)
      } catch (e) {
        if (self) {
          self.isWsConned = false
          self._isTryNum = self._isTryNum || 0
          self._isTrySum = self._isTrySum || 3
          if (self._isTryNum++ < self._isTrySum) {
            util.nextTick(function () {
              this && this.connRun().then(resolve, reject)
            }.bind(self))
          } else {
            self.connCb(e)
          }
          self = void 0
        }
        resolve(e)
      }

      // 连接成功
      self.webSocket.onopen = function (e) {
        if (self) {
          self.isWsConned = true
          self.isWsConning = false
          self.connCb()

          if (self.isAutoPushOpen) {
            self.pushOpen()
            .then(function res () {

            })
            .catch(function onError (e) {

            })
          }
          api.emit('wsOpen')
        }
      }
      self.webSocket.onmessage = function (res) {
        if (self) {
          rowraw.parsePromise(res.data || res)
          // 解析成功
          .then(function (res) {
            var emitState
            if (!self) return
            if (res.type === 'response') {
              self.response(res)
            } else if (res.type === 'request') {
              emitState = self.emit(['request', (res.protocol || '').toLowerCase()], res)
            } else {
              emitState = self.emit(['message', 'unknown error'], (res.data || res))
            }
            if (!emitState) {
              if (res.type === 'request') {
                emitState = api.emit(['request', (res.protocol || '').toLowerCase()], res)
              } else {
                emitState = api.emit(['message', 'unknown error'], (res.data || res))
              }
            }
            if (!emitState) {
              if (!self.emit('wsmessage', res)) {
                if (console && console.debug) {
                  console.debug('webSocket::message\n')
                  console.debug(res)
                }
              }
            }
          })
          // 解析错误
          .catch(function (e) {
            console.error('webSocket.onmessage.catch', e, res)
          })
        }
      }
      // 关闭事件
      self.webSocket.onclose = function (e) {
        if (self) {
          var obj = {}
          self.isWsConned = false
          if (self.isAutomaticReconnection) {
            // 重连
            self.timer = setTimeout(function () {
              util.nextTick(function () {
                clearTimeout(self.timer)
                self = void 0
                this && this.connRun()
              }.bind(self))
            }, self.connectionTime)

            obj = {
              time: self.connectionTime,
              type: 'accident'
            }
            api.emit('wsClose', obj)

            self.connectionTime = self.connectionTime === 3000 ? 5000 : 3000
          } else {
            self.isAutomaticReconnection = false
            self.isWsConning = false
            if (!(e instanceof Error)) {
              var olde = e
              e = new Error('The connection has been interrupted')
              e.olde = olde
            }
            self.connCb(e)

            obj = {
              time: 0,
              type: 'user'
            }
            api.emit('wsClose', obj)
            self = void 0
          }
          obj = void 0
        }
      }
      // 错误事件
      self.webSocket.onerror = function (e) {
        if (self) {
          var _this = self
          self.isWsConned = false
          self._isTryNum = self._isTryNum || 0
          self._isTrySum = self._isTrySum || 3
          if (self.isAutomaticReconnection) {
            self.isAutomaticReconnection = false
            // 重连
            self.timer = setTimeout(function () {
              util.nextTick(function () {
                clearTimeout(_this.timer)
                self = void 0
                _this && _this.connRun()
              })
            }, self.connectionTime)

            self.connectionTime = self.connectionTime === 3000 ? 5000 : 3000
          } else if (self._isTryNum++ < self._isTrySum) {
            setTimeout(function () {
              util.nextTick(function () {
                self = void 0
                _this && _this.connRun()
              })
            }, self.connectionTime)
            self.connectionTime = self.connectionTime === 3000 ? 5000 : 3000
          } else {
            self.isWsConning = false
            if (!(e instanceof Error)) {
              var olde = e
              e = new Error('Connection closed before receiving a handshake response')
              e.olde = olde
            }
            self.connCb(e)
            self = void 0
          }
        }
      }

      // window上线断线事件
      if (typeof window !== typeof void 0 && window === window.window) {
        // 断线
        window.onoffline = function (event) {
          api.emit('offline')
        }

        window.ononline = function (event) {
          if (self && !self.isWsConned) {
            self.connRun()
          }

          var checkedLine = setInterval(function () {
            if (!self || self.isWsConned) {
              clearInterval(checkedLine)
              return
            }
            self.connRun()
          }, 5000)
          api.emit('online')
        }
      }

      resolve()
    })
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
          if (!api.emit(['push', (res.method || '').toLowerCase(), (res.path || '/')], res.headers, res.body, res)) {
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
      auth.setUri(api.baseUrl)
      auth.setPath(headers.path || '/')
      auth.setMethod(headers.method || 'PUT')
      auth.setRequestId(headers.request_id)
      auth.setHeaders(JSON.parse(headers.headers))

      onAccessKey(auth, null, null, 0)
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
        this.webSocket.send(raw, function sendCb (e) {
        })
        raw = void 0
      }.bind(this))
    })
  },
  closeWs: function closeWs () {

  },
  _pushOpenCheckAndAutoRun: function _pushOpenCheckAndAutoRun () {
    var self = this
    // 如果
    if (self.isPushOpenIng) {
      return
    }
    self.isPushOpenIng = true
    if (api.session.isClientWindow) {
      self.request({
        headers: {
          bodytype: 'string'
        },
        start: 'OPEN /v1_0/init PUSH/1.0'
      })
      .then(function (res) {
        return res
      })
      .then(function (res) {
        if (self.pushOpenCb && util.isArray(self.pushOpenCb)) {
          self.pushOpenCb.forEach(function pushOpenCbOne (cbs) {
            if (cbs && util.isFunction(cbs[0])) {
              cbs[0](res)
            }
          })
        }
        api.emit(['pushsys', 'open'], res)
        return true
      })
      .catch(function (e) {
        if (self.pushOpenCb && util.isArray(self.pushOpenCb)) {
          self.pushOpenCb.forEach(function pushOpenCbOne (cbs) {
            if (cbs && util.isFunction(cbs[1])) {
              cbs[1](e)
            }
          })
        }
        api.emit(['pushsys', 'openfail'], e)
      })
      .then(function () {
        self.isPushOpenIng = false
        self = void 0
      })
    } else {
      return Promise.reject(new Error('Does not support the client or browser'))
    }
  },
  pushOpen: function pushOpen () {
    var self = this
    this.isAutoPushOpen = true
    if (!Array.isArray(this.pushOpenCb)) {
      this.pushOpenCb = []
    }
    return new Promise(function (resolve, reject) {
      self.pushOpenCb.push([resolve, reject])
      self._pushOpenCheckAndAutoRun()
      self = void 0
    })
  }
})
