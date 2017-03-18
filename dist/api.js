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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define([], factory);
	}
	else {
		// Global (browser)
		root.CryptoJS = factory();
	}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {};

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 导出模块

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = util;
// 创建最后总和
var createNewidSumLast = 0;
// 创建最后时间
var createNewidTimeLast = 0;
// 创建请求id
Object.assign(util, {
  createNewPid: function createNewid(is10) {
    var r;
    if (createNewidTimeLast !== util.time()) {
      createNewidTimeLast = util.time();
      createNewidSumLast = 0;
    }
    r = createNewidTimeLast.toString() + (++createNewidSumLast).toString();
    // 使用36进制
    if (!is10) {
      r = parseInt(r, 10).toString(36);
    }
    return r;
  },
  // 生成guid
  createGuid: function createGuid(s) {
    return (s || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx').replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0;
      var v = c === 'x' ? r : r & 0x3 | 0x8;
      return v.toString(16);
    });
  }
});

// 生成请求id
Object.assign(util, {
  // 生成请求id
  createRequestId: function createRequestId() {
    var pid, rid, ridLen, ridT, ridNew, i;
    // 获取16进制的 pid
    pid = Number(util.createNewPid(true)).toString(16);
    // 种子
    rid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    ridNew = '';
    for (i = rid.length - 1; i >= 0; i--) {
      ridT = rid[i];
      if (ridT === 'x') {
        ridLen = pid.length;
        ridT = pid ? pid.charAt(ridLen - 1) : 'x';
        pid = pid.substr(0, ridLen - 1);
      }
      ridNew = ridT + ridNew;
    }
    rid = util.createGuid(ridNew);
    i = ridNew = ridT = ridLen = pid = void 0;
    return rid;
  }
});

// 时间工具
Object.assign(util, {
  // 获取当前时间开始
  now: function now() {
    return new Date().getTime();
  },
  // 获取php的时间戳
  time: function time() {
    return parseInt(util.now() / 1000);
  }
});

// 基本判断
Object.assign(util, {
  // 判断是一个方法
  isFunction: function isFunction(fn) {
    return typeof fn === 'function';
  },
  // 判断是否为一个数组
  isArray: function isArray() {
    return Array.isArray.apply(this, arguments);
  },
  isNumber: function isNumber(obj) {
    return (typeof obj === 'string' || typeof obj === 'number') && !util.isArray(obj) && obj - parseFloat(obj) >= 0;
  },
  // 判断是否一个标准的global
  isGlobal: function isGlobal(obj) {
    return obj !== void 0 && obj === obj.global;
  },
  // 类似php里面的inArray
  inArray: function inArray(a, b) {
    if (!util.isArray(b)) {
      return false;
    }
    for (var i in b) {
      if (b[i] === a) {
        return true;
      }
    }
    return false;
  }
});

// 基本工具
Object.assign(util, {
  // 克隆
  clone: function clone(myObj) {
    var i, myNewObj;
    if (!(myObj && (typeof myObj === 'undefined' ? 'undefined' : _typeof(myObj)) === 'object')) {
      return myObj;
    }
    if (myObj === null || myObj === undefined) {
      return myObj;
    }
    myNewObj = '';
    if (Array.isArray(myObj)) {
      myNewObj = [];
      for (i = 0; i < myObj.length; i++) {
        myNewObj.push(myObj[i]);
      }
    } else if ((typeof myObj === 'undefined' ? 'undefined' : _typeof(myObj)) === 'object') {
      myNewObj = {};
      if (myObj.constructor && myObj.constructor !== Object) {
        myNewObj = myObj;
        // 防止克隆ie下克隆  Element 出问题
      } else if (myObj.innerHTML !== undefined && myObj.innerText !== undefined && myObj.tagName !== undefined && myObj.tabIndex !== undefined) {
        myNewObj = myObj;
      } else {
        for (i in myObj) {
          myNewObj[i] = clone(myObj[i]);
        }
      }
    }
    return myNewObj;
  },
  // 复制对象，通过制定key
  copyObjByKey: function copyObjByKey(oldObj, newObj, keys) {
    keys = keys || [];
    keys.forEach(function (key) {
      oldObj[key] = newObj[key] || oldObj[key];
    });
  },
  // 设置错误id
  setErrorId: function setErrorId(errorId, error) {
    error.errorId = errorId;
    error.error_id = errorId;
    return error;
  },
  // 参数强转数组
  argsToArray: function argsToArray(args) {
    return Array.prototype.slice.call(args);
  }
});

// nextTick
Object.assign(util, {
  nextTick: __webpack_require__(13)
});

// urlEncode 编码
Object.assign(util, {
  // 编码对照数组表
  kEscapedMap: {
    '!': '%21',
    '\'': '%27',
    '(': '%28',
    ')': '%29',
    '*': '%2A'
  },
  // 编码
  urlEncode: function urlEncode(string, encodingSlash) {
    var result = encodeURIComponent(string);
    result = result.replace(/[!'()*]/g, function ($1) {
      return util.kEscapedMap[$1];
    });
    if (encodingSlash === false) {
      result = result.replace(/%2F/gi, '/');
    }
    return result;
  },
  // path编码
  urlEncodeExceptSlash: function urlEncodeExceptSlash(value) {
    return util.urlEncode(value, false);
  }
});
// 对象序列化
Object.assign(util, {
  // 编码
  buildParams: function buildParams(data, isQuery) {
    var r = util._buildParamsToArray(data, '').join('&');
    if (isQuery) {
      r = r.replace(/%20/gi, '+');
    }
    return r;
  },

  _buildParamsToArray: function _buildParamsToArray(data, prefix) {
    var r = [];
    var i, key, keyt, value;
    if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
      // 数组
      if (util.isArray(data)) {
        for (i = 0; i < data.length; i++) {
          // 值
          value = data[i];
          // 键
          keyt = util._buildParamsAddPrefix(i, prefix, (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object');
          // 递归处理对象和数组
          if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            // 插入数组
            r.push.apply(r, util._buildParamsToArray(value, keyt));
          } else {
            // 插入数组
            r.push(util.urlEncode(keyt) + '=' + util.urlEncode(value));
          }
        }
      } else {
        for (key in data) {
          if (!Object.hasOwnProperty.call(data, key)) {
            continue;
          }
          // 值
          value = data[key];
          // 键
          keyt = util._buildParamsAddPrefix(key, prefix);
          if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            // 插入数组
            r.push.apply(r, util._buildParamsToArray(value, keyt));
          } else {
            // 插入数组
            r.push(util.urlEncode(keyt) + '=' + util.urlEncode(value));
          }
        }
      }
    }
    return r;
  },
  _buildParamsAddPrefix: function _buildParamsAddPrefix(key, prefix, isNotArray) {
    if (prefix) {
      return prefix + '[' + (isNotArray !== false ? key : '') + ']';
    } else {
      return key;
    }
  }
});

function util() {}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 导出模块

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = ddvRestFulApi;
// 工具
var util = __webpack_require__(1);
var url = __webpack_require__(4);
var request = __webpack_require__(6);
var sign = __webpack_require__(3);
var EventEmitter = __webpack_require__(8);
Object.assign(ddvRestFulApi, EventEmitter.prototype, new EventEmitter());
// 方法
function ddvRestFulApi(path, req, res) {
  var promise = new Promise(function (resolve, reject) {
    new Promise(function (resolve, reject) {
      // 下一进程运行
      util.nextTick(function () {
        // 这个直接提交，因为该操作仅仅是为了延迟
        resolve();
        // 回收
        resolve = reject = void 0;
      });
    }).then(function () {
      // 初始化接口
      return apiPromiseInit(promise, path, req, res);
    }).then(function () {
      // 回收资源
      path = req = res = void 0;
      // api接口运行
      return apiPromiseRun(promise);
    }).then(function (_request) {
      return new Promise(function (resolve, reject) {
        var r = null;
        var e = null;
        var res = _request.serverRes;
        try {
          r = JSON.parse(res.body);
        } catch (e1) {
          e = e1;
          e.body = res.body;
          console.log(e.body);
        }
        if (e) {
          e.statusCode = res.statusCode;
          e.error_id = res.status;
          e.message = res.status || 'Unknow Error';
          reject(e);
        } else if (r) {
          if (r.state) {
            r.statusCode = r.statusCode || r.code || res.statusCode;
            r.error_id = r.error_id || res.status;
            r.message = r.message || r.msg || res.status || 'Unknow Error';
            resolve(r);
          } else {
            e = new Error(r.message || r.msg || res.status || 'Unknow Error');
            e.statusCode = r.statusCode || r.code || res.statusCode;
            e.error_id = r.error_id || res.status;
            e.message = r.message || r.msg || res.status || 'Unknow Error';
            reject(e);
          }
        }
        _request.destroy();
        _request = resolve = reject = r = e = res = void 0;
      });
    }).then(function (res) {
      util.nextTick(function () {
        util.isFunction(promise.destroy) && promise.destroy();
        // 回收资源
        promise = void 0;
      });
      return res;
    })
    // 绑定回调
    .then(resolve, reject);
    // 回收
    resolve = reject = void 0;
  });
  return apiPromiseBaseInit(promise);
}
function apiPromiseRun(promise) {
  return sign(promise.options).then(function (options) {
    return request(options);
  }).catch(function (e) {
    if (parseInt(promise.options.serverRes.statusCode) === 403) {
      promise.options.isSessionInit = true;
      // 重新运行一次
      return apiPromiseRun(promise);
    } else {
      // 还是原路抛出错误
      return Promise.reject(e);
    }
  });
}
function apiPromiseInit(promise, path, req, res) {
  var options = promise.options;
  return new Promise(function (resolve, reject) {
    if ((typeof path === 'undefined' ? 'undefined' : _typeof(path)) === 'object') {
      promise.path(path.path);
      promise.sendData(path.data);
      promise.headers(path.headers);
      promise.method(path.method);
      resolve();
    } else if (typeof path === 'string') {
      promise.path(path || '/');
      resolve();
    } else {
      var e = new Error('method type error');
      e.error_id = 'UNKNOW_ERROR';
      reject(e);
    }
  }).then(function () {
    // 设定请求对象
    if (req && req.req && req.res) {
      promise.context(req);
    } else {
      promise.req(req);
      promise.res(res);
    }
  }).then(function () {
    options.serverRes = Object.create(null);
    options.serverRes.statusCode = 0;
    options.serverRes.status = 'UNKNOW_ERROR';
    options.serverRes.body = '';
  }).then(function () {
    options.method = options.method || 'GET';
    options.queryObject = options.queryObject || Object.create(null);
    if (_typeof(options.query) === 'object') {
      options.query = '';
      Object.assign(options.queryObject, options.query);
    }
    options.path = options.path || '/';
    options.path = (options.path.charAt(0) === '/' ? '' : '/') + options.path;
    options.query = (url('query', options.path) || '').toString();
    options.path = url('path', options.path) || '/';
    options.baseUrl = options.baseUrl || ddvRestFulApi.baseUrl || '';
    options.isServerNode = options.req && options.res && true || false;

    options.host = url('hostname', options.baseUrl);
    options.port = url('port', options.baseUrl);
    options.protocol = url('protocol', options.baseUrl);
    options.request_id = options.request_id || util.createRequestId();
  }).then(function buildParamsRun() {
    var str;
    if (options.queryObject) {
      str = util.buildParams(options.queryObject, true);
      if (str) {
        options.query += (options.query.length > 0 ? '&' : '') + str;
      }
    }
    if (options.method === 'GET') {
      str = util.buildParams(options.data, true);
      if (str) {
        options.query += (options.query.length > 0 ? '&' : '') + str;
      }
    } else {
      options.body = util.buildParams(options.data);
    }
    options = void 0;
  });
}

