/**
 * @file ext-markers.js
 *
 * @license Apache-2.0
 *
 * @copyright 2010 Will Schleter based on ext-arrows.js by Copyright(c) 2010 Alexis Deveria
 * @copyright 2021 OptimistikSAS
 *
 * This extension provides for the addition of markers to the either end
 * or the middle of a line, polyline, path, polygon.
 *
 * Markers are graphics
 *
 * to simplify the coding and make the implementation as robust as possible,
 * markers are not shared - every object has its own set of markers.
 * this relationship is maintained by a naming convention between the
 * ids of the markers and the ids of the object
 *
 * The following restrictions exist for simplicty of use and programming
 *    objects and their markers to have the same color
 *    marker size is fixed
 *    an application specific attribute - se_type - is added to each marker element
 *        to store the type of marker
 *
 * @todo
 *    remove some of the restrictions above
 *
*/
var t={name:"markers",async init(t){const{svgCanvas:e}=this,{$id:r,addSVGElementFromJson:n}=e,a=["start","mid","end"],i=["line","path","polyline","polygon"],o={nomarker:{},leftarrow:{element:"path",attr:{d:"M0,50 L100,90 L70,50 L100,10 Z"}},rightarrow:{element:"path",attr:{d:"M100,50 L0,90 L30,50 L0,10 Z"}},box:{element:"path",attr:{d:"M20,20 L20,80 L80,80 L80,20 Z"}},mcircle:{element:"circle",attr:{r:30,cx:50,cy:50}}};["leftarrow","rightarrow","box","mcircle"].forEach((t=>{o[t+"_o"]=o[t]}));const getLinked=(t,r)=>{const n=t.getAttribute(r);if(!n)return null;const a=n.match(/\(#(.*)\)/);return a&&2===a.length?e.getElem(a[1]):null},showPanel=(t,e)=>{r("marker_panel").style.display=t?"block":"none",t&&e&&a.forEach((t=>{var n;const a=getLinked(e,"marker-"+t);null!=a&&null!==(n=a.attributes)&&void 0!==n&&n.se_type?r("".concat(t,"_marker_list_opts")).setAttribute("value",a.attributes.se_type.value):r("".concat(t,"_marker_list_opts")).setAttribute("value","nomarker")}))},addMarker=(t,r)=>{const a=e.getSelectedElems();let i=e.getElem(t);if(i)return;if(""===r||"nomarker"===r)return;const s=a[0].getAttribute("stroke");if(!o[r])return void console.error("unknown marker type: ".concat(r));i=n({element:"marker",attr:{id:t,markerUnits:"strokeWidth",orient:"auto",style:"pointer-events:none",se_type:r}});const l=n(o[r]),c="_o"===r.substr(-2)?"none":s;return l.setAttribute("fill",c),l.setAttribute("stroke",s),l.setAttribute("stroke-width",10),i.append(l),i.setAttribute("viewBox","0 0 100 100"),i.setAttribute("markerWidth",5),i.setAttribute("markerHeight",5),i.setAttribute("refX",50),i.setAttribute("refY",50),e.findDefs().append(i),i},setMarker=(r,i)=>{const o=e.getSelectedElems();if(0===o.length)return;const s="marker-"+r,l=o[0],c=getLinked(l,s);c&&c.remove(),l.removeAttribute(s);let m=i;if(""===m&&(m="nomarker"),"nomarker"===m)return void e.call("changed",o);const u="mkr_"+r+"_"+l.id;addMarker(u,m),e.changeSelectedAttribute(s,"url(#"+u+")"),"line"===l.tagName&&"mid"===r&&(r=>{if("line"!==r.tagName)return r;const i=Number(r.getAttribute("x1")),o=Number(r.getAttribute("x2")),s=Number(r.getAttribute("y1")),l=Number(r.getAttribute("y2")),{id:c}=r,m=n({element:"polyline",attr:{points:i+","+s+" "+(i+o)/2+","+(s+l)/2+" "+o+","+l,stroke:r.getAttribute("stroke"),"stroke-width":r.getAttribute("stroke-width"),fill:"none",opacity:r.getAttribute("opacity")||1}});a.forEach((t=>{const e="marker-"+t;r.getAttribute(e)&&m.setAttribute(e,r.getAttribute(e))}));const u=new t.BatchCommand;u.addSubCommand(new t.RemoveElementCommand(r,r.parentNode)),u.addSubCommand(new t.InsertElementCommand(m)),r.insertAdjacentElement("afterend",m),r.remove(),e.clearSelection(),m.id=c,e.addToSelection([m]),t.addCommandToHistory(u)})(l),e.call("changed",o)};return{name:this.i18next.t("".concat(name,":name")),callback(){const t=document.createElement("template");let e='<div id="marker_panel">';a.forEach((t=>{e+='<se-list id="'.concat(t,'_marker_list_opts" title="tools.').concat(t,'_marker_list_opts" label="" width="22px" height="22px">'),Object.entries(o).forEach((r=>{let[n,a]=r;e+='<se-list-item id="mkr_'.concat(t,"_").concat(n,'" value="').concat(n,'" title="tools.mkr_').concat(n,'" src="').concat(n,'.svg" img-height="22px"></se-list-item>')})),e+="</se-list>"})),e+="</div>",t.innerHTML=e,r("tools_top").appendChild(t.content.cloneNode(!0)),showPanel(!1),a.forEach((t=>{r("".concat(t,"_marker_list_opts")).addEventListener("change",(e=>{setMarker(t,e.detail.value)}))}))},selectedChanged(t){0===t.elems.length&&showPanel(!1),t.elems.forEach((e=>{e&&i.includes(e.tagName)&&t.selectedElement&&!t.multiselected?showPanel(!0,e):showPanel(!1)}))},elementChanged(t){const r=t.elems[0];r&&(r.getAttribute("marker-start")||r.getAttribute("marker-mid")||r.getAttribute("marker-end"))&&((t=>{const e=t.getAttribute("stroke");a.forEach((r=>{const n=getLinked(t,"marker-"+r);if(!n)return;if(!n.attributes.se_type)return;const a=n.lastElementChild;if(!a)return;const i=a.getAttribute("fill"),o=a.getAttribute("stroke");i&&"none"!==i&&a.setAttribute("fill",e),o&&"none"!==o&&a.setAttribute("stroke",e)}))})(r),(t=>{const r=e.getSelectedElems();a.forEach((n=>{const a="marker-"+n,i=getLinked(t,a);if(!i||!i.attributes.se_type)return;const o=t.getAttribute(a);if(o){const s=t.id.length,l=o.substr(-s-1,s);if(t.id!==l){const o="mkr_"+n+"_"+t.id;addMarker(o,i.attributes.se_type.value),e.changeSelectedAttribute(a,"url(#"+o+")"),e.call("changed",r)}}}))})(r))}}}};export{t as default};
