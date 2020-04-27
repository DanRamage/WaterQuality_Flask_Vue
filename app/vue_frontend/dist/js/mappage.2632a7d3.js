/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"mappage": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([1,"chunk-vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("8d32");


/***/ }),

/***/ "4678":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "2bfb",
	"./af.js": "2bfb",
	"./ar": "8e73",
	"./ar-dz": "a356",
	"./ar-dz.js": "a356",
	"./ar-kw": "423e",
	"./ar-kw.js": "423e",
	"./ar-ly": "1cfd",
	"./ar-ly.js": "1cfd",
	"./ar-ma": "0a84",
	"./ar-ma.js": "0a84",
	"./ar-sa": "8230",
	"./ar-sa.js": "8230",
	"./ar-tn": "6d833",
	"./ar-tn.js": "6d833",
	"./ar.js": "8e73",
	"./az": "485c",
	"./az.js": "485c",
	"./be": "1fc1",
	"./be.js": "1fc1",
	"./bg": "84aa",
	"./bg.js": "84aa",
	"./bm": "a7fa",
	"./bm.js": "a7fa",
	"./bn": "9043",
	"./bn.js": "9043",
	"./bo": "d26a",
	"./bo.js": "d26a",
	"./br": "6887",
	"./br.js": "6887",
	"./bs": "2554",
	"./bs.js": "2554",
	"./ca": "d716",
	"./ca.js": "d716",
	"./cs": "3c0d",
	"./cs.js": "3c0d",
	"./cv": "03ec",
	"./cv.js": "03ec",
	"./cy": "9797",
	"./cy.js": "9797",
	"./da": "0f14",
	"./da.js": "0f14",
	"./de": "b469",
	"./de-at": "b3eb",
	"./de-at.js": "b3eb",
	"./de-ch": "bb71",
	"./de-ch.js": "bb71",
	"./de.js": "b469",
	"./dv": "598a",
	"./dv.js": "598a",
	"./el": "8d47",
	"./el.js": "8d47",
	"./en-SG": "cdab",
	"./en-SG.js": "cdab",
	"./en-au": "0e6b",
	"./en-au.js": "0e6b",
	"./en-ca": "3886",
	"./en-ca.js": "3886",
	"./en-gb": "39a6",
	"./en-gb.js": "39a6",
	"./en-ie": "e1d3",
	"./en-ie.js": "e1d3",
	"./en-il": "7333",
	"./en-il.js": "7333",
	"./en-nz": "6f50",
	"./en-nz.js": "6f50",
	"./eo": "65db",
	"./eo.js": "65db",
	"./es": "898b",
	"./es-do": "0a3c",
	"./es-do.js": "0a3c",
	"./es-us": "55c9",
	"./es-us.js": "55c9",
	"./es.js": "898b",
	"./et": "ec18",
	"./et.js": "ec18",
	"./eu": "0ff2",
	"./eu.js": "0ff2",
	"./fa": "8df4",
	"./fa.js": "8df4",
	"./fi": "81e9",
	"./fi.js": "81e9",
	"./fo": "0721",
	"./fo.js": "0721",
	"./fr": "9f26",
	"./fr-ca": "d9f8",
	"./fr-ca.js": "d9f8",
	"./fr-ch": "0e49",
	"./fr-ch.js": "0e49",
	"./fr.js": "9f26",
	"./fy": "7118",
	"./fy.js": "7118",
	"./ga": "5120",
	"./ga.js": "5120",
	"./gd": "f6b4",
	"./gd.js": "f6b4",
	"./gl": "8840",
	"./gl.js": "8840",
	"./gom-latn": "0caa",
	"./gom-latn.js": "0caa",
	"./gu": "e0c5",
	"./gu.js": "e0c5",
	"./he": "c7aa",
	"./he.js": "c7aa",
	"./hi": "dc4d",
	"./hi.js": "dc4d",
	"./hr": "4ba9",
	"./hr.js": "4ba9",
	"./hu": "5b14",
	"./hu.js": "5b14",
	"./hy-am": "d6b6",
	"./hy-am.js": "d6b6",
	"./id": "5038",
	"./id.js": "5038",
	"./is": "0558",
	"./is.js": "0558",
	"./it": "6e98",
	"./it-ch": "6f12",
	"./it-ch.js": "6f12",
	"./it.js": "6e98",
	"./ja": "079e",
	"./ja.js": "079e",
	"./jv": "b540",
	"./jv.js": "b540",
	"./ka": "201b",
	"./ka.js": "201b",
	"./kk": "6d79",
	"./kk.js": "6d79",
	"./km": "e81d",
	"./km.js": "e81d",
	"./kn": "3e92",
	"./kn.js": "3e92",
	"./ko": "22f8",
	"./ko.js": "22f8",
	"./ku": "2421",
	"./ku.js": "2421",
	"./ky": "9609",
	"./ky.js": "9609",
	"./lb": "440c",
	"./lb.js": "440c",
	"./lo": "b29d",
	"./lo.js": "b29d",
	"./lt": "26f9",
	"./lt.js": "26f9",
	"./lv": "b97c",
	"./lv.js": "b97c",
	"./me": "293c",
	"./me.js": "293c",
	"./mi": "688b",
	"./mi.js": "688b",
	"./mk": "6909",
	"./mk.js": "6909",
	"./ml": "02fb",
	"./ml.js": "02fb",
	"./mn": "958b",
	"./mn.js": "958b",
	"./mr": "39bd",
	"./mr.js": "39bd",
	"./ms": "ebe4",
	"./ms-my": "6403",
	"./ms-my.js": "6403",
	"./ms.js": "ebe4",
	"./mt": "1b45",
	"./mt.js": "1b45",
	"./my": "8689",
	"./my.js": "8689",
	"./nb": "6ce3",
	"./nb.js": "6ce3",
	"./ne": "3a39",
	"./ne.js": "3a39",
	"./nl": "facd",
	"./nl-be": "db29",
	"./nl-be.js": "db29",
	"./nl.js": "facd",
	"./nn": "b84c",
	"./nn.js": "b84c",
	"./pa-in": "f3ff",
	"./pa-in.js": "f3ff",
	"./pl": "8d57",
	"./pl.js": "8d57",
	"./pt": "f260",
	"./pt-br": "d2d4",
	"./pt-br.js": "d2d4",
	"./pt.js": "f260",
	"./ro": "972c",
	"./ro.js": "972c",
	"./ru": "957c",
	"./ru.js": "957c",
	"./sd": "6784",
	"./sd.js": "6784",
	"./se": "ffff",
	"./se.js": "ffff",
	"./si": "eda5",
	"./si.js": "eda5",
	"./sk": "7be6",
	"./sk.js": "7be6",
	"./sl": "8155",
	"./sl.js": "8155",
	"./sq": "c8f3",
	"./sq.js": "c8f3",
	"./sr": "cf1e",
	"./sr-cyrl": "13e9",
	"./sr-cyrl.js": "13e9",
	"./sr.js": "cf1e",
	"./ss": "52bd",
	"./ss.js": "52bd",
	"./sv": "5fbd",
	"./sv.js": "5fbd",
	"./sw": "74dc",
	"./sw.js": "74dc",
	"./ta": "3de5",
	"./ta.js": "3de5",
	"./te": "5cbb",
	"./te.js": "5cbb",
	"./tet": "576c",
	"./tet.js": "576c",
	"./tg": "3b1b",
	"./tg.js": "3b1b",
	"./th": "10e8",
	"./th.js": "10e8",
	"./tl-ph": "0f38",
	"./tl-ph.js": "0f38",
	"./tlh": "cf75",
	"./tlh.js": "cf75",
	"./tr": "0e81",
	"./tr.js": "0e81",
	"./tzl": "cf51",
	"./tzl.js": "cf51",
	"./tzm": "c109",
	"./tzm-latn": "b53d",
	"./tzm-latn.js": "b53d",
	"./tzm.js": "c109",
	"./ug-cn": "6117",
	"./ug-cn.js": "6117",
	"./uk": "ada2",
	"./uk.js": "ada2",
	"./ur": "5294",
	"./ur.js": "5294",
	"./uz": "2e8c",
	"./uz-latn": "010e",
	"./uz-latn.js": "010e",
	"./uz.js": "2e8c",
	"./vi": "2921",
	"./vi.js": "2921",
	"./x-pseudo": "fd7e",
	"./x-pseudo.js": "fd7e",
	"./yo": "7f33",
	"./yo.js": "7f33",
	"./zh-cn": "5c3a",
	"./zh-cn.js": "5c3a",
	"./zh-hk": "49ab",
	"./zh-hk.js": "49ab",
	"./zh-tw": "90ea",
	"./zh-tw.js": "90ea"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "4678";

