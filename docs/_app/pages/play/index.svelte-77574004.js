import{S as t,i as e,s as l,e as n,c as o,a as s,d as r,b as a,R as f,T as c,f as h,x as i,j as g,m as u,o as m,u as $,v as p,w as d,G as y,k,n as v,D as w,U as x,V as j,J as R,r as b}from"../../chunks/vendor-bbe47adb.js";import{S as D,p as G}from"../../chunks/Stack-7e9f1b4c.js";import{g as V,m as B,e as E}from"../../chunks/stores-95512afe.js";import{G as H}from"../../chunks/GameControls-d7a44d87.js";import{G as I}from"../../chunks/Game-c6420ef6.js";function S(t,e,l){const n=t.slice();return n[10]=e[l],n[12]=l,n}function q(t,e,l){const n=t.slice();return n[13]=e[l],n}function C(t,e,l){const n=t.slice();return n[10]=e[l],n[12]=l,n}function J(t,e,l){const n=t.slice();return n[13]=e[l],n}function M(t){let e,l;return e=new D({props:{stack:t[13]}}),{c(){g(e.$$.fragment)},l(t){u(e.$$.fragment,t)},m(t,n){m(e,t,n),l=!0},p(t,l){const n={};4&l&&(n.stack=t[13]),e.$set(n)},i(t){l||(i(e.$$.fragment,t),l=!0)},o(t){$(e.$$.fragment,t),l=!1},d(t){p(e,t)}}}function T(t){let e,l,g=t[10].stacks,u=[];for(let n=0;n<g.length;n+=1)u[n]=M(J(t,g,n));const m=t=>$(u[t],1,1,(()=>{u[t]=null}));return{c(){e=n("div");for(let t=0;t<u.length;t+=1)u[t].c();this.h()},l(t){e=o(t,"DIV",{class:!0,style:!0});var l=s(e);for(let e=0;e<u.length;e+=1)u[e].l(l);l.forEach(r),this.h()},h(){a(e,"class","flex flex-row w-full relative p-4 pointer-events-none"),f(e,"height",(t[2].conf.overlayRows&&t[12]!==t[2].layout.length-1?.4*t[3]:t[3]+t[10].maxHeight*t[4]+t[4])+"px"),c(e,"justify-center",t[2].conf.centerRows)},m(t,n){h(t,e,n);for(let l=0;l<u.length;l+=1)u[l].m(e,null);l=!0},p(t,n){if(4&n){let l;for(g=t[10].stacks,l=0;l<g.length;l+=1){const o=J(t,g,l);u[l]?(u[l].p(o,n),i(u[l],1)):(u[l]=M(o),u[l].c(),i(u[l],1),u[l].m(e,null))}for(b(),l=g.length;l<u.length;l+=1)m(l);d()}(!l||28&n)&&f(e,"height",(t[2].conf.overlayRows&&t[12]!==t[2].layout.length-1?.4*t[3]:t[3]+t[10].maxHeight*t[4]+t[4])+"px"),4&n&&c(e,"justify-center",t[2].conf.centerRows)},i(t){if(!l){for(let t=0;t<g.length;t+=1)i(u[t]);l=!0}},o(t){u=u.filter(Boolean);for(let e=0;e<u.length;e+=1)$(u[e]);l=!1},d(t){t&&r(e),y(u,t)}}}function U(t){let e,l;return e=new D({props:{stack:t[13]}}),{c(){g(e.$$.fragment)},l(t){u(e.$$.fragment,t)},m(t,n){m(e,t,n),l=!0},p(t,l){const n={};4&l&&(n.stack=t[13]),e.$set(n)},i(t){l||(i(e.$$.fragment,t),l=!0)},o(t){$(e.$$.fragment,t),l=!1},d(t){p(e,t)}}}function W(t){let e,l,g,u=t[10].stacks,m=[];for(let n=0;n<u.length;n+=1)m[n]=U(q(t,u,n));const p=t=>$(m[t],1,1,(()=>{m[t]=null}));return{c(){e=n("div");for(let t=0;t<m.length;t+=1)m[t].c();l=k(),this.h()},l(t){e=o(t,"DIV",{class:!0,style:!0});var n=s(e);for(let e=0;e<m.length;e+=1)m[e].l(n);l=v(n),n.forEach(r),this.h()},h(){a(e,"class","flex flex-row w-full relative p-4 pointer-events-none"),f(e,"height",t[3]+"px"),c(e,"justify-center",t[2].conf.centerRows)},m(t,n){h(t,e,n);for(let l=0;l<m.length;l+=1)m[l].m(e,null);w(e,l),g=!0},p(t,n){if(4&n){let o;for(u=t[10].stacks,o=0;o<u.length;o+=1){const s=q(t,u,o);m[o]?(m[o].p(s,n),i(m[o],1)):(m[o]=U(s),m[o].c(),i(m[o],1),m[o].m(e,l))}for(b(),o=u.length;o<m.length;o+=1)p(o);d()}(!g||8&n)&&f(e,"height",t[3]+"px"),4&n&&c(e,"justify-center",t[2].conf.centerRows)},i(t){if(!g){for(let t=0;t<u.length;t+=1)i(m[t]);g=!0}},o(t){m=m.filter(Boolean);for(let e=0;e<m.length;e+=1)$(m[e]);g=!1},d(t){t&&r(e),y(m,t)}}}function z(t){let e,l,f,c,R,D,G;f=new H({});let V=t[2].layout,B=[];for(let n=0;n<V.length;n+=1)B[n]=T(C(t,V,n));const E=t=>$(B[t],1,1,(()=>{B[t]=null}));let I=t[2].footer,q=[];for(let n=0;n<I.length;n+=1)q[n]=W(S(t,I,n));const J=t=>$(q[t],1,1,(()=>{q[t]=null}));return{c(){e=n("div"),l=n("div"),g(f.$$.fragment),c=k();for(let t=0;t<B.length;t+=1)B[t].c();R=k();for(let t=0;t<q.length;t+=1)q[t].c();this.h()},l(t){e=o(t,"DIV",{id:!0,class:!0});var n=s(e);l=o(n,"DIV",{id:!0,class:!0});var a=s(l);u(f.$$.fragment,a),a.forEach(r),c=v(n);for(let e=0;e<B.length;e+=1)B[e].l(n);R=v(n);for(let e=0;e<q.length;e+=1)q[e].l(n);n.forEach(r),this.h()},h(){a(l,"id","actions"),a(l,"class","flex-shrink"),a(e,"id","game"),a(e,"class","flex flex-col text-white h-full"),x((()=>t[6].call(e)))},m(n,o){h(n,e,o),w(e,l),m(f,l,null),w(e,c);for(let t=0;t<B.length;t+=1)B[t].m(e,null);w(e,R);for(let t=0;t<q.length;t+=1)q[t].m(e,null);D=j(e,t[6].bind(e)),G=!0},p(t,[l]){if(28&l){let n;for(V=t[2].layout,n=0;n<V.length;n+=1){const o=C(t,V,n);B[n]?(B[n].p(o,l),i(B[n],1)):(B[n]=T(o),B[n].c(),i(B[n],1),B[n].m(e,R))}for(b(),n=V.length;n<B.length;n+=1)E(n);d()}if(12&l){let n;for(I=t[2].footer,n=0;n<I.length;n+=1){const o=S(t,I,n);q[n]?(q[n].p(o,l),i(q[n],1)):(q[n]=W(o),q[n].c(),i(q[n],1),q[n].m(e,null))}for(b(),n=I.length;n<q.length;n+=1)J(n);d()}},i(t){if(!G){i(f.$$.fragment,t);for(let t=0;t<V.length;t+=1)i(B[t]);for(let t=0;t<I.length;t+=1)i(q[t]);G=!0}},o(t){$(f.$$.fragment,t),B=B.filter(Boolean);for(let e=0;e<B.length;e+=1)$(B[e]);q=q.filter(Boolean);for(let e=0;e<q.length;e+=1)$(q[e]);G=!1},d(t){t&&r(e),p(f),y(B,t),y(q,t),D()}}}function A(t,e,l){let n,o,s,r,a;R(t,B,(t=>l(5,o=t))),R(t,V,(t=>l(2,s=t))),R(t,G,(t=>l(7,r=t))),R(t,E,(t=>l(4,a=t)));{let t=r.query.get("g");t||(t="klondike-vegas");let e=r.query.get("d");V.set(new I(t,e))}let f=0,c=0,h=s.layout.length+s.footer.length,i=s.layout.reduce(((t,e)=>t+(e.maxHeight-1)),0);return t.$$.update=()=>{7&t.$$.dirty&&B.set(Math.min(f/s.longestRow-20,(-.018*c*i+.66*c)/(h*(s.conf.overlayRows?.1*s.layout.length:1)))),32&t.$$.dirty&&l(3,n=1.5*o)},[f,c,s,n,a,o,function(){f=this.clientWidth,c=this.clientHeight,l(0,f),l(1,c)}]}class F extends t{constructor(t){super(),e(this,t,A,z,l,{})}}export{F as default};