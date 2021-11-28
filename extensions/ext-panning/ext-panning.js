/**
 * @file ext-panning.js
 *
 * @license MIT
 *
 * @copyright 2013 Luis Aguirre
 *
 */
const n="panning",loadExtensionTranslation=async function(e){let o;const i=e.configObj.pref("lang");try{o=await function __variableDynamicImportRuntime0__(n){switch(n){case"./locale/en.js":return Promise.resolve().then((function(){return t}));case"./locale/zh-CN.js":return Promise.resolve().then((function(){return a}));default:return new Promise((function(e,t){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+n)))}))}}("./locale/".concat(i,".js"))}catch(e){console.warn("Missing translation (".concat(i,") for ").concat(n," - using 'en'")),o=await Promise.resolve().then((function(){return t}))}e.i18next.addResourceBundle(i,n,o.default)};var e={name:n,async init(){const e=this;await loadExtensionTranslation(e);const{svgCanvas:t}=e,{$id:a}=t;return{name:e.i18next.t("".concat(n,":name")),callback(){const e="".concat(n,":buttons.0.title"),o=document.createElement("template");var i,r;o.innerHTML='\n        <se-button id="ext-panning" title="'.concat(e,'" src="panning.svg"></se-button>\n        '),i=a("tool_zoom"),r=o.content.cloneNode(!0),i.parentNode.insertBefore(r,i.nextSibling),a("ext-panning").addEventListener("click",(()=>{this.leftPanel.updateLeftPanel("ext-panning")&&t.setMode("ext-panning")}))},mouseDown(){if("ext-panning"===t.getMode())return e.setPanning(!0),{started:!0}},mouseUp(){if("ext-panning"===t.getMode())return e.setPanning(!1),{keep:!1,element:null}}}}},t=Object.freeze({__proto__:null,default:{name:"Extension Panning",buttons:[{title:"Panning"}]}}),a=Object.freeze({__proto__:null,default:{name:"移动",buttons:[{title:"移动"}]}});export{e as default};