/***/ }),

/***/ "4a1c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "6a5d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ol_map_page_vue_vue_type_style_index_1_id_1bfddf93_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8b2c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ol_map_page_vue_vue_type_style_index_1_id_1bfddf93_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ol_map_page_vue_vue_type_style_index_1_id_1bfddf93_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ol_map_page_vue_vue_type_style_index_1_id_1bfddf93_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6c47":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/low_marker_25x25.c92a9f62.png";

/***/ }),

/***/ "8a65":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wq_popup_vue_vue_type_style_index_0_id_61271572_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4a1c");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wq_popup_vue_vue_type_style_index_0_id_61271572_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wq_popup_vue_vue_type_style_index_0_id_61271572_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_wq_popup_vue_vue_type_style_index_0_id_61271572_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "8b2c":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "8d32":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.js
var es_promise = __webpack_require__("e6cf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.promise.finally.js
var es_promise_finally = __webpack_require__("a79d");

// EXTERNAL MODULE: ./node_modules/vue/dist/vue.runtime.esm.js
var vue_runtime_esm = __webpack_require__("2b0e");

// EXTERNAL MODULE: ./node_modules/bootstrap/dist/css/bootstrap.min.css
var bootstrap_min = __webpack_require__("ab8b");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/dist/bootstrap-vue.css
var bootstrap_vue = __webpack_require__("2dd8");

// EXTERNAL MODULE: ./node_modules/typeface-montserrat/index.css
var typeface_montserrat = __webpack_require__("b5bf");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"158f3619-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ol_map_page.vue?vue&type=template&id=1bfddf93&scoped=true&
var ol_map_pagevue_type_template_id_1bfddf93_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-container',{staticClass:"h-100",attrs:{"fluid":""}},[_c('b-row',{staticClass:"h-100"},[_c('b-col',{staticClass:"padding-0",attrs:{"sm":"4","md":"3","lg":"3","xl":"3"}},[_c('div',{staticClass:"h-100 px-5 py-4 montserat-font text-center text-white blue-background_color sidebar-opacity"},[_c('h6',[_c('i',[_c('span',{domProps:{"textContent":_vm._s(_vm.title)}})])]),_c('h4',[_c('span',{domProps:{"textContent":_vm._s(_vm.site_name)}})]),_c('p',{staticClass:"text-left"},[_vm._v(" Bacteria levels can change rapidly between sampling dates. To fill in the gaps, we make daily "),_c('b',[_vm._v("Nowcast")]),_vm._v(" of bacteria conditions. These predictions do not represent swimming advisories, but provide estimates of the likelihood that bacteria conditions would warrant issuing an advisory if sampling were conducted that day. ")]),_c('b-button',{staticClass:"btn-outline-primary p-2 mr-2",class:[_vm.advisoryActive ? 'active' : ''],attrs:{"variant":"outline-primary"},on:{"click":function($event){return _vm.dataTypeClick('advisory')}}},[_c('b',[_vm._v("Advisory")])]),_c('b-button',{staticClass:"btn-outline-primary p-2 ml-2",class:[_vm.nowcastActive ? 'active' : ''],attrs:{"variant":"outline-primary"},on:{"click":function($event){return _vm.dataTypeClick('nowcast')}}},[_c('b',[_vm._v("Nowcast")])]),_c('p',{staticClass:"text-center"},[_c('a',{staticClass:"text-white card-link",attrs:{"href":"#"}},[_vm._v("Bacteria Sources")])]),_c('p',{staticClass:"text-center"},[_c('a',{staticClass:"text-white card-link",attrs:{"href":"#"}},[_vm._v("Locations")])]),_c('p',{staticClass:"text-center"},[_c('a',{staticClass:"text-white card-link",attrs:{"href":"#"}},[_vm._v("About")])])],1)]),_c('b-col',{ref:"map_column",staticClass:"padding-0",attrs:{"sm":"8","md":"9","lg":"9","xl":"9"}},[_c('vl-map',{ref:"site_map",staticStyle:{"width":"100%","height":"100%","position":"absolute"},attrs:{"load-tiles-while-animating":true,"load-tiles-while-interacting":true,"data-projection":"EPSG:4326"}},[_c('vl-view',{attrs:{"center":_vm.center,"rotation":_vm.rotation},on:{"update:center":function($event){_vm.center=$event},"update:rotation":function($event){_vm.rotation=$event}}}),_c('vl-layer-tile',[_c('vl-source-xyz',{attrs:{"url":_vm.layer_url,"attributions":"string or array"}})],1),_c('vl-layer-vector',{attrs:{"id":"sites"}},[_c('vl-source-vector',{ref:"site_vector_layer",attrs:{"features":_vm.features},on:{"update:features":function($event){_vm.features=$event}}}),_c('vl-style-func',{attrs:{"factory":_vm.siteStyleFactory}})],1),_c('vl-interaction-select',{attrs:{"features":_vm.selectedFeatures,"layers":['sites']},on:{"update:features":function($event){_vm.selectedFeatures=$event}}},_vm._l((_vm.selectedFeatures),function(feature){return _c('vl-overlay',{key:feature.id,attrs:{"id":feature.id,"position":feature.geometry.coordinates,"auto-pan":true,"auto-pan-animation":{ duration: 300 }}},[(feature.properties.site_type == "Default")?_c('div',[_c('WQPopup',{attrs:{"feature":feature}})],1):_c('div',[_c('p',[_vm._v(_vm._s(feature.id))])])])}),1)],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ol_map_page.vue?vue&type=template&id=1bfddf93&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./src/utilities/rest_api.js
 //let BASE_API_URL = 'http://howsthebeach.org/api/';

var BASE_API_URL = 'http://127.0.0.1:5000/api/';
/* harmony default export */ var rest_api = ({
  GetSiteData: function GetSiteData(site_name, startdate) {
    console.log("GetSiteData started for site" + site_name);
    var site_data = [];
    var url = BASE_API_URL + site_name + '?startdate=' + startdate;
    axios_default.a.get(url).then(function (response) {
      console.log(response.data);

      if (response.status == 200) {
        response;
      } else {
        console.log("GetSiteData error response, status code: " + response.status);
      }
    }).catch(function (error) {
      console.log("GetSiteData error response, error: " + error);
    });
    console.log("GetSiteData finished for site" + site_name + " startdate: " + startdate);
    return site_data;
  },
  GetSitesPromise: function GetSitesPromise(site_name) {
    console.log("GetSites started for site " + site_name);
    var url = BASE_API_URL + site_name + "/sites";
    return axios_default.a.get(url); //.then(res => res.data)
    //.catch(error => console.error(error));
  },
  GetSites: function GetSites(site_name) {
    console.log("GetSites started for site " + site_name);
    var url = BASE_API_URL + site_name + "/sites";
    var site_data = undefined;
    axios_default.a.get(url).then(function (response) {
      console.log(response.data);
      site_data = response.data;
    }).catch(function (error) {
      console.log("GetSites error response, error: " + error);
    });
    console.log("GetSites finished for site" + site_name);
    return site_data;
  },
  GetStationData: function GetStationData(station_name, startdate) {
    console.log("GetStationData started for station" + station_name + " startdate: " + startdate);
    var station_data = undefined;
    var url = BASE_API_URL + '/station_data' + '?station=' + station_name + '&startdate=' + startdate;
    axios_default.a.get(url).then(function (response) {
      console.log(response.data);

      if (response.status == 200) {
        response;
      } else {
        console.log("GetStationData response error, status code: " + response.status);
        response;
      }
    }).catch(function (error) {
      console.log("GetStationData error response, error: " + error);
    });
    console.log("GetStationData finished for station" + station_name + " startdate: " + startdate);
    return station_data;
  }
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"158f3619-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/wq_popup.vue?vue&type=template&id=61271572&scoped=true&
var wq_popupvue_type_template_id_61271572_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('b-card',{staticClass:"wq-card"},[(_vm.hasAdvisoryData)?_c('div',[_c('b-card-title',{staticClass:"font-avenir"},[_c('img',{staticStyle:{"height":"25px","width":"25px"},attrs:{"src":_vm.getAdvisoryImage()}}),_vm._v(" Site: "+_vm._s(_vm.feature.properties.description)+" ")])],1):_c('div',[_c('b-card-title',{staticClass:"font-avenir"},[_vm._v("Site: "+_vm._s(_vm.feature.properties.description))])],1),_c('b-card-sub-title',{staticClass:"avenir-font-light"},[_vm._v("ID: "+_vm._s(_vm.feature.id))]),(_vm.hasAdvisoryData)?_c('div',[_c('b-card-text',{staticClass:"mt-3"},[_c('p',[_c('span',{staticClass:"font-avenir"},[_c('b',[_vm._v("Bacteria Data: "+_vm._s(_vm.advisoryValue))])]),_c('br'),_c('span',{staticClass:"ml-4 avenir-font-light"},[_vm._v("Date: "+_vm._s(_vm.advisoryDate))])])])],1):_vm._e(),(_vm.hasNowcastData)?_c('div',[_c('b-card-text',{staticClass:"mt-3"},[_c('p',[_c('span',{staticClass:"font-avenir"},[_c('b',[_vm._v("Nowcast: "+_vm._s(_vm.nowcastsValue))])]),_c('br'),_c('span',{staticClass:"ml-4 avenir-font-light"},[_vm._v("Date: "+_vm._s(_vm.nowcastsDate))])])])],1):_vm._e()],1)],1)}
var wq_popupvue_type_template_id_61271572_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/wq_popup.vue?vue&type=template&id=61271572&scoped=true&

