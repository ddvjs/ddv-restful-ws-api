'use strict'
var util = require('ddv-restful-api/util')
var rowraw = require('ddv-rowraw')
var WebSocket = require('./clientWebSocket.js')
module.exports = {
  constructor: function constructor (options) {
    this.status = 'starting'
    this.ws = this.ws || options.ws
    if ((!this.ws) && typeof window !== 'undefined') {
      this.ws = window.location && window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    }
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
      console.log(33321)
      console.log('33', res)

      if (!(options.s && options._this && a.ws.conn)) {
        options.error('Unknown error', new Error('Unknown error'))
        o = undefined
        return false
      }
      options.s.processWs = options.s.processWs || Object.create(null)
      options.s.processConn = options.s.processConn || []
      options.s.processWs[options.request_id] = o
      options.s.processConn.push(o)
      if (options._this) {
        if (options._this.__sys__.isWsConned) {
          // 已经连接，直接发送
          a.ws.requestRun.call(options._this)
        } else if (!options._this.__sys__.isWsConning) {
          // 启动连接
          a.ws.conn.call(options._this)
        }
      }
      delete options.headers
      delete options.body
      delete options.start
      o = undefined
    })
    console.log(3331)
  },
  conn: function conn () {
    if (this.isWsConned) {
      return Promise.resolve()
    } else if (this.isWsConning) {
    } else {
      this.isWsConning = true
      this.webSocket = new WebSocket(this.ws)
    }
    // if (this.) {}
  },
  closeWs: function closeWs () {

  }
}
