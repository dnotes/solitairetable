import{S as L,i as Q,s as X,k as b,l as w,m as $,h,n as d,b as v,I as C,A as W,U as O,e as D,g as j,t as g,d as V,f as m,E as $e,p as G,F as Ie,G as Ee,H as Ce,T as z,v as B,w as S,x as q,y as T,a as R,q as U,c as M,r as K,N as De,u as we,o as je,V as Z,W as Ve}from"../../../chunks/index-e7dad187.js";import{G as Ne,g as We,a as Y}from"../../../chunks/navigation-1bcfb984.js";import"../../../chunks/singletons-f098867a.js";function He(s){let e,l;return{c(){e=b("img"),this.h()},l(t){e=w(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){d(e,"class","w-full"),O(e.src,l="/cards/small/_empty.svg")||d(e,"src",l),d(e,"alt","-")},m(t,r){v(t,e,r)},p:W,d(t){t&&h(e)}}}function Ge(s){let e;function l(i,o){return i[0].facedown?ze:Me}let t=l(s),r=t(s);return{c(){r.c(),e=D()},l(i){r.l(i),e=D()},m(i,o){r.m(i,o),v(i,e,o)},p(i,o){t===(t=l(i))&&r?r.p(i,o):(r.d(1),r=t(i),r&&(r.c(),r.m(e.parentNode,e)))},d(i){r.d(i),i&&h(e)}}}function Re(s){let e,l;return{c(){e=b("img"),this.h()},l(t){e=w(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){d(e,"class","w-full"),O(e.src,l="/cards/small/_back.svg")||d(e,"src",l),d(e,"alt","?")},m(t,r){v(t,e,r)},p:W,d(t){t&&h(e)}}}function Me(s){let e,l;return{c(){e=b("img"),this.h()},l(t){e=w(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){d(e,"class","w-full"),O(e.src,l="/cards/small/"+s[5]+".svg")||d(e,"src",l),d(e,"alt",s[6])},m(t,r){v(t,e,r)},p(t,r){r&32&&!O(e.src,l="/cards/small/"+t[5]+".svg")&&d(e,"src",l),r&64&&d(e,"alt",t[6])},d(t){t&&h(e)}}}function ze(s){let e,l;return{c(){e=b("img"),this.h()},l(t){e=w(t,"IMG",{class:!0,src:!0,alt:!0}),this.h()},h(){d(e,"class","w-full"),O(e.src,l="/cards/small/_back.svg")||d(e,"src",l),d(e,"alt","?")},m(t,r){v(t,e,r)},p:W,d(t){t&&h(e)}}}function Be(s){let e,l,t,r;function i(n,c){return n[1]?Re:n[0]?Ge:He}let o=i(s),a=o(s);return{c(){e=b("div"),l=b("div"),a.c(),this.h()},l(n){e=w(n,"DIV",{class:!0,style:!0});var c=$(e);l=w(c,"DIV",{});var f=$(l);a.l(f),f.forEach(h),c.forEach(h),this.h()},h(){d(e,"class",t=s[4]+" absolute svelte-oigr2j"),d(e,"style",r=s[2]+":"+s[3]+"px")},m(n,c){v(n,e,c),C(e,l),a.m(l,null)},p(n,[c]){o===(o=i(n))&&a?a.p(n,c):(a.d(1),a=o(n),a&&(a.c(),a.m(l,null))),c&16&&t!==(t=n[4]+" absolute svelte-oigr2j")&&d(e,"class",t),c&12&&r!==(r=n[2]+":"+n[3]+"px")&&d(e,"style",r)},i:W,o:W,d(n){n&&h(e),a.d()}}}function Se(s,e,l){let{card:t=void 0}=e,{facedown:r=!1}=e,{stack:i=void 0}=e,{cardIndex:o=0}=e,a,n,c,f,u,_;return t&&(f=["hearts","diamonds"].includes(t.suitName)?"text-red-600":"text-black",u=t.isJoker?t.char==="1"?"_joker_black":"_joker_red":`${t.rank}_${t.suitName}`,_=t.isJoker?"joker":`${t.rank}${t.suit}`),s.$$set=k=>{"card"in k&&l(0,t=k.card),"facedown"in k&&l(1,r=k.facedown),"stack"in k&&l(7,i=k.stack),"cardIndex"in k&&l(8,o=k.cardIndex)},s.$$.update=()=>{s.$$.dirty&896&&i&&(l(9,a=Math.max(o-i.firstVisible,0)),l(3,c=a*(i.conf.horizontal?3:6)),l(2,n=i.conf.horizontal?"left":"top"))},[t,r,n,c,f,u,_,i,o,a]}class ee extends L{constructor(e){super(),Q(this,e,Se,Be,X,{card:0,facedown:1,stack:7,cardIndex:8})}}function ne(s,e,l){const t=s.slice();return t[7]=e[l],t[9]=l,t}function qe(s){let e,l,t;const r=s[6].default,i=$e(r,s,s[5],null);return{c(){e=b("div"),i&&i.c(),this.h()},l(o){e=w(o,"DIV",{class:!0,style:!0});var a=$(e);i&&i.l(a),a.forEach(h),this.h()},h(){d(e,"class",l="relative "+s[4]+" justify-center box-content"),G(e,"width",(s[0]==="-"?s[1]/2:s[1])+"px")},m(o,a){v(o,e,a),i&&i.m(e,null),t=!0},p(o,a){i&&i.p&&(!t||a&32)&&Ie(i,r,o,o[5],t?Ce(r,o[5],a,null):Ee(o[5]),null),(!t||a&16&&l!==(l="relative "+o[4]+" justify-center box-content"))&&d(e,"class",l),(!t||a&3)&&G(e,"width",(o[0]==="-"?o[1]/2:o[1])+"px")},i(o){t||(m(i,o),t=!0)},o(o){g(i,o),t=!1},d(o){o&&h(e),i&&i.d(o)}}}function Te(s){let e,l,t,r,i=s[0]&&ie(s);return{c(){e=b("div"),l=b("div"),i&&i.c(),this.h()},l(o){e=w(o,"DIV",{class:!0,style:!0});var a=$(e);l=w(a,"DIV",{class:!0,style:!0});var n=$(l);i&&i.l(n),n.forEach(h),a.forEach(h),this.h()},h(){d(l,"class","relative h-full"),G(l,"max-width",s[1]+"px"),d(e,"class","relative justify-center box-content"),d(e,"style",t="padding:1px; padding-"+s[2]+":"+s[3]+"px; width:"+s[1]+"px;")},m(o,a){v(o,e,a),C(e,l),i&&i.m(l,null),r=!0},p(o,a){o[0]?i?(i.p(o,a),a&1&&m(i,1)):(i=ie(o),i.c(),m(i,1),i.m(l,null)):i&&(j(),g(i,1,1,()=>{i=null}),V()),(!r||a&2)&&G(l,"max-width",o[1]+"px"),(!r||a&14&&t!==(t="padding:1px; padding-"+o[2]+":"+o[3]+"px; width:"+o[1]+"px;"))&&d(e,"style",t)},i(o){r||(m(i),r=!0)},o(o){g(i),r=!1},d(o){o&&h(e),i&&i.d()}}}function ie(s){let e,l,t,r;const i=[Pe,Ae],o=[];function a(n,c){return n[0].isDeck?0:typeof n[0]!="string"?1:-1}return~(e=a(s))&&(l=o[e]=i[e](s)),{c(){l&&l.c(),t=D()},l(n){l&&l.l(n),t=D()},m(n,c){~e&&o[e].m(n,c),v(n,t,c),r=!0},p(n,c){let f=e;e=a(n),e===f?~e&&o[e].p(n,c):(l&&(j(),g(o[f],1,1,()=>{o[f]=null}),V()),~e?(l=o[e],l?l.p(n,c):(l=o[e]=i[e](n),l.c()),m(l,1),l.m(t.parentNode,t)):l=null)},i(n){r||(m(l),r=!0)},o(n){g(l),r=!1},d(n){~e&&o[e].d(n),n&&h(t)}}}function Ae(s){let e,l,t=s[0].stack,r=[];for(let a=0;a<t.length;a+=1)r[a]=ae(ne(s,t,a));const i=a=>g(r[a],1,1,()=>{r[a]=null});let o=null;return t.length||(o=oe()),{c(){for(let a=0;a<r.length;a+=1)r[a].c();e=D(),o&&o.c()},l(a){for(let n=0;n<r.length;n+=1)r[n].l(a);e=D(),o&&o.l(a)},m(a,n){for(let c=0;c<r.length;c+=1)r[c].m(a,n);v(a,e,n),o&&o.m(a,n),l=!0},p(a,n){if(n&1){t=a[0].stack;let c;for(c=0;c<t.length;c+=1){const f=ne(a,t,c);r[c]?(r[c].p(f,n),m(r[c],1)):(r[c]=ae(f),r[c].c(),m(r[c],1),r[c].m(e.parentNode,e))}for(j(),c=t.length;c<r.length;c+=1)i(c);V(),t.length?o&&(j(),g(o,1,1,()=>{o=null}),V()):o||(o=oe(),o.c(),m(o,1),o.m(e.parentNode,e))}},i(a){if(!l){for(let n=0;n<t.length;n+=1)m(r[n]);l=!0}},o(a){r=r.filter(Boolean);for(let n=0;n<r.length;n+=1)g(r[n]);l=!1},d(a){z(r,a),a&&h(e),o&&o.d(a)}}}function Pe(s){let e,l;return e=new ee({props:{facedown:!0}}),{c(){B(e.$$.fragment)},l(t){S(e.$$.fragment,t)},m(t,r){q(e,t,r),l=!0},p:W,i(t){l||(m(e.$$.fragment,t),l=!0)},o(t){g(e.$$.fragment,t),l=!1},d(t){T(e,t)}}}function oe(s){let e,l;return e=new ee({}),{c(){B(e.$$.fragment)},l(t){S(e.$$.fragment,t)},m(t,r){q(e,t,r),l=!0},i(t){l||(m(e.$$.fragment,t),l=!0)},o(t){g(e.$$.fragment,t),l=!1},d(t){T(e,t)}}}function ae(s){let e,l;return e=new ee({props:{card:s[7],stack:s[0],cardIndex:s[9]}}),{c(){B(e.$$.fragment)},l(t){S(e.$$.fragment,t)},m(t,r){q(e,t,r),l=!0},p(t,r){const i={};r&1&&(i.card=t[7]),r&1&&(i.stack=t[0]),e.$set(i)},i(t){l||(m(e.$$.fragment,t),l=!0)},o(t){g(e.$$.fragment,t),l=!1},d(t){T(e,t)}}}function Je(s){let e,l,t,r;const i=[Te,qe],o=[];function a(n,c){return typeof n[0]!="string"?0:1}return e=a(s),l=o[e]=i[e](s),{c(){l.c(),t=D()},l(n){l.l(n),t=D()},m(n,c){o[e].m(n,c),v(n,t,c),r=!0},p(n,[c]){let f=e;e=a(n),e===f?o[e].p(n,c):(j(),g(o[f],1,1,()=>{o[f]=null}),V(),l=o[e],l?l.p(n,c):(l=o[e]=i[e](n),l.c()),m(l,1),l.m(t.parentNode,t))},i(n){r||(m(l),r=!0)},o(n){g(l),r=!1},d(n){o[e].d(n),n&&h(t)}}}function Fe(s,e,l){let{$$slots:t={},$$scope:r}=e,{stack:i}=e,{maxCardWidth:o}=e,a,n,c="";return typeof i=="string"?(i==="-"&&(c="flex-shrink"),i==="_"&&(c="flex-grow")):i&&!i.isDeck&&(a=i.conf.horizontal?"right":"bottom",n=i.conf.horizontal?i.maxWidth*2:i.maxHeight*4),s.$$set=f=>{"stack"in f&&l(0,i=f.stack),"maxCardWidth"in f&&l(1,o=f.maxCardWidth),"$$scope"in f&&l(5,r=f.$$scope)},[i,o,a,n,c,r,t]}class ye extends L{constructor(e){super(),Q(this,e,Fe,Je,X,{stack:0,maxCardWidth:1})}}function se(s,e,l){const t=s.slice();return t[8]=e[l],t}function ce(s,e,l){const t=s.slice();return t[11]=e[l],t[13]=l,t}function fe(s,e,l){const t=s.slice();return t[14]=e[l],t}function ue(s,e,l){const t=s.slice();return t[11]=e[l],t[13]=l,t}function _e(s,e,l){const t=s.slice();return t[14]=e[l],t}function Oe(s){let e;return{c(){e=U("generating preview")},l(l){e=K(l,"generating preview")},m(l,t){v(l,e,t)},p:W,i:W,o:W,d(l){l&&h(e)}}}function Ue(s){let e,l,t,r=s[1].layout,i=[];for(let f=0;f<r.length;f+=1)i[f]=de(ue(s,r,f));const o=f=>g(i[f],1,1,()=>{i[f]=null});let a=s[1].footer,n=[];for(let f=0;f<a.length;f+=1)n[f]=ge(ce(s,a,f));const c=f=>g(n[f],1,1,()=>{n[f]=null});return{c(){for(let f=0;f<i.length;f+=1)i[f].c();e=R();for(let f=0;f<n.length;f+=1)n[f].c();l=D()},l(f){for(let u=0;u<i.length;u+=1)i[u].l(f);e=M(f);for(let u=0;u<n.length;u+=1)n[u].l(f);l=D()},m(f,u){for(let _=0;_<i.length;_+=1)i[_].m(f,u);v(f,e,u);for(let _=0;_<n.length;_+=1)n[_].m(f,u);v(f,l,u),t=!0},p(f,u){if(u&30){r=f[1].layout;let _;for(_=0;_<r.length;_+=1){const k=ue(f,r,_);i[_]?(i[_].p(k,u),m(i[_],1)):(i[_]=de(k),i[_].c(),m(i[_],1),i[_].m(e.parentNode,e))}for(j(),_=r.length;_<i.length;_+=1)o(_);V()}if(u&22){a=f[1].footer;let _;for(_=0;_<a.length;_+=1){const k=ce(f,a,_);n[_]?(n[_].p(k,u),m(n[_],1)):(n[_]=ge(k),n[_].c(),m(n[_],1),n[_].m(l.parentNode,l))}for(j(),_=a.length;_<n.length;_+=1)c(_);V()}},i(f){if(!t){for(let u=0;u<r.length;u+=1)m(i[u]);for(let u=0;u<a.length;u+=1)m(n[u]);t=!0}},o(f){i=i.filter(Boolean);for(let u=0;u<i.length;u+=1)g(i[u]);n=n.filter(Boolean);for(let u=0;u<n.length;u+=1)g(n[u]);t=!1},d(f){z(i,f),f&&h(e),z(n,f),f&&h(l)}}}function he(s){let e,l;return e=new ye({props:{stack:s[14],maxCardWidth:s[2]}}),{c(){B(e.$$.fragment)},l(t){S(e.$$.fragment,t)},m(t,r){q(e,t,r),l=!0},p(t,r){const i={};r&2&&(i.stack=t[14]),r&4&&(i.maxCardWidth=t[2]),e.$set(i)},i(t){l||(m(e.$$.fragment,t),l=!0)},o(t){g(e.$$.fragment,t),l=!1},d(t){T(e,t)}}}function de(s){let e,l,t=s[11].stacks,r=[];for(let o=0;o<t.length;o+=1)r[o]=he(_e(s,t,o));const i=o=>g(r[o],1,1,()=>{r[o]=null});return{c(){e=b("div");for(let o=0;o<r.length;o+=1)r[o].c();this.h()},l(o){e=w(o,"DIV",{class:!0,style:!0});var a=$(e);for(let n=0;n<r.length;n+=1)r[n].l(a);a.forEach(h),this.h()},h(){d(e,"class","flex flex-row w-full"),G(e,"height",(s[1].conf.overlayRows&&s[13]!==s[1].layout.length-1?s[4]*.4:s[4]+s[11].maxHeight*s[3]+s[3])+"px"),Z(e,"justify-center",s[1].conf.centerRows)},m(o,a){v(o,e,a);for(let n=0;n<r.length;n+=1)r[n].m(e,null);l=!0},p(o,a){if(a&6){t=o[11].stacks;let n;for(n=0;n<t.length;n+=1){const c=_e(o,t,n);r[n]?(r[n].p(c,a),m(r[n],1)):(r[n]=he(c),r[n].c(),m(r[n],1),r[n].m(e,null))}for(j(),n=t.length;n<r.length;n+=1)i(n);V()}(!l||a&26)&&G(e,"height",(o[1].conf.overlayRows&&o[13]!==o[1].layout.length-1?o[4]*.4:o[4]+o[11].maxHeight*o[3]+o[3])+"px"),a&2&&Z(e,"justify-center",o[1].conf.centerRows)},i(o){if(!l){for(let a=0;a<t.length;a+=1)m(r[a]);l=!0}},o(o){r=r.filter(Boolean);for(let a=0;a<r.length;a+=1)g(r[a]);l=!1},d(o){o&&h(e),z(r,o)}}}function me(s){let e,l;return e=new ye({props:{stack:s[14],maxCardWidth:s[2]}}),{c(){B(e.$$.fragment)},l(t){S(e.$$.fragment,t)},m(t,r){q(e,t,r),l=!0},p(t,r){const i={};r&2&&(i.stack=t[14]),r&4&&(i.maxCardWidth=t[2]),e.$set(i)},i(t){l||(m(e.$$.fragment,t),l=!0)},o(t){g(e.$$.fragment,t),l=!1},d(t){T(e,t)}}}function ge(s){let e,l,t,r=s[11].stacks,i=[];for(let a=0;a<r.length;a+=1)i[a]=me(fe(s,r,a));const o=a=>g(i[a],1,1,()=>{i[a]=null});return{c(){e=b("div");for(let a=0;a<i.length;a+=1)i[a].c();l=R(),this.h()},l(a){e=w(a,"DIV",{class:!0,style:!0});var n=$(e);for(let c=0;c<i.length;c+=1)i[c].l(n);l=M(n),n.forEach(h),this.h()},h(){d(e,"class","flex flex-row w-full relative md:p-4 pointer-events-none"),G(e,"height",s[4]+"px"),Z(e,"justify-center",s[1].conf.centerRows)},m(a,n){v(a,e,n);for(let c=0;c<i.length;c+=1)i[c].m(e,null);C(e,l),t=!0},p(a,n){if(n&6){r=a[11].stacks;let c;for(c=0;c<r.length;c+=1){const f=fe(a,r,c);i[c]?(i[c].p(f,n),m(i[c],1)):(i[c]=me(f),i[c].c(),m(i[c],1),i[c].m(e,l))}for(j(),c=r.length;c<i.length;c+=1)o(c);V()}(!t||n&16)&&G(e,"height",a[4]+"px"),n&2&&Z(e,"justify-center",a[1].conf.centerRows)},i(a){if(!t){for(let n=0;n<r.length;n+=1)m(i[n]);t=!0}},o(a){i=i.filter(Boolean);for(let n=0;n<i.length;n+=1)g(i[n]);t=!1},d(a){a&&h(e),z(i,a)}}}function pe(s){let e,l,t=s[8].title+"",r,i;return{c(){e=b("div"),l=b("a"),r=U(t),this.h()},l(o){e=w(o,"DIV",{});var a=$(e);l=w(a,"A",{href:!0});var n=$(l);r=K(n,t),n.forEach(h),a.forEach(h),this.h()},h(){d(l,"href",i="/play?g="+s[8].name)},m(o,a){v(o,e,a),C(e,l),C(l,r)},p(o,a){a&1&&t!==(t=o[8].title+"")&&we(r,t),a&1&&i!==(i="/play?g="+o[8].name)&&d(l,"href",i)},d(o){o&&h(e)}}}function Ke(s){let e,l,t,r,i,o,a,n,c=s[0].title+"",f,u,_,k,A,J;const te=[Ue,Oe],H=[];function le(p,E){return p[1]?0:1}t=le(s),r=H[t]=te[t](s);let P=s[0].variants||[],I=[];for(let p=0;p<P.length;p+=1)I[p]=pe(se(s,P,p));return{c(){e=b("div"),l=b("div"),r.c(),i=R(),o=b("div"),a=b("div"),n=b("a"),f=U(c),_=R();for(let p=0;p<I.length;p+=1)I[p].c();this.h()},l(p){e=w(p,"DIV",{class:!0});var E=$(e);l=w(E,"DIV",{class:!0});var N=$(l);r.l(N),N.forEach(h),i=M(E),o=w(E,"DIV",{class:!0});var y=$(o);a=w(y,"DIV",{class:!0});var F=$(a);n=w(F,"A",{href:!0});var re=$(n);f=K(re,c),re.forEach(h),F.forEach(h),_=M(y);for(let x=0;x<I.length;x+=1)I[x].l(y);y.forEach(h),E.forEach(h),this.h()},h(){d(l,"class","w-40 h-32 flex flex-col bg-green-800 box-content overflow-hidden rounded justify-center relative z-10"),d(n,"href",u="/play?g="+s[0].name),d(a,"class","w-40"),d(o,"class","leading-loose text-center bg-white rounded-b overflow-hidden pt-1 -mt-1"),d(e,"class","w-40 h-40 cursor-pointer overflow-hidden hover:overflow-visible hover:z-10 rounded mb-4 mx-1 drop-shadow relative")},m(p,E){v(p,e,E),C(e,l),H[t].m(l,null),C(e,i),C(e,o),C(o,a),C(a,n),C(n,f),C(o,_);for(let N=0;N<I.length;N+=1)I[N].m(o,null);k=!0,A||(J=De(l,"click",s[7]),A=!0)},p(p,[E]){let N=t;if(t=le(p),t===N?H[t].p(p,E):(j(),g(H[N],1,1,()=>{H[N]=null}),V(),r=H[t],r?r.p(p,E):(r=H[t]=te[t](p),r.c()),m(r,1),r.m(l,null)),(!k||E&1)&&c!==(c=p[0].title+"")&&we(f,c),(!k||E&1&&u!==(u="/play?g="+p[0].name))&&d(n,"href",u),E&1){P=p[0].variants||[];let y;for(y=0;y<P.length;y+=1){const F=se(p,P,y);I[y]?I[y].p(F,E):(I[y]=pe(F),I[y].c(),I[y].m(o,null))}for(;y<I.length;y+=1)I[y].d(1);I.length=P.length}},i(p){k||(m(r),k=!0)},o(p){g(r),k=!1},d(p){p&&h(e),H[t].d(),z(I,p),A=!1,J()}}}let Le=160,ve=128;function Qe(s,e,l){let t,{config:r}=e,i,o,a,n,c;je(()=>{l(1,i=new Ne(r)),l(5,o=i.layout.length+i.footer.length),l(6,a=i.layout.reduce((u,_)=>u+=_.maxHeight-1,0))});const f=()=>{We(`/play?g=${r.name}`)};return s.$$set=u=>{"config"in u&&l(0,r=u.config)},s.$$.update=()=>{s.$$.dirty&98&&l(2,n=Math.min(Le/(i==null?void 0:i.longestRow)-2,(-.018*ve*a+ve*.66)/(o*(i!=null&&i.conf.overlayRows?(i==null?void 0:i.layout.length)*.1:1)))),s.$$.dirty&4&&l(4,t=n*1.5),s.$$.dirty&4&&l(3,c=n*.24)},[r,i,n,c,t,o,a,f]}class Xe extends L{constructor(e){super(),Q(this,e,Qe,Ke,X,{config:0})}}function ke(s,e,l){const t=s.slice();return t[2]=e[l],t}function be(s){let e,l;return e=new Xe({props:{config:s[2]}}),{c(){B(e.$$.fragment)},l(t){S(e.$$.fragment,t)},m(t,r){q(e,t,r),l=!0},p(t,r){const i={};r&1&&(i.config=t[2]),e.$set(i)},i(t){l||(m(e.$$.fragment,t),l=!0)},o(t){g(e.$$.fragment,t),l=!1},d(t){T(e,t)}}}function Ye(s){let e,l,t=s[0],r=[];for(let o=0;o<t.length;o+=1)r[o]=be(ke(s,t,o));const i=o=>g(r[o],1,1,()=>{r[o]=null});return{c(){for(let o=0;o<r.length;o+=1)r[o].c();e=D()},l(o){for(let a=0;a<r.length;a+=1)r[a].l(o);e=D()},m(o,a){for(let n=0;n<r.length;n+=1)r[n].m(o,a);v(o,e,a),l=!0},p(o,[a]){if(a&1){t=o[0];let n;for(n=0;n<t.length;n+=1){const c=ke(o,t,n);r[n]?(r[n].p(c,a),m(r[n],1)):(r[n]=be(c),r[n].c(),m(r[n],1),r[n].m(e.parentNode,e))}for(j(),n=t.length;n<r.length;n+=1)i(n);V()}},i(o){if(!l){for(let a=0;a<t.length;a+=1)m(r[a]);l=!0}},o(o){r=r.filter(Boolean);for(let a=0;a<r.length;a+=1)g(r[a]);l=!1},d(o){z(r,o),o&&h(e)}}}function Ze(s,e,l){let{family:t=""}=e,r=[];return s.$$set=i=>{"family"in i&&l(1,t=i.family)},s.$$.update=()=>{var i;s.$$.dirty&2&&l(0,r=t?[Y[t],...(i=Y[t].variants)!=null?i:[]]:Object.keys(Y).map(o=>Y[o]).filter(o=>o.family===o.name))},[r,t]}class xe extends L{constructor(e){super(),Q(this,e,Ze,Ye,X,{family:1})}}function et(s){let e,l,t,r,i,o,a,n,c,f;return c=new xe({}),{c(){e=R(),l=b("h1"),t=U("Solitaire Table"),r=R(),i=b("h2"),o=U("Play solitaire here!"),a=R(),n=b("div"),B(c.$$.fragment),this.h()},l(u){Ve('[data-svelte="svelte-1neyvll"]',document.head).forEach(h),e=M(u),l=w(u,"H1",{});var k=$(l);t=K(k,"Solitaire Table"),k.forEach(h),r=M(u),i=w(u,"H2",{id:!0});var A=$(i);o=K(A,"Play solitaire here!"),A.forEach(h),a=M(u),n=w(u,"DIV",{class:!0});var J=$(n);S(c.$$.fragment,J),J.forEach(h),this.h()},h(){document.title="Solitaire Table | by David Hunt",d(i,"id","play-solitaire"),d(n,"class","flex flex-row flex-wrap justify-center")},m(u,_){v(u,e,_),v(u,l,_),C(l,t),v(u,r,_),v(u,i,_),C(i,o),v(u,a,_),v(u,n,_),q(c,n,null),f=!0},p:W,i(u){f||(m(c.$$.fragment,u),f=!0)},o(u){g(c.$$.fragment,u),f=!1},d(u){u&&h(e),u&&h(l),u&&h(r),u&&h(i),u&&h(a),u&&h(n),T(c)}}}class nt extends L{constructor(e){super(),Q(this,e,null,et,X,{})}}export{nt as default};
