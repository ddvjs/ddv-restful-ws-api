'use strict'
module.exports = pushApiExtend
var requestWs = require('./requestWs.js')

function pushApiExtend (api) {
  if (!api.isWebSocketApiExtend) {
    return
  }
  // 安装模块
  Array.prototype.push.apply(api.utilInitKey, 'pushOpen pushClose'.split(' '))

  // 对外接口
  Object.assign(api, {
    pushOpen: function pushOpen (cb) {
      var promise = requestWs.getSingleton(this)
        .then(function (wsobj) {
          return wsobj.pushOpen()
        })
      if (typeof cb === 'function') {
        promise.then(function (res) {
          cb(null, res)
        }).catch(function (e) {
          cb(e)
        })
      } else {
        return promise
      }
    }.bind(api),
    pushClose: function pushClose (cb) {
      var promise = requestWs.getSingleton(this)
        .then(function (wsobj) {
          return wsobj.pushClose()
        })
      if (typeof cb === 'function') {
        promise.then(function (res) {
          cb(null, res)
        }).catch(function (e) {
          cb(e)
        })
      } else {
        return promise
      }
    }.bind(api)
  })
}
