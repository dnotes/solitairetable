import{S as _,i as f,s as u,E as m,a as p,v as d,c as $,w as g,b as v,x as w,F as y,G as E,H as L,f as l,t as c,h as W,y as b}from"../../chunks/index-e7dad187.js";import{_ as k}from"../../chunks/preload-helper-aa6bc0ce.js";function I(i){return(async()=>{if("serviceWorker"in navigator){const{Workbox:s,messageSW:o}=await k(()=>import("../../chunks/workbox-window.prod.es5-daaa7301.js"),[],import.meta.url),n=new s("/service-worker.js");let a;const e=t=>{n.addEventListener("controlling",r=>{window.location.reload()}),a!=null&&a.waiting&&o(a.waiting,{type:"SKIP_WAITING"})};n.addEventListener("waiting",e),n.addEventListener("externalwaiting",e),n.register().then(t=>a=t)}})(),[]}class P extends _{constructor(s){super(),f(this,s,I,null,u,{})}}function S(i){let s,o,n;const a=i[1].default,e=m(a,i,i[0],null);return o=new P({}),{c(){e&&e.c(),s=p(),d(o.$$.fragment)},l(t){e&&e.l(t),s=$(t),g(o.$$.fragment,t)},m(t,r){e&&e.m(t,r),v(t,s,r),w(o,t,r),n=!0},p(t,[r]){e&&e.p&&(!n||r&1)&&y(e,a,t,t[0],n?L(a,t[0],r,null):E(t[0]),null)},i(t){n||(l(e,t),l(o.$$.fragment,t),n=!0)},o(t){c(e,t),c(o.$$.fragment,t),n=!1},d(t){e&&e.d(t),t&&W(s),b(o,t)}}}function h(i,s,o){let{$$slots:n={},$$scope:a}=s;return i.$$set=e=>{"$$scope"in e&&o(0,a=e.$$scope)},[a,n]}class R extends _{constructor(s){super(),f(this,s,h,S,u,{})}}export{R as default};
