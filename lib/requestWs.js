'use strict'
// 导出模块
module.exports = DdvRequestWs

function DdvRequestWs (options) {
  if (this instanceof DdvRequestWs) {
    return this.constructor(options)
  } else {
    return DdvRequestWs.request.apply(this, arguments)
  }
}

// 合并继承
Object.assign(DdvRequestWs.prototype, require('./requestWsPrototype.js'))

// 公开方法
Object.assign(DdvRequestWs, {
  // 请求
  request: function request () {
    return DdvRequestWs.getSingleton().then(ws => {
      return ws.request.apply(ws, arguments)
    })
  },
  // 返回一个单例
  getSingleton: function getSingleton () {
    if (!this.singleton) {
      this.singleton = new DdvRequestWs()
      this.singleton.time = new Date()
    }
    return Promise.resolve(this.singleton)
  }
})
