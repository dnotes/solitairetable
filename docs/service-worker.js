try{self["workbox:core:6.2.4"]&&_()}catch(K){}const e=(e,...s)=>{let r=e;return s.length>0&&(r+=` :: ${JSON.stringify(s)}`),r};class s extends Error{constructor(s,r){super(e(s,r)),this.name=s,this.details=r}}const r={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},t=e=>[r.prefix,e,r.suffix].filter((e=>e&&e.length>0)).join("-"),a=e=>e||t(r.precache),i=e=>e||t(r.runtime);function n(e,s){const r=s();return e.waitUntil(r),r}try{self["workbox:precaching:6.2.4"]&&_()}catch(K){}function o(e){if(!e)throw new s("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const s=new URL(e,location.href);return{cacheKey:s.href,url:s.href}}const{revision:r,url:t}=e;if(!t)throw new s("add-to-cache-list-unexpected-type",{entry:e});if(!r){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const a=new URL(t,location.href),i=new URL(t,location.href);return a.searchParams.set("__WB_REVISION__",r),{cacheKey:a.href,url:i.href}}class l{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:s})=>{s&&(s.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:s,cachedResponse:r})=>{if("install"===e.type&&s&&s.originalRequest&&s.originalRequest instanceof Request){const e=s.originalRequest.url;r?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return r}}}class c{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:s})=>{const r=(null==s?void 0:s.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return r?new Request(r,{headers:e.headers}):e},this._precacheController=e}}let u;async function h(e,r){let t=null;if(e.url){t=new URL(e.url).origin}if(t!==self.location.origin)throw new s("cross-origin-copy-response",{origin:t});const a=e.clone(),i={headers:new Headers(a.headers),status:a.status,statusText:a.statusText},n=r?r(i):i,o=function(){if(void 0===u){const s=new Response("");if("body"in s)try{new Response(s.body),u=!0}catch(e){u=!1}u=!1}return u}()?a.body:await a.blob();return new Response(o,n)}function d(e,s){const r=new URL(e);for(const t of s)r.searchParams.delete(t);return r.href}class v{constructor(){this.promise=new Promise(((e,s)=>{this.resolve=e,this.reject=s}))}}const g=new Set;try{self["workbox:strategies:6.2.4"]&&_()}catch(K){}function p(e){return"string"==typeof e?new Request(e):e}class f{constructor(e,s){this._cacheKeys={},Object.assign(this,s),this.event=s.event,this._strategy=e,this._handlerDeferred=new v,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const r of this._plugins)this._pluginStateMap.set(r,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:r}=this;let t=p(e);if("navigate"===t.mode&&r instanceof FetchEvent&&r.preloadResponse){const e=await r.preloadResponse;if(e)return e}const a=this.hasCallback("fetchDidFail")?t.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))t=await e({request:t.clone(),event:r})}catch(n){if(n instanceof Error)throw new s("plugin-error-request-will-fetch",{thrownErrorMessage:n.message})}const i=t.clone();try{let e;e=await fetch(t,"navigate"===t.mode?void 0:this._strategy.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))e=await s({event:r,request:i,response:e});return e}catch(o){throw a&&await this.runCallbacks("fetchDidFail",{error:o,event:r,originalRequest:a.clone(),request:i.clone()}),o}}async fetchAndCachePut(e){const s=await this.fetch(e),r=s.clone();return this.waitUntil(this.cachePut(e,r)),s}async cacheMatch(e){const s=p(e);let r;const{cacheName:t,matchOptions:a}=this._strategy,i=await this.getCacheKey(s,"read"),n=Object.assign(Object.assign({},a),{cacheName:t});r=await caches.match(i,n);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))r=await o({cacheName:t,matchOptions:a,cachedResponse:r,request:i,event:this.event})||void 0;return r}async cachePut(e,r){const t=p(e);var a;await(a=0,new Promise((e=>setTimeout(e,a))));const i=await this.getCacheKey(t,"write");if(!r)throw new s("cache-put-with-no-response",{url:(n=i.url,new URL(String(n),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var n;const o=await this._ensureResponseSafeToCache(r);if(!o)return!1;const{cacheName:l,matchOptions:c}=this._strategy,u=await self.caches.open(l),h=this.hasCallback("cacheDidUpdate"),v=h?await async function(e,s,r,t){const a=d(s.url,r);if(s.url===a)return e.match(s,t);const i=Object.assign(Object.assign({},t),{ignoreSearch:!0}),n=await e.keys(s,i);for(const o of n)if(a===d(o.url,r))return e.match(o,t)}(u,i.clone(),["__WB_REVISION__"],c):null;try{await u.put(i,h?o.clone():o)}catch(f){if(f instanceof Error)throw"QuotaExceededError"===f.name&&await async function(){for(const e of g)await e()}(),f}for(const s of this.iterateCallbacks("cacheDidUpdate"))await s({cacheName:l,oldResponse:v,newResponse:o.clone(),request:i,event:this.event});return!0}async getCacheKey(e,s){if(!this._cacheKeys[s]){let r=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))r=p(await e({mode:s,request:r,event:this.event,params:this.params}));this._cacheKeys[s]=r}return this._cacheKeys[s]}hasCallback(e){for(const s of this._strategy.plugins)if(e in s)return!0;return!1}async runCallbacks(e,s){for(const r of this.iterateCallbacks(e))await r(s)}*iterateCallbacks(e){for(const s of this._strategy.plugins)if("function"==typeof s[e]){const r=this._pluginStateMap.get(s),t=t=>{const a=Object.assign(Object.assign({},t),{state:r});return s[e](a)};yield t}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let s=e,r=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(s=await t({request:this.request,response:s,event:this.event})||void 0,r=!0,!s)break;return r||s&&200!==s.status&&(s=void 0),s}}class m extends class{constructor(e={}){this.cacheName=i(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[s]=this.handleAll(e);return s}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const s=e.event,r="string"==typeof e.request?new Request(e.request):e.request,t="params"in e?e.params:void 0,a=new f(this,{event:s,request:r,params:t}),i=this._getResponse(a,r,s);return[i,this._awaitComplete(i,a,r,s)]}async _getResponse(e,r,t){let a;await e.runCallbacks("handlerWillStart",{event:t,request:r});try{if(a=await this._handle(r,e),!a||"error"===a.type)throw new s("no-response",{url:r.url})}catch(i){if(i instanceof Error)for(const s of e.iterateCallbacks("handlerDidError"))if(a=await s({error:i,event:t,request:r}),a)break;if(!a)throw i}for(const s of e.iterateCallbacks("handlerWillRespond"))a=await s({event:t,request:r,response:a});return a}async _awaitComplete(e,s,r,t){let a,i;try{a=await e}catch(n){}try{await s.runCallbacks("handlerDidRespond",{event:t,request:r,response:a}),await s.doneWaiting()}catch(o){o instanceof Error&&(i=o)}if(await s.runCallbacks("handlerDidComplete",{event:t,request:r,response:a,error:i}),s.destroy(),i)throw i}}{constructor(e={}){e.cacheName=a(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(m.copyRedirectedCacheableResponsesPlugin)}async _handle(e,s){const r=await s.cacheMatch(e);return r||(s.event&&"install"===s.event.type?await this._handleInstall(e,s):await this._handleFetch(e,s))}async _handleFetch(e,r){let t;const a=r.params||{};if(!this._fallbackToNetwork)throw new s("missing-precache-entry",{cacheName:this.cacheName,url:e.url});{const s=a.integrity,i=e.integrity,n=!i||i===s;t=await r.fetch(new Request(e,{integrity:i||s})),s&&n&&(this._useDefaultCacheabilityPluginIfNeeded(),await r.cachePut(e,t.clone()))}return t}async _handleInstall(e,r){this._useDefaultCacheabilityPluginIfNeeded();const t=await r.fetch(e);if(!(await r.cachePut(e,t.clone())))throw new s("bad-precaching-response",{url:e.url,status:t.status});return t}_useDefaultCacheabilityPluginIfNeeded(){let e=null,s=0;for(const[r,t]of this.plugins.entries())t!==m.copyRedirectedCacheableResponsesPlugin&&(t===m.defaultPrecacheCacheabilityPlugin&&(e=r),t.cacheWillUpdate&&s++);0===s?this.plugins.push(m.defaultPrecacheCacheabilityPlugin):s>1&&null!==e&&this.plugins.splice(e,1)}}m.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},m.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:e})=>e.redirected?await h(e):e};class y{constructor({cacheName:e,plugins:s=[],fallbackToNetwork:r=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new m({cacheName:a(e),plugins:[...s,new c({precacheController:this})],fallbackToNetwork:r}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const r=[];for(const t of e){"string"==typeof t?r.push(t):t&&void 0===t.revision&&r.push(t.url);const{cacheKey:e,url:a}=o(t),i="string"!=typeof t&&t.revision?"reload":"default";if(this._urlsToCacheKeys.has(a)&&this._urlsToCacheKeys.get(a)!==e)throw new s("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(a),secondEntry:e});if("string"!=typeof t&&t.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==t.integrity)throw new s("add-to-cache-list-conflicting-integrities",{url:a});this._cacheKeysToIntegrities.set(e,t.integrity)}if(this._urlsToCacheKeys.set(a,e),this._urlsToCacheModes.set(a,i),r.length>0){const e=`Workbox is precaching URLs without revision info: ${r.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return n(e,(async()=>{const s=new l;this.strategy.plugins.push(s);for(const[a,i]of this._urlsToCacheKeys){const s=this._cacheKeysToIntegrities.get(i),r=this._urlsToCacheModes.get(a),t=new Request(a,{integrity:s,cache:r,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:i},request:t,event:e}))}const{updatedURLs:r,notUpdatedURLs:t}=s;return{updatedURLs:r,notUpdatedURLs:t}}))}activate(e){return n(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),s=await e.keys(),r=new Set(this._urlsToCacheKeys.values()),t=[];for(const a of s)r.has(a.url)||(await e.delete(a),t.push(a.url));return{deletedURLs:t}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const s=new URL(e,location.href);return this._urlsToCacheKeys.get(s.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const s=e instanceof Request?e.url:e,r=this.getCacheKeyForURL(s);if(r){return(await self.caches.open(this.strategy.cacheName)).match(r)}}createHandlerBoundToURL(e){const r=this.getCacheKeyForURL(e);if(!r)throw new s("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:r},s.params),this.strategy.handle(s))}}let w;const b=()=>(w||(w=new y),w);try{self["workbox:routing:6.2.4"]&&_()}catch(K){}const k=e=>e&&"object"==typeof e?e:{handle:e};class q{constructor(e,s,r="GET"){this.handler=k(s),this.match=e,this.method=r}setCatchHandler(e){this.catchHandler=k(e)}}class R extends q{constructor(e,s,r){super((({url:s})=>{const r=e.exec(s.href);if(r&&(s.origin===location.origin||0===r.index))return r.slice(1)}),s,r)}}class C{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:s}=e,r=this.handleRequest({request:s,event:e});r&&e.respondWith(r)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:s}=e.data,r=Promise.all(s.urlsToCache.map((s=>{"string"==typeof s&&(s=[s]);const r=new Request(...s);return this.handleRequest({request:r,event:e})})));e.waitUntil(r),e.ports&&e.ports[0]&&r.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:s}){const r=new URL(e.url,location.href);if(!r.protocol.startsWith("http"))return;const t=r.origin===location.origin,{params:a,route:i}=this.findMatchingRoute({event:s,request:e,sameOrigin:t,url:r});let n=i&&i.handler;const o=e.method;if(!n&&this._defaultHandlerMap.has(o)&&(n=this._defaultHandlerMap.get(o)),!n)return;let l;try{l=n.handle({url:r,request:e,event:s,params:a})}catch(u){l=Promise.reject(u)}const c=i&&i.catchHandler;return l instanceof Promise&&(this._catchHandler||c)&&(l=l.catch((async t=>{if(c)try{return await c.handle({url:r,request:e,event:s,params:a})}catch(i){i instanceof Error&&(t=i)}if(this._catchHandler)return this._catchHandler.handle({url:r,request:e,event:s});throw t}))),l}findMatchingRoute({url:e,sameOrigin:s,request:r,event:t}){const a=this._routes.get(r.method)||[];for(const i of a){let a;const n=i.match({url:e,sameOrigin:s,request:r,event:t});if(n)return a=n,(Array.isArray(a)&&0===a.length||n.constructor===Object&&0===Object.keys(n).length||"boolean"==typeof n)&&(a=void 0),{route:i,params:a}}return{}}setDefaultHandler(e,s="GET"){this._defaultHandlerMap.set(s,k(e))}setCatchHandler(e){this._catchHandler=k(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new s("unregister-route-but-not-found-with-method",{method:e.method});const r=this._routes.get(e.method).indexOf(e);if(!(r>-1))throw new s("unregister-route-route-not-registered");this._routes.get(e.method).splice(r,1)}}let x;function j(e,r,t){let a;if("string"==typeof e){const s=new URL(e,location.href);a=new q((({url:e})=>e.href===s.href),r,t)}else if(e instanceof RegExp)a=new R(e,r,t);else if("function"==typeof e)a=new q(e,r,t);else{if(!(e instanceof q))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=e}return(x||(x=new C,x.addFetchListener(),x.addCacheListener()),x).registerRoute(a),a}class U extends q{constructor(e,s){super((({request:r})=>{const t=e.getURLsToCacheKeys();for(const a of function*(e,{ignoreURLParametersMatching:s=[/^utm_/,/^fbclid$/],directoryIndex:r="index.html",cleanURLs:t=!0,urlManipulation:a}={}){const i=new URL(e,location.href);i.hash="",yield i.href;const n=function(e,s=[]){for(const r of[...e.searchParams.keys()])s.some((e=>e.test(r)))&&e.searchParams.delete(r);return e}(i,s);if(yield n.href,r&&n.pathname.endsWith("/")){const e=new URL(n.href);e.pathname+=r,yield e.href}if(t){const e=new URL(n.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:i});for(const s of e)yield s.href}}(r.url,s)){const s=t.get(a);if(s){return{cacheKey:s,integrity:e.getIntegrityForCacheKey(s)}}}}),e.strategy)}}var L;(function(e){b().precache(e)})([{url:"/_app/start-c948e41b.js",revision:"tjjaau"},{url:"/_app/assets/start-464e9d0a.css",revision:"pnb8wq"},{url:"/_app/pages/__layout.svelte-21021ae1.js",revision:"m1s7hu"},{url:"/_app/assets/pages/__layout.svelte-5ba5802f.css",revision:"978i90"},{url:"/_app/error.svelte-e83f5e46.js",revision:"4r16ny"},{url:"/_app/pages/index.svelte-55a39c17.js",revision:"9vyasn"},{url:"/_app/assets/Table-ae3e56ab.css",revision:"5s4wuk"},{url:"/_app/pages/build/index.svelte-c39c6e22.js",revision:"4dnaep"},{url:"/_app/pages/play/index.svelte-8f95b2aa.js",revision:"lg7dm4"},{url:"/_app/pages/[slug].svelte-030a6f4d.js",revision:"b9hq6s"},{url:"/_app/chunks/vendor-33d0214b.js",revision:"36ne8t"},{url:"/_app/assets/vendor-b8c56e4e.css",revision:"7jb3ht"},{url:"/_app/chunks/singletons-12a22614.js",revision:"4wny0z"},{url:"/_app/chunks/preload-helper-ec9aa979.js",revision:"ydufvm"},{url:"/_app/chunks/GameControls-7fda7847.js",revision:"t3u29x"},{url:"/_app/assets/GameControls-ae33bbbc.css",revision:"p81x1v"},{url:"/_app/chunks/Game-f1a072f2.js",revision:"81gk7x"},{url:"/_app/chunks/README-03dbef2b.js",revision:"1hgjgm"},{url:"/_app/chunks/navigation-51f4a605.js",revision:"ase1dq"},{url:"/_app/chunks/Table-5e1d19cf.js",revision:"hcgt2y"},{url:"/_app/chunks/workbox-window.prod.es5-a2ea44c0.js",revision:"tsttk6"},{url:"/",revision:"ijkgfi"},{url:"/about",revision:"rrd3tn"},{url:"/play",revision:"a57bb8"},{url:"/build",revision:"llk462"},{url:"/.DS_Store",revision:"9ires6"},{url:"/.nojekyll",revision:"olw0vi"},{url:"/CNAME",revision:"tj07q9"},{url:"/apple-touch-icon.png",revision:"1syijs"},{url:"/browserconfig.xml",revision:"6l8z5i"},{url:"/cards/.DS_Store",revision:"ap4ui7"},{url:"/cards/2_clubs.svg",revision:"i4zg0w"},{url:"/cards/2_diamonds.svg",revision:"72v2m"},{url:"/cards/2_hearts.svg",revision:"ujbq73"},{url:"/cards/2_spades.svg",revision:"dyscs9"},{url:"/cards/3_clubs.svg",revision:"a4z50h"},{url:"/cards/3_diamonds.svg",revision:"q0lga0"},{url:"/cards/3_hearts.svg",revision:"o96ee4"},{url:"/cards/3_spades.svg",revision:"oo7nhg"},{url:"/cards/4_clubs.svg",revision:"i6mu1o"},{url:"/cards/4_diamonds.svg",revision:"jbvant"},{url:"/cards/4_hearts.svg",revision:"5nz5sw"},{url:"/cards/4_spades.svg",revision:"ma10jn"},{url:"/cards/5_clubs.svg",revision:"91cfk9"},{url:"/cards/5_diamonds.svg",revision:"onphe8"},{url:"/cards/5_hearts.svg",revision:"exoyor"},{url:"/cards/5_spades.svg",revision:"96sn14"},{url:"/cards/6_clubs.svg",revision:"ykk2q8"},{url:"/cards/6_diamonds.svg",revision:"tovhbh"},{url:"/cards/6_hearts.svg",revision:"4xlxqk"},{url:"/cards/6_spades.svg",revision:"9ggq7l"},{url:"/cards/7_clubs.svg",revision:"blo304"},{url:"/cards/7_diamonds.svg",revision:"6cqnui"},{url:"/cards/7_hearts.svg",revision:"1q0e42"},{url:"/cards/7_spades.svg",revision:"1klwru"},{url:"/cards/8_clubs.svg",revision:"rwjhe6"},{url:"/cards/8_diamonds.svg",revision:"o876uk"},{url:"/cards/8_hearts.svg",revision:"g423gz"},{url:"/cards/8_spades.svg",revision:"iu1g9"},{url:"/cards/9_clubs.svg",revision:"5paafy"},{url:"/cards/9_diamonds.svg",revision:"5lmjnm"},{url:"/cards/9_hearts.svg",revision:"iw3lvt"},{url:"/cards/9_spades.svg",revision:"7iqzyu"},{url:"/cards/A_clubs.svg",revision:"pu57us"},{url:"/cards/A_diamonds.svg",revision:"d4ppsi"},{url:"/cards/A_hearts.svg",revision:"wreia0"},{url:"/cards/A_spades.svg",revision:"b3h2pp"},{url:"/cards/J_clubs.svg",revision:"js36el"},{url:"/cards/J_diamonds.svg",revision:"hpqjsu"},{url:"/cards/J_hearts.svg",revision:"4f375a"},{url:"/cards/J_spades.svg",revision:"rl6gti"},{url:"/cards/K_clubs.svg",revision:"4mb08o"},{url:"/cards/K_diamonds.svg",revision:"kwpl69"},{url:"/cards/K_hearts.svg",revision:"bhf4kl"},{url:"/cards/K_spades.svg",revision:"pewm0j"},{url:"/cards/Q_clubs.svg",revision:"37jx82"},{url:"/cards/Q_diamonds.svg",revision:"24yp4f"},{url:"/cards/Q_hearts.svg",revision:"63fprn"},{url:"/cards/Q_spades.svg",revision:"p16he8"},{url:"/cards/T_clubs.svg",revision:"an2a4z"},{url:"/cards/T_diamonds.svg",revision:"98bbui"},{url:"/cards/T_hearts.svg",revision:"sone80"},{url:"/cards/T_spades.svg",revision:"lhvz86"},{url:"/cards/_back.svg",revision:"pt43ji"},{url:"/cards/_empty.svg",revision:"igof51"},{url:"/cards/_joker_black.svg",revision:"mkc4nx"},{url:"/cards/_joker_red.svg",revision:"gfg3f5"},{url:"/cards/small/.DS_Store",revision:"8up0x7"},{url:"/cards/small/2_clubs.svg",revision:"q7w7hx"},{url:"/cards/small/2_diamonds.svg",revision:"ofuipf"},{url:"/cards/small/2_hearts.svg",revision:"eeirfv"},{url:"/cards/small/2_spades.svg",revision:"i5hu1h"},{url:"/cards/small/3_clubs.svg",revision:"56r9hc"},{url:"/cards/small/3_diamonds.svg",revision:"egj9vz"},{url:"/cards/small/3_hearts.svg",revision:"fsl6po"},{url:"/cards/small/3_spades.svg",revision:"q7o1b9"},{url:"/cards/small/4_clubs.svg",revision:"40kslt"},{url:"/cards/small/4_diamonds.svg",revision:"iphdly"},{url:"/cards/small/4_hearts.svg",revision:"ysdv1c"},{url:"/cards/small/4_spades.svg",revision:"67fqmq"},{url:"/cards/small/5_clubs.svg",revision:"oye639"},{url:"/cards/small/5_diamonds.svg",revision:"q6cpb7"},{url:"/cards/small/5_hearts.svg",revision:"6ss6ym"},{url:"/cards/small/5_spades.svg",revision:"odijoi"},{url:"/cards/small/6_clubs.svg",revision:"mv396i"},{url:"/cards/small/6_diamonds.svg",revision:"ryhfpe"},{url:"/cards/small/6_hearts.svg",revision:"gwdono"},{url:"/cards/small/6_spades.svg",revision:"84rh56"},{url:"/cards/small/7_clubs.svg",revision:"8qjdkt"},{url:"/cards/small/7_diamonds.svg",revision:"buyrtd"},{url:"/cards/small/7_hearts.svg",revision:"pi6hng"},{url:"/cards/small/7_spades.svg",revision:"nr91zd"},{url:"/cards/small/8_clubs.svg",revision:"d9szer"},{url:"/cards/small/8_diamonds.svg",revision:"m89mj8"},{url:"/cards/small/8_hearts.svg",revision:"5ucxxx"},{url:"/cards/small/8_spades.svg",revision:"kt268v"},{url:"/cards/small/9_clubs.svg",revision:"yka72e"},{url:"/cards/small/9_diamonds.svg",revision:"o10hq9"},{url:"/cards/small/9_hearts.svg",revision:"xzebog"},{url:"/cards/small/9_spades.svg",revision:"dqefcr"},{url:"/cards/small/A_clubs.svg",revision:"ku79j4"},{url:"/cards/small/A_diamonds.svg",revision:"hd3kax"},{url:"/cards/small/A_hearts.svg",revision:"6czmx2"},{url:"/cards/small/A_spades.svg",revision:"rdtcwl"},{url:"/cards/small/J_clubs.svg",revision:"bbsu61"},{url:"/cards/small/J_diamonds.svg",revision:"igklxt"},{url:"/cards/small/J_hearts.svg",revision:"dli0fq"},{url:"/cards/small/J_spades.svg",revision:"7pi5sg"},{url:"/cards/small/K_clubs.svg",revision:"jb89ni"},{url:"/cards/small/K_diamonds.svg",revision:"86kznq"},{url:"/cards/small/K_hearts.svg",revision:"fb063j"},{url:"/cards/small/K_spades.svg",revision:"crquiw"},{url:"/cards/small/Q_clubs.svg",revision:"8rem19"},{url:"/cards/small/Q_diamonds.svg",revision:"zc7r19"},{url:"/cards/small/Q_hearts.svg",revision:"qk2fem"},{url:"/cards/small/Q_spades.svg",revision:"lra7dp"},{url:"/cards/small/T_clubs.svg",revision:"hmph7g"},{url:"/cards/small/T_diamonds.svg",revision:"xfw2z6"},{url:"/cards/small/T_hearts.svg",revision:"y7xa48"},{url:"/cards/small/T_spades.svg",revision:"65fs4r"},{url:"/cards/small/_back.svg",revision:"947yxn"},{url:"/cards/small/_empty.svg",revision:"r5f3qm"},{url:"/cards/small/_joker_black.svg",revision:"dgeuaq"},{url:"/cards/small/_joker_red.svg",revision:"8ewexr"},{url:"/favicon-16x16.png",revision:"cuiqdc"},{url:"/favicon-32x32.png",revision:"wl6mq2"},{url:"/favicon.ico",revision:"gmqwn5"},{url:"/favicon.svg",revision:"u7uouc"},{url:"/manifest.json",revision:"jgf1uq"},{url:"/mstile-144x144.png",revision:"a8gc2k"},{url:"/mstile-150x150.png",revision:"xlh5x3"},{url:"/mstile-310x150.png",revision:"isuji4"},{url:"/mstile-310x310.png",revision:"xir9tw"},{url:"/mstile-70x70.png",revision:"gttqmn"},{url:"/pwa-192x192.png",revision:"yzsyus"},{url:"/pwa-512x512.png",revision:"63dui6"},{url:"/safari-pinned-tab.svg",revision:"hxztcm"}]),function(e){const s=b();j(new U(s,e))}(L),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}));
