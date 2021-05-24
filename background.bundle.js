/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			children: []
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/img/icon-128.png":
/*!******************************!*\
  !*** ./src/img/icon-128.png ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__.p + \"icon-128.png\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW1nL2ljb24tMTI4LnBuZy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9pbWcvaWNvbi0xMjgucG5nPzM1MGEiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiaWNvbi0xMjgucG5nXCI7Il0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/img/icon-128.png\n");

/***/ }),

/***/ "./src/js/background.js":
/*!******************************!*\
  !*** ./src/js/background.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _img_icon_128_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../img/icon-128.png */ \"./src/img/icon-128.png\");\n/* harmony import */ var _img_icon_128_png__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_img_icon_128_png__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ \"./src/js/settings/index.js\");\n\n\n'use strict';\n\n\n\nchrome.runtime.onInstalled.addListener(() => {\n  _settings__WEBPACK_IMPORTED_MODULE_1__[\"Settings\"].set(_settings__WEBPACK_IMPORTED_MODULE_1__[\"Settings\"].defaults);\n});\n\nchrome.runtime.onMessage.addListener(\n  function(request, sender, sendResponse) {\n    if (request.type === 'log') {\n      console.log('LOG: ' + request.message);\n    } else if (request.type === 'settingsChanged') {\n      console.log('SETTINGS CHANGED');\n      chrome.runtime.sendMessage({ type: 'callback' });\n      console.log('message sent');\n    }\n  }\n);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvYmFja2dyb3VuZC5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9qcy9iYWNrZ3JvdW5kLmpzPzgxMDQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9pbWcvaWNvbi0xMjgucG5nJ1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSAnLi9zZXR0aW5ncyc7XG5cbmNocm9tZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKCgpID0+IHtcbiAgU2V0dGluZ3Muc2V0KFNldHRpbmdzLmRlZmF1bHRzKTtcbn0pO1xuXG5jaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoXG4gIGZ1bmN0aW9uKHJlcXVlc3QsIHNlbmRlciwgc2VuZFJlc3BvbnNlKSB7XG4gICAgaWYgKHJlcXVlc3QudHlwZSA9PT0gJ2xvZycpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdMT0c6ICcgKyByZXF1ZXN0Lm1lc3NhZ2UpO1xuICAgIH0gZWxzZSBpZiAocmVxdWVzdC50eXBlID09PSAnc2V0dGluZ3NDaGFuZ2VkJykge1xuICAgICAgY29uc29sZS5sb2coJ1NFVFRJTkdTIENIQU5HRUQnKTtcbiAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKHsgdHlwZTogJ2NhbGxiYWNrJyB9KTtcbiAgICAgIGNvbnNvbGUubG9nKCdtZXNzYWdlIHNlbnQnKTtcbiAgICB9XG4gIH1cbik7XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/background.js\n");

/***/ }),

/***/ "./src/js/settings/index.js":
/*!**********************************!*\
  !*** ./src/js/settings/index.js ***!
  \**********************************/
/*! exports provided: Settings */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Settings\", function() { return Settings; });\n\n\nclass Settings {\n  static get(keys, callback) {\n    return chrome.storage.sync.get(keys, callback);\n  }\n\n  static set(dict, callback) {\n    return chrome.storage.sync.set(dict, callback);\n  }\n};\n\nSettings.defaults = {\n  voice: 'default',\n  volume: 50,\n  mute: false,\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvc2V0dGluZ3MvaW5kZXguanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvc2V0dGluZ3MvaW5kZXguanM/YjRhZiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyB7XG4gIHN0YXRpYyBnZXQoa2V5cywgY2FsbGJhY2spIHtcbiAgICByZXR1cm4gY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoa2V5cywgY2FsbGJhY2spO1xuICB9XG5cbiAgc3RhdGljIHNldChkaWN0LCBjYWxsYmFjaykge1xuICAgIHJldHVybiBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldChkaWN0LCBjYWxsYmFjayk7XG4gIH1cbn07XG5cblNldHRpbmdzLmRlZmF1bHRzID0ge1xuICB2b2ljZTogJ2RlZmF1bHQnLFxuICB2b2x1bWU6IDUwLFxuICBtdXRlOiBmYWxzZSxcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/settings/index.js\n");

/***/ }),

/***/ 2:
/*!***********************************************************************************************************!*\
  !*** multi webpack-dev-server/client?http://localhost:3000 webpack/hot/dev-server ./src/js/background.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/pawel/dev/chess-com-voiceover/app/src/js/background.js */"./src/js/background.js");


/***/ })

/******/ });