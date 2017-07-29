'use strict'
module.exports = apiExtend
var pushApiExtend = require('./pushApiExtend.js')

// 扩展api
function apiExtend (api) {
  if (api.isWebSocketApiExtend) {
    return true
  }
  // 标记扩展过
  api.isWebSocketApiExtend = true
  api.setWebSocketUrl = setWebSocketUrl.bind(api)
  pushApiExtend(api)
  return true
}

// 设定长连接地址
function setWebSocketUrl (wsUrl) {
  this.webSocketUrl = wsUrl
}