function apiPromiseBaseInit(promise) {
  // 基本参数
  Object.assign(promise, {
    options: {
      path: '/',
      method: 'GET',
      headers: Object.create(null),
      data: Object.create(null),
      query: Object.create(null),
      req: null,
      res: null
    }
  });
  // 基本方法
  Object.assign(promise, {
    headers: function headers(headers) {
      this.options.headers = this.options.headers || Object.create(null);
      Object.assign(this.options.headers, headers || Object.create(null));
      return this;
    },
    path: function path(path) {
      this.options.path = (path || '/').toString();
      return this;
    },
    method: function method(method) {
      this.options.method = (method || this.options.method || 'GET').toString().toUpperCase();
      return this;
    },
    // 发送别名
    send: function sendData(data) {
      this.options.data = this.options.data || Object.create(null);
      Object.assign(this.options.data, data || Object.create(null));
      return this;
    },
    query: function query(data) {
      this.options.query = this.options.query || Object.create(null);
      Object.assign(this.options.query, data || Object.create(null));
      return this;
    },
    req: function req(req) {
      this.options.req = req || this.options.req || null;
    },
    res: function res(res) {
      this.options.res = res || this.options.res || null;
    },
    context: function context(context) {
      if (context.req && context.res) {
        this.req(context.req);
        this.res(context.res);
      } else if (context.requests && context.response) {
        this.req(context.requests);
        this.res(context.response);
      }
    },
    // 销毁
    destroy: function destroy() {
      util.nextTick.call(this, function () {
        var key;
        for (key in this) {
          if (!Object.hasOwnProperty.call(this, key)) continue;
          delete this[key];
        }
        key = void 0;
      });
    }
  });
  // 基本方法
  Object.assign(promise, {
    // 发送别名
    sendData: promise.send,
    // 成功别名
    success: promise.then,
    // 错误别名
    error: promise.catch,
    // 失败别名
    fail: promise.catch
  });
  return promise;
}

// 继承使用 Promise 的继承
ddvRestFulApi.prototype = Promise.prototype;
// 默认导出支持 - 允许在 TypeScript 中使用默认导入语法
ddvRestFulApi['default'] = ddvRestFulApi;
// 复制 Promise 的一些方法
'all race reject resolve'.split(' ').forEach(function (key) {
  ddvRestFulApi[key] = function () {
    return Promise[key].apply(Promise, arguments);
  };
});
// 支持五大请求
'get post put patch del delete'.split(' ').forEach(function (key) {
  if (!key) {
    key = 'get';
  }
  ddvRestFulApi[key] = function ddvRestFulApiMethod() {
    key = key === 'del' ? 'delete' : key;
    return ddvRestFulApi.apply(ddvRestFulApi, arguments).method(key.toUpperCase());
  };
});

Object.assign(ddvRestFulApi, {
  // 默认安装一下方法
  utilInitKey: 'api get post put del delete data addListener on once removeListener removeAllListeners emit listeners listenerCount setMaxListeners'.split(' '),
  // 安装模块
  util: function apiUtil(util) {
    // 扩展请求接口
    ddvRestFulApi.utilInitKey.forEach(function (key) {
      util[key] = key === 'api' ? ddvRestFulApi : ddvRestFulApi[key];
    });
    // 承诺
    util.Promise = util.Promise || Promise;
  },
  // 设置baseUrl
  setBaseUrl: function setBaseUrl(baseUrl) {
    ddvRestFulApi.baseUrl = baseUrl;
  }

});

__webpack_require__(12);
// 对外扩张接口
__webpack_require__(11);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 导出签名模块
// 工具