// EXTERNAL MODULE: ./node_modules/moment/moment.js
var moment = __webpack_require__("c1df");
var moment_default = /*#__PURE__*/__webpack_require__.n(moment);

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/components/layout/index.js
var layout = __webpack_require__("498a");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/components/card/index.js
var card = __webpack_require__("a7e2");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/wq_popup.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



vue_runtime_esm["default"].use(layout["a" /* LayoutPlugin */]);
vue_runtime_esm["default"].use(card["a" /* CardPlugin */]);

var none_marker = __webpack_require__("f609");

var low_marker = __webpack_require__("6c47");

var high_marker = __webpack_require__("e5a2");

/* harmony default export */ var wq_popupvue_type_script_lang_js_ = ({
  name: 'WQPopup',
  props: ['feature'],
  data: function data() {
    return {};
  },
  methods: {
    getAdvisoryImage: function getAdvisoryImage() {
      var img_src = none_marker;

      if (this.hasAdvisoryData) {
        var hi_limit = this.$store.state.advisory_limits.hi;
        var lo_limit = this.$store.state.advisory_limits.low;
        var value = this.advisoryValue;

        if (value >= hi_limit.minimum) {
          img_src = high_marker;
        } else if (value < lo_limit.maximum) {
          img_src = low_marker;
        }
      }

      return img_src;
    }
  },
  computed: {
    hasAdvisoryData: function hasAdvisoryData() {
      console.debug("hasAdvisoryData started.");
      var site_type = this.feature.properties.site_type;

      if (site_type in this.feature.properties) {
        if ('advisory' in this.feature.properties[site_type]) {
          console.log("hasAdvisoryData is true.");
          return true;
        }
      }

      console.debug("hasAdvisoryData is false.");
      return false;
    },
    advisoryDate: function advisoryDate() {
      console.debug("advisoryDate started.");

      if (this.hasAdvisoryData) {
        var site_type = this.feature.properties.site_type;
        var date = moment_default()(this.feature.properties[site_type].advisory.date).format("MMMM Do YYYY");
        console.debug("advisoryDate returning: " + date);
        return date;
      }

      console.debug("advisoryDate returning: ");
      return "";
    },
    advisoryValue: function advisoryValue() {
      console.debug("advisoryValue started.");

      if (this.hasAdvisoryData) {
        var site_type = this.feature.properties.site_type;
        var value = this.feature.properties[site_type].advisory.value;
        console.debug("advisoryValue returning: " + value);
        return value;
      }

      console.debug("advisoryValue returning: ");
      return "";
    },
    hasNowcastData: function hasNowcastData() {
      console.debug("hasNowcastData started.");
      var site_type = this.feature.properties.site_type;

      if (site_type in this.feature.properties) {
        if ('nowcasts' in this.feature.properties[site_type]) {
          console.log("hasNowcastData is true.");
          return true;
        }
      }

      console.debug("hasNowcastData is false.");
      return false;
    },
    nowcastsDate: function nowcastsDate() {
      console.debug("nowcastsDate started.");

      if (this.hasAdvisoryData) {
        var site_type = this.feature.properties.site_type;
        var date = moment_default()(this.feature.properties[site_type].nowcasts.date).format("MMMM Do YYYY");
        console.debug("nowcastsDate returning: " + date);
        return date;
      }

      console.debug("nowcastsDate returning: ");
      return "";
    },
    nowcastsValue: function nowcastsValue() {
      console.debug("nowcastsValue started.");

      if (this.hasAdvisoryData) {
        var site_type = this.feature.properties.site_type;
        var level = this.feature.properties[site_type].nowcasts.level;
        console.debug("nowcastsValue returning: " + level);
        return level;
      }

      console.debug("nowcastsValue returning: ");
      return "";
    }
  }
});
// CONCATENATED MODULE: ./src/components/wq_popup.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_wq_popupvue_type_script_lang_js_ = (wq_popupvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/wq_popup.vue?vue&type=style&index=0&id=61271572&scoped=true&lang=css&
var wq_popupvue_type_style_index_0_id_61271572_scoped_true_lang_css_ = __webpack_require__("8a65");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/components/wq_popup.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_wq_popupvue_type_script_lang_js_,
  wq_popupvue_type_template_id_61271572_scoped_true_render,
  wq_popupvue_type_template_id_61271572_scoped_true_staticRenderFns,
  false,
  null,
  "61271572",
  null
  
)

