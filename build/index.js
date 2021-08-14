!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.CssSelectorGenerator=e():t.CssSelectorGenerator=e()}(self,(function(){return(()=>{var t={426:(t,e,n)=>{var r=n(529);function o(t,e,n){Array.isArray(t)?t.push(e):t[n]=e}t.exports=function(t){var e,n,c,i=[];if(Array.isArray(t))n=[],e=t.length-1;else{if("object"!=typeof t||null===t)throw new TypeError("Expecting an Array or an Object, but `"+(null===t?"null":typeof t)+"` provided.");n={},c=Object.keys(t),e=c.length-1}return function n(u,s){var l,f,a,p;for(f=c?c[s]:s,Array.isArray(t[f])||(void 0===t[f]?t[f]=[]:t[f]=[t[f]]),l=0;l<t[f].length;l++)o((p=u,a=Array.isArray(p)?[].concat(p):r(p)),t[f][l],f),s>=e?i.push(a):n(a,s+1)}(n,0),i}},529:t=>{t.exports=function(){for(var t={},n=0;n<arguments.length;n++){var r=arguments[n];for(var o in r)e.call(r,o)&&(t[o]=r[o])}return t};var e=Object.prototype.hasOwnProperty}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var c=e[r]={exports:{}};return t[r](c,c.exports,n),c.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var r={};return(()=>{"use strict";n.r(r),n.d(r,{default:()=>C,getCssSelector:()=>D});var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};function e(e){return null!=e&&"object"===(void 0===e?"undefined":t(e))&&1===e.nodeType&&"object"===t(e.style)&&"object"===t(e.ownerDocument)}function o(t,e,n=document){const r=n.querySelectorAll(e);return 1===r.length&&r[0]===t}function c(t,n=function(t){return t.ownerDocument.querySelector(":root")}(t)){const r=[];let o=t;for(;e(o)&&o!==n;)r.push(o),o=o.parentElement;return r}function i(t){const n=t.parentNode;if(n){let r=0;const o=n.childNodes;for(let n=0;n<o.length;n++)if(e(o[n])&&(r+=1,o[n]===t))return[`:nth-child(${r})`]}return[]}const u=new RegExp(["^$","\\s","^\\d"].join("|")),s=new RegExp(["^$","^\\d"].join("|")),l=["id","class","tag","attribute","nthchild","nthoftype"],f=["nthoftype","tag","id","class","attribute","nthchild"],a={selectors:["id","class","tag","attribute"],includeTag:!1,whitelist:[],blacklist:[],combineWithinSelector:!0,combineBetweenSelectors:!0,root:document};function p(t){return"string"==typeof t||function(t){return t instanceof RegExp}(t)}function d(t){return Array.isArray(t)?t.filter(p):[]}function y(t,e){return function(t){const e=[Node.DOCUMENT_NODE,Node.DOCUMENT_FRAGMENT_NODE,Node.ELEMENT_NODE];return function(t){return t instanceof Node}(t)&&e.includes(t.nodeType)}(t)?t:e.ownerDocument.querySelector(":root")}var g=n(426),h=n.n(g);function m(t=[]){const e=[[]];return t.forEach((t=>{e.forEach((n=>{e.push(n.concat(t))}))})),e.shift(),e.sort(((t,e)=>t.length-e.length))}function b(t=[]){if(0===t.length)return new RegExp(".^");const e=t.map((t=>"string"==typeof t?t.replace(/[|\\{}()[\]^$+?.]/g,"\\$&").replace(/\*/g,".+"):t.source)).join("|");return new RegExp(e)}const S=b(["class","id","ng-*"]);function v({nodeName:t,nodeValue:e}){return`[${t}='${x(e)}']`}function j({nodeName:t}){return!S.test(t)}function E(t){return[x(t.tagName.toLowerCase())]}const w=":".charCodeAt(0).toString(16).toUpperCase(),A=/[ !"#$%&'()\[\]{|}<>*+,./;=?@^`~\\]/;function x(t=""){return t.split("").map((t=>":"===t?`\\${w} `:A.test(t)?`\\${t}`:escape(t).replace(/%/g,"\\"))).join("")}const N={tag:E,id:function(t){const e=t.getAttribute("id")||"",n=`#${x(e)}`;return!u.test(e)&&o(t,n,t.ownerDocument)?[n]:[]},class:function(t){return(t.getAttribute("class")||"").trim().split(/\s+/).filter((t=>!s.test(t))).map((t=>`.${x(t)}`))},attribute:function(t){return[...t.attributes].filter(j).map(v)},nthchild:i,nthoftype:function(t){const e=E(t)[0],n=t.parentElement;if(n){const r=n.querySelectorAll(e);for(let n=0;n<r.length;n++)if(r[n]===t)return[`${e}:nth-of-type(${n+1})`]}return[]}};function O(t){return t.includes("tag")||t.includes("nthoftype")?[...t]:[...t,"tag"]}function T(t={}){const e=[...f];return t.tag&&t.nthoftype&&e.splice(e.indexOf("tag"),1),e.map((e=>{return(r=t)[n=e]?r[n].join(""):"";var n,r})).join("")}function $(t,e,n="",r){const c=function(t,e,n){const r=[],o=function(t,e,n){const r=(o=function(t,e){return function(t){const{selectors:e,combineBetweenSelectors:n,includeTag:r}=t,o=n?m(e):e.map((t=>[t]));return r?o.map(O):o}(e).map((e=>function(t,e){const n={};return t.forEach((t=>{const r=e[t];r.length>0&&(n[t]=r)})),h()(n).map(T)}(e,t))).filter((t=>t.length>0))}(function(t,e){const{blacklist:n,whitelist:r,combineWithinSelector:o}=e,c=b(n),i=b(r);return function(t){const{selectors:e,includeTag:n}=t,r=[].concat(e);return n&&!r.includes("tag")&&r.push("tag"),r}(e).reduce(((e,n)=>{const r=function(t=[],e){return t.sort(((t,n)=>{const r=e.test(t),o=e.test(n);return r&&!o?-1:!r&&o?1:0}))}(function(t=[],e,n){return t.filter((t=>n.test(t)||!e.test(t)))}(function(t,e){return(N[e]||(()=>[]))(t)}(t,n),c,i),i);return e[n]=o?m(r):r.map((t=>[t])),e}),{})}(t,n),n),[].concat(...o));var o;return[...new Set(r)]}(t,0,n);for(const t of o)r.push(" "+t);if(e===t.parentNode)for(const t of o)r.push(" > "+t);return r}(t,r.root,r);for(const e of c){const c=(n+e).trim();if(o(t,c,r.root))return c}return null}function D(t,e={}){const n=function(t,e={}){const n=Object.assign(Object.assign({},a),e);return{selectors:(r=n.selectors,Array.isArray(r)?r.filter((t=>l.includes(t))):[]),whitelist:d(n.whitelist),blacklist:d(n.blacklist),root:y(n.root,t),combineWithinSelector:!!n.combineWithinSelector,combineBetweenSelectors:!!n.combineBetweenSelectors,includeTag:!!n.includeTag};var r}(t,e);let r="",o=n.root;function u(){return function(t,e,n="",r){for(const o of c(t,e)){const t=$(o,0,n,r);if(t)return{foundElement:o,selector:t}}return null}(t,o,r,n)}let s=u();for(;s;){const{foundElement:e,selector:n}=s;if(e===t)return n;o=e,r=n,s=u()}return function(t){return[":root",...c(t).map((t=>i(t)[0])).reverse()].join(" > ")}(t)}const C=D})(),r})()}));