var util = __webpack_require__(1);
var sign = module.exports = Object.assign(function sign(o) {
  return sign._signRun(o);
}, {
  headersPrefix: 'x-ddv-',
  excludeHeaderKeys: ['host', 'content-length', 'content-type', 'content-md5'],
  // 设置headersPrefix
  setHeadersPrefix: function setHeadersPrefix(prefix) {
    sign.headersPrefix = prefix;
  },
  // 签名头
  _signRun: function _signRun(o) {
    return new Promise(function signInit(resolve, reject) {
      // base初始化
      sign._signRunBaseInit(o);
      // 初始化GET参数
      sign._signRunQueryInit(o);
      // 格式化头信息
      sign._signRunHeadersFormat(o);
      // 签名头排序
      sign._signRunHeadersSort(o);
      // 提交下一步
      resolve(o);
      o = void 0;
    }).then(function (o) {
      // 获取校验过的session数据
      return session.getTrueData(o);
    }).then(function (o) {
      // 会话id
      var sessionId = o.sessionData.session_id;
      // 会话秘钥
      var sessionKey = o.sessionData.session_key || 'session_key';
      // 设备识别号
      var sessionCard = o.sessionData.session_card;
      // 时间差
      var differenceTime = o.sessionData.difference_time;

      // 授权字符串
      o.Authorization = 'app-auth-v2' + '/' + o.request_id + '/' + sessionId + '/' + sessionCard + '/' + sign.getUTCServerTime(differenceTime) + '/' + '1800';
      // 生成临时秘钥-用于加密的key-防止丢失正式key
      var signingKey = sign.HmacSHA256(o.Authorization, sessionKey);

      // 拼接内容
      var canonicalRequest = o.method + o.n + util.urlEncodeExceptSlash(o.path) + o.n + o.query + o.n + o.authCanonicalHeadersStr;
      // 使用signKey和标准请求串完成签名
      var sessionSign = sign.HmacSHA256(canonicalRequest, signingKey);
      // 组成最终签名串
      o.Authorization += '/' + o.authHeadersStr + '/' + sessionSign;
      // 进入下一步
      return o;
    }).then(function (o) {
      if (!o.headers) {
        o.headers = Object.create(null);
      }
      o.headers['Authorization'] = o.Authorization;
      // 回收数据
      delete o.authHeadersStr;
      delete o.authCanonicalHeadersStr;
      return o;
    });
  },
  // 签名头排序
  _signRunHeadersSort: function _signRunHeadersSort(o) {
    // 要签名的头的key的一个数组
    o.authHeadersStr = [];
    // 签名的头
    o.authCanonicalHeadersStr = [];

    o.headersPrefix = o.headersPrefix || sign.headersPrefix;
    o.headersPrefixLen = o.headersPrefix.length;
    var keyLower, key, value;
    var headersOld = o.headers;
    for (key in headersOld) {
      if (!Object.hasOwnProperty.call(headersOld, key)) {
        continue;
      }
      // 取得key对应的value
      value = headersOld[key];
      // 小写的key
      keyLower = key.toLowerCase();
      // 判断一下
      if (sign.excludeHeaderKeys.indexOf(keyLower) > -1 || keyLower.substr(0, o.headersPrefixLen) === o.headersPrefix) {
        o.authCanonicalHeadersStr.push(util.urlEncode(keyLower) + ':' + util.urlEncode(value));
        o.authHeadersStr.push(keyLower);
      }
    }

    // 排序
    o.authCanonicalHeadersStr.sort();
    // 用\n拼接
    o.authCanonicalHeadersStr = o.authCanonicalHeadersStr.join(o.n);
    // 用;拼接
    o.authHeadersStr = o.authHeadersStr.join(';');
  },
  // 格式化头信息
  _signRunHeadersFormat: function _signRunHeadersFormat(o) {
    // 克隆
    var headersTemp = Object.create(null);
    var headersOld = o.headers;
    var value = '';
    var key = '';
    // 遍历头
    for (key in headersOld) {
      // 去左右空格
      key = sign._trim(key);
      value = sign._trim(headersOld[key]);
      switch (key.toLowerCase()) {
        case 'authorization':
          continue;
        case 'host':
          key = 'Host';
          break;
        case 'content-length':
          key = 'Content-Length';
          break;
        case 'content-type':
          key = 'Content-Type';
          break;
        case 'content-md5':
          key = 'Content-Md5';
          break;
      }
      if (value) {
        headersTemp[key] = value;
      }
    }
    // 把处理后的赋值回给
    o.headers = headersTemp;
    // 释放内存
    headersTemp = headersOld = key = value = void 0;
    // 强制有host头
    o.headers.Host = o.headers.Host ? o.headers.Host : o.host;

    if (o.body && o.body.length > 0) {
      o.headers['Content-Length'] = o.headers['Content-Length'] ? o.headers['Content-Length'] : o.body.length;
      o.headers['Content-Type'] = o.headers['Content-Type'] ? o.headers['Content-Type'] : 'application/x-www-form-urlencoded; charset=UTF-8';
      o.headers['Content-Md5'] = sign.md5Base64(o.body);
    }
  },
  // 初始化GET参数
  _signRunQueryInit: function _signRunQueryInit(o) {
    // 签名数组
    var queryArray = [];
    if (o.query && o.query.length > 0) {
      o.query.split('&').forEach(function (t) {
        if (!t) {
          return;
        }
        var key, value, i;
        // 找到第一个等号的首次出现位置
        i = t.indexOf('=');
        // 取得key
        key = t.substr(0, i);
        // 取得value
        value = t.substr(i + 1);
        // 先去左右空格再编码
        key = sign._trim(key);
        value = sign._trim(value);
        // 插入新数组
        queryArray.push(key + '=' + value);
      });
    }
    // 排序
    queryArray.sort();
    // 用&拼接
    o.query = queryArray.join('&');
    // 回收内存
    queryArray = void 0;
  },
  // base初始化
  _signRunBaseInit: function _signRunBaseInit(o) {
    // 默认换行
    o.n = o.n || '\n';
    // 请求id
    o.request_id = o.request_id || util.createRequestId();
    // 请求方式
    o.method = (o.method || 'GET').toString().toUpperCase();
    // 强制是字符串
    o.query = o.query || '';
    // get请求
    if (o.method.toLowerCase() === 'GET') {
      // 如果有请求体
      if (o.body) {
        // 拼接到query中
        o.query += o.query ? '&' : '';
        // 清空请求体
        o.body = '';
      }
    } else {
      o.body = o.body || '';
    }
  },
  getUTCServerTime: function getUTCServerTime(differenceTime) {
    var d;
    d = new Date();
    d = new Date(parseInt(d.getTime() + (parseInt(differenceTime) || 0) * 1000) + 60 * d.getTimezoneOffset());
    return d.getUTCFullYear() + '-' + sign._replenish(d.getUTCMonth() + 1, 2) + '-' + sign._replenish(d.getUTCDate(), 2) + 'T' + sign._replenish(d.getUTCHours(), 2) + ':' + sign._replenish(d.getUTCMinutes(), 2) + ':' + sign._replenish(d.getUTCSeconds(), 2) + 'Z';
  },
  _replenish: function _replenish(text, total, rstr) {
    text = text.toString();
    var rstrlen = total - text.length || 0;
    var rstri = 0;
    var r = text;
    switch (arguments.length) {
      case 3:
        break;
      case 2:
        rstr = '0';
        break;
      default:
        return r;
    }
    for (rstri = 0; rstri < rstrlen; rstri++) {
      r = rstr.toString() + r.toString();
    }
    return r;
  },
  _trim: function _trim(str) {
    return str.toString().trim();
  },
  md5Hex: function md5Hex(str, isToString) {
    str = str || '';
    if (isToString !== false) {
      str = str.toString();
    }
    return cryptoJsCore.MD5(str).toString(cryptoJsHex);
  },
  md5Base64: function md5Base64(str, isToString) {
    str = str || '';
    if (isToString !== false) {
      str = str.toString();
    }
    return cryptoJsCore.MD5(str).toString(cryptoJsBase64);
  },
  HmacSHA256: function HmacSHA256(str, key, isToString) {
    str = str || '';
    if (isToString !== false) {
      str = str.toString();
    }
    return cryptoJsCore.HmacSHA256(str, key).toString(cryptoJsHex);
  }
});
// 引入签名会话模块
// 引入请求模块
var session = __webpack_require__(7);
var cryptoJsCore = __webpack_require__(0);
// var cryptoJsMd5 =
__webpack_require__(22);
// var cryptoJsHmacSha256 =
__webpack_require__(20);
var cryptoJsBase64 = __webpack_require__(10);
var cryptoJsHex = __webpack_require__(18);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function () {
  function _t() {
    return new RegExp(/(.*?)\.?([^.]*?)\.?(com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz|so)$/);
  }

  function _d(s) {
    return decodeURIComponent(s.replace(/\+/g, ' '));
  }

  function _i(arg, str) {
    var sptr = arg.charAt(0);
    var split = str.split(sptr);

    if (sptr === arg) {
      return split;
    }

    arg = parseInt(arg.substring(1), 10);

    return split[arg < 0 ? split.length + arg : arg - 1];
  }

  function _f(arg, str) {
    var sptr = arg.charAt(0);
    var split = str.split('&');
    var field = [];
    var params = {};
    var tmp = [];
    var arg2 = arg.substring(1);

    for (var i = 0, ii = split.length; i < ii; i++) {
      field = split[i].match(/(.*?)=(.*)/);

      // TODO: regex should be able to handle this.
      if (!field) {
        field = [split[i], split[i], ''];
      }

      if (field[1].replace(/\s/g, '') !== '') {
        field[2] = _d(field[2] || '');

        // If we have a match just return it right away.
        if (arg2 === field[1]) {
          return field[2];
        }

        // Check for array pattern.
        tmp = field[1].match(/(.*)\[([0-9]+)]/);

        if (tmp) {
          params[tmp[1]] = params[tmp[1]] || [];

          params[tmp[1]][tmp[2]] = field[2];
        } else {
          params[field[1]] = field[2];
        }
      }
    }

    if (sptr === arg) {
      return params;
    }

    return params[arg2];
  }

  return function (arg, url) {
    var _l = {};
    var tmp;

    if (arg === 'tld?') {
      return _t();
    }

    url = url || (typeof window !== 'undefined' && window.location || '').toString();

    if (!arg) {
      return url;
    }

    arg = arg.toString();

    if (tmp = url.match(/^mailto:([^/].+)/)) {
      _l.protocol = 'mailto';
      _l.email = tmp[1];
    } else {
      // Ignore Hashbangs.
      if (tmp = url.match(/(.*?)\/#!(.*)/)) {
        url = tmp[1] + tmp[2];
      }

      // Hash.
      if (tmp = url.match(/(.*?)#(.*)/)) {
        _l.hash = tmp[2];
        url = tmp[1];
      }

      // Return hash parts.
      if (_l.hash && arg.match(/^#/)) {
        return _f(arg, _l.hash);
      }

      // Query
      if (tmp = url.match(/(.*?)\?(.*)/)) {
        _l.query = tmp[2];
        url = tmp[1];
      }

      // Return query parts.
      if (_l.query && arg.match(/^\?/)) {
        return _f(arg, _l.query);
      }

      // Protocol.
      if (tmp = url.match(/(.*?):?\/\/(.*)/)) {
        _l.protocol = tmp[1].toLowerCase();
        url = tmp[2];
      }

      // Path.
      if (tmp = url.match(/(.*?)(\/.*)/)) {
        _l.path = tmp[2];
        url = tmp[1];
      }

      // Clean up path.
      _l.path = (_l.path || '').replace(/^([^/])/, '/$1').replace(/\/$/, '');

      // Return path parts.
      if (arg.match(/^[-0-9]+$/)) {
        arg = arg.replace(/^([^/])/, '/$1');
      }
      if (arg.match(/^\//)) {
        return _i(arg, _l.path.substring(1));
      }

      // File.
      tmp = _i('/-1', _l.path.substring(1));

      if (tmp && (tmp = tmp.match(/(.*?)\.(.*)/))) {
        _l.file = tmp[0];
        _l.filename = tmp[1];
        _l.fileext = tmp[2];
      }

      // Port.
      if (tmp = url.match(/(.*):([0-9]+)$/)) {
        _l.port = tmp[2];
        url = tmp[1];
      }

      // Auth.
      if (tmp = url.match(/(.*?)@(.*)/)) {
        _l.auth = tmp[1];
        url = tmp[2];
      }

      // User and pass.
      if (_l.auth) {
        tmp = _l.auth.match(/(.*):(.*)/);

        _l.user = tmp ? tmp[1] : _l.auth;
        _l.pass = tmp ? tmp[2] : undefined;
      }

      // Hostname.
      _l.hostname = url.toLowerCase();

      // Return hostname parts.
      if (arg.charAt(0) === '.') {
        return _i(arg, _l.hostname);
      }

      // Domain, tld and sub domain.
      if (_t()) {
        tmp = _l.hostname.match(_t());

        if (tmp) {
          _l.tld = tmp[3];
          _l.domain = tmp[2] ? tmp[2] + '.' + tmp[3] : undefined;
          _l.sub = tmp[1] || undefined;
        }
      }

      // Set port and protocol defaults if not set.
      _l.port = _l.port || (_l.protocol === 'https' ? '443' : '80');
      _l.protocol = _l.protocol || (_l.port === '443' ? 'https' : 'http');
      _l.protocol = _l.protocol + ':';
    }

    // Return arg.
    if (arg in _l) {
      return _l[arg];
    }

    // Return everything.
    if (arg === '{}') {
      return _l;
    }

    // Default to undefined for no match.
    return undefined;
  };
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(2);
__webpack_require__(15);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function runRequest(o) {
  return ajax(o).then(function (serverRes) {
    Object.assign(o.serverRes, serverRes);
    var e;
    if (o.serverRes.statusCode >= '200' && o.serverRes.statusCode < '300') {
      return o;
    } else {
      o.serverRes.message = o.serverRes.message || o.serverRes.msg || o.serverRes.status || 'Unknow Error';
      e = new Error(o.serverRes.message);
      e.statusCode = o.serverRes.statusCode;
      e.error_id = e.error_id || o.serverRes.error_id || o.serverRes.status;
      e.message = o.serverRes.message || o.serverRes.status || 'Unknow Error';
      throw e;
    }
  }).catch(function (e) {
    Object.assign(o.serverRes, e);
    return Promise.reject(e);
  });
};
var ajax = __webpack_require__(9);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global localStorage sessionStorage VS_COOKIEDM */
// 导出 session 模块
module.exports = session;
// 工具
var util = __webpack_require__(1);
// api模块
var api = __webpack_require__(2);
// url模块
var url = __webpack_require__(4);
// 签名模块
var sign = __webpack_require__(3);
// 请求模块
var request = __webpack_require__(6);
// 编码加密模块
var cryptoJsCore = __webpack_require__(0);
// 编码base64模块
var cryptoJsBase64 = __webpack_require__(10);
// var cryptoJsUtf8 =
__webpack_require__(19);
var getSessionTrueCbs = [];
var getSessionInitCbs = [];
var _getSessionTrueDataCbsIng = false;
var _getSessionInitCbsIng = false;
// 对外api接口模块
Object.assign(session, {
  // 设置是否使用长存储
  setLongStorage: function setLongStorage(isUseLong) {
    session.isLongStorage = Boolean(isUseLong);
  },
  // 设置是否使用长存储
  setSessionInitTrySum: function setSessionInitTrySum(sum) {
    session.initTrySum = sum || session.initTrySum;
  },
  // 设置初始化session的path
  setSessionInitPath: function setSessionInitPath(path) {
    session.sessionInitPath = path || session.sessionInitPath;
  }
});
// 对外 cookie 编码 接口模块
Object.assign(session, {
  // 解码
  unescape: function (_unescape) {
    function unescape(_x) {
      return _unescape.apply(this, arguments);
    }

    unescape.toString = function () {
      return _unescape.toString();
    };

    return unescape;
  }(function (str) {
    return unescape(str || '');
  }),
  // 编码
  escape: function (_escape) {
    function escape(_x2) {
      return _escape.apply(this, arguments);
    }

    escape.toString = function () {
      return _escape.toString();
    };

    return escape;
  }(function (str) {
    return escape(str || '');
  })
});
Object.assign(session, {
  // 会话初始化
  init: function init(o) {
    o = o || Object.create(null);
    return new Promise(function (resolve, reject) {
      var isRun = false;
      // 处理回调
      if (o.isServerNode) {
        o.req._getSessionInitCbs = o.req._getSessionInitCbs || [];
        // 服务端-处理同一请求多次初始化会话的问题，同一回调
        o.req._getSessionInitCbs.push([resolve, reject, o]);
        o.req._getSessionInitCbs.push([function () {
          if (this && this.req) {
            this.req._getSessionInitCbsIng = false;
          }
        }.bind(o), function () {
          if (this && this.req) {
            this.req._getSessionInitCbsIng = false;
          }
        }.bind(o), o]);
        if (o.req._getSessionInitCbsIng !== true) {
          isRun = true;
          o.req._getSessionInitCbsIng = true;
        }
      } else if (session.isClientWindow) {
        // 浏览器-处理同一请求多次初始化会话的问题，同一回调
        getSessionInitCbs.push([resolve, reject, o]);
        getSessionInitCbs.push([function () {
          _getSessionInitCbsIng = false;
        }, function () {
          _getSessionInitCbsIng = false;
        }, o]);
        if (_getSessionInitCbsIng !== true) {
          isRun = true;
          _getSessionInitCbsIng = true;
        }
      } else {
        reject(new Error('Neither a browser nor req and res'));
      }
      if (isRun) {
        session._initRun(o).then(function () {
          // 批量回调成功
          var cbt;
          if (o && o.req && o.req._getSessionInitCbs) {
            while (cbt = o.req._getSessionInitCbs.shift()) {
              if (cbt && cbt[0] && cbt[2] && util.isFunction(cbt[0])) {
                cbt[0](cbt[2]);
              }
              cbt = void 0;
            }
          } else if (session.isClientWindow && getSessionInitCbs) {
            while (cbt = getSessionInitCbs.shift()) {
              if (cbt && cbt[0] && cbt[2] && util.isFunction(cbt[0])) {
                cbt[0](cbt[2]);
              }
              cbt = void 0;
            }
          }
          o = void 0;
        }).catch(function (e) {
          // 批量回调异常
          var cbt;
          if (o && o.req && o.req._getSessionInitCbs) {
            while (cbt = o.req._getSessionInitCbs.shift()) {
              if (cbt && cbt[1] && util.isFunction(cbt[1])) {
                cbt[1](e);
              }
              cbt = void 0;
            }
          } else if (session.isClientWindow && getSessionInitCbs) {
            while (cbt = getSessionInitCbs.shift()) {
              if (cbt && cbt[1] && util.isFunction(cbt[1])) {
                cbt[1](e);
              }
              cbt = void 0;
            }
          }
          e = o = void 0;
        });
      }
      resolve = reject = isRun = void 0;
    });
  },
  _initRun: function _initRun(o) {
    // 初始化基本参数
    session._initRunBaseInit(o);
    //
    return new Promise(function (resolve, reject) {
      var initTrySum = session.initTrySum || o.initTrySum;
      if (o.initTryNum >= initTrySum) {
        reject(new Error('Session initialization failed, exceeding maximum attempted test'));
        return;
      } else if (o.initTryNum >= 2) {
        console.log('清理尝试');
      } else {
        resolve(o);
      }
      o = void 0;
    }).then(function (o) {
      return session.getData(o);
    }).then(function (o) {
      // 检测设备唯一识别号
      if (o.sessionData && o.sessionData.session_card) {
        return o;
      } else {
        return session.createCard(o);
      }
    }).then(function (o) {
      o.request_id = o.request_id || util.createRequestId();

      // 授权字符串
      var authorization = 'session-init-v1';
      authorization += '/' + o.request_id;
      authorization += '/' + (o.sessionData.session_id || '0');
      authorization += '/' + o.sessionData.session_card;
      authorization += '/' + sign.getUTCServerTime(o.sessionData.difference_time || 0) + '/' + '1800';
      var signingKey = sign.HmacSHA256(authorization, o.sessionData.session_key || 'session_key');
      // 生成加密key
      authorization += '/' + util.createGuid();
      authorization += '/' + sign.HmacSHA256(authorization, signingKey);

      o.headers = o.headers || Object.create(null);
      o.headers.Authorization = authorization;

      signingKey = authorization = void 0;
      return o;
    }).then(function (o) {
      // 请求方式
      o.method = o.method || 'GET';
      o.path = o.path || session.sessionInitPath || '/session/init';
      o.serverRes = Object.create(null);
      o.serverRes.statusCode = 0;
      o.serverRes.status = 'UNKNOW_ERROR';
      o.serverRes.body = '';
      // 返回一个请求
      return request(o);
    }).then(function (o) {
      return new Promise(function (resolve, reject) {
        var r = null;
        var e = null;
        var res = o.serverRes;
        try {
          r = JSON.parse(res.body);
        } catch (e1) {
          e = e1;
        }
        if (e) {
          e.statusCode = res.statusCode;
          e.error_id = res.status;
          e.message = res.status || 'Unknow Error';
          reject(e);
        } else if (r) {
          if (r.state) {
            r.statusCode = r.statusCode || r.code || res.statusCode;
            r.error_id = r.error_id || res.status;
            r.message = r.message || r.msg || res.status || 'Unknow Error';
            o._serverResObj = r;
            resolve(o);
          } else {
            e = new Error(r.message || r.msg || res.status || 'Unknow Error');
            e.statusCode = r.statusCode || r.code || res.statusCode;
            e.error_id = r.error_id || res.status;
            e.message = r.message || r.msg || res.status || 'Unknow Error';
            reject(e);
          }
        }
        o.destroy();
        o = resolve = reject = r = e = res = void 0;
      });
    }).then(function (o) {
      return new Promise(function (resolve, reject) {
        var res = o._serverResObj;

        if (res.type !== 'update') {
          // 如果不需要更新就跳过
          resolve(o);
          return;
        }
        var sessionData = res.session_data;
        // 服务器时间
        sessionData.server_time = sessionData.server_time || util.time();
        // 本地时间
        sessionData.local_time = util.time();
        // 服务器时间减去本地时间
        sessionData.difference_time = sessionData.server_time - sessionData.local_time;
        // 到期时间

        if (sessionData.expires_time !== undefined && sessionData.expires_time !== null) {
          sessionData.expires_time += sessionData.difference_time;
        } else {
          sessionData.expires_time = util.time() + 60 * 60 * 24 * 7;
        }
        // 获取会话数据
        session.setData(o, JSON.stringify(sessionData)).then(resolve).catch(reject);
      });
    });
  },
  createCard: function createCard(o) {
    return new Promise(function (resolve, reject) {
      o.sessionData = o.sessionData || Object.create(null);
      o.sessionData.session_card = 'ed9a-d251b2e6-48c3-9c08-e426-ed15398ac305-73624bb2';
      resolve(o);
      // reject('ed9a-d251b2e6-48c3-9c08-e426-ed15398ac305-73624bb2');
    });
  },
  _initRunBaseInit: function _initRunBaseInit(o) {
    // 默认0次参数
    o.initTryNum = o.initTryNum || 0;
    // 默认0次参数
    o.initTrySum = o.initTrySum || session.initTrySum || 3;
    // url
    o.baseUrl = o.baseUrl || api.baseUrl || '';
    o.req = o.req || null;
    o.res = o.res || null;
    // 是否在node服务器运行
    o.isServerNode = o.isServerNode !== void 0 ? o.isServerNode : Boolean(o.req && o.res);
    // 获取基本信息
    o.host = o.host || url('hostname', o.baseUrl);
    o.port = o.port || url('port', o.baseUrl);
    o.protocol = o.protocol || url('protocol', o.baseUrl);
  },
  // 获取正确的会话数据
  getTrueData: function getTrueData(o) {
    return new Promise(function (resolve, reject) {
      var isRun = false;
      // 处理回调
      if (o.isServerNode) {
        o.req._getSessionTrueDataCbs = o.req._getSessionTrueDataCbs || [];
        // 服务端-处理同一请求多次初始化会话的问题，同一回调
        o.req._getSessionTrueDataCbs.push([resolve, reject, o]);
        o.req._getSessionTrueDataCbs.push([function () {
          if (this && this.req) {
            this.req._getSessionTrueDataCbsIng = false;
          }
        }.bind(o), function () {
          if (this && this.req) {
            this.req._getSessionTrueDataCbsIng = false;
          }
        }.bind(o), o]);
        if (o.req._getSessionTrueDataCbsIng !== true) {
          isRun = true;
          o.req._getSessionTrueDataCbsIng = true;
        }
      } else if (session.isClientWindow) {
        // 浏览器-处理同一请求多次初始化会话的问题，同一回调
        getSessionTrueCbs.push([resolve, reject, o]);
        getSessionTrueCbs.push([function () {
          _getSessionTrueDataCbsIng = false;
        }, function () {
          _getSessionTrueDataCbsIng = false;
        }, o]);
        if (_getSessionTrueDataCbsIng !== true) {
          isRun = true;
          _getSessionTrueDataCbsIng = true;
        }
      } else {
        reject(new Error('Neither a browser nor req and res'));
      }
      if (isRun) {
        session._getTrueDataRun(o);
      }
      resolve = reject = o = isRun = void 0;
    });
  },
  // 获取正确的会话数据-开始运行
  _getTrueDataRun: function _getTrueDataRun(o) {
    var sessionO = {
      req: o.req || null,
      res: o.res || null,
      host: o.host,
      port: o.port,
      baseUrl: o.baseUrl,
      protocol: o.protocol,
      isServerNode: o.isServerNode,
      cookieName: o.cookieName,
      cookieNameEnCode: o.cookieNameEnCode,
      isSessionInit: o.isSessionInit,
      isSessionDataPass: o.isSessionDataPass,
      sessionData: o.sessionData,
      sessionDataStr: o.sessionDataStr,
      sessionDataOldStr: o.sessionDataOldStr
    };
    var keys = Object.keys(sessionO);
    session.getData(sessionO).then(function (o) {
      // 检测会话是否过期
      return new Promise(function (resolve, reject) {
        var isSessionDataPass = true;
        // o.isSessionInit 是否强制
        isSessionDataPass = isSessionDataPass && !o.isSessionInit;
        // 基本需要的数据检测
        isSessionDataPass = isSessionDataPass && o.sessionData && o.sessionData.session_id && o.sessionData.session_key && o.sessionData.session_card;
        // 检测事件
        isSessionDataPass = isSessionDataPass && o.sessionData.expires_time && util.time() < o.sessionData.expires_time - 5;
        // 为了保证没有问题，提前5秒钟过期
        if (isSessionDataPass) {
          // 下一步
          resolve(o);
          // 回收
          resolve = reject = o = void 0;
        } else {
          // 重新初始化
          o.isSessionInit = undefined;
          session.init({
            req: o.req || null,
            res: o.res || null,
            host: o.host,
            port: o.port,
            baseUrl: o.baseUrl,
            protocol: o.protocol,
            isServerNode: o.isServerNode
          }).then(function () {
            if (typeof resolve === 'function') {
              session.getData(o).then(resolve).catch(reject);
            }
            resolve = reject = o = void 0;
          }).catch(function (e) {
            if (typeof reject === 'function') {
              reject(e);
            }
            resolve = reject = o = void 0;
          });
        }
      });
    }).then(function () {
      // 批量回调成功
      var cbt;
      if (sessionO.req && sessionO.req._getSessionTrueDataCbs) {
        while (cbt = sessionO.req._getSessionTrueDataCbs.shift()) {
          if (cbt && cbt[0] && cbt[2] && util.isFunction(cbt[0])) {
            util.copyObjByKey(cbt[2], sessionO, keys);
            cbt[0](cbt[2]);
          }
          cbt = void 0;
        }
      } else if (session.isClientWindow && getSessionTrueCbs) {
        while (cbt = getSessionTrueCbs.shift()) {
          if (cbt && cbt[0] && cbt[2] && util.isFunction(cbt[0])) {
            util.copyObjByKey(cbt[2], sessionO, keys);
            cbt[0](cbt[2]);
          }
          cbt = void 0;
        }
      }
      sessionO = void 0;
    }).catch(function (e) {
      // 批量回调异常
      var cbt;
      if (sessionO.req && sessionO.req._getSessionTrueDataCbs) {
        while (cbt = sessionO.req._getSessionTrueDataCbs.shift()) {
          if (cbt && cbt[1] && util.isFunction(cbt[1])) {
            cbt[1](e);
          }
          cbt = void 0;
        }
      } else if (session.isClientWindow && getSessionTrueCbs) {
        while (cbt = getSessionTrueCbs.shift()) {
          if (cbt && cbt[1] && util.isFunction(cbt[1])) {
            cbt[1](e);
          }
          cbt = void 0;
        }
      }
      e = sessionO = void 0;
    });
    o = void 0;
  },
  setData: function setData(o, sessionData) {
    return new Promise(function (resolve, reject) {
      if (!o.cookieName) {
        // 根据host和port生成cookieName
        o.cookieName = o.host + (o.port ? ':' + o.port : '');
      }
      // 编码cookieName
      o.cookieNameEnCode = session._cookieNameEnCode(o.cookieName);
      if (o.isServerNode) {
        // 服务器模式
        session._setDataNode(o, sessionData, resolve, reject);
      } else if (session.isClientWindow) {
        // 客户端
        session._setDataClient(o, sessionData, resolve, reject);
      } else {
        // 不确定是什么浏览器
        reject(new Error('Neither a browser nor req and res'));
      }
      resolve = reject = o = void 0;
    });
  },
  getData: function getData(o) {
    return new Promise(function (resolve, reject) {
      if (!o.cookieName) {
        // 根据host和port生成cookieName
        o.cookieName = o.host + (o.port ? ':' + o.port : '');
      }
      // 编码cookieName
      o.cookieNameEnCode = session._cookieNameEnCode(o.cookieName);
      if (o.isServerNode) {
        // 服务器模式
        session._getDataNode(o, resolve, reject);
      } else if (session.isClientWindow) {
        // 客户端
        session._getDataClient(o, resolve, reject);
      } else {
        // 不确定是什么浏览器
        reject(new Error('Neither a browser nor req and res'));
      }
      resolve = reject = o = void 0;
    }).then(function (o) {
      // 反序列化会话数据
      return new Promise(function (resolve, reject) {
        if (o.sessionDataStr && typeof o.sessionDataStr === 'string') {
          try {
            o.sessionData = JSON.parse(o.sessionDataStr);
          } catch (e) {
            o.sessionData = o.sessionData || Object.create(null);
          }
        } else {
          o.sessionData = o.sessionData || Object.create(null);
        }
        // 清理
        delete o.sessionDataStr;
        // 序列化用于后期比对
        o.sessionDataOldStr = session.arrayToStr(o.sessionData);
        // 回调下一步
        resolve(o);
      });
    });
  },
  // node服务端获取
  _getDataNode: function _getDataNode(o, resolve, reject) {
    var cookiename;
    try {
      cookiename = o.cookieNameEnCode;
      o.sessionDataStr = o.res && o.res.cookieDdvRestfulApiStr || session._getCookiesServer(cookiename, o.req) || o.sessionDataStr;
      // 本地存储模块
      if (util.isFunction(resolve)) {
        resolve(o);
      }
    } catch (e) {
      if (util.isFunction(reject)) {
        reject(e);
      }
    }
    resolve = reject = o = void 0;
  },
  // 客户端获取
  _setDataNode: function _setDataNode(o, data, resolve, reject) {
    if (!(o && o.res)) {
      reject(new Error('Your browser does not support cookies and localStorage'));
      return;
    }
    if (!o.cookieNameEnCode) {
      reject(new Error('Deceased cookie surname'));
      return;
    }
    var cookiename = o.cookieNameEnCode;
    o.res.cookieDdvRestfulApiStr = data;
    try {
      // 本地存储模块
      if (session.isLongStorage) {
        session._setCookiesServer(o.req, o.res, cookiename, data);
      } else {
        session._setCookiesServer(o.req, o.res, cookiename, data, session.getExpiresDate('365', '12', '60'));
      }

      if (util.isFunction(resolve)) {
        resolve(o);
      }
    } catch (e) {
      if (util.isFunction(reject)) {
        reject(e);
      }
    }
    resolve = reject = data = o = void 0;
  },
  // 设置cookies
  _getCookiesServer: function _getCookiesServer(key, req) {
    if (req) {
      return req.cookies && req.cookies[key] || session._getCookiesByStr(key, req.headers && req.headers.cookie || '') || '';
    } else {
      return '';
    }
  },
  // 设置cookies
  _setCookiesServer: function _setCookiesServer(req, res, key, value, expires, path, domain, isSecure) {
    var t;
    if (!res) {
      return;
    }
    if (util.isFunction(res.cookie)) {
      t = { domain: domain || '', path: path || '/', secure: Boolean(isSecure) };
      if (t.domain) {
        delete t.domain;
      }
      if (t.secure) {
        delete t.secure;
      }
      if (expires) {
        t.expires = new Date(expires);
      }
      res.cookie(key, value, t);
    } else {
      t = '';
      t += key.toString().trim() + '=';
      t += session.escape(value);
      t += expires ? '; expires=' + expires : '';
      t += typeof path === 'string' && path !== '' ? '; path=' + path : '; path=/';
      t += typeof domain === 'string' && domain !== '' ? '; domain=' + domain : '';
      t += isSecure ? '; secure' : '';
      if (req.headers && req.headers.cookie) {
        req.headers.cookie = t;
      }
      // 强制一个数组
      res.cookiesSetArray = res.cookiesSetArray || [];
      // 加入输出数组
      res.cookiesSetArray.push(t);
      // 设置输出头
      res.setHeader('Set-Cookie', res.cookiesSetArray);
    }
    t = void 0;
  },
  // 客户端获取
  _getDataClient: function _getDataClient(o, resolve, reject) {
    var cookiename, data;
    if (!(session.isLocalCookie || session.isLocalStorage || session.isSessionStorage)) {
      reject(new Error('Your browser does not support cookies and localStorage'));
      return;
    }
    try {
      cookiename = o.cookieNameEnCode;
      data = session._getCookiesClient(cookiename) || null;
      // 本地存储模块
      if (!data) {
        try {
          if (session.isLongStorage) {
            // 长期存储模式
            data = localStorage.getItem(cookiename) || null;
            session._setCookiesClient(cookiename, data);
          } else {
            // 会话形式
            data = sessionStorage.getItem(cookiename) || null;
            session._setCookiesClient(cookiename, data, session.getExpiresDate('365', '12', '60'));
          }
        } catch (e) {
          data = null;
        }
      }
      o.sessionDataStr = data || o.sessionDataStr;
      if (typeof resolve === 'function') {
        resolve(o);
      }
    } catch (e) {
      if (typeof reject === 'function') {
        reject(e);
      }
    }
    resolve = reject = data = o = void 0;
  },
  // 客户端获取
  _setDataClient: function _setDataClient(o, data, resolve, reject) {
    var cookiename;
    if (!(session.isLocalCookie || session.isLocalStorage || session.isSessionStorage)) {
      reject(new Error('Your browser does not support cookies and localStorage'));
      return;
    }
    try {
      cookiename = o.cookieNameEnCode;
      // 本地存储模块
      if (session.isLongStorage) {
        // 长期存储模式
        if (session.isLocalStorage) {
          localStorage.setItem(cookiename, data);
        }
        session._setCookiesClient(cookiename, data);
      } else {
        // 会话形式
        if (session.isSessionStorage) {
          sessionStorage.setItem(cookiename, data);
        }
        session._setCookiesClient(cookiename, data, session.getExpiresDate('365', '12', '60'));
      }

      if (util.isFunction(resolve)) {
        resolve(o);
      }
    } catch (e) {
      if (util.isFunction(reject)) {
        reject(e);
      }
    }
    resolve = reject = data = o = void 0;
  },
  // 客户端读取
  _getCookiesClient: function _getCookiesClient(key) {
    if (session.isLocalCookie) {
      return session._getCookiesByStr(key, document.cookie);
    } else {
      return '';
    }
  },
  // 客户端存储
  _setCookiesClient: function _setCookiesClient(key, value, expires, path, domain, isSecure) {
    var t;
    key = (key || '').toString().trim();
    try {
      if (VS_COOKIEDM !== undefined && VS_COOKIEDM !== null && !domain) {
        domain = VS_COOKIEDM;
      }
    } catch (e) {}
    t = '';
    t += key.toString().trim() + '=';
    t += session.escape(value);
    t += expires ? '; expires=' + expires : '';
    t += typeof path === 'string' && path !== '' ? '; path=' + path : '; path=/';
    t += typeof domain === 'string' && domain !== '' ? '; domain=' + domain : '';
    t += isSecure ? '; secure' : '';
    document.cookie = t;
    t = void 0;
  },
  _cookieNameEnCode: function _cookieNameEnCode(name) {
    name = cryptoJsCore.enc.Utf8.parse((name || 'sid').toString() || '').toString(cryptoJsBase64);
    name = name.replace(/_/g, '____').replace(/\+/g, '___').replace(/\//g, '__').replace(/=/g, '_');
    return name;
  },
  // 数组序列化
  _getCookiesByStr: function _getCookiesByStr(key, str) {
    var value = '';
    ((str || '').split(';') || []).forEach(function (t, i) {
      var a = (t || '').split('=') || [];
      if ((a[0] || '').toString().trim() === key) {
        value = session.unescape((a[1] || '').toString().trim());
      }
      a = t = i = void 0;
    });
    return value;
  },
  // 数组序列化
  arrayToStr: function arrayToStr(obj) {
    var a = [];
    var name;
    for (name in obj) {
      if (!Object.hasOwnProperty.call(obj, name)) {
        continue;
      }
      a.push(name + '=' + obj[name]);
    }
    name = void 0;
    a.sort();
    obj = void 0;
    a = a.join(';');
    return a;
  },
  // 获取GMT格式的过期时间
  getExpiresDate: function getExpiresDate(days, hours, minutes, seconds) {
    var ExpiresDate = new Date();
    if (util.isNumber(days) && util.isNumber(hours) && util.isNumber(minutes)) {
      ExpiresDate.setDate(ExpiresDate.getDate() + parseInt(days));
      ExpiresDate.setHours(ExpiresDate.getHours() + parseInt(hours));
      ExpiresDate.setMinutes(ExpiresDate.getMinutes() + parseInt(minutes));
      if (util.isNumber(seconds)) {
        ExpiresDate.setSeconds(ExpiresDate.getSeconds() + parseInt(seconds));
      }
    }
    return ExpiresDate.toGMTString();
  }
});

// 局部变量-是否为客户端窗口
session.isClientWindow = typeof window !== 'undefined' && window.window === window && typeof window.document !== 'undefined';
// 局部变量-本地cookie是否为客户端窗口支持
session.isLocalCookie = false;
// 局部变量-本地存储是否为客户端窗口支持
session.isLocalStorage = false;
// 局部变量-本地会话存储是否为客户端窗口支持
session.isSessionStorage = false;
session.isLongStorage = false;
session.sessionInitPath = '/session/init';
if (session.isClientWindow) {
  try {
    session.isLocalCookie = 'cookie' in window.document;
  } catch (e) {}
  try {
    session.isLocalStorage = 'localStorage' in window;
  } catch (e) {}
  try {
    session.isSessionStorage = 'sessionStorage' in window;
  } catch (e) {}
}

function session() {}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(26);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var http = __webpack_require__(27);
var https = __webpack_require__(28);
var session = __webpack_require__(7);
var isWindow = typeof window !== 'undefined' && window.window === window;
// 发送请求
module.exports = function ajax(o) {
  return isWindow ? ajaxbyWindow(o) : ajaxbyNode(o);
};
function ajaxbyWindow(o) {
  return new Promise(function (resolve, reject) {
    var url = parseUrl({
      protocol: o.protocol || 'http:',
      host: o.host,
      port: o.port || '80',
      path: o.path || '/',
      query: o.query || ''
    });
    var xhr;

    // 创建 - 非IE6 - 第一步
    if (typeof window !== 'undefined' && window.XMLHttpRequest) {
      xhr = new window.XMLHttpRequest();
    } else {
      // IE6及其以下版本浏览器
      xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
    }

    // 接收 - 第三步
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var status = xhr.status;
        var statusText = xhr.statusText;
        if (status >= 200 && status < 300) {
          var serverRes = {};
          serverRes.headers = {};
          serverRes.rawHeaders = [];
          serverRes.body = xhr.response;
          serverRes.statusCode = xhr.status;
          serverRes.statusMessage = xhr.statusText;
          serverRes.status = xhr.statusText;

          var headers = xhr.getAllResponseHeaders().split(/\r?\n/);
          headers.forEach(function (header) {
            var matches = header.match(/^([^:]+):\s*(.*)/);
            if (matches) {
              var key = matches[1].toLowerCase();
              if (key === 'set-cookie') {
                if (serverRes.headers[key] === undefined) {
                  serverRes.headers[key] = [];
                }
                serverRes.headers[key].push(matches[2]);
              } else if (serverRes.headers[key] !== undefined) {
                serverRes.headers[key] += ', ' + matches[2];
              } else {
                serverRes.headers[key] = matches[2];
              }
              serverRes.rawHeaders.push(matches[1], matches[2]);
            }
          });
          resolve(serverRes);
        } else {
          var e = new Error(statusText);
          e.statusCode = xhr.status;
          e.statusMessage = xhr.statusText;
          e.status = xhr.statusText;
          reject(e);
        }
      }
    };
    // 连接 和 发送 - 第二步
    xhr.open((o.method || 'GET').toUpperCase(), url, true);
    // 设置表单提交时的内容类型
    var key, value, headers;
    headers = o.headers;
    for (key in headers) {
      if (key.toLowerCase() === 'host' || key.toLowerCase() === 'content-length') {
        continue;
      }
      value = headers[key];
      if (Array.isArray(value)) {
        value.forEach(function (vt) {
          xhr.setRequestHeader(key, vt);
        });
      } else {
        xhr.setRequestHeader(key, headers[key]);
      }
      value = Array.isArray(value) ? value.join(' ') : value;
    }
    xhr.send(o.body || null);
  });
}
function ajaxbyNode(o) {
  return new Promise(function (resolve, reject) {
    var opt, req;
    if (!(o.isServerNode || session.isClientWindow)) {
      // 不是浏览器和node服务器
      reject(new Error('Neither a browser nor req and res'));
      return;
    }
    opt = {
      method: o.method || 'GET',
      protocol: o.protocol || 'http:',
      host: o.host,
      port: o.port || '80',
      path: o.path || '/',
      headers: o.headers
    };
    if (o.query) {
      opt.path += '?' + o.query;
    }
    // 发送请求
    req = (opt.protocol === 'http:' ? http : https).request(opt, function (response) {
      var serverRes = {};
      serverRes.body = '';
      response.on('data', function (data) {
        serverRes.body += data;
      }).on('end', function () {
        serverRes.statusCode = response.statusCode || 200;
        serverRes.status = response.statusMessage.toString() || 'UNKNOW_ERROR';
        serverRes.rawHeaders = response.rawHeaders || [];
        serverRes.headers = response.headers || Object.create(null);
        resolve(serverRes);
      });
    });
    if (o.body) {
      req.write(o.body);
    }
    req.on('error', function (e) {
      reject(e);
    });
    req.end();
    opt = req = void 0;
  });
}
function parseUrl(obj) {
  var r = '';
  r += obj.protocol || 'http:';
  r += '//' + (obj.host || '');
  r += obj.port ? obj.protocol === 'http:' && obj.port === '80' || obj.protocol === 'https:' && obj.port === '443' ? '' : ':' + obj.port : '';
  obj.pathquery = obj.pathquery || (obj.path || '/') + (obj.query ? '?' + obj.query : '');
  r += obj.pathquery;
  return r;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());


	return CryptoJS.enc.Base64;

}));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var api = __webpack_require__(2);
api.url = __webpack_require__(4);
api.ajax = __webpack_require__(9);
api.sign = __webpack_require__(3);
api.session = __webpack_require__(7);
api.request = __webpack_require__(6);
api.nextTick = __webpack_require__(1).nextTick;
api.Promise = Promise;
// 设置headersPrefix
api.setHeadersPrefix = api.sign.setHeadersPrefix;
// 设置是否使用长存储
api.setLongStorage = api.session.setLongStorage;
// 设置是否使用长存储
api.setSessionInitTrySum = api.session.setSessionInitTrySum;
// 设置初始化session的path
api.setSessionInitPath = api.session.setSessionInitPath;

if (typeof window !== 'undefined' && window.window === window) {
  window.ddvRestFulApi = api;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var api = __webpack_require__(2);
var util = __webpack_require__(1);

api.data = function tryGetData(context, promiseFnRun, _dataOld) {
  if (util.isFunction(context) || context instanceof Promise) {
    promiseFnRun = context;
    context = void 0;
  }
  var promiseFnReload = void 0;
  var self = this;
  var data = Object && Object.create ? Object.create(null) : {};
  return new Promise(function tryGetDataRun(resolve, reject) {
    var _promise;
    if (util.isFunction(promiseFnRun)) {
      _promise = promiseFnRun.call(self, data, function (inputData) {
        if (data && inputData && (typeof inputData === 'undefined' ? 'undefined' : _typeof(inputData)) === 'object') {
          Object.assign(data, inputData);
        }
      }, context);
      promiseFnReload = promiseFnRun;
    } else if (promiseFnRun instanceof Promise) {
      _promise = promiseFnRun;
    }
    self = promiseFnRun = void 0;
    // 必须是Promise实例化的对象
    if (_promise instanceof Promise) {
      _promise.then(function resData(res) {
        // 如果没有return数据就返回一个data
        res = res === void 0 ? data : res;
        data = void 0;
        return res;
      }).catch(function (e) {
        // 如果请求出现了异常
        return api.dataErrorEmit({ context: context, error: e }).then(function (res) {
          if (res && res.isReload === true) {
            if (promiseFnReload) {
              // 重新发送整个请求
              return api.data(context, promiseFnReload, _dataOld);
            } else {
              var e = new Error('Please resubmit or try again');
              e.error_id = 'UNKNOW_ERROR';
              throw e;
            }
          } else if (res && res.res !== void 0) {
            // 返回指定结果
            return res.res;
          }
        });
      }).then(resolve).catch(reject);
    } else {
      var e = new Error('Your argument must be a Promise, or a method, and this method returns Promise after the call');
      e.error_id = 'UNKNOW_ERROR';
      reject(e);
    }
    _promise = void 0;
  });
};
api._onDataServerErrorFn = null;
api.onDataServerError = function onDataServerError(fn) {
  api._onDataServerErrorFn = fn;
};
api._onDataClientErrorFn = null;
api.onDataClientError = function onDataClientError(fn) {
  api._onDataClientErrorFn = fn;
};
api.dataErrorEmit = function dataErrorEmit(input) {
  var context, error;
  context = input && input.context || context;
  error = input && input.error || error;
  var _promise = new Promise(function checkOnDataErrorArr(resolve, reject) {
    reject(error);
    resolve = reject = void 0;
  });
  if (context && context.isServer) {
    // 有上下文 并且是服务器端
    if (util.isFunction(api._onDataServerErrorFn)) {
      _promise = _promise.catch(function onCatch(e) {
        e = api._onDataServerErrorFn(e, context);
        context = void 0;
        return e;
      });
    }
  } else {
    // 否则统一客户端方法处理
    if (util.isFunction(api._onDataClientErrorFn)) {
      _promise = _promise.catch(function onCatch(e) {
        e = api._onDataClientErrorFn(e, context);
        context = void 0;
        return e;
      });
    }
  }
  return _promise;
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 导出模块

module.exports = nextTick;
// 工具
var util = __webpack_require__(1);
// 下一进程队列
var nextTickQueue = [];
// 系统下一进程运行
var nextTickSys = function () {
  var fnc;
  if (typeof process !== 'undefined' && util.isFunction(process.nextTick)) {
    fnc = process.nextTick;
  } else {
    'r webkitR mozR msR oR'.split(' ').forEach(function (prefixes) {
      if (util.isFunction(fnc)) {
        return false;
      }
      fnc = window[prefixes + 'equestAnimationFrame'];
    });
    fnc = fnc && fnc.bind && fnc.bind(window) || window.setImmediate;
    if (!util.isFunction(fnc)) {
      if (typeof window === 'undefined' || window.ActiveXObject || !window.postMessage) {
        fnc = function fnc(f) {
          setTimeout(f, 0);
        };
      } else {
        window.addEventListener('message', function () {
          var i = 0;
          while (i < nextTickQueue.length) {
            try {
              nextTickQueue[i++]();
            } catch (e) {
              nextTickQueue.splice(0, i);
              window.postMessage('nextTick!', '*');
              throw e;
            }
          }
          nextTickQueue.length = 0;
        }, true);
        fnc = function fnc(fn) {
          if (!nextTickQueue.length) {
            window.postMessage('nextTick!', '*');
          }
          nextTickQueue.push(fn);
        };
      }
    }
  }
  return fnc;
}();
// 下一进程访问
function nextTick(fn) {
  var self = this;
  nextTickSys(function () {
    if (util.isFunction(fn)) {
      fn.call(self);
    }
    self = fn = void 0;
  });
  setTimeout(function () {
    if (util.isFunction(fn)) {
      fn.call(self);
    }
    self = fn = void 0;
  }, 0);
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global WebSocket */

module.exports = typeof WebSocket === 'undefined' ? null : WebSocket;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var requestWs;
var api = __webpack_require__(5);
// 安装模块
api.utilInitKey.push.apply(api.utilInitKey, 'pushOpen pushClose'.split(' '));

if (api.session.isClientWindow) {
  requestWs = __webpack_require__(16);
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
      return requestWs({
        headers: {
          bodytype: 'string'
        },
        start: 'OPEN /v1_0/init PUSH/1.0'
      }).then(function (res) {
        return requestWs.getSingleton().then(function (wsobj) {
          wsobj.on('wspush', function (res) {
            if (!self.emit(['push', (res.method || '').toLowerCase(), res.path || '/'], res.headers, res.body, res)) {
              if (console && console.debug) {
                console.debug('webSocket::push\n');
                console.debug(res);
              }
            }
          });
          wsobj.on('wsmessage', function (res) {
            var emitState;
            if (res.type === 'request') {
              emitState = !wsobj.emit(['request', (res.protocol || '').toLowerCase()], res);
            } else {
              emitState = !wsobj.emit(['message', 'unknown error'], res.data || res);
            }
            if (emitState) {
              if (console && console.debug) {
                console.debug('webSocket::message\n');
                console.debug(res);
              }
            }
          });
        }).then(function () {
          return res;
        });
      }).then(function (res) {
        self.emit(['pushsys', 'open'], res);
        return true;
      });
    } else {
      return Promise.reject(new Error('Does not support the client or browser'));
    }
  },
  pushCloseRun: function pushCloseRun() {
    if (api.session.isClientWindow) {
      return requestWs({
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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 导出模块

module.exports = DdvRequestWs;

function DdvRequestWs(options) {
  if (this instanceof DdvRequestWs) {
    return this.constructor(options);
  } else {
    return DdvRequestWs.request.apply(this, arguments);
  }
}

// 合并继承
Object.assign(DdvRequestWs.prototype, __webpack_require__(17));

// 公开方法
Object.assign(DdvRequestWs, {
  // 请求
  request: function request() {
    var _arguments = arguments;

    return DdvRequestWs.getSingleton().then(function (ws) {
      return ws.request.apply(ws, _arguments);
    });
  },
  // 返回一个单例
  getSingleton: function getSingleton() {
    if (!this.singleton) {
      this.singleton = new DdvRequestWs();
      this.singleton.time = new Date();
    }
    return Promise.resolve(this.singleton);
  }
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(8);
var prototype = module.exports = Object.create(null);
var api = __webpack_require__(5);
var util = __webpack_require__(1);
var url = __webpack_require__(4);
var sign = __webpack_require__(3);
var rowraw = __webpack_require__(24);
var WebSocket = __webpack_require__(14);
Object.assign(prototype, EventEmitter.prototype);
Object.assign(prototype, {
  constructor: function constructor(options) {
    Object.assign(this, new EventEmitter());
    this.status = 'starting';
    this.connPromise = [];
    this.processWs = Object.create(null);
    this.ws = this.ws || api.webSocketUrl || options && options.ws || this.ws;
    if (!this.ws && typeof window !== 'undefined') {
      this.ws = window.location && window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      this.ws += '//' + window.location.host + '/v1_0/conn';
    }
    this.wsPushInit();
  },
  // 请求
  request: function request(options) {
    var self = this;
    options.headers = options.headers || Object.create(null);
    options.request_id = options.headers.request_id || options.request_id || util.createRequestId();
    options.headers.request_id = options.request_id;
    options.body = options.body || '';
    options.start = options.start || '';
    options.addtime = util.time();
    return rowraw.stringifyPromise(options.headers, options.body, options.start)
    // 编码后
    .then(function (raw) {
      options.raw = raw;
      raw = undefined;
    })
    // 连接
    .then(function () {
      return self.conn();
    }).then(function () {
      return new Promise(function (resolve, reject) {
        var requestId = options.request_id;
        self.processWs[options.request_id] = [resolve, reject];
        self.webSocket.send(options.raw, function sendCb(e) {
          if (e && self && self.processWs && self.processWs[requestId] && util.isArray(self.processWs[requestId]) && self.processWs[requestId].length > 1 && util.isFunction(self.processWs[requestId][1])) {
            self.processWs[requestId][1](e);
          }
          requestId = void 0;
        });
        options = resolve = reject = void 0;
      });
    });
  },
  conn: function conn() {
    if (!util.isArray(this.connPromise)) {
      this.connPromise = [];
    }
    var self = this;
    if (this.isWsConned) {
      return Promise.resolve();
    } else if (this.isWsConning === true) {
      return new Promise(function (resolve, reject) {
        self.connPromise.push([resolve, reject]);
      });
    } else {
      this.isWsConning = true;
      return Promise.all([new Promise(function (resolve, reject) {
        self.connPromise.push([resolve, reject]);
      }), this.connRun()]);
    }
  },
  connCb: function connCb(e, res) {
    var t;
    if (!Array.isArray(this.connPromise)) {
      return Promise.resolve();
    }
    while ((t = this.connPromise.splice(0, 1)[0]) && t && t.length > 1) {
      if (e) {
        t && util.isFunction(t[1]) && t[1](e);
      } else {
        t && util.isFunction(t[0]) && t[0](res);
      }
    }
  },
  connRun: function connRun() {
    var self = this;
    return new Promise(function (resolve, reject) {
      try {
        self.webSocket = new WebSocket(self.ws);

        // 连接成功
        self.webSocket.onopen = function (e) {
          if (self) {
            self.isWsConned = true;
            self.isWsConning = false;
            self.connCb();
          }
        };
        self.webSocket.onmessage = function (res) {
          if (self) {
            rowraw.parsePromise(res.data || res)
            // 解析成功
            .then(function (res) {
              var emitState;
              if (!self) return;
              if (res.type === 'response') {
                self.response(res);
              } else if (res.type === 'request') {
                emitState = !self.emit(['request', (res.protocol || '').toLowerCase()], res);
              } else {
                emitState = !self.emit(['message', 'unknown error'], res.data || res);
              }
              if (emitState) {
                if (!self.emit('wsmessage', res)) {
                  if (console && console.debug) {
                    console.debug('webSocket::message\n');
                    console.debug(res);
                  }
                }
              }
            })
            // 解析错误
            .catch(function (e) {
              console.error('webSocket.onmessage.catch', e, res);
            });
          }
        };
        // 关闭事件
        self.webSocket.onclose = function (e) {
          if (self) {
            self.isWsConned = false;
            self.isWsConning = false;
          }
          self = void 0;
        };
        // 错误事件
        self.webSocket.onerror = function (e) {
          if (self) {
            self.isWsConned = false;
            self._isTryNum = self._isTryNum || 0;
            self._isTrySum = self._isTrySum || 3;
            if (self._isTryNum++ < self._isTrySum) {
              util.nextTick(function () {
                this && this.connRun();
              }.bind(self));
            } else {
              self.isWsConning = false;
              if (!(e instanceof Error)) {
                var olde = e;
                e = new Error('Connection closed before receiving a handshake response');
                e.olde = olde;
              }
              self.connCb(e);
            }
            self = void 0;
          }
        };
        resolve();
      } catch (e) {
        if (self) {
          self.isWsConned = false;
          self._isTryNum = self._isTryNum || 0;
          self._isTrySum = self._isTrySum || 3;
          if (self._isTryNum++ < self._isTrySum) {
            util.nextTick(function () {
              this && this.connRun().then(resolve, reject);
            }.bind(self));
          } else {
            self.connCb(e);
          }
          self = void 0;
        }
        resolve();
      }
    });
  },
  response: function response(res) {
    var requestId, cbs, code, e;
    if (!(res && res.headers && (requestId = res.headers.requestId || res.headers.request_id))) {
      return;
    }
    if (this.processWs && (cbs = this.processWs[requestId]) && util.isArray(cbs) && cbs.length > 1) {
      delete this.processWs[requestId];
      code = parseInt(res.status || 0) || 0;
      if (code >= 200 && code < 300) {
        if (util.isFunction(cbs[0])) {
          cbs[0]({
            headers: res.headers || Object.create(null),
            body: res.body || '',
            res: res
          });
        }
      } else {
        if (util.isFunction(cbs[1])) {
          e = new Error(res.statusText || 'unknown error');
          Object.assign(e, res);
          cbs[1](e);
        }
      }
    }
    cbs = requestId = code = void 0;
  },
  wsPushInit: function wsPushInit() {
    this.on(['request', 'push'], function (res) {
      if (!this.emit(['push', (res.method || '').toLowerCase(), res.path || '/'], res.headers, res.body, res)) {
        if (!this.emit('wspush', res)) {
          if (console && console.debug) {
            console.debug('webSocket::push\n');
            console.debug(res);
          }
        }
      }
    });
    this.on(['push', 'ping', '/v1_0/sign'], function (headers, body) {
      if (!headers.request_id) {
        console.error('推送系统故障！');
        console.error(headers);
      }
      var o;
      o = Object.create(null);
      o.baseUrl = o.baseUrl || api.baseUrl;
      o.headers = JSON.parse(headers.headers);
      o.method = headers.method || 'PUT';
      o.path = headers.path || '/';
      o.body = '';
      o.path = (o.path.charAt(0) === '/' ? '' : '/') + o.path;
      o.query = url('query', o.path) || '';
      o.path = url('path', o.path) || '/';
      o.host = url('hostname', o.baseUrl);
      o.protocol = url('protocol', o.baseUrl);
      o.port = url('port', o.baseUrl);
      o.request_id = headers.request_id;
      sign(o).then(function (options) {
        var headersR = Object.create(null);
        headersR = Object.assign(headersR, o.headers, options.headers);
        headersR.request_id = headers.request_id;
        return rowraw.stringifyPromise(headersR, '', 'PUSH/1.0 200 OK');
      }).catch(function (e) {
        var headersR = Object.create(null);
        headersR = Object.assign(headersR, o.headers);
        headersR.request_id = headers.request_id;
        return rowraw.stringifyPromise(headersR, '', 'PUSH/1.0 ' + (e.code || 400) + ' ' + (e && e.message || 'OK'));
      })
      // 编码后
      .then(function (raw) {
        this.webSocket.send(raw, function sendCb(e) {});
        raw = void 0;
      }.bind(this));
    });
  },
  closeWs: function closeWs() {}
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	return CryptoJS.enc.Hex;

}));

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	return CryptoJS.enc.Utf8;

}));

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(23), __webpack_require__(21));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core", "./sha256", "./hmac"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	return CryptoJS.HmacSHA256;

}));

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


}));

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working varialbes
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	return CryptoJS.MD5;

}));

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else if (typeof define === "function" && define.amd) {
		// AMD
		define(["./core"], factory);
	}
	else {
		// Global (browser)
		factory(root.CryptoJS);
	}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(25)


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* global FileReader Blob */
const rowraw = module.exports = function () {}
// 方法的字符串
const functionStr = typeof function () {}
Object.assign(rowraw, {
  // 判断是否为一个方法
  isFunction (fn) {
    return Boolean(typeof fn === functionStr)
  }
})