/* harmony default export */ var wq_popup = (component.exports);
// EXTERNAL MODULE: ./node_modules/vuelayers/lib/ol-ext/index.js + 36 modules
var ol_ext = __webpack_require__("2986");

// EXTERNAL MODULE: ./node_modules/ol/style/Style.js
var Style = __webpack_require__("6c77");

// EXTERNAL MODULE: ./node_modules/ol/style/Icon.js + 3 modules
var Icon = __webpack_require__("6cbf");

// EXTERNAL MODULE: ./src/assets/images/low_marker_25x25.png
var low_marker_25x25 = __webpack_require__("6c47");
var low_marker_25x25_default = /*#__PURE__*/__webpack_require__.n(low_marker_25x25);

// EXTERNAL MODULE: ./src/assets/images/high_marker_25x25.png
var high_marker_25x25 = __webpack_require__("e5a2");
var high_marker_25x25_default = /*#__PURE__*/__webpack_require__.n(high_marker_25x25);

// EXTERNAL MODULE: ./src/assets/images/none_marker_25x25.png
var none_marker_25x25 = __webpack_require__("f609");
var none_marker_25x25_default = /*#__PURE__*/__webpack_require__.n(none_marker_25x25);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ol_map_page.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


 //import Extent from 'ol/extent';
