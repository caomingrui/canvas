/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["myLibrary"] = factory();
	else
		root["myLibrary"] = factory();
})(self, () => {
	return /******/ (() => { // webpackBootstrap
		/******/ 	"use strict";
		/******/ 	var __webpack_modules__ = ({

			/***/ "./src/computed.ts":
			/*!*************************!*\
              !*** ./src/computed.ts ***!
              \*************************/
			/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

				eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _reactive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reactive */ \"./src/reactive.ts\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n\nvar computed = function computed(callback) {\n  function ComputedRefImpl() {\n    var _this = this;\n    this._dirty = true;\n    this._value = null;\n    this.dep = new Set();\n    this.effect = new _reactive__WEBPACK_IMPORTED_MODULE_0__.ReactiveEffect(callback, function () {\n      // if (!_this._dirty) {\n      _this._dirty = true;\n      _this.dep.forEach(function (item) {\n        if (item.scheduler) {\n          item.scheduler();\n        } else {\n          item.run();\n        }\n      });\n      // }\n    });\n\n    this.active = true;\n    this.isRef = true;\n    return _objectSpread(_objectSpread({}, this), {}, {\n      get value() {\n        if (_reactive__WEBPACK_IMPORTED_MODULE_0__.activeEffect) {\n          this.dep.add(_reactive__WEBPACK_IMPORTED_MODULE_0__.activeEffect);\n        }\n        if (this._dirty) {\n          this._dirty = false;\n        }\n        this._value = this.effect.run();\n        return this._value;\n      },\n      set value(newValue) {\n        console.log('newValue', newValue);\n      }\n    });\n  }\n  return new ComputedRefImpl();\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (computed);\n\n//# sourceURL=webpack://myLibrary/./src/computed.ts?");

				/***/ }),

			/***/ "./src/index.ts":
			/*!**********************!*\
              !*** ./src/index.ts ***!
              \**********************/
			/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

				eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"computed\": () => (/* reexport safe */ _computed__WEBPACK_IMPORTED_MODULE_4__[\"default\"]),\n/* harmony export */   \"h\": () => (/* reexport safe */ _vNode__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n/* harmony export */   \"reactive\": () => (/* reexport safe */ _reactive__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"render\": () => (/* reexport safe */ _render__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   \"watch\": () => (/* reexport safe */ _watch__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   \"watchEffect\": () => (/* reexport safe */ _watcher__WEBPACK_IMPORTED_MODULE_1__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _reactive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reactive */ \"./src/reactive.ts\");\n/* harmony import */ var _watcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./watcher */ \"./src/watcher.ts\");\n/* harmony import */ var _watch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./watch */ \"./src/watch.ts\");\n/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./render */ \"./src/render.ts\");\n/* harmony import */ var _computed__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./computed */ \"./src/computed.ts\");\n/* harmony import */ var _vNode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./vNode */ \"./src/vNode.ts\");\n\n\n\n\n\n\n\n//# sourceURL=webpack://myLibrary/./src/index.ts?");

				/***/ }),

			/***/ "./src/reactive.ts":
			/*!*************************!*\
              !*** ./src/reactive.ts ***!
              \*************************/
			/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

				eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ReactiveEffect\": () => (/* binding */ ReactiveEffect),\n/* harmony export */   \"activeEffect\": () => (/* binding */ activeEffect),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"doWatch\": () => (/* binding */ doWatch),\n/* harmony export */   \"reactive\": () => (/* binding */ reactive),\n/* harmony export */   \"shouldTrack\": () => (/* binding */ shouldTrack)\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./utils/index.ts\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, \"prototype\", { writable: false }); return Constructor; }\nfunction _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\nfunction _toPropertyKey(arg) { var key = _toPrimitive(arg, \"string\"); return _typeof(key) === \"symbol\" ? key : String(key); }\nfunction _toPrimitive(input, hint) { if (_typeof(input) !== \"object\" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || \"default\"); if (_typeof(res) !== \"object\") return res; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (hint === \"string\" ? String : Number)(input); }\n\nvar targetMap = new Map();\nvar activeEffect;\nvar shouldTrack = true;\nvar baseHandlers = {\n  get: function get(target, key, receiver) {\n    var res = Reflect.get(target, key, receiver);\n    track(target, key);\n    return res;\n  },\n  set: function set(target, key, value) {\n    target[key] = value;\n    // const result = Reflect.set(target, key, receiver)\n    trigger(target, key);\n    return true;\n  }\n};\nfunction track(target, key) {\n  if (activeEffect && shouldTrack) {\n    var depsMap = targetMap.get(target);\n    if (!depsMap) {\n      targetMap.set(target, depsMap = new Map());\n    }\n    var dep = depsMap.get(key);\n    if (!dep) {\n      depsMap.set(key, dep = new Set());\n    }\n    if (!dep.has(activeEffect)) {\n      dep.add(activeEffect);\n    }\n  }\n}\nfunction trigger(target, key) {\n  var depsMap = targetMap.get(target);\n  if (!depsMap) return;\n  var deps = depsMap.get(key);\n  deps.forEach(function (item) {\n    if (item.scheduler) {\n      item.scheduler();\n    } else {\n      item.run();\n    }\n  });\n}\nfunction reactive(target) {\n  if (!(0,_utils__WEBPACK_IMPORTED_MODULE_0__.isObject)(target)) {\n    console.error('throw: reactive data is no Object');\n    return target;\n  }\n  return proxyData(target, baseHandlers);\n}\nvar proxyData = function proxyData(data, baseHandlers) {\n  return new Proxy(data, baseHandlers);\n};\nfunction doWatch(source, callback) {\n  var getter = function getter() {\n    if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isRef)(source)) {\n      return source.value;\n    } else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isFunction)(source)) {\n      return source();\n    } else if (Array.isArray(source)) {\n      source.forEach(function (item) {\n        if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isRef)(item)) {\n          return item.value;\n        } else if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isFunction)(item)) {\n          return item();\n        }\n      });\n    }\n  };\n  var oldValue = null;\n  var scheduler = function scheduler() {\n    if (!effect.active) return;\n    if (callback) {\n      var newValue = effect.run();\n      callback(newValue, oldValue);\n      oldValue = newValue;\n    } else {\n      effect.run();\n    }\n  };\n  var effect = new ReactiveEffect(getter, scheduler);\n  return effect.run();\n}\nvar ReactiveEffect = /*#__PURE__*/function () {\n  // deps: any[] = [];\n\n  function ReactiveEffect(fn) {\n    var scheduler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n    _classCallCheck(this, ReactiveEffect);\n    _defineProperty(this, \"active\", true);\n    _defineProperty(this, \"deferStop\", false);\n    this.fn = fn;\n    this.scheduler = scheduler;\n  }\n  _createClass(ReactiveEffect, [{\n    key: \"run\",\n    value: function run() {\n      if (!this.active) {\n        return this.fn();\n      }\n      try {\n        shouldTrack = true;\n        activeEffect = this;\n        return this.fn();\n      } finally {\n        activeEffect = null;\n        shouldTrack = false;\n        if (this.deferStop) {\n          this.stop();\n        }\n      }\n    }\n  }, {\n    key: \"stop\",\n    value: function stop() {\n      if (activeEffect === this) {\n        this.deferStop = true;\n      } else if (this.active) {\n        // cleanActiveEffect\n        this.active = false;\n      }\n    }\n  }]);\n  return ReactiveEffect;\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reactive);\n\n//# sourceURL=webpack://myLibrary/./src/reactive.ts?");

				/***/ }),

			/***/ "./src/render.ts":
			/*!***********************!*\
              !*** ./src/render.ts ***!
              \***********************/
			/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

				eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _watch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./watch */ \"./src/watch.ts\");\n\nvar render = function render(option, dom) {\n  var template = option.template,\n    proxy = option.proxy;\n  dom.innerHTML = template.trim();\n  dom.childNodes[0].childNodes.forEach(function (node) {\n    if (node.textContent && /\\{\\{(.*)\\}\\}/.test(node.textContent)) {\n      var key = RegExp.$1.trim();\n      var updater = function updater(key) {\n        node.textContent = proxy[key];\n      };\n      updater(key);\n      (0,_watch__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(function () {\n        return proxy[key];\n      }, updater.bind(null, key));\n    }\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);\n\n//# sourceURL=webpack://myLibrary/./src/render.ts?");

				/***/ }),

			/***/ "./src/vNode.ts":
			/*!**********************!*\
              !*** ./src/vNode.ts ***!
              \**********************/
			/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

				eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar createBaseVNode = function createBaseVNode(type, props, children) {\n  console.log(type, props, children, 'vnode');\n  var VNode = {\n    type: type,\n    props: props,\n    key: props === null || props === void 0 ? void 0 : props.key,\n    ref: props === null || props === void 0 ? void 0 : props.ref,\n    slotScopeIds: null,\n    children: children,\n    component: null,\n    suspense: null,\n    ssContent: null,\n    ssFallback: null,\n    dirs: null,\n    transition: null,\n    el: null,\n    anchor: null,\n    target: null,\n    targetAnchor: null,\n    staticCount: 0,\n    dynamicChildren: null,\n    appContext: null\n  };\n  return VNode;\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createBaseVNode);\n\n//# sourceURL=webpack://myLibrary/./src/vNode.ts?");

				/***/ }),

			/***/ "./src/watch.ts":
			/*!**********************!*\
              !*** ./src/watch.ts ***!
              \**********************/
			/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

				eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _reactive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reactive */ \"./src/reactive.ts\");\n\nvar watch = function watch(effect, callback) {\n  (0,_reactive__WEBPACK_IMPORTED_MODULE_0__.doWatch)(effect, callback);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (watch);\n\n//# sourceURL=webpack://myLibrary/./src/watch.ts?");

				/***/ }),

			/***/ "./src/watcher.ts":
			/*!************************!*\
              !*** ./src/watcher.ts ***!
              \************************/
			/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

				eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _reactive__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reactive */ \"./src/reactive.ts\");\n\nfunction watchEffect(effect) {\n  (0,_reactive__WEBPACK_IMPORTED_MODULE_0__.doWatch)(effect);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (watchEffect);\n\n//# sourceURL=webpack://myLibrary/./src/watcher.ts?");

				/***/ }),

			/***/ "./utils/index.ts":
			/*!************************!*\
              !*** ./utils/index.ts ***!
              \************************/
			/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

				eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isFunction\": () => (/* binding */ isFunction),\n/* harmony export */   \"isObject\": () => (/* binding */ isObject),\n/* harmony export */   \"isRef\": () => (/* binding */ isRef)\n/* harmony export */ });\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && \"function\" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }, _typeof(obj); }\nfunction isObject(obj) {\n  return _typeof(obj) === 'object' && obj != null;\n}\nfunction isRef(source) {\n  return !!source['isRef'];\n}\nfunction isFunction(source) {\n  return typeof source === 'function';\n}\n\n//# sourceURL=webpack://myLibrary/./utils/index.ts?");

				/***/ })

			/******/ 	});
		/************************************************************************/
		/******/ 	// The module cache
		/******/ 	var __webpack_module_cache__ = {};
		/******/
		/******/ 	// The require function
		/******/ 	function __webpack_require__(moduleId) {
			/******/ 		// Check if module is in cache
			/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
			/******/ 		if (cachedModule !== undefined) {
				/******/ 			return cachedModule.exports;
				/******/ 		}
			/******/ 		// Create a new module (and put it into the cache)
			/******/ 		var module = __webpack_module_cache__[moduleId] = {
				/******/ 			// no module.id needed
				/******/ 			// no module.loaded needed
				/******/ 			exports: {}
				/******/ 		};
			/******/
			/******/ 		// Execute the module function
			/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
			/******/
			/******/ 		// Return the exports of the module
			/******/ 		return module.exports;
			/******/ 	}
		/******/
		/************************************************************************/
		/******/ 	/* webpack/runtime/define property getters */
		/******/ 	(() => {
			/******/ 		// define getter functions for harmony exports
			/******/ 		__webpack_require__.d = (exports, definition) => {
				/******/ 			for(var key in definition) {
					/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
						/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
						/******/ 				}
					/******/ 			}
				/******/ 		};
			/******/ 	})();
		/******/
		/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
		/******/ 	(() => {
			/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
			/******/ 	})();
		/******/
		/******/ 	/* webpack/runtime/make namespace object */
		/******/ 	(() => {
			/******/ 		// define __esModule on exports
			/******/ 		__webpack_require__.r = (exports) => {
				/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
					/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
					/******/ 			}
				/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
				/******/ 		};
			/******/ 	})();
		/******/
		/************************************************************************/
		/******/
		/******/ 	// startup
		/******/ 	// Load entry module and return exports
		/******/ 	// This entry module can't be inlined because the eval devtool is used.
		/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
		/******/
		/******/ 	return __webpack_exports__;
		/******/ })()
		;
});