rowraw.r = '\r'
rowraw.n = '\n'
rowraw.rn = rowraw.r + rowraw.n
rowraw.rn2len = rowraw.rn.length * 2

rowraw.stringifyPromise = function stringifyRaw (headers, body, start, callback) {
  var _promise = new Promise(function (resolve, reject) {
    try {
      resolve(rowraw.stringify(headers, body, start))
    } catch (e) {
      reject(e)
    }
  })
  if (rowraw.isFunction(callback)) {
    _promise.then(function (res) {
      callback(res)
    }, function (e) {
      callback(e)
    })
  }
  return _promise
}
rowraw.parsePromise = function parseRaw (raw, callback) {
  var _promise = new Promise(function (resolve, reject) {
    rowraw.parse(raw, function (e, res) {
      e ? reject(e) : resolve(res)
    })
  })
  if (rowraw.isFunction(callback)) {
    _promise.then(function (res) {
      callback(res)
    }, function (e) {
      callback(e)
    })
  }
  return _promise
}
rowraw.stringify = function stringifyRaw (headers, body, start, callback) {
  if (callback === undefined && rowraw.isFunction(start)) {
    callback = start
    start = undefined
  }
  var key
  var headersStr = ''
  var isRnEnd = true
  // 拼接header字符串,转buffer
  for (key in headers) {
    isRnEnd = false
    headersStr += key + ': ' + (headers[key]) + rowraw.rn
  }
  headersStr += rowraw.rn
  if (isRnEnd) {
    // 内容中是否只有一个换行符
    headersStr += rowraw.rn
  }
  headers = headersStr
  if (typeof start === 'string') {
    headers = start + (headers.length === rowraw.rn2len ? '' : rowraw.rn) + headers
  }
  headersStr = key = isRnEnd = start = undefined
  if (typeof body === 'string') {
    return rowraw.stringifyByString(headers, body, callback)
  } else if ((typeof Buffer) !== void 0 && Buffer.isBuffer && Buffer.isBuffer(body)) {
    return rowraw.stringifyByBuffer(headers, body, callback)
  } else if ((typeof Blob) !== void 0 && (body instanceof Blob)) {
    return rowraw.stringifyByBlob(headers, body, callback)
  } else {
    throw Error('Unable to parse the recognition input type')
  }
}
rowraw.parse = function parseRaw (raw, callback) {
  var e
  if (typeof raw === 'string') {
    return rowraw.parseByString(raw, callback)
  } else if ((typeof Buffer) !== void 0 && Buffer.isBuffer && Buffer.isBuffer(raw)) {
    return rowraw.parseByBuffer(raw, callback)
  } else if ((typeof Blob) !== void 0 && (raw instanceof Blob)) {
    if (typeof callback !== 'function') {
      throw Error('The second argument must have a callback')
    }
    return rowraw.parseByBlob(raw, callback)
  } else {
    e = Error('Unable to parse the recognition input type')
    if (typeof callback !== 'function') {
      throw e
    } else {
      callback(e)
    }
  }
}
rowraw.stringifyByString = function stringifyByString (headersStr, body, callback) {
  var raw = headersStr + (body || '')
  headersStr = body = undefined
  return rowraw.stringifyCb(raw, callback)
}
rowraw.stringifyByBuffer = function stringifyByBuffer (headersStr, body, callback) {
  var raw = new Buffer(headersStr, 'utf-8')// 将头信息字符串转buffer
  raw = Buffer.concat([raw, body])
  headersStr = body = undefined
  return rowraw.stringifyCb(raw, callback)
}
rowraw.stringifyByBlob = function stringifyByBuffer (headersStr, body, callback) {
  var raw = new Blob([headersStr, body])// 将头信息字符串转buffer
  headersStr = body = undefined
  return rowraw.stringifyCb(raw, callback)
}
rowraw.stringifyCb = function (raw, callback) {
  if (typeof callback === 'function') {
    callback(raw)
    callback = raw = undefined
  } else {
    callback = undefined
    return raw
  }
}
/**
 * [parseChunk description]
 * -1 继续
 * 0  终止
 * 1  解析
 */
