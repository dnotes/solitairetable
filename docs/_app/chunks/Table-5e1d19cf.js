import{a3 as t,S as e,i as l,s as n,F as s,e as r,k as c,c as o,a,n as i,d as f,b as d,a2 as u,f as h,K as g,G as p,r as $,u as m,w as x,x as y,H as v,I as k,J as w,M as b,W as I,P as D,a0 as E,T as V,l as R,a4 as j,a5 as _,a1 as N,j as M,m as S,o as G,v as B,a6 as H,t as C,g as z,a7 as A,h as J,U as W,a8 as T}from"./vendor-33d0214b.js";import{m as F,e as K,a as P,g as U,d as Y,G as q}from"./GameControls-7fda7847.js";import{A as L,a as O}from"./Game-f1a072f2.js";const Q={subscribe:e=>(()=>{const e=t("__svelte__");return{page:{subscribe:e.page.subscribe},navigating:{subscribe:e.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:e.navigating.subscribe}},session:e.session}})().page.subscribe(e)};function X(t){let e,l,n;return{c(){e=r("div"),l=r("img"),this.h()},l(t){e=o(t,"DIV",{});var n=a(e);l=o(n,"IMG",{draggable:!0,class:!0,src:!0,alt:!0}),n.forEach(f),this.h()},h(){d(l,"draggable","false"),d(l,"class","w-full"),E(l.src,n=t[11]+"_empty.svg")||d(l,"src",n),d(l,"alt","-")},m(t,n){h(t,e,n),g(e,l)},p(t,e){2048&e&&!E(l.src,n=t[11]+"_empty.svg")&&d(l,"src",n)},i:V,o:V,d(t){t&&f(e)}}}function Z(t){let e,l,n,s;const r=[et,tt],c=[];function o(t,e){return t[1]||t[0].facedown?0:1}return e=o(t),l=c[e]=r[e](t),{c(){l.c(),n=R()},l(t){l.l(t),n=R()},m(t,l){c[e].m(t,l),h(t,n,l),s=!0},p(t,s){let a=e;e=o(t),e===a?c[e].p(t,s):($(),m(c[a],1,1,(()=>{c[a]=null})),x(),l=c[e],l?l.p(t,s):(l=c[e]=r[e](t),l.c()),y(l,1),l.m(n.parentNode,n))},i(t){s||(y(l),s=!0)},o(t){m(l),s=!1},d(t){c[e].d(t),t&&f(n)}}}function tt(t){let e,l,n,s,c;return{c(){e=r("div"),l=r("img"),this.h()},l(t){e=o(t,"DIV",{});var n=a(e);l=o(n,"IMG",{draggable:!0,class:!0,src:!0,alt:!0}),n.forEach(f),this.h()},h(){d(l,"draggable",t[12]),d(l,"class","w-full"),E(l.src,n=t[11]+t[9]+".svg")||d(l,"src",n),d(l,"alt",t[10])},m(t,n){h(t,e,n),g(e,l),c=!0},p(t,e){(!c||4096&e)&&d(l,"draggable",t[12]),(!c||2560&e&&!E(l.src,n=t[11]+t[9]+".svg"))&&d(l,"src",n),(!c||1024&e)&&d(l,"alt",t[10])},i(t){c||(j((()=>{s||(s=_(e,nt,{},!0)),s.run(1)})),c=!0)},o(t){s||(s=_(e,nt,{},!1)),s.run(0),c=!1},d(t){t&&f(e),t&&s&&s.end()}}}function et(t){let e,l,n,s,c;return{c(){e=r("div"),l=r("img"),this.h()},l(t){e=o(t,"DIV",{});var n=a(e);l=o(n,"IMG",{draggable:!0,class:!0,src:!0,alt:!0}),n.forEach(f),this.h()},h(){d(l,"draggable","false"),d(l,"class","w-full"),E(l.src,n=t[11]+"_back.svg")||d(l,"src",n),d(l,"alt","?")},m(t,n){h(t,e,n),g(e,l),c=!0},p(t,e){(!c||2048&e&&!E(l.src,n=t[11]+"_back.svg"))&&d(l,"src",n)},i(t){c||(j((()=>{s||(s=_(e,nt,{},!0)),s.run(1)})),c=!0)},o(t){s||(s=_(e,nt,{},!1)),s.run(0),c=!1},d(t){t&&f(e),t&&s&&s.end()}}}function lt(t){let e,l,n,I,D,E,V,R,j,_,N,M;const S=[Z,X],G=[];function B(t,e){return t[0]?0:1}n=B(t),I=G[n]=S[n](t);const H=t[19].default,C=s(H,t,t[18],null);return{c(){e=r("div"),l=r("div"),I.c(),D=c(),E=r("div"),C&&C.c(),this.h()},l(t){e=o(t,"DIV",{class:!0,style:!0});var n=a(e);l=o(n,"DIV",{class:!0});var s=a(l);I.l(s),D=i(s),E=o(s,"DIV",{class:!0});var r=a(E);C&&C.l(r),r.forEach(f),s.forEach(f),n.forEach(f),this.h()},h(){d(E,"class",V="absolute w-full h-full text-center top-2 text-"+(t[4]<100?"xs":"sm")),d(l,"class","cursor-pointer"),d(e,"class",R="card container "+t[8]+" rounded-xl absolute svelte-oigr2j"),d(e,"style",j=t[6]+":"+t[7]+"px"),u(e,"selected",t[5].selection.filter(t[23]).length)},m(s,r){h(s,e,r),g(e,l),G[n].m(l,null),g(l,D),g(l,E),C&&C.m(E,null),_=!0,N||(M=[p(e,"dragstart",t[21]),p(e,"dragend",t[22]),p(e,"click",t[20])],N=!0)},p(t,[s]){let r=n;n=B(t),n===r?G[n].p(t,s):($(),m(G[r],1,1,(()=>{G[r]=null})),x(),I=G[n],I?I.p(t,s):(I=G[n]=S[n](t),I.c()),y(I,1),I.m(l,D)),C&&C.p&&(!_||262144&s)&&v(C,H,t,t[18],_?w(H,t[18],s,null):k(t[18]),null),(!_||16&s&&V!==(V="absolute w-full h-full text-center top-2 text-"+(t[4]<100?"xs":"sm")))&&d(E,"class",V),(!_||256&s&&R!==(R="card container "+t[8]+" rounded-xl absolute svelte-oigr2j"))&&d(e,"class",R),(!_||192&s&&j!==(j=t[6]+":"+t[7]+"px"))&&d(e,"style",j),289&s&&u(e,"selected",t[5].selection.filter(t[23]).length)},i(t){_||(y(I),y(C,t),_=!0)},o(t){m(I),m(C,t),_=!1},d(t){t&&f(e),G[n].d(),C&&C.d(t),N=!1,b(M)}}}function nt(t,{delay:e=0,duration:l=80}){return{delay:e,duration:l,css:(t,e)=>`\n\t\t\t\ttransform: rotateY(${1-180*e}deg);\n\t\t\t\topacity: ${1-e};\n        ${e?"position:absolute;":"position:static"}\n\t\t\t`}}function st(t,e,l){let n,s,r,c,o,a,i,f;I(t,F,(t=>l(4,o=t))),I(t,K,(t=>l(16,a=t))),I(t,P,(t=>l(17,i=t))),I(t,U,(t=>l(5,f=t)));let d,u,h,g,p,$,{$$slots:m={},$$scope:x}=e,{card:y}=e,{facedown:v=!1}=e,{stack:k}=e,{cardIndex:w=0}=e;y&&(g=["hearts","diamonds"].includes(y.suitName)?"text-red-600":"text-black",p=y.isJoker?"1"===y.char?"_joker_black":"_joker_red":`${y.rank}_${y.suitName}`,$=y.isJoker?"joker":`${y.rank}${y.suit}`);return t.$$set=t=>{"card"in t&&l(0,y=t.card),"facedown"in t&&l(1,v=t.facedown),"stack"in t&&l(2,k=t.stack),"cardIndex"in t&&l(14,w=t.cardIndex),"$$scope"in t&&l(18,x=t.$$scope)},t.$$.update=()=>{16388&t.$$.dirty&&l(3,n=null==k?void 0:k.getCardDepth(w)),12&t.$$.dirty&&l(13,s=n?k.look(n):[]),47&t.$$.dirty&&l(12,r=!v&&!f.conf.multiSelect&&n&&!y.facedown&&(f.conf.selectBlockedStacks||!k.isBlocked)&&(!k.conf.limitAvailable||n<=k.conf.limitAvailable)),245764&t.$$.dirty&&k&&(l(15,d=Math.max(w-k.firstVisible,0)),l(7,h=(null==k?void 0:k.isDeck)?0:d*(k.conf.horizontal?i:a)),l(6,u=k.conf.horizontal?"left":"top")),16&t.$$.dirty&&l(11,c=o>100?"/cards/":"/cards/small/")},[y,v,k,n,o,f,u,h,g,p,$,c,r,s,w,d,a,i,x,m,function(e){D.call(this,t,e)},t=>{Y.set({cards:s,cardDepth:n,fromStack:k.index}),f.clearSelected(),f.setSelected(s,k)},t=>{Y.set({}),f.clearSelected(),U.set(f)},t=>(null==t?void 0:t.id)===(null==y?void 0:y.id)]}class rt extends e{constructor(t){super(),l(this,t,st,lt,n,{card:0,facedown:1,stack:2,cardIndex:14})}}function ct(t,e,l){const n=t.slice();return n[19]=e[l],n[21]=l,n}function ot(t,e,l){const n=t.slice();return n[19]=e[l],n[21]=l,n}function at(t){let e,l,n;const c=t[11].default,i=s(c,t,t[16],null);return{c(){e=r("div"),i&&i.c(),this.h()},l(t){e=o(t,"DIV",{class:!0,style:!0});var l=a(e);i&&i.l(l),l.forEach(f),this.h()},h(){d(e,"class",l="relative "+t[3]+" box-content"),N(e,"width",("-"===t[0]?t[2]/2:t[2])+"px")},m(t,l){h(t,e,l),i&&i.m(e,null),n=!0},p(t,s){i&&i.p&&(!n||65536&s)&&v(i,c,t,t[16],n?w(c,t[16],s,null):k(t[16]),null),(!n||8&s&&l!==(l="relative "+t[3]+" box-content"))&&d(e,"class",l),(!n||5&s)&&N(e,"width",("-"===t[0]?t[2]/2:t[2])+"px")},i(t){n||(y(i,t),n=!0)},o(t){m(i,t),n=!1},d(t){t&&f(e),i&&i.d(t)}}}function it(t){let e,l,n,s,c,i=t[0]&&ft(t);return{c(){e=r("div"),l=r("div"),i&&i.c(),this.h()},l(t){e=o(t,"DIV",{class:!0,style:!0});var n=a(e);l=o(n,"DIV",{class:!0,style:!0});var s=a(l);i&&i.l(s),s.forEach(f),n.forEach(f),this.h()},h(){d(l,"class","relative h-full"),N(l,"max-width",t[2]+"px"),d(e,"class","relative justify-center"),N(e,"height",t[5]+"px"),N(e,"width",t[6]+"px"),u(e,"pointer-events-auto",t[0]&&(t[0].length||t[0].isDeck||t[0].conf.showEmpty)),u(e,"p-1",t[2]>100)},m(r,o){h(r,e,o),g(e,l),i&&i.m(l,null),n=!0,s||(c=[p(e,"dragover",Vt),p(e,"drop",t[15])],s=!0)},p(t,s){t[0]?i?(i.p(t,s),1&s&&y(i,1)):(i=ft(t),i.c(),y(i,1),i.m(l,null)):i&&($(),m(i,1,1,(()=>{i=null})),x()),(!n||4&s)&&N(l,"max-width",t[2]+"px"),(!n||32&s)&&N(e,"height",t[5]+"px"),(!n||64&s)&&N(e,"width",t[6]+"px"),1&s&&u(e,"pointer-events-auto",t[0]&&(t[0].length||t[0].isDeck||t[0].conf.showEmpty)),4&s&&u(e,"p-1",t[2]>100)},i(t){n||(y(i),n=!0)},o(t){m(i),n=!1},d(t){t&&f(e),i&&i.d(),s=!1,b(c)}}}function ft(t){let e,l,n,s;const r=[ut,dt],c=[];function o(t,e){return t[0].isDeck?0:1}return e=o(t),l=c[e]=r[e](t),{c(){l.c(),n=R()},l(t){l.l(t),n=R()},m(t,l){c[e].m(t,l),h(t,n,l),s=!0},p(t,s){let a=e;e=o(t),e===a?c[e].p(t,s):($(),m(c[a],1,1,(()=>{c[a]=null})),x(),l=c[e],l?l.p(t,s):(l=c[e]=r[e](t),l.c()),y(l,1),l.m(n.parentNode,n))},i(t){s||(y(l),s=!0)},o(t){m(l),s=!1},d(t){c[e].d(t),t&&f(n)}}}function dt(t){let e,l,n=[],s=new Map,r=t[0].stack;const c=t=>t[19].id;for(let a=0;a<r.length;a+=1){let e=ct(t,r,a),l=c(e);s.set(l,n[a]=yt(l,e))}let o=null;return r.length||(o=ht(t)),{c(){for(let t=0;t<n.length;t+=1)n[t].c();e=R(),o&&o.c()},l(t){for(let e=0;e<n.length;e+=1)n[e].l(t);e=R(),o&&o.l(t)},m(t,s){for(let e=0;e<n.length;e+=1)n[e].m(t,s);h(t,e,s),o&&o.m(t,s),l=!0},p(t,l){405&l&&(r=t[0].stack,$(),n=H(n,l,c,1,t,r,s,e.parentNode,A,yt,e,ct),x(),!r.length&&o?o.p(t,l):r.length?o&&($(),m(o,1,1,(()=>{o=null})),x()):(o=ht(t),o.c(),y(o,1),o.m(e.parentNode,e)))},i(t){if(!l){for(let t=0;t<r.length;t+=1)y(n[t]);l=!0}},o(t){for(let e=0;e<n.length;e+=1)m(n[e]);l=!1},d(t){for(let e=0;e<n.length;e+=1)n[e].d(t);t&&f(e),o&&o.d(t)}}}function ut(t){let e,l,n=[],s=new Map,r=t[0].stack;const c=t=>t[19].id;for(let a=0;a<r.length;a+=1){let e=ot(t,r,a),l=c(e);s.set(l,n[a]=Dt(l,e))}let o=null;return r.length||(o=vt(t)),{c(){for(let t=0;t<n.length;t+=1)n[t].c();e=R(),o&&o.c()},l(t){for(let e=0;e<n.length;e+=1)n[e].l(t);e=R(),o&&o.l(t)},m(t,s){for(let e=0;e<n.length;e+=1)n[e].m(t,s);h(t,e,s),o&&o.m(t,s),l=!0},p(t,l){389&l&&(r=t[0].stack,$(),n=H(n,l,c,1,t,r,s,e.parentNode,A,Dt,e,ot),x(),!r.length&&o?o.p(t,l):r.length?o&&($(),m(o,1,1,(()=>{o=null})),x()):(o=vt(t),o.c(),y(o,1),o.m(e.parentNode,e)))},i(t){if(!l){for(let t=0;t<r.length;t+=1)y(n[t]);l=!0}},o(t){for(let e=0;e<n.length;e+=1)m(n[e]);l=!1},d(t){for(let e=0;e<n.length;e+=1)n[e].d(t);t&&f(e),o&&o.d(t)}}}function ht(t){let e,l,n=t[7].conf.showEmpty&&gt(t);return{c(){n&&n.c(),e=R()},l(t){n&&n.l(t),e=R()},m(t,s){n&&n.m(t,s),h(t,e,s),l=!0},p(t,l){t[7].conf.showEmpty?n?(n.p(t,l),128&l&&y(n,1)):(n=gt(t),n.c(),y(n,1),n.m(e.parentNode,e)):n&&($(),m(n,1,1,(()=>{n=null})),x())},i(t){l||(y(n),l=!0)},o(t){m(n),l=!1},d(t){n&&n.d(t),t&&f(e)}}}function gt(t){let e,l;return e=new rt({props:{$$slots:{default:[$t]},$$scope:{ctx:t}}}),{c(){M(e.$$.fragment)},l(t){S(e.$$.fragment,t)},m(t,n){G(e,t,n),l=!0},p(t,l){const n={};65556&l&&(n.$$scope={dirty:l,ctx:t}),e.$set(n)},i(t){l||(y(e.$$.fragment,t),l=!0)},o(t){m(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}function pt(t){let e,l;return{c(){e=r("div"),l=C(" "),this.h()},l(t){e=o(t,"DIV",{class:!0,style:!0});var n=a(e);l=z(n," "),n.forEach(f),this.h()},h(){d(e,"class","absolute w-full top-0 bg-blue-300 opacity-40 rounded-xl -my-2"),N(e,"height",1.5*t[2]+"px")},m(t,n){h(t,e,n),g(e,l)},p(t,l){4&l&&N(e,"height",1.5*t[2]+"px")},d(t){t&&f(e)}}}function $t(t){let e,l=t[4]&&pt(t);return{c(){l&&l.c(),e=c()},l(t){l&&l.l(t),e=i(t)},m(t,n){l&&l.m(t,n),h(t,e,n)},p(t,n){t[4]?l?l.p(t,n):(l=pt(t),l.c(),l.m(e.parentNode,e)):l&&(l.d(1),l=null)},d(t){l&&l.d(t),t&&f(e)}}}function mt(t){let e,l;return{c(){e=r("div"),l=C(" "),this.h()},l(t){e=o(t,"DIV",{class:!0,style:!0});var n=a(e);l=z(n," "),n.forEach(f),this.h()},h(){d(e,"class","absolute w-full top-0 bg-blue-500 opacity-40 rounded-xl -my-2"),N(e,"height",1.5*t[2]+"px")},m(t,n){h(t,e,n),g(e,l)},p(t,l){4&l&&N(e,"height",1.5*t[2]+"px")},d(t){t&&f(e)}}}function xt(t){let e,l=t[4]&&t[21]===t[0].length-1&&mt(t);return{c(){l&&l.c(),e=c()},l(t){l&&l.l(t),e=i(t)},m(t,n){l&&l.m(t,n),h(t,e,n)},p(t,n){t[4]&&t[21]===t[0].length-1?l?l.p(t,n):(l=mt(t),l.c(),l.m(e.parentNode,e)):l&&(l.d(1),l=null)},d(t){l&&l.d(t),t&&f(e)}}}function yt(t,e){let l,n,s;return n=new rt({props:{card:e[19],stack:e[0],cardIndex:e[21],$$slots:{default:[xt]},$$scope:{ctx:e}}}),n.$on("click",(function(){return e[14](e[19])})),{key:t,first:null,c(){l=R(),M(n.$$.fragment),this.h()},l(t){l=R(),S(n.$$.fragment,t),this.h()},h(){this.first=l},m(t,e){h(t,l,e),G(n,t,e),s=!0},p(t,l){e=t;const s={};1&l&&(s.card=e[19]),1&l&&(s.stack=e[0]),1&l&&(s.cardIndex=e[21]),65557&l&&(s.$$scope={dirty:l,ctx:e}),n.$set(s)},i(t){s||(y(n.$$.fragment,t),s=!0)},o(t){m(n.$$.fragment,t),s=!1},d(t){t&&f(l),B(n,t)}}}function vt(t){let e,l;return e=new rt({props:{$$slots:{default:[It]},$$scope:{ctx:t}}}),e.$on("click",t[13]),{c(){M(e.$$.fragment)},l(t){S(e.$$.fragment,t)},m(t,n){G(e,t,n),l=!0},p(t,l){const n={};65668&l&&(n.$$scope={dirty:l,ctx:t}),e.$set(n)},i(t){l||(y(e.$$.fragment,t),l=!0)},o(t){m(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}function kt(t){let e,l,n;return l=new q({props:{buttons:t[2]>56?"new,restart":"new",text:t[2]>72,class:"w-full"}}),{c(){e=r("div"),M(l.$$.fragment)},l(t){e=o(t,"DIV",{});var n=a(e);S(l.$$.fragment,n),n.forEach(f)},m(t,s){h(t,e,s),G(l,e,null),n=!0},p(t,e){const n={};4&e&&(n.buttons=t[2]>56?"new,restart":"new"),4&e&&(n.text=t[2]>72),l.$set(n)},i(t){n||(y(l.$$.fragment,t),n=!0)},o(t){m(l.$$.fragment,t),n=!1},d(t){t&&f(e),B(l)}}}function wt(t){let e,l,n="number"==typeof t[7].canRecycle&&bt(t);return{c(){e=r("div"),l=C("Cycle\n                  "),n&&n.c(),this.h()},l(t){e=o(t,"DIV",{});var s=a(e);l=z(s,"Cycle\n                  "),n&&n.l(s),s.forEach(f),this.h()},h(){u(e,"text-gray-600",!t[7].canRecycle)},m(t,s){h(t,e,s),g(e,l),n&&n.m(e,null)},p(t,l){"number"==typeof t[7].canRecycle?n?n.p(t,l):(n=bt(t),n.c(),n.m(e,null)):n&&(n.d(1),n=null),128&l&&u(e,"text-gray-600",!t[7].canRecycle)},i:V,o:V,d(t){t&&f(e),n&&n.d()}}}function bt(t){let e,l,n,s=t[7].canRecycle+"";return{c(){e=C("("),l=C(s),n=C(")")},l(t){e=z(t,"("),l=z(t,s),n=z(t,")")},m(t,s){h(t,e,s),h(t,l,s),h(t,n,s)},p(t,e){128&e&&s!==(s=t[7].canRecycle+"")&&J(l,s)},d(t){t&&f(e),t&&f(l),t&&f(n)}}}function It(t){let e,l,n,s;const r=[wt,kt],o=[];function a(t,e){return t[7].canRecycle?0:1}return e=a(t),l=o[e]=r[e](t),{c(){l.c(),n=c()},l(t){l.l(t),n=i(t)},m(t,l){o[e].m(t,l),h(t,n,l),s=!0},p(t,s){let c=e;e=a(t),e===c?o[e].p(t,s):($(),m(o[c],1,1,(()=>{o[c]=null})),x(),l=o[e],l?l.p(t,s):(l=o[e]=r[e](t),l.c()),y(l,1),l.m(n.parentNode,n))},i(t){s||(y(l),s=!0)},o(t){m(l),s=!1},d(t){o[e].d(t),t&&f(n)}}}function Dt(t,e){let l,n,s;return n=new rt({props:{card:e[19],stack:e[7].deck,facedown:!0,cardIndex:e[21]}}),n.$on("click",e[12]),{key:t,first:null,c(){l=R(),M(n.$$.fragment),this.h()},l(t){l=R(),S(n.$$.fragment,t),this.h()},h(){this.first=l},m(t,e){h(t,l,e),G(n,t,e),s=!0},p(t,l){e=t;const s={};1&l&&(s.card=e[19]),128&l&&(s.stack=e[7].deck),1&l&&(s.cardIndex=e[21]),n.$set(s)},i(t){s||(y(n.$$.fragment,t),s=!0)},o(t){m(n.$$.fragment,t),s=!1},d(t){t&&f(l),B(n,t)}}}function Et(t){let e,l,n,s;const r=[it,at],c=[];function o(t,e){return"string"!=typeof t[0]?0:1}return e=o(t),l=c[e]=r[e](t),{c(){l.c(),n=R()},l(t){l.l(t),n=R()},m(t,l){c[e].m(t,l),h(t,n,l),s=!0},p(t,[s]){let a=e;e=o(t),e===a?c[e].p(t,s):($(),m(c[a],1,1,(()=>{c[a]=null})),x(),l=c[e],l?l.p(t,s):(l=c[e]=r[e](t),l.c()),y(l,1),l.m(n.parentNode,n))},i(t){s||(y(l),s=!0)},o(t){m(l),s=!1},d(t){c[e].d(t),t&&f(n)}}}const Vt=t=>{t.preventDefault()};function Rt(t,e,l){let n,s,r,c,o,a,i,f;I(t,Y,(t=>l(1,c=t))),I(t,U,(t=>l(7,o=t))),I(t,F,(t=>l(2,a=t))),I(t,K,(t=>l(17,i=t))),I(t,P,(t=>l(18,f=t)));let{$$slots:d={},$$scope:u}=e,{stack:h}=e,g="",p=0,$=0;function m(t,e){"string"!=typeof t&&(e?o.clickCard(e,t):o.deal(),U.set(o))}"string"==typeof h?("-"===h&&(g="flex-shrink"),"_"===h&&(g="flex-grow")):h&&!h.isDeck&&(h.conf.horizontal?$=h.maxWidth*f:p=h.maxHeight*i);return t.$$set=t=>{"stack"in t&&l(0,h=t.stack),"$$scope"in t&&l(16,u=t.$$scope)},t.$$.update=()=>{1028&t.$$.dirty&&l(6,n=a+$),516&t.$$.dirty&&l(5,s=1.5*a+p),3&t.$$.dirty&&l(4,r=h&&"string"!=typeof h&&(null==c?void 0:c.cards)&&h.wants(c.cards))},[h,c,a,g,r,s,n,o,m,p,$,d,()=>m(h),()=>m(h),t=>m(h,t),t=>{t.preventDefault(),h.wants(c.cards)&&(console.log("dropped!"),o.do(new L("move",new O(c.cardDepth,c.fromStack,h.index))))},u]}class jt extends e{constructor(t){super(),l(this,t,Rt,Et,n,{stack:0})}}function _t(t,e,l){const n=t.slice();return n[10]=e[l],n}function Nt(t,e,l){const n=t.slice();return n[13]=e[l],n}function Mt(t,e,l){const n=t.slice();return n[10]=e[l],n[17]=l,n}function St(t,e,l){const n=t.slice();return n[13]=e[l],n}function Gt(t){let e,l;return e=new jt({props:{stack:t[13]}}),{c(){M(e.$$.fragment)},l(t){S(e.$$.fragment,t)},m(t,n){G(e,t,n),l=!0},p(t,l){const n={};4&l&&(n.stack=t[13]),e.$set(n)},i(t){l||(y(e.$$.fragment,t),l=!0)},o(t){m(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}function Bt(t){let e,l,n=t[10].stacks,s=[];for(let r=0;r<n.length;r+=1)s[r]=Gt(St(t,n,r));const c=t=>m(s[t],1,1,(()=>{s[t]=null}));return{c(){e=r("div");for(let t=0;t<s.length;t+=1)s[t].c();this.h()},l(t){e=o(t,"DIV",{class:!0,style:!0});var l=a(e);for(let e=0;e<s.length;e+=1)s[e].l(l);l.forEach(f),this.h()},h(){d(e,"class","flex flex-row w-full relative md:p-4 pointer-events-none"),N(e,"height",(t[2].conf.overlayRows&&t[17]!==t[2].layout.length-1?.4*t[3]:t[3]+t[10].maxHeight*t[4]+t[4])+"px"),u(e,"justify-center",t[2].conf.centerRows)},m(t,n){h(t,e,n);for(let l=0;l<s.length;l+=1)s[l].m(e,null);l=!0},p(t,r){if(4&r){let l;for(n=t[10].stacks,l=0;l<n.length;l+=1){const c=St(t,n,l);s[l]?(s[l].p(c,r),y(s[l],1)):(s[l]=Gt(c),s[l].c(),y(s[l],1),s[l].m(e,null))}for($(),l=n.length;l<s.length;l+=1)c(l);x()}(!l||28&r)&&N(e,"height",(t[2].conf.overlayRows&&t[17]!==t[2].layout.length-1?.4*t[3]:t[3]+t[10].maxHeight*t[4]+t[4])+"px"),4&r&&u(e,"justify-center",t[2].conf.centerRows)},i(t){if(!l){for(let t=0;t<n.length;t+=1)y(s[t]);l=!0}},o(t){s=s.filter(Boolean);for(let e=0;e<s.length;e+=1)m(s[e]);l=!1},d(t){t&&f(e),W(s,t)}}}function Ht(t){let e,l;return e=new jt({props:{stack:t[13]}}),{c(){M(e.$$.fragment)},l(t){S(e.$$.fragment,t)},m(t,n){G(e,t,n),l=!0},p(t,l){const n={};4&l&&(n.stack=t[13]),e.$set(n)},i(t){l||(y(e.$$.fragment,t),l=!0)},o(t){m(e.$$.fragment,t),l=!1},d(t){B(e,t)}}}function Ct(t){let e,l,n,s=t[10].stacks,p=[];for(let r=0;r<s.length;r+=1)p[r]=Ht(Nt(t,s,r));const v=t=>m(p[t],1,1,(()=>{p[t]=null}));return{c(){e=r("div");for(let t=0;t<p.length;t+=1)p[t].c();l=c(),this.h()},l(t){e=o(t,"DIV",{class:!0,style:!0});var n=a(e);for(let e=0;e<p.length;e+=1)p[e].l(n);l=i(n),n.forEach(f),this.h()},h(){d(e,"class","flex flex-row w-full relative md:p-4 pointer-events-none"),N(e,"height",t[3]+"px"),u(e,"justify-center",t[2].conf.centerRows)},m(t,s){h(t,e,s);for(let l=0;l<p.length;l+=1)p[l].m(e,null);g(e,l),n=!0},p(t,r){if(4&r){let n;for(s=t[10].stacks,n=0;n<s.length;n+=1){const c=Nt(t,s,n);p[n]?(p[n].p(c,r),y(p[n],1)):(p[n]=Ht(c),p[n].c(),y(p[n],1),p[n].m(e,l))}for($(),n=s.length;n<p.length;n+=1)v(n);x()}(!n||8&r)&&N(e,"height",t[3]+"px"),4&r&&u(e,"justify-center",t[2].conf.centerRows)},i(t){if(!n){for(let t=0;t<s.length;t+=1)y(p[t]);n=!0}},o(t){p=p.filter(Boolean);for(let e=0;e<p.length;e+=1)m(p[e]);n=!1},d(t){t&&f(e),W(p,t)}}}function zt(t){let e,l,n,s,u=t[2].layout,p=[];for(let r=0;r<u.length;r+=1)p[r]=Bt(Mt(t,u,r));const v=t=>m(p[t],1,1,(()=>{p[t]=null}));let k=t[2].footer,w=[];for(let r=0;r<k.length;r+=1)w[r]=Ct(_t(t,k,r));const b=t=>m(w[t],1,1,(()=>{w[t]=null}));return{c(){e=r("div");for(let t=0;t<p.length;t+=1)p[t].c();l=c();for(let t=0;t<w.length;t+=1)w[t].c();this.h()},l(t){e=o(t,"DIV",{id:!0,class:!0});var n=a(e);for(let e=0;e<p.length;e+=1)p[e].l(n);l=i(n);for(let e=0;e<w.length;e+=1)w[e].l(n);n.forEach(f),this.h()},h(){d(e,"id","game"),d(e,"class","flex flex-col text-white h-full"),j((()=>t[9].call(e)))},m(r,c){h(r,e,c);for(let t=0;t<p.length;t+=1)p[t].m(e,null);g(e,l);for(let t=0;t<w.length;t+=1)w[t].m(e,null);n=T(e,t[9].bind(e)),s=!0},p(t,[n]){if(28&n){let s;for(u=t[2].layout,s=0;s<u.length;s+=1){const r=Mt(t,u,s);p[s]?(p[s].p(r,n),y(p[s],1)):(p[s]=Bt(r),p[s].c(),y(p[s],1),p[s].m(e,l))}for($(),s=u.length;s<p.length;s+=1)v(s);x()}if(12&n){let l;for(k=t[2].footer,l=0;l<k.length;l+=1){const s=_t(t,k,l);w[l]?(w[l].p(s,n),y(w[l],1)):(w[l]=Ct(s),w[l].c(),y(w[l],1),w[l].m(e,null))}for($(),l=k.length;l<w.length;l+=1)b(l);x()}},i(t){if(!s){for(let t=0;t<u.length;t+=1)y(p[t]);for(let t=0;t<k.length;t+=1)y(w[t]);s=!0}},o(t){p=p.filter(Boolean);for(let e=0;e<p.length;e+=1)m(p[e]);w=w.filter(Boolean);for(let e=0;e<w.length;e+=1)m(w[e]);s=!1},d(t){t&&f(e),W(p,t),W(w,t),n()}}}function At(t,e,l){let n,s,r,c,o,a;I(t,F,(t=>l(8,c=t))),I(t,U,(t=>l(2,o=t))),I(t,K,(t=>l(4,a=t)));let{editing:i=!1}=e,f=0,d=0;return t.$$set=t=>{"editing"in t&&l(5,i=t.editing)},t.$$.update=()=>{4&t.$$.dirty&&l(6,n=o.layout.length+o.footer.length),4&t.$$.dirty&&l(7,s=o.layout.reduce(((t,e)=>t+(e.maxHeight-1)),0)),199&t.$$.dirty&&F.set(Math.min(f/o.longestRow-5,(-.018*d*s+.66*d)/(n*(o.conf.overlayRows?.1*o.layout.length:1)))),256&t.$$.dirty&&l(3,r=1.5*c)},[f,d,o,r,a,i,n,s,c,function(){f=this.clientWidth,d=this.clientHeight,l(0,f),l(1,d)}]}class Jt extends e{constructor(t){super(),l(this,t,At,zt,n,{editing:5})}}export{Jt as T,Q as p};