//import {createEmpty} from 'ol/extent';


 //SInce these are not in the template, we import them here. We use them in the javascript below when
//determining which icon to use.




/* harmony default export */ var ol_map_pagevue_type_script_lang_js_ = ({
  name: 'OLMapPage',
  components: {
    'WQPopup': wq_popup
  },
  data: function data() {
    return {
      title: "HOW'S THE BEACH",
      site_name: "",
      zoom: 5,
      center: [0, 0],
      rotation: 0,
      features: [],
      loading: false,
      layer_url: 'http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}',
      selectedFeatures: [],
      advisory_limits: undefined,
      nowcastActive: false,
      advisoryActive: true //sitesLayerExtents: createEmpty()

    };
  },
  mounted: function mounted() {
    var _this = this;

    var vm = this;
    this.loading = true;
    var path = window.location.pathname;

    if (path.length) {
      var sitename = path.split('/');
      this.site_name = sitename[1];
      console.debug("Retrieving initial site: " + this.site_name + " data.");
      rest_api.GetSitesPromise(this.site_name, '').then(function (features) {
        console.debug("Retrieved: " + features.data.sites.features.length + " features");
        vm.features = features.data.sites.features;

        if ('limits' in features.data.advisory_info) {
          _this.$store.commit('updateAdvisoryLimits', features.data.advisory_info.limits);
        }

        vm.loading = false;
        setTimeout(function () {
          if (vm.$refs.site_vector_layer.$source != undefined) {
            vm.$refs.site_map.$map.updateSize();
            vm.sitesLayerExtents = vm.$refs.site_vector_layer.$source.getExtent(vm.sitesLayerExtents);
            var m_size = vm.$refs.site_map.$map.getSize();
            vm.$refs.site_map.getView().fit(vm.sitesLayerExtents, m_size); //vm.$refs.site_map.$map.redraw();
          }
        }, 100);
        /*
        vm.$nextTick(function() {
            console.debug("nextTick mounted setting map extent.");
        });*/
      }).catch(function (error) {
        return console.error(error);
      });
    }
  },
  methods: {
    pointOnSurface: ol_ext["A" /* findPointOnSurface */],
    siteStyleFactory: function siteStyleFactory() {
      console.debug("siteStyleFactory started");
      var vm = this;
      /*
      For each feature, this function is used to determine what icon to use based on the level.
      */

      var siteStyleFunction = function siteStyleFunction(feature, resolution) {
        resolution;
        var icon_scale = 0.75;
        var properties = feature.getProperties();
        var site_type = properties.site_type; //if(site_type in properties) {

        var icon = new Icon["a" /* default */]({
          src: none_marker_25x25_default.a,
          scale: icon_scale
        });

        if ('advisory' in properties[site_type]) {
          var value = properties[site_type].advisory.value;
          var hi_limit = vm.$store.state.advisory_limits.hi;
          var lo_limit = vm.$store.state.advisory_limits.low;

          if (value >= hi_limit.minimum) {
            //console.debug("Feature: " + feature.getId() + " Hi style value: " + value);
            icon = new Icon["a" /* default */]({
              src: high_marker_25x25_default.a,
              scale: icon_scale
            });
          } else if (value < lo_limit.maximum) {
            //console.debug("Feature: " + feature.getId() + " Low style value: " + value);
            icon = new Icon["a" /* default */]({
              src: low_marker_25x25_default.a,
              scale: icon_scale //size: [50, 50]

            });
          }
        } else {
          console.debug("Feature: " + feature.getId() + " No advisory data found.");
        }

        var icon_style = [new Style["c" /* default */]({
          image: icon
        })]; //}

        return icon_style;
      };

      return siteStyleFunction;
    },
    dataTypeClick: function dataTypeClick(data_type) {
      console.debug("Data Type Button clicked: " + data_type);

      if (data_type == 'nowcast') {
        this.nowcastActive = true;
        this.advisoryActive = false;
      } else {
        this.nowcastActive = false;
        this.advisoryActive = true;
      }
    }
    /*
    onSourceChanged () {
        // sourceVm - vl-source-vector instance
        // sourceVm.$source - ol/source/Vector instance
        if(this.$refs.site_vector_layer.$source.getState() === 'ready') {
            this.$refs.site_map.$map.updateSize();
            let extents = this.$refs.site_vector_layer.$source.getExtent();
            console.debug("Extents: " + extents);
            let m_size = this.$refs.site_map.$map.getSize();
            this.$refs.site_map.getView().fit(extents, m_size);
        }
    },
    */

  },
  watch: {
    /*
    features: _.debounce(function() {
        this.$refs.site_map.$map.updateSize();
        this.sitesLayerExtents = this.$refs.site_vector_layer.$source.getExtent();
        let m_size = vm.$refs.site_map.$map.getSize();
        this.$refs.site_map.getView().fit(this.sitesLayerExtents, m_size);
         this.message = `Loaded ${this.features.length}`;
         this.$refs.mapView.$view.fit(
            this.$refs.geojsonSource.$source.getExtent(),
            {
                duration: 1000,
            },
        )
    }, 10),*/

    /*
    sitesLayerExtents: function() {
        console.debug("sitesLayerExtents new extents");
    }*/
  }
});
// CONCATENATED MODULE: ./src/components/ol_map_page.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ol_map_pagevue_type_script_lang_js_ = (ol_map_pagevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ol_map_page.vue?vue&type=style&index=0&lang=css&
var ol_map_pagevue_type_style_index_0_lang_css_ = __webpack_require__("d12d");

