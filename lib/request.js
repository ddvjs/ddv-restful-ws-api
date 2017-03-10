'use strict'
// 导出模块
module.exports = ddvRequestWs

function ddvRequestWs (o) {
  o.headers = o.headers || Object.create(null)
  o.request_id = o.headers.request_id || o.request_id || b.createRequestId()
  o.headers.request_id = o.request_id
  o.body = o.body || ''
  o.start = o.start || ''
  if (!b.type(o.success, 'function')) {
    o.success = function () {}
  }
  if (!b.type(o.error, 'function')) {
    o.error = function (msg, e) { throw e }
  }
  o.addtime = b.time()
  o._this = this
  o.s = this.__sys__
  b.rowraw.stringify(o.headers, o.body, o.start, function (raw) {
    o.raw = raw
    raw = undefined
    if (!(o.s && o._this && a.ws.conn)) {
      o.error('Unknown error', new Error('Unknown error'))
      o = undefined
      return false
    }
    o.s.processWs = o.s.processWs || Object.create(null)
    o.s.processConn = o.s.processConn || []
    o.s.processWs[o.request_id] = o
    o.s.processConn.push(o)
    if (o._this) {
      if (o._this.__sys__.isWsConned) {
        // 已经连接，直接发送
        a.ws.requestRun.call(o._this)
      } else if (!o._this.__sys__.isWsConning) {
        // 启动连接
        a.ws.conn.call(o._this)
      }
    }
    delete o.headers
    delete o.body
    delete o.start
    o = undefined
  })

}
