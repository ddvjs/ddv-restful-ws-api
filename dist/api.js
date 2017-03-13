module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(3);
__webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var request;
var api = __webpack_require__(0);
// 安装模块
api.utilInitKey.push.apply(api.utilInitKey, 'pushOpen pushClose'.split(' '));

if (api.session.isClientWindow) {
  request = __webpack_require__(2);
}
// 对外接口
Object.assign(api, {
  pushOpen: function pushOpen(cb) {
    var promise = api.pushOpenRun();
    if (typeof cb === 'function') {
      promise.then(function (res) {
        cb(null, res);
      }).catch(function (e) {
        cb(e);
      });
    } else {
      return promise;
    }
  },
  pushClose: function pushClose(cb) {
    var promise = api.pushCloseRun();
    if (typeof cb === 'function') {
      promise.then(function (res) {
        cb(null, res);
      }).catch(function (e) {
        cb(e);
      });
    } else {
      return promise;
    }
  },
  pushOpenRun: function pushOpenRun() {
    if (api.session.isClientWindow) {
      var self = this;
      return request({
        headers: {
          bodytype: 'string'
        },
        start: 'OPEN /v1_0/init PUSH/1.0'
      }).then(function (res) {
        self.emit(['pushsys', 'open'], res);
        console.log('启动 pushOpenByH5Ws');
        return true;
      });
    } else {
      return Promise.reject(new Error('Does not support the client or browser'));
    }
  },
  pushCloseRun: function pushCloseRun() {
    if (api.session.isClientWindow) {
      return request({
        start: 'CLOSE /v1_0/init PUSH/1.0'
      }).then(function () {
        return true;
      });
    } else {
      return Promise.reject(new Error('Does not support the client or browser'));
    }
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 导出模块

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("ddv-restful-api");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(0);

/***/ })
/******/ ]);
//# sourceMappingURL=api.js.map