// EXTERNAL MODULE: ./src/components/ol_map_page.vue?vue&type=style&index=1&id=1bfddf93&scoped=true&lang=css&
var ol_map_pagevue_type_style_index_1_id_1bfddf93_scoped_true_lang_css_ = __webpack_require__("6a5d");

// CONCATENATED MODULE: ./src/components/ol_map_page.vue







/* normalize component */

var ol_map_page_component = Object(componentNormalizer["a" /* default */])(
  components_ol_map_pagevue_type_script_lang_js_,
  ol_map_pagevue_type_template_id_1bfddf93_scoped_true_render,
  staticRenderFns,
  false,
  null,
  "1bfddf93",
  null
  
)

/* harmony default export */ var ol_map_page = (ol_map_page_component.exports);
// EXTERNAL MODULE: ./node_modules/vuelayers/lib/index.js + 307 modules
var lib = __webpack_require__("1cf8");

// EXTERNAL MODULE: ./node_modules/vuelayers/lib/style.css
var style = __webpack_require__("2b69");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/components/button/index.js
var components_button = __webpack_require__("7049");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/components/button-group/index.js
var button_group = __webpack_require__("8b3d");

// EXTERNAL MODULE: ./node_modules/bootstrap-vue/esm/components/sidebar/index.js
var sidebar = __webpack_require__("89bf");