rowraw.parseChunk = function parseChunk (chunk, p, _r, _n) {
  var r
  p = p || {}
  p.chunk_prev_1 = p.chunk_prev_1 || null
  p.chunk_prev_2 = p.chunk_prev_2 || null
  r = -1
  // 如果是换行符
  if (chunk === _r) {
    // 忽略
  } else if (chunk === _n) {
    // 双回车终止
    if (p.chunk_prev_2 === _n) {
      r = 0
    } else {
      r = 1
    }
  }
  p.chunk_prev_2 = p.chunk_prev_1
  p.chunk_prev_1 = chunk
  chunk = undefined
  return r
}
rowraw.parseByString = function (raw, callback) {
  var chunk, i, r, pr
  var len = raw.length
  var p = {}
  var start = 0
  var rawHeaders = []
  for (i = 0; i < len; i++) {
    // 提取一个字符串
    chunk = raw.charAt(i)
    pr = rowraw.parseChunk(chunk, p, '\r', '\n')
    if (pr === 1) {
      rowraw.parseLine(raw.substr(start, (i - 1 - start)), rawHeaders)
      start = i + 1
    } else if (pr === 0) {
      raw = (len - 1 > i) ? raw.substr(i + 1) : ''
      break
    }
  }
  r = rowraw.parseHeaderCb('string', rawHeaders, raw, callback)
  i = len = raw = p = start = rawHeaders = pr = undefined
  return r
}
rowraw.parseByBuffer = function (raw, callback) {
  var chunk, i, r, pr
  var len = raw.length
  var p = {}
  var start = 0
  var rawHeaders = []
  for (i = 0; i < len; i++) {
    // 提取一个字符串
    chunk = raw[i]
    pr = rowraw.parseChunk(chunk, p, 0x0d, 0x0a)
    if (pr === 1) {
      rowraw.parseLine(raw.slice(start, i - 1).toString(), rawHeaders)
      start = i + 1
    } else if (pr === 0) {
      raw = (len - 1 > i) ? raw.slice(i + 1) : (new Buffer(0))
      break
    }
  }
  r = rowraw.parseHeaderCb('buffer', rawHeaders, raw, callback)
  i = len = raw = p = start = rawHeaders = pr = undefined
  return r
}
rowraw.parseByBlob = function (raw, callback) {
  var size = raw.size
  var p = {}
  var start = 0
  var end = 10
  var rawHeaders = []
  var pr, fileReader, fileReaderRun
  var isReadRow = false
  var isReadRowEnd = false
  var rowStart = 0
  fileReader = new FileReader()
  // 文件读取后的处理
  fileReader.onload = function (e) {
    var chunk, chunkI, chunkResI, chunkLen
    chunk = e.target.result
    if (isReadRow) {
      rowraw.parseLine(chunk.toString(), rawHeaders)
      end = start = rowStart = end + 2
      isReadRow = false
      if (isReadRowEnd) {
        rowraw.parseHeaderCb('blob', rawHeaders, raw.slice((start + '\r\n'.length)), callback)
        fileReader = fileReaderRun = undefined
        size = p = start = end = rawHeaders = isReadRow = isReadRowEnd = rowStart = undefined
        return
      }
    } else {
      for (chunkI = 0, chunkLen = chunk.length; chunkI < chunkLen; chunkI++) {
        // 提取一个字符串
        chunkResI = chunk.charAt(chunkI)
        pr = rowraw.parseChunk(chunkResI, p, '\r', '\n')
        if (pr === 1) {
          // 解析一条
          isReadRow = true
          end = end - (chunkLen - chunkI) - 1
          start = rowStart
          break
        } else if (pr === 0) {
          // 终止
          isReadRowEnd = true
          isReadRow = true
          end = end - (chunkLen - chunkI) - 1
          start = rowStart
          break
        }
      }
    }
    chunk = chunkI = chunkResI = chunkLen = undefined
    if (start <= size) {
      if (isReadRow !== true) {
        start = end
        end = start + 12
      }
      fileReaderRun()
    }
  }
  fileReader.onerror = function (e) {
    callback(e)
  }
  fileReaderRun = function fileReaderRun () {
    start = start || 0
    end = Math.min(end, size)
    if (start > size) {
      return true
    }
    // 开始读流
    try {
      fileReader.readAsText(raw.slice(start, end))
    } catch (e) {
      throw Error('Failed to read blob')
    }
  }
  fileReaderRun()
}
rowraw.parseHeaderCb = function (bodytype, rawHeaders, raw, callback) {
  var r, i, len
  r = {
    rawHeaders: rawHeaders,
    headers: {},
    body: raw,
    bodytype: bodytype,
    type: 'unknow'
  }
  if (Array.isArray(rawHeaders) && typeof rawHeaders[0] === 'object') {
    Object.assign(r, rawHeaders.shift())
  }
  len = rawHeaders.length || 0
  for (i = 0; i < len; i++) {
    r.headers[(rawHeaders[i]).toLowerCase().trim().replace(/-/g, '_')] = ((rawHeaders[++i]).toString() || '').trim()
  }
  i = len = undefined
  if (typeof callback === 'function') {
    callback(null, r)
    callback = r = undefined
  } else {
    callback = undefined
    return r
  }
}
rowraw.exp = Object.create(null)
rowraw.exp.start = /^[A-Z_]+(\/\d\.\d)? /
rowraw.exp.request = /^([A-Z_]+) (.+) ([A-Z]+)\/(\d)\.(\d)$/
rowraw.exp.status = /^([A-Z]+)\/(\d)\.(\d) (\d{3}) (.*)$/
rowraw.exp.header = /^([^: \t]+):[ \t]*((?:.*[^ \t])|)/
rowraw.exp.headerContinue = /^[ \t]+(.*[^ \t])/
rowraw.parseLine = function (line, headers) {
  var match, isStartLine, t, matchContinue
  if (headers.length < 1) {
    if (rowraw.exp.start.test(line)) {
      if ((match = rowraw.exp.status.exec(line)) && match[1]) {
        t = {}
        t.type = 'response'
        t.version = [(match[2] || 0), (match[3] || 0)]
        t.protocol = (match[1] || 'unknow')
        t.status = (match[4] || 0)
        t.statusText = (match[5] || 'unknow')
        t.start_source = match[0] || ''
        headers.push(t)
      } else if ((match = rowraw.exp.request.exec(line)) && match[1]) {
        t = {}
        t.type = 'request'
        t.version = [(match[4] || 0), (match[5] || 0)]
        t.protocol = (match[3] || 'unknow')
        t.method = (match[1] || 0)
        t.path = (match[2] || 'unknow')
        t.start_source = match[0] || ''
        headers.push(t)
      }
      isStartLine = true; t = undefined
    }
  }
  if (!isStartLine) {
    if ((match = rowraw.exp.header.exec(line)) && match[1]) { // skip empty string (malformed header)
      headers.push(match[1])
      headers.push(match[2])
    } else {
      matchContinue = rowraw.exp.headerContinue.exec(line)
      if (matchContinue && headers.length) {
        if (headers[headers.length - 1]) {
          headers[headers.length - 1] += ' '
        }
        headers[headers.length - 1] += matchContinue[1]
      }
      matchContinue = undefined
    }
  }
}


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(5);

/***/ })
/******/ ]);
//# sourceMappingURL=api.js.map