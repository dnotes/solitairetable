import{S as e,i as t,s as n,D as l,E as s,e as a,j as r,c as i,a as o,m as c,d as f,b as u,f as m,o as d,x as $,u as h,v as p,F as g,G as w,H as x,I as v,J as y,k as b,n as E,K as k,L as z,r as D,w as F,M as I,N as j,A as M,O as V,P as q,Q as _,t as A,g as C,h as L,R as T,T as P,U as G,l as N,V as R,W as H,X as O}from"../chunks/vendor-d4f88a2a.js";import{_ as S}from"../chunks/preload-helper-ec9aa979.js";import{g as W,I as B,G as K}from"../chunks/GameControls-2d4a3440.js";import{G as U,g as J}from"../chunks/Game-7fded968.js";import{g as Q}from"../chunks/navigation-51f4a605.js";import{_ as X}from"../chunks/README-03dbef2b.js";import"../chunks/singletons-12a22614.js";function Y(e){return(this&&this.__awaiter||function(e,t,n,l){return new(n||(n=Promise))((function(s,a){function r(e){try{o(l.next(e))}catch(t){a(t)}}function i(e){try{o(l.throw(e))}catch(t){a(t)}}function o(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,i)}o((l=l.apply(e,t||[])).next())}))})(void 0,void 0,void 0,(function*(){if("serviceWorker"in navigator){const{Workbox:e,messageSW:t}=yield S((()=>import("../chunks/workbox-window.prod.es5-a2ea44c0.js")),[]),n=new e("/service-worker.js");let l;const s=e=>{n.addEventListener("controlling",(e=>{window.location.reload()})),(null==l?void 0:l.waiting)&&t(l.waiting,{type:"SKIP_WAITING"})};n.addEventListener("waiting",s),n.addEventListener("externalwaiting",s),n.register().then((e=>l=e))}})),[]}class Z extends e{constructor(e){super(),t(this,e,Y,null,n,{})}}const ee=l(s("l",(e=>{const t=[{value:"xs",mediaquery:window.matchMedia("(max-width:  479px)")},{value:"s",mediaquery:window.matchMedia("(min-width:  480px) and (max-width:  719px)")},{value:"m",mediaquery:window.matchMedia("(min-width:  720px) and (max-width:  959px)")},{value:"l",mediaquery:window.matchMedia("(min-width:  960px) and (max-width: 1439px)")},{value:"xl",mediaquery:window.matchMedia("(min-width: 1440px) and (max-width: 1919px)")},{value:"xxl",mediaquery:window.matchMedia("(min-width: 1920px)")}];for(let n in t){let l=t[n];!0===l.mediaquery.matches&&e(l.value),l.mediaquery.addEventListener("change",(t=>{!0===t.matches&&e(l.value)}))}})),(e=>"xs"!=e&&"s"!=e&&e?"desktop":"mobile"));s("landscape",(e=>{const t=[{value:"portrait",mediaquery:window.matchMedia("(orientation: portrait)")},{value:"landscape",mediaquery:window.matchMedia("(orientation: landscape)")}];for(let n in t){let l=t[n];!0===l.mediaquery.matches&&e(l.value),l.mediaquery.addEventListener("change",(t=>{!0===t.matches&&e(l.value)}))}}));const te=e=>({}),ne=e=>({});function le(e){let t,n,l,s;return n=new V({props:{class:e[6]?"":"mx-auto",icon:e[3],size:e[4]}}),{c(){t=a("span"),r(n.$$.fragment),this.h()},l(e){t=i(e,"SPAN",{class:!0});var l=o(t);c(n.$$.fragment,l),l.forEach(f),this.h()},h(){u(t,"class",l=e[6]?"inline-block px-1 align-middle":"")},m(e,l){m(e,t,l),d(n,t,null),s=!0},p(e,a){const r={};64&a&&(r.class=e[6]?"":"mx-auto"),8&a&&(r.icon=e[3]),16&a&&(r.size=e[4]),n.$set(r),(!s||64&a&&l!==(l=e[6]?"inline-block px-1 align-middle":""))&&u(t,"class",l)},i(e){s||($(n.$$.fragment,e),s=!0)},o(e){h(n.$$.fragment,e),s=!1},d(e){e&&f(t),p(n)}}}function se(e){let t,n,l,s,r;const c=e[14].menu,d=g(c,e,e[13],ne);return{c(){t=a("div"),d&&d.c(),this.h()},l(e){t=i(e,"DIV",{class:!0});var n=o(t);d&&d.l(n),n.forEach(f),this.h()},h(){u(t,"class",n=e[5]?`absolute ${e[5]}-full ${e[11]}`:"")},m(n,a){m(n,t,a),d&&d.m(t,null),l=!0,s||(r=w(t,"click",e[17]),s=!0)},p(e,s){d&&d.p&&(!l||8192&s)&&x(d,c,e,e[13],l?y(c,e[13],s,te):v(e[13]),ne),(!l||32&s&&n!==(n=e[5]?`absolute ${e[5]}-full ${e[11]}`:""))&&u(t,"class",n)},i(e){l||($(d,e),l=!0)},o(e){h(d,e),l=!1},d(e){e&&f(t),d&&d.d(e),s=!1,r()}}}function ae(e){let t,n,l,s,r,c,d,p,j,M,V=e[3]&&le(e);const q=e[14].default,_=g(q,e,e[13],null);let A=e[8]&&se(e);return{c(){t=a("div"),n=a("a"),V&&V.c(),l=b(),s=a("span"),_&&_.c(),c=b(),A&&A.c(),this.h()},l(e){t=i(e,"DIV",{class:!0});var a=o(t);n=i(a,"A",{href:!0,title:!0,rel:!0,class:!0});var r=o(n);V&&V.l(r),l=E(r),s=i(r,"SPAN",{class:!0});var u=o(s);_&&_.l(u),u.forEach(f),r.forEach(f),c=E(a),A&&A.l(a),a.forEach(f),this.h()},h(){u(s,"class","align-middle"),u(n,"href",e[0]),u(n,"title",e[1]),u(n,"rel",e[2]),u(n,"class",r="no-underline hover:no-underline "+e[7]+" "+(e[6]?"whitespace-nowrap":"")+" svelte-1wbnz7l"),u(t,"class",d="relative inline-block "+e[7])},m(a,r){m(a,t,r),k(t,n),V&&V.m(n,null),k(n,l),k(n,s),_&&_.m(s,null),e[16](n),k(t,c),A&&A.m(t,null),e[18](t),p=!0,j||(M=[w(n,"click",e[15]),w(n,"click",z(e[12]))],j=!0)},p(e,[s]){e[3]?V?(V.p(e,s),8&s&&$(V,1)):(V=le(e),V.c(),$(V,1),V.m(n,l)):V&&(D(),h(V,1,1,(()=>{V=null})),F()),_&&_.p&&(!p||8192&s)&&x(_,q,e,e[13],p?y(q,e[13],s,null):v(e[13]),null),(!p||1&s)&&u(n,"href",e[0]),(!p||2&s)&&u(n,"title",e[1]),(!p||4&s)&&u(n,"rel",e[2]),(!p||192&s&&r!==(r="no-underline hover:no-underline "+e[7]+" "+(e[6]?"whitespace-nowrap":"")+" svelte-1wbnz7l"))&&u(n,"class",r),e[8]?A?(A.p(e,s),256&s&&$(A,1)):(A=se(e),A.c(),$(A,1),A.m(t,null)):A&&(D(),h(A,1,1,(()=>{A=null})),F()),(!p||128&s&&d!==(d="relative inline-block "+e[7]))&&u(t,"class",d)},i(e){p||($(V),$(_,e),$(A),p=!0)},o(e){h(V),h(_,e),h(A),p=!1},d(n){n&&f(t),V&&V.d(),_&&_.d(n),e[16](null),A&&A.d(),e[18](null),j=!1,I(M)}}}function re(e,t,n){let{$$slots:l={},$$scope:s}=t;const a=j(l);let r,i,{href:o="#"}=t,{title:c=""}=t,{rel:f=""}=t,{icon:u}=t,{size:m="2x"}=t,{dropdownFrom:d}=t,$=d?"border-t border-b-2 border-r border-l".replace(`border-${d[0]}`,"").replace(" -2 ",""):"",{linear:h=!1}=t,p=!1,{class:g=""}=t;M((()=>{const e=e=>{p&&!r.contains(e.target)&&n(8,p=!1)},t=e=>{p&&"Escape"===e.key&&n(8,p=!1)};return document.addEventListener("click",e,!1),document.addEventListener("keyup",t,!1),()=>{document.removeEventListener("click",e,!1),document.removeEventListener("keyup",t,!1)}}));return e.$$set=e=>{"href"in e&&n(0,o=e.href),"title"in e&&n(1,c=e.title),"rel"in e&&n(2,f=e.rel),"icon"in e&&n(3,u=e.icon),"size"in e&&n(4,m=e.size),"dropdownFrom"in e&&n(5,d=e.dropdownFrom),"linear"in e&&n(6,h=e.linear),"class"in e&&n(7,g=e.class),"$$scope"in e&&n(13,s=e.$$scope)},[o,c,f,u,m,d,h,g,p,r,i,$,function(e){"#"!==i.href?Q(i.href):a.menu&&(e.stopPropagation(),n(8,p=!p))},s,l,function(t){q.call(this,e,t)},function(e){_[e?"unshift":"push"]((()=>{i=e,n(10,i)}))},()=>{n(8,p=!1)},function(e){_[e?"unshift":"push"]((()=>{r=e,n(9,r)}))}]}class ie extends e{constructor(e){super(),t(this,e,re,ae,n,{href:0,title:1,rel:2,icon:3,size:4,dropdownFrom:5,linear:6,class:7})}}function oe(e){let t,n=e[0].title+"";return{c(){t=A(n)},l(e){t=C(e,n)},m(e,n){m(e,t,n)},p(e,l){1&l&&n!==(n=e[0].title+"")&&L(t,n)},d(e){e&&f(t)}}}function ce(e){let t,n;return t=new ie({props:{href:"/play?g="+e[0].name,title:"play "+e[0].title+" solitaire",linear:!0,class:e[1],$$slots:{default:[oe]},$$scope:{ctx:e}}}),t.$on("click",e[2]),{c(){r(t.$$.fragment)},l(e){c(t.$$.fragment,e)},m(e,l){d(t,e,l),n=!0},p(e,[n]){const l={};1&n&&(l.href="/play?g="+e[0].name),1&n&&(l.title="play "+e[0].title+" solitaire"),2&n&&(l.class=e[1]),9&n&&(l.$$scope={dirty:n,ctx:e}),t.$set(l)},i(e){n||($(t.$$.fragment,e),n=!0)},o(e){h(t.$$.fragment,e),n=!1},d(e){p(t,e)}}}function fe(e,t,n){let{config:l}=t,{class:s=""}=t;return e.$$set=e=>{"config"in e&&n(0,l=e.config),"class"in e&&n(1,s=e.class)},[l,s,()=>{W.set(new U(l))}]}class ue extends e{constructor(e){super(),t(this,e,fe,ce,n,{config:0,class:1})}}function me(e,t,n){const l=e.slice();return l[9]=t[n],l}function de(e){let t;return{c(){t=A(e[7])},l(n){t=C(n,e[7])},m(e,n){m(e,t,n)},p:P,d(e){e&&f(t)}}}function $e(e){let t,n;return t=new ue({props:{class:"px-3 block "+e[3]+" "+e[4],config:e[9]}}),{c(){r(t.$$.fragment)},l(e){c(t.$$.fragment,e)},m(e,l){d(t,e,l),n=!0},p(e,n){const l={};24&n&&(l.class="px-3 block "+e[3]+" "+e[4]),t.$set(l)},i(e){n||($(t.$$.fragment,e),n=!0)},o(e){h(t.$$.fragment,e),n=!1},d(e){p(t,e)}}}function he(e){let t,n,l,s=e[6],r=[];for(let a=0;a<s.length;a+=1)r[a]=$e(me(e,s,a));const c=e=>h(r[e],1,1,(()=>{r[e]=null}));return{c(){t=a("div");for(let e=0;e<r.length;e+=1)r[e].c();this.h()},l(e){t=i(e,"DIV",{slot:!0,class:!0});var n=o(t);for(let t=0;t<r.length;t+=1)r[t].l(n);n.forEach(f),this.h()},h(){u(t,"slot","menu"),u(t,"class",n="min-w-full "+e[3]+" "+e[5])},m(e,n){m(e,t,n);for(let l=0;l<r.length;l+=1)r[l].m(t,null);l=!0},p(e,a){if(88&a){let n;for(s=e[6],n=0;n<s.length;n+=1){const l=me(e,s,n);r[n]?(r[n].p(l,a),$(r[n],1)):(r[n]=$e(l),r[n].c(),$(r[n],1),r[n].m(t,null))}for(D(),n=s.length;n<r.length;n+=1)c(n);F()}(!l||40&a&&n!==(n="min-w-full "+e[3]+" "+e[5]))&&u(t,"class",n)},i(e){if(!l){for(let e=0;e<s.length;e+=1)$(r[e]);l=!0}},o(e){r=r.filter(Boolean);for(let t=0;t<r.length;t+=1)h(r[t]);l=!1},d(e){e&&f(t),G(r,e)}}}function pe(e){let t,n;return t=new B({props:{icon:T,class:e[3],dropdownFrom:e[2],size:e[1],linear:e[0],$$slots:{menu:[he],default:[de]},$$scope:{ctx:e}}}),{c(){r(t.$$.fragment)},l(e){c(t.$$.fragment,e)},m(e,l){d(t,e,l),n=!0},p(e,[n]){const l={};8&n&&(l.class=e[3]),4&n&&(l.dropdownFrom=e[2]),2&n&&(l.size=e[1]),1&n&&(l.linear=e[0]),4152&n&&(l.$$scope={dirty:n,ctx:e}),t.$set(l)},i(e){n||($(t.$$.fragment,e),n=!0)},o(e){h(t.$$.fragment,e),n=!1},d(e){p(t,e)}}}function ge(e,t,n){let{family:l=""}=t,{linear:s=!1}=t,{size:a="2x"}=t,r=l?[J[l],...J[l].variants]:Object.keys(J).map((e=>J[e])).filter((e=>e.family===e.name)),i=l?"Variants":"Games",{dropdownFrom:o}=t,{class:c=""}=t,{childClass:f=""}=t,{menuClass:u=""}=t;return e.$$set=e=>{"family"in e&&n(8,l=e.family),"linear"in e&&n(0,s=e.linear),"size"in e&&n(1,a=e.size),"dropdownFrom"in e&&n(2,o=e.dropdownFrom),"class"in e&&n(3,c=e.class),"childClass"in e&&n(4,f=e.childClass),"menuClass"in e&&n(5,u=e.menuClass)},[s,a,o,c,f,u,r,i,l]}class we extends e{constructor(e){super(),t(this,e,ge,pe,n,{family:8,linear:0,size:1,dropdownFrom:2,class:3,childClass:4,menuClass:5})}}function xe(e,t,n){const l=e.slice();return l[5]=t[n].href,l[6]=t[n].text,l[7]=t[n].title,l[8]=t[n].icon,l}function ve(e){let t,n,l=e[6]+"";return{c(){t=A(l),n=b()},l(e){t=C(e,l),n=E(e)},m(e,l){m(e,t,l),m(e,n,l)},p:P,d(e){e&&f(t),e&&f(n)}}}function ye(e){let t,n;return t=new ie({props:{rel:"prefetch",class:e[2],href:e[5],title:e[7],icon:e[8],linear:e[0],size:e[1],$$slots:{default:[ve]},$$scope:{ctx:e}}}),{c(){r(t.$$.fragment)},l(e){c(t.$$.fragment,e)},m(e,l){d(t,e,l),n=!0},p(e,n){const l={};4&n&&(l.class=e[2]),1&n&&(l.linear=e[0]),2&n&&(l.size=e[1]),2048&n&&(l.$$scope={dirty:n,ctx:e}),t.$set(l)},i(e){n||($(t.$$.fragment,e),n=!0)},o(e){h(t.$$.fragment,e),n=!1},d(e){p(t,e)}}}function be(e){let t,n,l=e[3],s=[];for(let r=0;r<l.length;r+=1)s[r]=ye(xe(e,l,r));const a=e=>h(s[e],1,1,(()=>{s[e]=null}));return{c(){for(let e=0;e<s.length;e+=1)s[e].c();t=N()},l(e){for(let t=0;t<s.length;t+=1)s[t].l(e);t=N()},m(e,l){for(let t=0;t<s.length;t+=1)s[t].m(e,l);m(e,t,l),n=!0},p(e,[n]){if(15&n){let r;for(l=e[3],r=0;r<l.length;r+=1){const a=xe(e,l,r);s[r]?(s[r].p(a,n),$(s[r],1)):(s[r]=ye(a),s[r].c(),$(s[r],1),s[r].m(t.parentNode,t))}for(D(),r=l.length;r<s.length;r+=1)a(r);F()}},i(e){if(!n){for(let e=0;e<l.length;e+=1)$(s[e]);n=!0}},o(e){s=s.filter(Boolean);for(let t=0;t<s.length;t+=1)h(s[t]);n=!1},d(e){G(s,e),e&&f(t)}}}function Ee(e,t,n){const l={"/README.md":X},s=[{text:"Home",href:"/",icon:"faHome"},...Object.keys(l).map((e=>{var t,n,s;let a=e.replace(/\//g,"").replace(/\.md$/,"").replace(/^README/,"About");return{text:(null===(t=l[e].attributes)||void 0===t?void 0:t.title)||a[0].toUpperCase()+a.slice(1),href:a,title:(null===(n=l[e].attributes)||void 0===n?void 0:n.description)||"",icon:(null===(s=l[e].attributes)||void 0===s?void 0:s.icon)||""}}))].map((e=>(e.icon=e.icon&&R[`${e.icon}`]||void 0,e)));let{linear:a=!1}=t,{size:r="2x"}=t,{class:i=""}=t;return e.$$set=e=>{"linear"in e&&n(0,a=e.linear),"size"in e&&n(1,r=e.size),"class"in e&&n(2,i=e.class)},[a,r,i,s]}class ke extends e{constructor(e){super(),t(this,e,Ee,be,n,{linear:0,size:1,class:2})}}function ze(e){let t,n,l,s,g,w,x,v,y;n=new we({props:{dropdownFrom:"top",linear:!0,size:"lg",class:"text-blue-400 text-lg py-1 bg-gray-700 rounded-b border-gray-800"}}),s=new ke({props:{linear:!0,size:"lg",class:"text-lg h-full py-1"}});let z=e[0]&&De(e);return{c(){t=a("header"),r(n.$$.fragment),l=b(),r(s.$$.fragment),g=b(),w=a("div"),x=b(),z&&z.c(),this.h()},l(e){t=i(e,"HEADER",{class:!0});var a=o(t);c(n.$$.fragment,a),l=E(a),c(s.$$.fragment,a),g=E(a),w=i(a,"DIV",{class:!0}),o(w).forEach(f),x=E(a),z&&z.l(a),a.forEach(f),this.h()},h(){u(w,"class","flex-grow"),u(t,"class",v="flex flex-row z-10 w-full px-12 border-b-2 border-gray-800 bg-gray-700 text-white "+(e[0]?"fixed top-0":""))},m(e,a){m(e,t,a),d(n,t,null),k(t,l),d(s,t,null),k(t,g),k(t,w),k(t,x),z&&z.m(t,null),y=!0},p(e,n){e[0]?z?(z.p(e,n),1&n&&$(z,1)):(z=De(e),z.c(),$(z,1),z.m(t,null)):z&&(D(),h(z,1,1,(()=>{z=null})),F()),(!y||1&n&&v!==(v="flex flex-row z-10 w-full px-12 border-b-2 border-gray-800 bg-gray-700 text-white "+(e[0]?"fixed top-0":"")))&&u(t,"class",v)},i(e){y||($(n.$$.fragment,e),$(s.$$.fragment,e),$(z),y=!0)},o(e){h(n.$$.fragment,e),h(s.$$.fragment,e),h(z),y=!1},d(e){e&&f(t),p(n),p(s),z&&z.d()}}}function De(e){let t,n,l,s;t=new K({props:{size:"lg",class:"align-middle text-sm"}});let a=e[2].conf.family&&Fe(e);return{c(){r(t.$$.fragment),n=b(),a&&a.c(),l=N()},l(e){c(t.$$.fragment,e),n=E(e),a&&a.l(e),l=N()},m(e,r){d(t,e,r),m(e,n,r),a&&a.m(e,r),m(e,l,r),s=!0},p(e,t){e[2].conf.family?a?(a.p(e,t),4&t&&$(a,1)):(a=Fe(e),a.c(),$(a,1),a.m(l.parentNode,l)):a&&(D(),h(a,1,1,(()=>{a=null})),F())},i(e){s||($(t.$$.fragment,e),$(a),s=!0)},o(e){h(t.$$.fragment,e),h(a),s=!1},d(e){p(t,e),e&&f(n),a&&a.d(e),e&&f(l)}}}function Fe(e){let t,n;return t=new we({props:{dropdownFrom:"top",size:"lg",class:"text-sm bg-gray-700 rounded-b right-0 border-gray-800 text-right text-white",childClass:"min-w-full",family:e[2].conf.family}}),{c(){r(t.$$.fragment)},l(e){c(t.$$.fragment,e)},m(e,l){d(t,e,l),n=!0},p(e,n){const l={};4&n&&(l.family=e[2].conf.family),t.$set(l)},i(e){n||($(t.$$.fragment,e),n=!0)},o(e){h(t.$$.fragment,e),n=!1},d(e){p(t,e)}}}function Ie(e){let t,n;const l=e[3].default,s=g(l,e,e[4],null);return{c(){t=a("div"),s&&s.c(),this.h()},l(e){t=i(e,"DIV",{id:!0,class:!0});var n=o(t);s&&s.l(n),n.forEach(f),this.h()},h(){u(t,"id","main"),u(t,"class","flex-grow w-full max-w-screen-lg mx-auto p-4 md:py-8")},m(e,l){m(e,t,l),s&&s.m(t,null),n=!0},p(e,t){s&&s.p&&(!n||16&t)&&x(s,l,e,e[4],n?y(l,e[4],t,null):v(e[4]),null)},i(e){n||($(s,e),n=!0)},o(e){h(s,e),n=!1},d(e){e&&f(t),s&&s.d(e)}}}function je(e){let t,n;const l=e[3].default,s=g(l,e,e[4],null);return{c(){t=a("div"),s&&s.c(),this.h()},l(e){t=i(e,"DIV",{id:!0,class:!0});var n=o(t);s&&s.l(n),n.forEach(f),this.h()},h(){u(t,"id","main"),u(t,"class","h-screen max-w-full overflow-x-hidden bg-green-800 pt-4 md:pt-8")},m(e,l){m(e,t,l),s&&s.m(t,null),n=!0},p(e,t){s&&s.p&&(!n||16&t)&&x(s,l,e,e[4],n?y(l,e[4],t,null):v(e[4]),null)},i(e){n||($(s,e),n=!0)},o(e){h(s,e),n=!1},d(e){e&&f(t),s&&s.d(e)}}}function Me(e){let t,n,l,s,g,w,x;return w=new ke({props:{linear:!0,size:"sm",class:"text-white"}}),{c(){t=a("div"),n=A("?? 2021 David Hunt"),l=b(),s=a("div"),g=b(),r(w.$$.fragment),this.h()},l(e){t=i(e,"DIV",{class:!0});var a=o(t);n=C(a,"?? 2021 David Hunt"),a.forEach(f),l=E(e),s=i(e,"DIV",{class:!0}),o(s).forEach(f),g=E(e),c(w.$$.fragment,e),this.h()},h(){u(t,"class","caps-small"),u(s,"class","flex-grow")},m(e,a){m(e,t,a),k(t,n),m(e,l,a),m(e,s,a),m(e,g,a),d(w,e,a),x=!0},p:P,i(e){x||($(w.$$.fragment,e),x=!0)},o(e){h(w.$$.fragment,e),x=!1},d(e){e&&f(t),e&&f(l),e&&f(s),e&&f(g),p(w,e)}}}function Ve(e){let t,n,l,s;const a=[_e,qe],r=[];function i(e,t){return e[0]?0:1}return t=i(e),n=r[t]=a[t](e),{c(){n.c(),l=N()},l(e){n.l(e),l=N()},m(e,n){r[t].m(e,n),m(e,l,n),s=!0},p(e,s){let o=t;t=i(e),t===o?r[t].p(e,s):(D(),h(r[o],1,1,(()=>{r[o]=null})),F(),n=r[t],n?n.p(e,s):(n=r[t]=a[t](e),n.c()),$(n,1),n.m(l.parentNode,l))},i(e){s||($(n),s=!0)},o(e){h(n),s=!1},d(e){r[t].d(e),e&&f(l)}}}function qe(e){let t,n,l,s;return t=new we({props:{dropdownFrom:"bottom",class:"bg-gray-900 text-white hover:no-underline"}}),l=new ke({props:{class:"text-white hover:no-underline"}}),{c(){r(t.$$.fragment),n=b(),r(l.$$.fragment)},l(e){c(t.$$.fragment,e),n=E(e),c(l.$$.fragment,e)},m(e,a){d(t,e,a),m(e,n,a),d(l,e,a),s=!0},p:P,i(e){s||($(t.$$.fragment,e),$(l.$$.fragment,e),s=!0)},o(e){h(t.$$.fragment,e),h(l.$$.fragment,e),s=!1},d(e){p(t,e),e&&f(n),p(l,e)}}}function _e(e){let t,n,l,s;return t=new B({props:{icon:O,dropdownFrom:"bottom",class:"bg-gray-900 text-white",$$slots:{menu:[Ce],default:[Ae]},$$scope:{ctx:e}}}),l=new K({}),{c(){r(t.$$.fragment),n=b(),r(l.$$.fragment)},l(e){c(t.$$.fragment,e),n=E(e),c(l.$$.fragment,e)},m(e,a){d(t,e,a),m(e,n,a),d(l,e,a),s=!0},p(e,n){const l={};20&n&&(l.$$scope={dirty:n,ctx:e}),t.$set(l)},i(e){s||($(t.$$.fragment,e),$(l.$$.fragment,e),s=!0)},o(e){h(t.$$.fragment,e),h(l.$$.fragment,e),s=!1},d(e){p(t,e),e&&f(n),p(l,e)}}}function Ae(e){let t;return{c(){t=A("Menu")},l(e){t=C(e,"Menu")},m(e,n){m(e,t,n)},d(e){e&&f(t)}}}function Ce(e){var t,n;let l,s,g,w,x;return s=new we({props:{linear:!0,family:(null==(n=null==(t=e[2])?void 0:t.conf)?void 0:n.family)||"",class:"bg-gray-900 text-white hover:no-underline"}}),w=new ke({props:{linear:!0,class:"text-white hover:no-underline"}}),{c(){l=a("div"),r(s.$$.fragment),g=b(),r(w.$$.fragment),this.h()},l(e){l=i(e,"DIV",{slot:!0,class:!0});var t=o(l);c(s.$$.fragment,t),g=E(t),c(w.$$.fragment,t),t.forEach(f),this.h()},h(){u(l,"slot","menu"),u(l,"class","bg-gray-900 text-white rounded-t border-gray-600")},m(e,t){m(e,l,t),d(s,l,null),k(l,g),d(w,l,null),x=!0},p(e,t){var n,l;const a={};4&t&&(a.family=(null==(l=null==(n=e[2])?void 0:n.conf)?void 0:l.family)||""),s.$set(a)},i(e){x||($(s.$$.fragment,e),$(w.$$.fragment,e),x=!0)},o(e){h(s.$$.fragment,e),h(w.$$.fragment,e),x=!1},d(e){e&&f(l),p(s),p(w)}}}function Le(e){let t,n,l,s,g,w,x,v,y,z,I,j,M,V="desktop"===e[1]&&ze(e);const q=[je,Ie],_=[];function A(e,t){return e[0]?0:1}l=A(e),s=_[l]=q[l](e);const C=[Ve,Me],L=[];function T(e,t){return"mobile"===e[1]?0:1}return x=T(e),v=L[x]=C[x](e),z=new Z({}),{c(){t=a("div"),V&&V.c(),n=b(),s.c(),g=b(),w=a("footer"),v.c(),y=b(),r(z.$$.fragment),this.h()},l(e){t=i(e,"DIV",{class:!0});var l=o(t);V&&V.l(l),n=E(l),s.l(l),g=E(l),w=i(l,"FOOTER",{class:!0});var a=o(w);v.l(a),y=E(a),c(z.$$.fragment,a),a.forEach(f),l.forEach(f),this.h()},h(){u(w,"class",I="flex flex-row justify-center h-12 w-full leading-10 px-12 text-xs bg-gray-900 text-white "+(e[0]?"fixed bottom-0":"")),u(t,"class",j="min-h-screen "+(e[0]?"":"flex flex-col"))},m(e,s){m(e,t,s),V&&V.m(t,null),k(t,n),_[l].m(t,null),k(t,g),k(t,w),L[x].m(w,null),k(w,y),d(z,w,null),M=!0},p(e,[a]){"desktop"===e[1]?V?(V.p(e,a),2&a&&$(V,1)):(V=ze(e),V.c(),$(V,1),V.m(t,n)):V&&(D(),h(V,1,1,(()=>{V=null})),F());let r=l;l=A(e),l===r?_[l].p(e,a):(D(),h(_[r],1,1,(()=>{_[r]=null})),F(),s=_[l],s?s.p(e,a):(s=_[l]=q[l](e),s.c()),$(s,1),s.m(t,g));let i=x;x=T(e),x===i?L[x].p(e,a):(D(),h(L[i],1,1,(()=>{L[i]=null})),F(),v=L[x],v?v.p(e,a):(v=L[x]=C[x](e),v.c()),$(v,1),v.m(w,y)),(!M||1&a&&I!==(I="flex flex-row justify-center h-12 w-full leading-10 px-12 text-xs bg-gray-900 text-white "+(e[0]?"fixed bottom-0":"")))&&u(w,"class",I),(!M||1&a&&j!==(j="min-h-screen "+(e[0]?"":"flex flex-col")))&&u(t,"class",j)},i(e){M||($(V),$(s),$(v),$(z.$$.fragment,e),M=!0)},o(e){h(V),h(s),h(v),h(z.$$.fragment,e),M=!1},d(e){e&&f(t),V&&V.d(),_[l].d(),L[x].d(),p(z)}}}var Te=function(e,t,n,l){return new(n||(n=Promise))((function(s,a){function r(e){try{o(l.next(e))}catch(t){a(t)}}function i(e){try{o(l.throw(e))}catch(t){a(t)}}function o(e){var t;e.done?s(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(r,i)}o((l=l.apply(e,t||[])).next())}))};function Pe({page:e}){return Te(this,void 0,void 0,(function*(){return{props:{isTable:!!e.path.match(/^\/(?:play|build)/)}}}))}function Ge(e,t,n){let l,s;H(e,ee,(e=>n(1,l=e))),H(e,W,(e=>n(2,s=e)));let{$$slots:a={},$$scope:r}=t;this&&this.__awaiter;let{isTable:i}=t;return e.$$set=e=>{"isTable"in e&&n(0,i=e.isTable),"$$scope"in e&&n(4,r=e.$$scope)},[i,l,s,a,r]}class Ne extends e{constructor(e){super(),t(this,e,Ge,Le,n,{isTable:0})}}export{Ne as default,Pe as load};
