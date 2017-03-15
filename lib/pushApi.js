'use strict'
var requestWs
var api = require('./api.js')
// 安装模块
api.utilInitKey.push.apply(api.utilInitKey, 'pushOpen pushClose'.split(' '))

if (api.session.isClientWindow) {
  requestWs = require('./requestWs.js')
}
// 对外接口
Object.assign(api, {
  pushOpen: function pushOpen (cb) {
    var promise = api.pushOpenRun()
    if (typeof cb === 'function') {
      promise.then(function (res) {
        cb(null, res)
      }).catch(function (e) {
        cb(e)
      })
    } else {
      return promise
    }
  },
  pushClose: function pushClose (cb) {
    var promise = api.pushCloseRun()
    if (typeof cb === 'function') {
      promise.then(function (res) {
        cb(null, res)
      }).catch(function (e) {
        cb(e)
      })
    } else {
      return promise
    }
  },
  pushOpenRun: function pushOpenRun () {
    if (api.session.isClientWindow) {
      var self = this
      return requestWs({
        headers: {
          bodytype: 'string'
        },
        start: 'OPEN /v1_0/init PUSH/1.0'
      }).then(function (res) {
        self.emit(['pushsys', 'open'], res)
        console.log('启动 pushOpenByH5Ws')
        return true
      })
    } else {
      return Promise.reject(new Error('Does not support the client or browser'))
    }
  },
  pushCloseRun: function pushCloseRun () {
    if (api.session.isClientWindow) {
      return requestWs({
        start: 'CLOSE /v1_0/init PUSH/1.0'
      }).then(function () {
        return true
      })
    } else {
      return Promise.reject(new Error('Does not support the client or browser'))
    }
  }
})