// EXTERNAL MODULE: ./node_modules/vuex/dist/vuex.esm.js
var vuex_esm = __webpack_require__("2f62");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
var createClass = __webpack_require__("bee2");

// CONCATENATED MODULE: ./src/utilities/limits.js



var limits_wq_limit = /*#__PURE__*/function () {
  // eslint-disable-line no-unused-vars
  function wq_limit() {
    Object(classCallCheck["a" /* default */])(this, wq_limit);

    this.minimum = undefined;
    this.maximum = undefined;
    this.icon = undefined;
  }

  Object(createClass["a" /* default */])(wq_limit, [{
    key: "minimum",
    set: function set(min) {
      this._minimum = min;
    },
    get: function get() {
      return this._minimum;
    }
  }, {
    key: "maximum",
    set: function set(max) {
      this._maximum = max;
    },
    get: function get() {
      return this._maximum;
    }
  }, {
    key: "icon",
    set: function set(icon) {
      this._icon = icon;
    },
    get: function get() {
      return this._icon;
    }
  }]);

  return wq_limit;
}();

var limits_AdvisoryLimits = /*#__PURE__*/function () {
  // eslint-disable-line no-unused-vars
  function AdvisoryLimits() {
    Object(classCallCheck["a" /* default */])(this, AdvisoryLimits);

    this.limits = [];
  }

  Object(createClass["a" /* default */])(AdvisoryLimits, [{
    key: "update",
    value: function update(limits) {
      this.limits = [];

      for (var limit_type in limits) {
        var limit = new limits_wq_limit();
        limit.minimum = limits[limit_type].min_limit;
        limit.maximum = limits[limit_type].max_limit;
        limit.icon = limits[limit_type].icon;
        this.limits[limit_type] = limit;
      }
    }
  }, {
    key: "limit",
    value: function limit(limit_level) {
      if (limit_level in this.limits) {
        return this.limits[limit_level];
      }

      return null;
    }
  }, {
    key: "low",
    get: function get() {
      return this.limit('Low');
    }
  }, {
    key: "medium",
    get: function get() {
      return this.limit('Medium');
    }
  }, {
    key: "hi",
    get: function get() {
      return this.limit('High');
    }
  }, {
    key: "none",
    get: function get() {
      return this.limit('No data');
    }
  }]);

  return AdvisoryLimits;
}();


