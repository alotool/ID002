/**
 * @file ext-eyedropper.js
 *
 * @license MIT
 *
 * @copyright 2010 Jeff Schiller
 * @copyright 2021 OptimistikSAS
 *
 */
const e="eyedropper",loadExtensionTranslation=async function(t){let i;const a=t.configObj.pref("lang");try{i=await function __variableDynamicImportRuntime0__(e){switch(e){case"./locale/en.js":return Promise.resolve().then((function(){return o}));case"./locale/fr.js":return Promise.resolve().then((function(){return r}));case"./locale/zh-CN.js":return Promise.resolve().then((function(){return n}));default:return new Promise((function(t,o){("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(o.bind(null,new Error("Unknown variable dynamic import: "+e)))}))}}("./locale/".concat(a,".js"))}catch(t){console.warn("Missing translation (".concat(a,") for ").concat(e," - using 'en'")),i=await Promise.resolve().then((function(){return o}))}t.i18next.addResourceBundle(a,e,i.default)};var t={name:e,async init(t){const o=this;await loadExtensionTranslation(o);const{ChangeElementCommand:r}=t,{svgCanvas:n}=o,i={fillPaint:"red",fillOpacity:1,strokePaint:"black",strokeOpacity:1,strokeWidth:5,strokeDashArray:null,opacity:1,strokeLinecap:"butt",strokeLinejoin:"miter"},{$id:a}=n,getStyle=e=>{if("eyedropper"===n.getMode())return;const t=a("tool_eyedropper");let o=null;e.multiselected||!e.elems[0]||["svg","g","use"].includes(e.elems[0].nodeName)?t.classList.add("disabled"):(o=e.elems[0],t.classList.remove("disabled"),i.fillPaint=o.getAttribute("fill")||"black",i.fillOpacity=o.getAttribute("fill-opacity")||1,i.strokePaint=o.getAttribute("stroke"),i.strokeOpacity=o.getAttribute("stroke-opacity")||1,i.strokeWidth=o.getAttribute("stroke-width"),i.strokeDashArray=o.getAttribute("stroke-dasharray"),i.strokeLinecap=o.getAttribute("stroke-linecap"),i.strokeLinejoin=o.getAttribute("stroke-linejoin"),i.opacity=o.getAttribute("opacity")||1)};return{name:o.i18next.t("".concat(e,":name")),callback(){const t="".concat(e,":buttons.0.title"),o="".concat(e,":buttons.0.key"),r='\n        <se-button id="tool_eyedropper" title="'.concat(t,'" src="eye_dropper.svg" shortcut=').concat(o,"></se-button>\n        ");n.insertChildAtIndex(a("tools_left"),r,12),a("tool_eyedropper").addEventListener("click",(()=>{this.leftPanel.updateLeftPanel("tool_eyedropper")&&n.setMode("eyedropper")}))},selectedChanged:getStyle,elementChanged:getStyle,mouseDown(e){if("eyedropper"===n.getMode()){const o=e.event,{target:a}=o;if(!["svg","g","use"].includes(a.nodeName)){const e={},change=function(t,o,r){e[o]=t.getAttribute(o),t.setAttribute(o,r)};i.fillPaint&&change(a,"fill",i.fillPaint),i.fillOpacity&&change(a,"fill-opacity",i.fillOpacity),i.strokePaint&&change(a,"stroke",i.strokePaint),i.strokeOpacity&&change(a,"stroke-opacity",i.strokeOpacity),i.strokeWidth&&change(a,"stroke-width",i.strokeWidth),i.strokeDashArray&&change(a,"stroke-dasharray",i.strokeDashArray),i.opacity&&change(a,"opacity",i.opacity),i.strokeLinecap&&change(a,"stroke-linecap",i.strokeLinecap),i.strokeLinejoin&&change(a,"stroke-linejoin",i.strokeLinejoin),t=new r(a,e),n.undoMgr.addCommandToHistory(t)}}var t}}}},o=Object.freeze({__proto__:null,default:{name:"eyedropper",buttons:[{title:"Eye Dropper Tool",key:"I"}]}}),r=Object.freeze({__proto__:null,default:{name:"pipette",buttons:[{title:"Outil pipette",key:"I"}]}}),n=Object.freeze({__proto__:null,default:{name:"滴管",buttons:[{title:"滴管工具",key:"I"}]}});export{t as default};
