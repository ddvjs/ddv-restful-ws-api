const WebSocket = require('ws')
const DdvWebSocket = require('./DdvWebSocket.js')
DdvWebSocket.setNodeWebSocket(WebSocket)
