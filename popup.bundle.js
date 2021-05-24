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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({


  /***/ "./src/js/popup.js":
  /*!*************************!*\
    !*** ./src/js/popup.js ***!
    \*************************/
  /*! no exports provided */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ \"./src/js/settings/index.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n\n\n\n\n\n\n// grab UI controls from document\nconst volumeElem = document.getElementById('volume');\nconst muteElem = document.getElementById('mute');\nconst voiceElems = document.querySelectorAll('input[type=\"radio\"][name=\"voice\"]');\n\n// initialize values for UI controls\n_settings__WEBPACK_IMPORTED_MODULE_0__[\"Settings\"].get(['volume', 'voice'], ({ volume, voice }) => {\n  volumeElem.value = volume;\n  Array.from(voiceElems).filter(e => e.value === voice)[0].checked = true;\n});\n\nconst notifySettingsChange = () => {\n  chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {\n    const activeTab = tabs[0];\n    chrome.tabs.sendMessage(activeTab.id, {\"type\": \"settingsChanged\"});\n  });\n};\n\n// add on change listeners to controls, so changes are reflected into\n// persistent settings\n\nvolumeElem.addEventListener('change', (event) => {\n  const value = event.target.value;\n  _settings__WEBPACK_IMPORTED_MODULE_0__[\"Settings\"].set({ volume: value }, notifySettingsChange);\n});\n\nvoiceElems.forEach((e) => {\n  e.addEventListener('change', (event) => {\n    const value = event.target.value;\n    _settings__WEBPACK_IMPORTED_MODULE_0__[\"Settings\"].set({ voice: value }, notifySettingsChange);\n  });\n});\n//# sourceURL=webpack-internal:///./src/js/popup.js\n");

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

  /***/ "./src/js/utils.js":
  /*!*************************!*\
    !*** ./src/js/utils.js ***!
    \*************************/
  /*! exports provided: LOG, pieceCodeToName, matchSan */
  /***/ (function(module, __webpack_exports__, __webpack_require__) {

  "use strict";
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"LOG\", function() { return LOG; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pieceCodeToName\", function() { return pieceCodeToName; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"matchSan\", function() { return matchSan; });\n\n\nconst DEBUG = false;\n\nconst LOG = (msg) => {\n  if (!DEBUG) {\n    return;\n  }\n  chrome.runtime.sendMessage({ type: 'log', message: msg });\n};\n\nconst pieceCodeToName = {\n  'K': 'king',\n  'Q': 'queen',\n  'R': 'rook',\n  'B': 'bishop',\n  'N': 'knight',\n};\n\nconst matchSan = (san) => {\n  // pattern for SAN based on this thread https://stackoverflow.com/questions/40007937/regex-help-for-chess-moves-san\n  // with modifications\n  const pattern = /(?:(O-O(?:-O)?)|(?:([NBRQK])?([a-h])?([1-8])?(x)?([a-h])([1-8])(=[NBRQK])?))(\\+)?(#)?/;\n  return san.match(pattern);\n}\n\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvanMvdXRpbHMuanMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMuanM/OTk0NCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IERFQlVHID0gZmFsc2U7XG5cbmNvbnN0IExPRyA9IChtc2cpID0+IHtcbiAgaWYgKCFERUJVRykge1xuICAgIHJldHVybjtcbiAgfVxuICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSh7IHR5cGU6ICdsb2cnLCBtZXNzYWdlOiBtc2cgfSk7XG59O1xuXG5jb25zdCBwaWVjZUNvZGVUb05hbWUgPSB7XG4gICdLJzogJ2tpbmcnLFxuICAnUSc6ICdxdWVlbicsXG4gICdSJzogJ3Jvb2snLFxuICAnQic6ICdiaXNob3AnLFxuICAnTic6ICdrbmlnaHQnLFxufTtcblxuY29uc3QgbWF0Y2hTYW4gPSAoc2FuKSA9PiB7XG4gIC8vIHBhdHRlcm4gZm9yIFNBTiBiYXNlZCBvbiB0aGlzIHRocmVhZCBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80MDAwNzkzNy9yZWdleC1oZWxwLWZvci1jaGVzcy1tb3Zlcy1zYW5cbiAgLy8gd2l0aCBtb2RpZmljYXRpb25zXG4gIGNvbnN0IHBhdHRlcm4gPSAvKD86KE8tTyg/Oi1PKT8pfCg/OihbTkJSUUtdKT8oW2EtaF0pPyhbMS04XSk/KHgpPyhbYS1oXSkoWzEtOF0pKD1bTkJSUUtdKT8pKShcXCspPygjKT8vO1xuICByZXR1cm4gc2FuLm1hdGNoKHBhdHRlcm4pO1xufVxuXG5leHBvcnQge1xuICBMT0csXG4gIHBpZWNlQ29kZVRvTmFtZSxcbiAgbWF0Y2hTYW4sXG4gfTtcbiJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBS0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/js/utils.js\n");

  /***/ }),

  /***/ 0:
  /*!******************************************************************************************************!*\
    !*** multi webpack-dev-server/client?http://localhost:3000 webpack/hot/dev-server ./src/js/popup.js ***!
    \******************************************************************************************************/
  /*! no static exports found */
  /***/ (function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__(/*! /Users/pawel/dev/chess-com-voiceover/app/src/js/popup.js */"./src/js/popup.js");


  /***/ })

  /******/ });