'use strict'
var EventEmitter = require('./events.js')
module.exports = require('ddv-restful-api')
Object.assign(module.exports, EventEmitter.prototype, new EventEmitter())
require('./pushApi.js')
