parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"UnXq":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.formatQuery=exports.decodeQuery=void 0;var e=function(e){return decodeURIComponent(e.replace(/[+]/g,"%20"))},r=function(r){return r.split("&").reduce(function(r,t){return r[e(t.split("=")[0])]=e(t.split("=")[1]),r},{})};exports.decodeQuery=r;var t=function(e){return Object.entries(e).map(function(e){return encodeURIComponent(e[0])+"="+encodeURIComponent(e[1])}).join("&")};exports.formatQuery=t;
},{}],"D53L":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./utils"),t=document.currentScript;void 0===t&&(t=document.querySelector('script[src^="https://weixuanz.github.io/search/client.js"],script[src^="http://localhost:4000/search/client.js"]'));var n=Object.values(t.attributes).reduce(function(e,t){return e[t.name.replace(/^data-/,"")]=t.value,e},{}),r=document.querySelector('link[rel="canonical"]');n.url=r?r.href:location.origin+location.pathname+location.search,n.origin=location.origin,n.pathname=location.pathname.length<2?"index":location.pathname.substr(1).replace(/\.\w+$/,""),document.head.insertAdjacentHTML("afterbegin","<style>\n    #search {\n      position: fixed;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      z-index: 9999;\n      display: none;\n    }\n    #search-frame {\n      position: absolute;\n      height: 100%;\n      width: 100%;\n      left: 0;\n      top: 0;\n      border: none;\n    }\n  </style>");var i=t.src.match(/^https:\/\/weixuanz\.github\.io|http:\/\/localhost:\d+/)[0],a=i+"/search/search.html";t.insertAdjacentHTML("afterend",'<div id="search"><iframe id="search-frame" title="Search" scrolling="no" src="'+a+"?"+e.formatQuery(n)+'"></iframe></div>');var o=t.nextSibling,c=document.querySelector("#search-btn");c.style.cursor="pointer",c.addEventListener("click",function(){o.style.display="block",o.firstChild.contentWindow.focus()}),t.remove(),addEventListener("message",function(e){if(e.origin===i){var t=e.data;t&&"close"===t.type&&(o.style.display="none",window.focus())}});
},{"./utils":"UnXq"}]},{},["D53L"], null)
//# sourceMappingURL=/search/client.js.map