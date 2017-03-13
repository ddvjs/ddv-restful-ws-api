'use strict'
/* global WebSocket */
module.exports = typeof WebSocket === 'undefined' ? null : WebSocket
