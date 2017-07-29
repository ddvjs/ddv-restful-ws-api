'use strict'
/* global WebSocket */
module.exports = DdvWebSocket
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
Object.assign(DdvWebSocket.prototype, {
  constructor: function constructor (wsUrl) {
    if (H5WebSocket) {
      this.ws = new H5WebSocket(wsUrl)
      this.ws.onopen = function onopen () {
        this.onopen()
      }.bind(this)
      this.ws.onclose = function onclose (e) {
        this.onclose(e)
      }.bind(this)
      this.ws.onerror = function onerror (e) {
        this.onerror(e)
      }.bind(this)
      this.ws.onmessage = function onmessage (e) {
        this.onmessage(e.data || e)
      }.bind(this)
      this.type = 'h5'
    } else if (NodeWebSocket) {
      this.ws = new NodeWebSocket(wsUrl)
      this.ws.on('open', function onopen () {
        this.onopen()
      }.bind(this))
      this.ws.on('close', function onclose (e) {
        this.onclose(e)
      }.bind(this))
      this.ws.on('error', function onerror (e) {
        this.onerror(e)
      }.bind(this))
      this.ws.on('message', function onmessage (data) {
        this.onmessage(data)
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
  },
  onopen: function onopen () {},
  onclose: function onclose (e) {},
  onerror: function onerror (e) {},
  onmessage: function onmessage (data) {}
})
