'use strict'
// 导出模块
module.exports = DdvRequestWs

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
    if (typeof window === 'undefined') {
      return Promise.reject(new Error('Does not support the client or browser'))
    }
    if (!api.WebSocketSingleton) {
      api.WebSocketSingleton = new DdvRequestWs(api)
      api.WebSocketSingleton.time = new Date()
    }
    return Promise.resolve(api.WebSocketSingleton)
  }
})
