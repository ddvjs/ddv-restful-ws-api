// 导出模块
module.exports = DdvRequestWs
var DdvWebSocket = require('./DdvWebSocket.js')

function DdvRequestWs (api) {
  if (this instanceof DdvRequestWs) {
    return this.constructor(api)
  } else {
    return new DdvRequestWs(api)
  }
}

// 合并继承
Object.assign(DdvRequestWs.prototype, require('./requestWsPrototype.js'))

// 公开方法
Object.assign(DdvRequestWs, {
  // 返回一个单例
  getSingleton: function getSingleton (api) {
    if (!(api && api.isWebSocketApiExtend)) {
      return Promise.reject(new Error('Does not is WebSocketApiExtend'))
    }
    if (!DdvWebSocket.isSupport()) {
      return Promise.reject(new Error('The client or browser does not support WebSocket'))
    }
    if (!api.WebSocketSingleton) {
      api.WebSocketSingleton = new DdvRequestWs(api)
      api.WebSocketSingleton.time = new Date()
    }
    return Promise.resolve(api.WebSocketSingleton)
  }
})
