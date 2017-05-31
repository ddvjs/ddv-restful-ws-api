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
    var apiSelf = this
    // 获取一个单列
    return requestWs.getSingleton()
    .then(function (wsobj) {
      // 如果
      if (wsobj.isAutoPushOpen) {
        return
      }
      wsobj.isAutoPushOpen = true
      wsobj.on('wspush', function (res) {
        if (!apiSelf.emit(['push', (res.method || '').toLowerCase(), (res.path || '/')], res.headers, res.body, res)) {
          if (console && console.debug) {
            console.debug('webSocket::push\n')
            console.debug(res)
          }
        }
      })
      wsobj.on('wsmessage', function (res) {
        var emitState
        if (res.type === 'request') {
          emitState = !apiSelf.emit(['request', (res.protocol || '').toLowerCase()], res)
        } else {
          emitState = !apiSelf.emit(['message', 'unknown error'], (res.data || res))
        }
        if (emitState) {
          if (console && console.debug) {
            console.debug('webSocket::message\n')
            console.debug(res)
          }
        }
      })
    }).then(function () {
      if (api.session.isClientWindow) {
        return requestWs({
          headers: {
            bodytype: 'string'
          },
          start: 'OPEN /v1_0/init PUSH/1.0'
        })
        .then(function (res) {
          return res
        })
        .then(function (res) {
          apiSelf.emit(['pushsys', 'open'], res)
          return true
        })
      } else {
        return Promise.reject(new Error('Does not support the client or browser'))
      }
    })
  },
  pushCloseRun: function pushCloseRun () {
    return requestWs.getSingleton().then(function (self) {
      self.isAutoPushOpen = false
    }).then(function () {
      if (api.session.isClientWindow) {
        return requestWs({
          start: 'CLOSE /v1_0/init PUSH/1.0'
        }).then(function () {
          return true
        })
      } else {
        return Promise.reject(new Error('Does not support the client or browser'))
      }
    })
  }
})
