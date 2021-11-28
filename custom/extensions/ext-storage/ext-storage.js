const e=document.createElement("template");e.innerHTML='\n  <link href=\'./custom/module.css\' rel=\'stylesheet\'/>\n  <style>\n  #dialog_content {\n    margin: 10px 10px 5px 10px;\n    overflow: auto;\n    text-align: left;\n  }\n  #dialog_content p,\n  #dialog_content select,\n  #dialog_content label {\n    margin: 10px;\n    line-height: 1.3em;\n  }\n  #dialog_container {\n    font-family: Verdana;\n    text-align: center;\n    left: 50%;\n    top: 50%;\n    max-width: 440px;\n    z-index: 50001;\n    color: var(--text-color);\n    background: var(--main-bg-color);\n    border: 1px outset var(--border-color);\n    font-family: Verdana, Helvetica, sans-serif;\n    font-size: 0.8em;\n  }\n  #dialog_container,\n  #dialog_content {\n    border-radius: 5px;\n    -moz-border-radius: 5px;\n    -webkit-border-radius: 5px;\n  }\n  #dialog_buttons {\n    margin-bottom: 5px;\n  }\n  #dialog_buttons input[type=text] {\n    width: 90%;\n    display: block;\n    margin: 0 0 5px 11px;\n  }\n  #dialog_buttons input[type=button] {\n    margin: 0 1em;\n  }\n  </style>\n  <elix-dialog id="dialog_box" aria-label="Online SVG-Editor storage preferences" closed>\n    <div class="overlay"></div>\n    <div id="dialog_container">\n      <div id="dialog_content">\n        <p id="notificationNote"> </p>\n        <select id="se-storage-pref">\n          <option value="prefsAndContent" id="prefsAndContent"></option>\n          <option value="prefsOnly" id="prefsOnly"></option>\n          <option value="noPrefsOrContent" id="noPrefsOrContent"></option>\n        </select>\n        <label title="" id="se-remember-title">\n          <input type="checkbox" id="se-remember" value="" checked>\n        </label>\n      </div>\n      <div id="dialog_buttons">\n        <button id="storage_ok" class="se-btn-primary"></button>\n        <button id="storage_cancel" class="se-btn-primary"></button>\n      </div>\n    </div>\n  </elix-dialog>\n';class SeStorageDialog extends HTMLElement{constructor(){super(),this._shadowRoot=this.attachShadow({mode:"open"}),this._shadowRoot.append(e.content.cloneNode(!0)),this.$dialog=this._shadowRoot.querySelector("#dialog_box"),this.$storage=this._shadowRoot.querySelector("#js-storage"),this.$okBtn=this._shadowRoot.querySelector("#storage_ok"),this.$cancelBtn=this._shadowRoot.querySelector("#storage_cancel"),this.$storageInput=this._shadowRoot.querySelector("#se-storage-pref"),this.$rememberInput=this._shadowRoot.querySelector("#se-remember")}init(e){this.setAttribute("common-ok",e.t("common.ok")),this.setAttribute("common-cancel",e.t("common.cancel")),this.setAttribute("notify-editor_pref_msg",e.t("notification.editorPreferencesMsg")),this.setAttribute("properties-prefs_and_content",e.t("properties.prefs_and_content")),this.setAttribute("properties-prefs_only",e.t("properties.prefs_only")),this.setAttribute("properties-no_prefs_or_content",e.t("properties.no_prefs_or_content")),this.setAttribute("tools-remember_this_choice",e.t("tools.remember_this_choice")),this.setAttribute("tools-remember_this_choice_title",e.t("tools.remember_this_choice_title"))}static get observedAttributes(){return["dialog","storage","common-ok","common-cancel","notify-editor_pref_msg","properties-prefs_and_content","tools-remember_this_choice","tools-remember_this_choice_title","properties-prefs_only","properties-no_prefs_or_content"]}attributeChangedCallback(e,t,o){let n;switch(e){case"dialog":"open"===o?this.$dialog.open():this.$dialog.close();break;case"storage":this.$storageInput.options[0].disabled="true"!==o;break;case"common-ok":this.$okBtn.textContent=o;break;case"common-cancel":this.$cancelBtn.textContent=o;break;case"notify-editor_pref_msg":n=this._shadowRoot.querySelector("#notificationNote"),n.textContent=o;break;case"properties-prefs_and_content":n=this._shadowRoot.querySelector("#prefsAndContent"),n.textContent=o;break;case"properties-prefs_only":n=this._shadowRoot.querySelector("#prefsOnly"),n.textContent=o;break;case"properties-no_prefs_or_content":n=this._shadowRoot.querySelector("#noPrefsOrContent"),n.textContent=o;break;case"tools-remember_this_choice":n=this._shadowRoot.querySelector("#se-remember-title"),n.prepend(o);break;case"tools-remember_this_choice_title":n=this._shadowRoot.querySelector("#se-remember-title"),n.setAttribute("title",o)}}get dialog(){return this.getAttribute("dialog")}set dialog(e){this.setAttribute("dialog",e)}connectedCallback(){const onSubmitHandler=(e,t)=>{const o=new CustomEvent("change",{detail:{trigger:t,select:this.$storageInput.value,checkbox:this.$rememberInput.checked}});this.dispatchEvent(o)};this.$okBtn.addEventListener("click",(e=>onSubmitHandler(0,"ok"))),this.$cancelBtn.addEventListener("click",(e=>onSubmitHandler(0,"cancel")))}setSVGContentStorage(e){if(this.storage){const t="svgedit-"+this.configObj.curConfig.canvasName;e?this.storage.setItem(t,e):this.storage.removeItem(t)}}}customElements.define("se-storage-dialog",SeStorageDialog);
/**
 * @file ext-storage.js
 *
 * This extension allows automatic saving of the SVG canvas contents upon
 *  page unload (which can later be automatically retrieved upon future
 *  editor loads).
 *
 *  The functionality was originally part of the SVG Editor, but moved to a
 *  separate extension to make the setting behavior optional, and adapted
 *  to inform the user of its setting of local data.
 *
 * @license MIT
 *
 * @copyright 2010 Brett Zamir
 * @todo Revisit on whether to use `svgEditor.pref` over directly setting
 * `curConfig` in all extensions for a more public API (not only for `extPath`
 * and `imagePath`, but other currently used config in the extensions)
 * @todo We might provide control of storage settings through the UI besides the
 *   initial (or URL-forced) dialog. *
*/
const removeStoragePrefCookie=()=>{expireCookie("svgeditstore")},expireCookie=e=>{document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT"},replaceStoragePrompt=e=>{e=e?"storagePrompt="+e:"";const t=top.location;t.href.includes("storagePrompt=")?t.href=t.href.replace(/([&?])storagePrompt=[^&]*(&?)/,(function(t,o,n){return(e?o:"")+e+(!e&&n?o:n||"")})):t.href+=(t.href.includes("?")?"&":"?")+e};var t={name:"storage",init(){const e=this,{svgCanvas:t,storage:o}=e,{noStorageOnLoad:n,forceStorage:r}=e.configObj.curConfig,i=document.createElement("se-storage-dialog");function setupBeforeUnloadListener(){window.addEventListener("beforeunload",(function(){if(!/(?:^|;\s*)svgeditstore=(?:prefsAndContent|prefsOnly)/.test(document.cookie))return;/(?:^|;\s*)svgeditstore=prefsAndContent/.test(document.cookie)&&function setSVGContentStorage(t){if(o){const n="svgedit-"+e.configObj.curConfig.canvasName;t?o.setItem(n,t):o.removeItem(n)}}(t.getSvgString()),e.setConfig({no_save_warning:!0});const{curPrefs:n}=e.configObj;Object.entries(n).forEach((e=>{let[t,n]=e;t="svg-edit-"+t,void 0!==n&&(o?o.setItem(t,n):window.widget?window.widget.setPreferenceForKey(n,t):(n=encodeURIComponent(n),document.cookie=encodeURIComponent(t)+"="+n+"; expires=Fri, 31 Dec 9999 23:59:59 GMT"))}))}))}i.setAttribute("id","se-storage-dialog"),e.$container.append(i),i.init(e.i18next),i.addEventListener("change",(t=>{var o,n,r;if(i.setAttribute("dialog","close"),"ok"===(null==t||null===(o=t.detail)||void 0===o?void 0:o.trigger))if("noPrefsOrContent"!==(null==t||null===(r=t.detail)||void 0===r?void 0:r.select)){var s;const e=new URL(top.location).searchParams.get("storagePrompt");if(document.cookie="svgeditstore="+encodeURIComponent(t.detail.select)+"; expires=Fri, 31 Dec 9999 23:59:59 GMT","true"===e&&null!=t&&null!==(s=t.detail)&&void 0!==s&&s.checkbox)return void replaceStoragePrompt()}else{var a,c,l;if(removeStoragePrefCookie(),e.configObj.curConfig.emptyStorageOnDecline&&null!=t&&null!==(a=t.detail)&&void 0!==a&&a.checkbox&&(this.setSVGContentStorage(""),Object.keys(e.curPrefs).forEach((t=>{t="svg-edit-"+t,e.storage&&e.storage.removeItem(t),expireCookie(t)}))),null!=t&&null!==(c=t.detail)&&void 0!==c&&c.select&&null!=t&&null!==(l=t.detail)&&void 0!==l&&l.checkbox)return void replaceStoragePrompt("false")}else"cancel"===(null==t||null===(n=t.detail)||void 0===n?void 0:n.trigger)&&removeStoragePrefCookie();setupBeforeUnloadListener(),e.storagePromptState="closed",e.updateCanvas(!0)}));let s=!1;return{name:"storage",callback(){const t=new URL(top.location).searchParams.get("storagePrompt");if(!s)if(s=!0,r||"true"!==t&&("false"===t||/(?:^|;\s*)svgeditstore=(?:prefsAndContent|prefsOnly)/.test(document.cookie)))n&&!r||setupBeforeUnloadListener();else{const t=Boolean(o);e.storagePromptState="waiting";const n=document.getElementById("se-storage-dialog");n.setAttribute("dialog","open"),n.setAttribute("storage",t)}}}}};export{t as default};
