/* global WebSocket */
module.exports = DdvWebSocket
var EventEmitter = require('ddv-restful-api/events')
var H5WebSocket = typeof WebSocket === 'undefined' ? null : WebSocket
var NodeWebSocket = null

function DdvWebSocket (wsUrl) {
  if (this instanceof DdvWebSocket) {
    return this.constructor(wsUrl)
  } else {
    return new DdvWebSocket(wsUrl)
  }
}
DdvWebSocket.prototype = DdvWebSocket.prototype || Object.create(null)
Object.assign(DdvWebSocket, {
  isSupport: function isSupport () {
    return Boolean(H5WebSocket || NodeWebSocket)
  },
  setNodeWebSocket: function setNodeWebSocket (ws) {
    NodeWebSocket = ws
  }
})
Object.assign(DdvWebSocket.prototype, EventEmitter.prototype)
Object.assign(DdvWebSocket.prototype, {
  constructor: function constructor (wsUrl) {
    Object.assign(this, new EventEmitter())
    if (H5WebSocket) {
      this.ws = new H5WebSocket(wsUrl)
      this.ws.onopen = function onopen () {
        this.emit('open')
      }.bind(this)
      this.ws.onclose = function onclose (e) {
        this.emit('close', e)
      }.bind(this)
      this.ws.onerror = function onerror (e) {
        this.emit('error', e)
      }.bind(this)
      this.ws.onmessage = function onmessage (e) {
        this.emit('message', (e.data || e))
      }.bind(this)
      this.type = 'h5'
    } else if (NodeWebSocket) {
      this.ws = new NodeWebSocket(wsUrl)
      this.ws.on('open', function onopen () {
        this.emit('open')
      }.bind(this))
      this.ws.on('close', function onclose (e) {
        this.emit('close', e)
      }.bind(this))
      this.ws.on('error', function onerror (e) {
        this.emit('error', e)
      }.bind(this))
      this.ws.on('message', function onmessage (data) {
        this.emit('message', data)
      }.bind(this))
      this.type = 'node'
    } else {
      return Promise.reject(new Error('The client or browser does not support WebSocket'))
    }
  },
  send: function send (data) {
    return new Promise(function (resolve, reject) {
      if (this.type === 'h5') {
        this.ws.send(data, function sendCb (e) {
          e ? reject(e) : resolve()
        })
      } else if (this.type === 'node') {
        this.ws.send(data, function sendCb (e) {
          e ? reject(e) : resolve()
        })
      } else {
        return Promise.reject(new Error('The client or browser does not support WebSocket'))
      }
    }.bind(this))
  }
})