// CONCATENATED MODULE: ./src/store/store.js


 // eslint-disable-line no-unused-vars

vue_runtime_esm["default"].use(vuex_esm["a" /* default */]);
/* harmony default export */ var store = (new vuex_esm["a" /* default */].Store({
  state: {
    advisory_limits: new limits_AdvisoryLimits(),
    sites: undefined,
    site_message: undefined
  },
  getters: {// Here we will create a getter
  },
  mutations: {
    updateAdvisoryLimits: function updateAdvisoryLimits(state, limits) {
      state.advisory_limits.update(limits);
    }
    /*
    updateSites(state, sites) {
     }*/

  },
  actions: {}
}));
// CONCATENATED MODULE: ./src/pages/olmappage/main.js








 //Vue.use(BootstrapVue);
//Vue.use(VueLayers);


vue_runtime_esm["default"].use(lib["d" /* Map */]);
vue_runtime_esm["default"].use(lib["k" /* TileLayer */]);
vue_runtime_esm["default"].use(lib["e" /* OsmSource */]);
vue_runtime_esm["default"].use(lib["c" /* Geoloc */]);
vue_runtime_esm["default"].use(lib["l" /* VectorLayer */]);
vue_runtime_esm["default"].use(lib["m" /* VectorSource */]);
vue_runtime_esm["default"].use(lib["n" /* XyzSource */]);
vue_runtime_esm["default"].use(lib["i" /* StyleBox */]);
vue_runtime_esm["default"].use(lib["b" /* FillStyle */]);
vue_runtime_esm["default"].use(lib["h" /* StrokeStyle */]);
vue_runtime_esm["default"].use(lib["a" /* CircleStyle */]);
vue_runtime_esm["default"].use(lib["f" /* Overlay */]);
vue_runtime_esm["default"].use(lib["g" /* SelectInteraction */]);
vue_runtime_esm["default"].use(lib["j" /* StyleFunc */]);
 // needs css-loader


vue_runtime_esm["default"].use(components_button["a" /* ButtonPlugin */]);
vue_runtime_esm["default"].use(button_group["a" /* ButtonGroupPlugin */]);
vue_runtime_esm["default"].use(layout["a" /* LayoutPlugin */]);
vue_runtime_esm["default"].use(sidebar["a" /* SidebarPlugin */]);

new vue_runtime_esm["default"]({
  store: store,
  render: function render(h) {
    return h(ol_map_page);
  }
}).$mount('#app');

/***/ }),

/***/ "b1bb":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "d12d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ol_map_page_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b1bb");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ol_map_page_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ol_map_page_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ol_map_page_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e5a2":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/high_marker_25x25.9e058eaa.png";

/***/ }),

/***/ "f609":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })

/******/ });
//# sourceMappingURL=mappage.2632a7d3.js.map