if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,l)=>{const r=s||("document"in self?document.currentScript.src:"")||location.href;if(e[r])return;let u={};const t=s=>i(s,r),o={module:{uri:r},exports:u,require:t};e[r]=Promise.all(n.map((s=>o[s]||t(s)))).then((s=>(l(...s),u)))}}define(["./workbox-3e911b1d"],(function(s){"use strict";self.addEventListener("message",(s=>{s.data&&"SKIP_WAITING"===s.data.type&&self.skipWaiting()})),s.clientsClaim(),s.precacheAndRoute([{url:"assets/index-BHMClKH2.js",revision:null},{url:"assets/index-BOaxcqHz.js",revision:null},{url:"assets/index-BSAZhzZx.js",revision:null},{url:"assets/index-BUG1B8v1.js",revision:null},{url:"assets/index-Bv8B1Lzb.js",revision:null},{url:"assets/index-C_aolqmU.js",revision:null},{url:"assets/index-C2o2j-tx.js",revision:null},{url:"assets/index-c2V3InAJ.js",revision:null},{url:"assets/index-Cfkf-ciZ.js",revision:null},{url:"assets/index-Ch_qCilz.js",revision:null},{url:"assets/index-CV8atAqF.js",revision:null},{url:"assets/index-CvBTqz6Y.js",revision:null},{url:"assets/index-D0Zq5UJG.js",revision:null},{url:"assets/index-D7TIu75F.js",revision:null},{url:"assets/index-DE5EcRlk.js",revision:null},{url:"assets/index-DJ9TW23k.js",revision:null},{url:"assets/index-Ds58whyd.css",revision:null},{url:"assets/index-Dwteuxnt.js",revision:null},{url:"assets/index-hLKzyu59.js",revision:null},{url:"assets/index-npyI-yx5.js",revision:null},{url:"assets/index-TMcDMeEK.js",revision:null},{url:"assets/index-tSjz5lJ2.js",revision:null},{url:"assets/index-tVu2j6yl.js",revision:null},{url:"assets/index-vY-h4J_N.js",revision:null},{url:"assets/list-item-xb9BgIlX.js",revision:null},{url:"assets/module-BvCTiNll.js",revision:null},{url:"assets/native-B5Vb9Oiz.js",revision:null},{url:"assets/workbox-window.prod.es5-D5gOYdM7.js",revision:null},{url:"favicon.png",revision:"886d0834415f49c7e07082bbb730c056"},{url:"index.html",revision:"6698ae05cd379965f1b03349ae59b9c6"},{url:"favicon.png",revision:"886d0834415f49c7e07082bbb730c056"},{url:"manifest.webmanifest",revision:"8459765d418fef91a348f5c06e84c63d"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
