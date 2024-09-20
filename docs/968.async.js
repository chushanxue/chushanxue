"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[968],{23014:function(nt,te,n){n.d(te,{Z:function(){return J}});var N=n(58276),l=n(40020),j={icon:{tag:"svg",attrs:{"fill-rule":"evenodd",viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M799.86 166.31c.02 0 .04.02.08.06l57.69 57.7c.04.03.05.05.06.08a.12.12 0 010 .06c0 .03-.02.05-.06.09L569.93 512l287.7 287.7c.04.04.05.06.06.09a.12.12 0 010 .07c0 .02-.02.04-.06.08l-57.7 57.69c-.03.04-.05.05-.07.06a.12.12 0 01-.07 0c-.03 0-.05-.02-.09-.06L512 569.93l-287.7 287.7c-.04.04-.06.05-.09.06a.12.12 0 01-.07 0c-.02 0-.04-.02-.08-.06l-57.69-57.7c-.04-.03-.05-.05-.06-.07a.12.12 0 010-.07c0-.03.02-.05.06-.09L454.07 512l-287.7-287.7c-.04-.04-.05-.06-.06-.09a.12.12 0 010-.07c0-.02.02-.04.06-.08l57.7-57.69c.03-.04.05-.05.07-.06a.12.12 0 01.07 0c.03 0 .05.02.09.06L512 454.07l287.7-287.7c.04-.04.06-.05.09-.06a.12.12 0 01.07 0z"}}]},name:"close",theme:"outlined"},a=j,Se=n(39585),Le=function(L,q){return l.createElement(Se.Z,(0,N.Z)({},L,{ref:q,icon:a}))},J=l.forwardRef(Le)},43878:function(nt,te,n){n.d(te,{Z:function(){return Cn}});var N=n(88252),l=n(41182),j=n(41229),a=n(40020),Se=n.t(a,2),Le=n(39035),J=n(69505),Ge=n(23390),L=n(38532),q=a.createContext(null),Ae=q,B=n(19019),G=n(88475),De=[];function Wt(e,i){var t=a.useState(function(){if(!(0,J.Z)())return null;var P=document.createElement("div");return P}),c=(0,l.Z)(t,1),f=c[0],m=a.useRef(!1),y=a.useContext(Ae),M=a.useState(De),C=(0,l.Z)(M,2),S=C[0],x=C[1],R=y||(m.current?void 0:function(P){x(function(H){var D=[P].concat((0,B.Z)(H));return D})});function I(){f.parentElement||document.body.appendChild(f),m.current=!0}function E(){var P;(P=f.parentElement)===null||P===void 0||P.removeChild(f),m.current=!1}return(0,G.Z)(function(){return e?y?y(I):I():E(),E},[e]),(0,G.Z)(function(){S.length&&(S.forEach(function(P){return P()}),x(De))},[S]),[f,R]}var Et=n(4146),at;function Ct(e){if(typeof document=="undefined")return 0;if(e||at===void 0){var i=document.createElement("div");i.style.width="100%",i.style.height="200px";var t=document.createElement("div"),c=t.style;c.position="absolute",c.top="0",c.left="0",c.pointerEvents="none",c.visibility="hidden",c.width="200px",c.height="150px",c.overflow="hidden",t.appendChild(i),document.body.appendChild(t);var f=i.offsetWidth;t.style.overflow="scroll";var m=i.offsetWidth;f===m&&(m=t.clientWidth),document.body.removeChild(t),at=f-m}return at}function Mt(e){var i=e.match(/^(.*)px$/),t=Number(i==null?void 0:i[1]);return Number.isNaN(t)?Ct():t}function or(e){if(typeof document=="undefined"||!e||!(e instanceof Element))return{width:0,height:0};var i=getComputedStyle(e,"::-webkit-scrollbar"),t=i.width,c=i.height;return{width:Mt(t),height:Mt(c)}}function kt(){return document.body.scrollHeight>(window.innerHeight||document.documentElement.clientHeight)&&window.innerWidth>document.body.offsetWidth}var Ft="rc-util-locker-".concat(Date.now()),We=0;function Bt(e){var i=!!e,t=a.useState(function(){return We+=1,"".concat(Ft,"_").concat(We)}),c=(0,l.Z)(t,1),f=c[0];(0,G.Z)(function(){if(i){var m=Ct(),y=kt();(0,Et.hq)(`
html body {
  overflow-y: hidden;
  `.concat(y?"width: calc(100% - ".concat(m,"px);"):"",`
}`),f)}else(0,Et.jL)(f);return function(){(0,Et.jL)(f)}},[i,f])}var wt=!1;function _t(e){return typeof e=="boolean"&&(wt=e),wt}var it=function(i){return i===!1?!1:!(0,J.Z)()||!i?null:typeof i=="string"?document.querySelector(i):typeof i=="function"?i():i},St=a.forwardRef(function(e,i){var t=e.open,c=e.autoLock,f=e.getContainer,m=e.debug,y=e.autoDestroy,M=y===void 0?!0:y,C=e.children,S=a.useState(t),x=(0,l.Z)(S,2),R=x[0],I=x[1],E=R||t;a.useEffect(function(){(M||t)&&I(t)},[t,M]);var P=a.useState(function(){return it(f)}),H=(0,l.Z)(P,2),D=H[0],F=H[1];a.useEffect(function(){var ne=it(f);F(ne!=null?ne:null)});var z=Wt(E&&!D,m),T=(0,l.Z)(z,2),h=T[0],re=T[1],ie=D!=null?D:h;Bt(c&&t&&(0,J.Z)()&&(ie===h||ie===document.body));var ce=null;if(C&&(0,L.Yr)(C)&&i){var Re=C;ce=Re.ref}var Oe=(0,L.x1)(ce,i);if(!E||!(0,J.Z)()||D===void 0)return null;var le=ie===!1||_t(),fe=C;return i&&(fe=a.cloneElement(C,{ref:Oe})),a.createElement(Ae.Provider,{value:re},le?fe:(0,Le.createPortal)(fe,ie))}),Rt=St,s=Rt,r=n(11089),o=n.n(r),u=n(48180),d=n(97249),b=n(13507),w=n(3883);function V(){var e=(0,N.Z)({},Se);return e.useId}var Y=0;function ge(){}var ae=V(),Pt=ae?function(i){var t=ae();return i||t}:function(i){var t=a.useState("ssr-id"),c=(0,l.Z)(t,2),f=c[0],m=c[1];return a.useEffect(function(){var y=Y;Y+=1,m("rc_unique_".concat(y))},[]),i||f},Ur=n(79772),sr=n(58276),Kt=n(48329);function ur(e){var i=e.prefixCls,t=e.align,c=e.arrow,f=e.arrowPos,m=c||{},y=m.className,M=m.content,C=f.x,S=C===void 0?0:C,x=f.y,R=x===void 0?0:x,I=a.useRef();if(!t||!t.points)return null;var E={position:"absolute"};if(t.autoArrow!==!1){var P=t.points[0],H=t.points[1],D=P[0],F=P[1],z=H[0],T=H[1];D===z||!["t","b"].includes(D)?E.top=R:D==="t"?E.top=0:E.bottom=0,F===T||!["l","r"].includes(F)?E.left=S:F==="l"?E.left=0:E.right=0}return a.createElement("div",{ref:I,className:o()("".concat(i,"-arrow"),y),style:E},M)}function cr(e){var i=e.prefixCls,t=e.open,c=e.zIndex,f=e.mask,m=e.motion;return f?a.createElement(Kt.ZP,(0,sr.Z)({},m,{motionAppear:!0,visible:t,removeOnLeave:!0}),function(y){var M=y.className;return a.createElement("div",{style:{zIndex:c},className:o()("".concat(i,"-mask"),M)})}):null}var ye=a.memo(function(e){var i=e.children;return i},function(e,i){return i.cache}),Ve=ye,lr=a.forwardRef(function(e,i){var t=e.popup,c=e.className,f=e.prefixCls,m=e.style,y=e.target,M=e.onVisibleChanged,C=e.open,S=e.keepDom,x=e.fresh,R=e.onClick,I=e.mask,E=e.arrow,P=e.arrowPos,H=e.align,D=e.motion,F=e.maskMotion,z=e.forceRender,T=e.getPopupContainer,h=e.autoDestroy,re=e.portal,ie=e.zIndex,ce=e.onMouseEnter,Re=e.onMouseLeave,Oe=e.onPointerEnter,le=e.ready,fe=e.offsetX,ne=e.offsetY,Pe=e.offsetR,oe=e.offsetB,ve=e.onAlign,_=e.onPrepare,Q=e.stretch,A=e.targetWidth,be=e.targetHeight,$=typeof t=="function"?t():t,xe=C||S,Ne=(T==null?void 0:T.length)>0,pt=a.useState(!T||!Ne),Tt=(0,l.Z)(pt,2),ke=Tt[0],Zt=Tt[1];if((0,G.Z)(function(){!ke&&Ne&&y&&Zt(!0)},[ke,Ne,y]),!ke)return null;var Te="auto",p={left:"-1000vw",top:"-1000vh",right:Te,bottom:Te};if(le||!C){var Ee,Ie=H.points,ze=H.dynamicInset||((Ee=H._experimental)===null||Ee===void 0?void 0:Ee.dynamicInset),Lt=ze&&Ie[0][1]==="r",Jt=ze&&Ie[0][0]==="b";Lt?(p.right=Pe,p.left=Te):(p.left=fe,p.right=Te),Jt?(p.bottom=oe,p.top=Te):(p.top=ne,p.bottom=Te)}var ee={};return Q&&(Q.includes("height")&&be?ee.height=be:Q.includes("minHeight")&&be&&(ee.minHeight=be),Q.includes("width")&&A?ee.width=A:Q.includes("minWidth")&&A&&(ee.minWidth=A)),C||(ee.pointerEvents="none"),a.createElement(re,{open:z||xe,getContainer:T&&function(){return T(y)},autoDestroy:h},a.createElement(cr,{prefixCls:f,open:C,zIndex:ie,mask:I,motion:F}),a.createElement(u.Z,{onResize:ve,disabled:!C},function(At){return a.createElement(Kt.ZP,(0,sr.Z)({motionAppear:!0,motionEnter:!0,motionLeave:!0,removeOnLeave:!1,forceRender:z,leavedClassName:"".concat(f,"-hidden")},D,{onAppearPrepare:_,onEnterPrepare:_,visible:C,onVisibleChanged:function(de){var Fe;D==null||(Fe=D.onVisibleChanged)===null||Fe===void 0||Fe.call(D,de),M(de)}}),function(Je,de){var Fe=Je.className,O=Je.style,ut=o()(f,Fe,c);return a.createElement("div",{ref:(0,L.sQ)(At,i,de),className:ut,style:(0,N.Z)((0,N.Z)((0,N.Z)((0,N.Z)({"--arrow-x":"".concat(P.x||0,"px"),"--arrow-y":"".concat(P.y||0,"px")},p),ee),O),{},{boxSizing:"border-box",zIndex:ie},m),onMouseEnter:ce,onMouseLeave:Re,onPointerEnter:Oe,onClick:R},E&&a.createElement(ur,{prefixCls:f,arrow:E,arrowPos:P,align:H}),a.createElement(Ve,{cache:!C&&!x},$))})}))}),Wr=lr,fr=a.forwardRef(function(e,i){var t=e.children,c=e.getTriggerDOMNode,f=(0,L.Yr)(t),m=a.useCallback(function(M){(0,L.mH)(i,c?c(M):M)},[c]),y=(0,L.x1)(m,t.ref);return f?a.cloneElement(t,{ref:y}):t}),jt=fr,Gt=a.createContext(null),ot=Gt;function st(e){return e?Array.isArray(e)?e:[e]:[]}function vr(e,i,t,c){return a.useMemo(function(){var f=st(t!=null?t:i),m=st(c!=null?c:i),y=new Set(f),M=new Set(m);return e&&(y.has("hover")&&(y.delete("hover"),y.add("click")),M.has("hover")&&(M.delete("hover"),M.add("click"))),[y,M]},[e,i,t,c])}var dr=n(73243);function hr(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[],t=arguments.length>2?arguments[2]:void 0;return t?e[0]===i[0]:e[0]===i[0]&&e[1]===i[1]}function kr(e,i,t,c){for(var f=t.points,m=Object.keys(e),y=0;y<m.length;y+=1){var M,C=m[y];if(hr((M=e[C])===null||M===void 0?void 0:M.points,f,c))return"".concat(i,"-placement-").concat(C)}return""}function mr(e,i,t,c){return i||(t?{motionName:"".concat(e,"-").concat(t)}:c?{motionName:c}:null)}function Qe(e){return e.ownerDocument.defaultView}function Fr(e){for(var i=[],t=e==null?void 0:e.parentElement,c=["hidden","scroll","clip","auto"];t;){var f=Qe(t).getComputedStyle(t),m=f.overflowX,y=f.overflowY,M=f.overflow;[m,y,M].some(function(C){return c.includes(C)})&&i.push(t),t=t.parentElement}return i}function Vt(e){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:1;return Number.isNaN(e)?i:e}function Qt(e){return Vt(parseFloat(e),0)}function cn(e,i){var t=(0,N.Z)({},e);return(i||[]).forEach(function(c){if(!(c instanceof HTMLBodyElement||c instanceof HTMLHtmlElement)){var f=Qe(c).getComputedStyle(c),m=f.overflow,y=f.overflowClipMargin,M=f.borderTopWidth,C=f.borderBottomWidth,S=f.borderLeftWidth,x=f.borderRightWidth,R=c.getBoundingClientRect(),I=c.offsetHeight,E=c.clientHeight,P=c.offsetWidth,H=c.clientWidth,D=Qt(M),F=Qt(C),z=Qt(S),T=Qt(x),h=Vt(Math.round(R.width/P*1e3)/1e3),re=Vt(Math.round(R.height/I*1e3)/1e3),ie=(P-H-z-T)*h,ce=(I-E-D-F)*re,Re=D*re,Oe=F*re,le=z*h,fe=T*h,ne=0,Pe=0;if(m==="clip"){var oe=Qt(y);ne=oe*h,Pe=oe*re}var ve=R.x+le-ne,_=R.y+Re-Pe,Q=ve+R.width+2*ne-le-fe-ie,A=_+R.height+2*Pe-Re-Oe-ce;t.left=Math.max(t.left,ve),t.top=Math.max(t.top,_),t.right=Math.min(t.right,Q),t.bottom=Math.min(t.bottom,A)}}),t}function ln(e){var i=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,t="".concat(i),c=t.match(/^(.*)\%$/);return c?e*(parseFloat(c[1])/100):parseFloat(t)}function fn(e,i){var t=i||[],c=(0,l.Z)(t,2),f=c[0],m=c[1];return[ln(e.width,f),ln(e.height,m)]}function vn(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:"";return[e[0],e[1]]}function Nt(e,i){var t=i[0],c=i[1],f,m;return t==="t"?m=e.y:t==="b"?m=e.y+e.height:m=e.y+e.height/2,c==="l"?f=e.x:c==="r"?f=e.x+e.width:f=e.x+e.width/2,{x:f,y:m}}function pe(e,i){var t={t:"b",b:"t",l:"r",r:"l"};return e.map(function(c,f){return f===i?t[c]||"c":c}).join("")}function mn(e,i,t,c,f,m,y){var M=a.useState({ready:!1,offsetX:0,offsetY:0,offsetR:0,offsetB:0,arrowX:0,arrowY:0,scaleX:1,scaleY:1,align:f[c]||{}}),C=(0,l.Z)(M,2),S=C[0],x=C[1],R=a.useRef(0),I=a.useMemo(function(){return i?Fr(i):[]},[i]),E=a.useRef({}),P=function(){E.current={}};e||P();var H=(0,w.Z)(function(){if(i&&t&&e){let we=function(je,bt){var Ht=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ut,Ut=$.x+je,ar=$.y+bt,ir=Ut+Ee,zr=ar+p,nn=Math.max(Ut,Ht.left),an=Math.max(ar,Ht.top),on=Math.min(ir,Ht.right),sn=Math.min(zr,Ht.bottom);return Math.max(0,(on-nn)*(sn-an))},Ir=function(){qe=$.y+Z,et=qe+p,tt=$.x+k,xt=tt+Ee};var z,T,h=i,re=h.ownerDocument,ie=Qe(h),ce=ie.getComputedStyle(h),Re=ce.width,Oe=ce.height,le=ce.position,fe=h.style.left,ne=h.style.top,Pe=h.style.right,oe=h.style.bottom,ve=h.style.overflow,_=(0,N.Z)((0,N.Z)({},f[c]),m),Q=re.createElement("div");(z=h.parentElement)===null||z===void 0||z.appendChild(Q),Q.style.left="".concat(h.offsetLeft,"px"),Q.style.top="".concat(h.offsetTop,"px"),Q.style.position=le,Q.style.height="".concat(h.offsetHeight,"px"),Q.style.width="".concat(h.offsetWidth,"px"),h.style.left="0",h.style.top="0",h.style.right="auto",h.style.bottom="auto",h.style.overflow="hidden";var A;if(Array.isArray(t))A={x:t[0],y:t[1],width:0,height:0};else{var be=t.getBoundingClientRect();A={x:be.x,y:be.y,width:be.width,height:be.height}}var $=h.getBoundingClientRect(),xe=re.documentElement,Ne=xe.clientWidth,pt=xe.clientHeight,Tt=xe.scrollWidth,ke=xe.scrollHeight,Zt=xe.scrollTop,Te=xe.scrollLeft,p=$.height,Ee=$.width,Ie=A.height,ze=A.width,Lt={left:0,top:0,right:Ne,bottom:pt},Jt={left:-Te,top:-Zt,right:Tt-Te,bottom:ke-Zt},ee=_.htmlRegion,At="visible",Je="visibleFirst";ee!=="scroll"&&ee!==Je&&(ee=At);var de=ee===Je,Fe=cn(Jt,I),O=cn(Lt,I),ut=ee===At?O:Fe,Ce=de?O:ut;h.style.left="auto",h.style.top="auto",h.style.right="0",h.style.bottom="0";var gr=h.getBoundingClientRect();h.style.left=fe,h.style.top=ne,h.style.right=Pe,h.style.bottom=oe,h.style.overflow=ve,(T=h.parentElement)===null||T===void 0||T.removeChild(Q);var ct=Vt(Math.round(Ee/parseFloat(Re)*1e3)/1e3),lt=Vt(Math.round(p/parseFloat(Oe)*1e3)/1e3);if(ct===0||lt===0||(0,d.S)(t)&&!(0,dr.Z)(t))return;var yr=_.offset,se=_.targetOffset,Br=fn($,yr),br=(0,l.Z)(Br,2),Ze=br[0],Me=br[1],$e=fn(A,se),Er=(0,l.Z)($e,2),Cr=Er[0],_r=Er[1];A.x-=Cr,A.y-=_r;var Dt=_.points||[],he=(0,l.Z)(Dt,2),Ye=he[0],Kr=he[1],Be=vn(Kr),me=vn(Ye),Mr=Nt(A,Be),Yt=Nt($,me),Xe=(0,N.Z)({},_),k=Mr.x-Yt.x+Ze,Z=Mr.y-Yt.y+Me,He=we(k,Z),Ue=we(k,Z,O),ft=Nt(A,["t","l"]),Xt=Nt($,["t","l"]),qt=Nt(A,["b","r"]),er=Nt($,["b","r"]),ue=_.overflow||{},jr=ue.adjustX,wr=ue.adjustY,Ot=ue.shiftX,tr=ue.shiftY,Sr=function(bt){return typeof bt=="boolean"?bt:bt>=0},qe,et,tt,xt;Ir();var rr=Sr(wr),nr=me[0]===Be[0];if(rr&&me[0]==="t"&&(et>Ce.bottom||E.current.bt)){var vt=Z;nr?vt-=p-Ie:vt=ft.y-er.y-Me;var dt=we(k,vt),Gr=we(k,vt,O);dt>He||dt===He&&(!de||Gr>=Ue)?(E.current.bt=!0,Z=vt,Me=-Me,Xe.points=[pe(me,0),pe(Be,0)]):E.current.bt=!1}if(rr&&me[0]==="b"&&(qe<Ce.top||E.current.tb)){var X=Z;nr?X+=p-Ie:X=qt.y-Xt.y-Me;var Rr=we(k,X),Vr=we(k,X,O);Rr>He||Rr===He&&(!de||Vr>=Ue)?(E.current.tb=!0,Z=X,Me=-Me,Xe.points=[pe(me,0),pe(Be,0)]):E.current.tb=!1}var Pr=Sr(jr),Nr=me[1]===Be[1];if(Pr&&me[1]==="l"&&(xt>Ce.right||E.current.rl)){var ht=k;Nr?ht-=Ee-ze:ht=ft.x-er.x-Ze;var Tr=we(ht,Z),Qr=we(ht,Z,O);Tr>He||Tr===He&&(!de||Qr>=Ue)?(E.current.rl=!0,k=ht,Ze=-Ze,Xe.points=[pe(me,1),pe(Be,1)]):E.current.rl=!1}if(Pr&&me[1]==="r"&&(tt<Ce.left||E.current.lr)){var mt=k;Nr?mt+=Ee-ze:mt=qt.x-Xt.x-Ze;var Zr=we(mt,Z),It=we(mt,Z,O);Zr>He||Zr===He&&(!de||It>=Ue)?(E.current.lr=!0,k=mt,Ze=-Ze,Xe.points=[pe(me,1),pe(Be,1)]):E.current.lr=!1}Ir();var _e=Ot===!0?0:Ot;typeof _e=="number"&&(tt<O.left&&(k-=tt-O.left-Ze,A.x+ze<O.left+_e&&(k+=A.x-O.left+ze-_e)),xt>O.right&&(k-=xt-O.right-Ze,A.x>O.right-_e&&(k+=A.x-O.right+_e)));var gt=tr===!0?0:tr;typeof gt=="number"&&(qe<O.top&&(Z-=qe-O.top-Me,A.y+Ie<O.top+gt&&(Z+=A.y-O.top+Ie-gt)),et>O.bottom&&(Z-=et-O.bottom-Me,A.y>O.bottom-gt&&(Z+=A.y-O.bottom+gt)));var zt=$.x+k,$t=zt+Ee,Ke=$.y+Z,Lr=Ke+p,yt=A.x,rt=yt+ze,Ar=A.y,pr=Ar+Ie,Jr=Math.max(zt,yt),Dr=Math.min($t,rt),Yr=(Jr+Dr)/2,Xr=Yr-zt,qr=Math.max(Ke,Ar),Or=Math.min(Lr,pr),en=(qr+Or)/2,tn=en-Ke;y==null||y(i,Xe);var xr=gr.right-$.x-(k+$.width),rn=gr.bottom-$.y-(Z+$.height);x({ready:!0,offsetX:k/ct,offsetY:Z/lt,offsetR:xr/ct,offsetB:rn/lt,arrowX:Xr/ct,arrowY:tn/lt,scaleX:ct,scaleY:lt,align:Xe})}}),D=function(){R.current+=1;var T=R.current;Promise.resolve().then(function(){R.current===T&&H()})},F=function(){x(function(T){return(0,N.Z)((0,N.Z)({},T),{},{ready:!1})})};return(0,G.Z)(F,[c]),(0,G.Z)(function(){e||F()},[e]),[S.ready,S.offsetX,S.offsetY,S.offsetR,S.offsetB,S.arrowX,S.arrowY,S.scaleX,S.scaleY,S.align,D]}function gn(e,i,t,c,f){(0,G.Z)(function(){if(e&&i&&t){let R=function(){c(),f()};var m=i,y=t,M=Fr(m),C=Fr(y),S=Qe(y),x=new Set([S].concat((0,B.Z)(M),(0,B.Z)(C)));return x.forEach(function(I){I.addEventListener("scroll",R,{passive:!0})}),S.addEventListener("resize",R,{passive:!0}),c(),function(){x.forEach(function(I){I.removeEventListener("scroll",R),S.removeEventListener("resize",R)})}}},[e,i,t])}var dn=n(10356);function yn(e,i,t,c,f,m,y,M){var C=a.useRef(e),S=a.useRef(!1);C.current!==e&&(S.current=!0,C.current=e),a.useEffect(function(){var x=(0,dn.Z)(function(){S.current=!1});return function(){dn.Z.cancel(x)}},[e]),a.useEffect(function(){if(i&&c&&(!f||m)){var x=function(){var le=!1,fe=function(oe){var ve=oe.target;le=y(ve)},ne=function(oe){var ve=oe.target;!S.current&&C.current&&!le&&!y(ve)&&M(!1)};return[fe,ne]},R=x(),I=(0,l.Z)(R,2),E=I[0],P=I[1],H=x(),D=(0,l.Z)(H,2),F=D[0],z=D[1],T=Qe(c);T.addEventListener("mousedown",E,!0),T.addEventListener("click",P,!0),T.addEventListener("contextmenu",P,!0);var h=(0,b.A)(t);if(h&&(h.addEventListener("mousedown",F,!0),h.addEventListener("click",z,!0),h.addEventListener("contextmenu",z,!0)),!1)var re,ie,ce,Re;return function(){T.removeEventListener("mousedown",E,!0),T.removeEventListener("click",P,!0),T.removeEventListener("contextmenu",P,!0),h&&(h.removeEventListener("mousedown",F,!0),h.removeEventListener("click",z,!0),h.removeEventListener("contextmenu",z,!0))}}},[i,t,c,f,m])}var bn=["prefixCls","children","action","showAction","hideAction","popupVisible","defaultPopupVisible","onPopupVisibleChange","afterPopupVisibleChange","mouseEnterDelay","mouseLeaveDelay","focusDelay","blurDelay","mask","maskClosable","getPopupContainer","forceRender","autoDestroy","destroyPopupOnHide","popup","popupClassName","popupStyle","popupPlacement","builtinPlacements","popupAlign","zIndex","stretch","getPopupClassNameFromAlign","fresh","alignPoint","onPopupClick","onPopupAlign","arrow","popupMotion","maskMotion","popupTransitionName","popupAnimation","maskTransitionName","maskAnimation","className","getTriggerDOMNode"];function En(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:s,i=a.forwardRef(function(t,c){var f=t.prefixCls,m=f===void 0?"rc-trigger-popup":f,y=t.children,M=t.action,C=M===void 0?"hover":M,S=t.showAction,x=t.hideAction,R=t.popupVisible,I=t.defaultPopupVisible,E=t.onPopupVisibleChange,P=t.afterPopupVisibleChange,H=t.mouseEnterDelay,D=t.mouseLeaveDelay,F=D===void 0?.1:D,z=t.focusDelay,T=t.blurDelay,h=t.mask,re=t.maskClosable,ie=re===void 0?!0:re,ce=t.getPopupContainer,Re=t.forceRender,Oe=t.autoDestroy,le=t.destroyPopupOnHide,fe=t.popup,ne=t.popupClassName,Pe=t.popupStyle,oe=t.popupPlacement,ve=t.builtinPlacements,_=ve===void 0?{}:ve,Q=t.popupAlign,A=t.zIndex,be=t.stretch,$=t.getPopupClassNameFromAlign,xe=t.fresh,Ne=t.alignPoint,pt=t.onPopupClick,Tt=t.onPopupAlign,ke=t.arrow,Zt=t.popupMotion,Te=t.maskMotion,p=t.popupTransitionName,Ee=t.popupAnimation,Ie=t.maskTransitionName,ze=t.maskAnimation,Lt=t.className,Jt=t.getTriggerDOMNode,ee=(0,j.Z)(t,bn),At=Oe||le||!1,Je=a.useState(!1),de=(0,l.Z)(Je,2),Fe=de[0],O=de[1];(0,G.Z)(function(){O((0,Ur.Z)())},[]);var ut=a.useRef({}),Ce=a.useContext(ot),gr=a.useMemo(function(){return{registerSubPopup:function(g,U){ut.current[g]=U,Ce==null||Ce.registerSubPopup(g,U)}}},[Ce]),ct=Pt(),lt=a.useState(null),yr=(0,l.Z)(lt,2),se=yr[0],Br=yr[1],br=(0,w.Z)(function(v){(0,d.S)(v)&&se!==v&&Br(v),Ce==null||Ce.registerSubPopup(ct,v)}),Ze=a.useState(null),Me=(0,l.Z)(Ze,2),$e=Me[0],Er=Me[1],Cr=a.useRef(null),_r=(0,w.Z)(function(v){(0,d.S)(v)&&$e!==v&&(Er(v),Cr.current=v)}),Dt=a.Children.only(y),he=(Dt==null?void 0:Dt.props)||{},Ye={},Kr=(0,w.Z)(function(v){var g,U,K=$e;return(K==null?void 0:K.contains(v))||((g=(0,b.A)(K))===null||g===void 0?void 0:g.host)===v||v===K||(se==null?void 0:se.contains(v))||((U=(0,b.A)(se))===null||U===void 0?void 0:U.host)===v||v===se||Object.values(ut.current).some(function(W){return(W==null?void 0:W.contains(v))||v===W})}),Be=mr(m,Zt,Ee,p),me=mr(m,Te,ze,Ie),Mr=a.useState(I||!1),Yt=(0,l.Z)(Mr,2),Xe=Yt[0],k=Yt[1],Z=R!=null?R:Xe,He=(0,w.Z)(function(v){R===void 0&&k(v)});(0,G.Z)(function(){k(R||!1)},[R]);var Ue=a.useRef(Z);Ue.current=Z;var ft=a.useRef([]);ft.current=[];var Xt=(0,w.Z)(function(v){var g;He(v),((g=ft.current[ft.current.length-1])!==null&&g!==void 0?g:Z)!==v&&(ft.current.push(v),E==null||E(v))}),qt=a.useRef(),er=function(){clearTimeout(qt.current)},ue=function(g){var U=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0;er(),U===0?Xt(g):qt.current=setTimeout(function(){Xt(g)},U*1e3)};a.useEffect(function(){return er},[]);var jr=a.useState(!1),wr=(0,l.Z)(jr,2),Ot=wr[0],tr=wr[1];(0,G.Z)(function(v){(!v||Z)&&tr(!0)},[Z]);var Sr=a.useState(null),qe=(0,l.Z)(Sr,2),et=qe[0],tt=qe[1],xt=a.useState([0,0]),rr=(0,l.Z)(xt,2),nr=rr[0],vt=rr[1],dt=function(g){vt([g.clientX,g.clientY])},Gr=mn(Z,se,Ne?nr:$e,oe,_,Q,Tt),X=(0,l.Z)(Gr,11),Rr=X[0],Vr=X[1],Pr=X[2],Nr=X[3],ht=X[4],Tr=X[5],Qr=X[6],mt=X[7],Zr=X[8],It=X[9],_e=X[10],gt=vr(Fe,C,S,x),zt=(0,l.Z)(gt,2),$t=zt[0],Ke=zt[1],Lr=$t.has("click"),yt=Ke.has("click")||Ke.has("contextMenu"),rt=(0,w.Z)(function(){Ot||_e()}),Ar=function(){Ue.current&&Ne&&yt&&ue(!1)};gn(Z,$e,se,rt,Ar),(0,G.Z)(function(){rt()},[nr,oe]),(0,G.Z)(function(){Z&&!(_!=null&&_[oe])&&rt()},[JSON.stringify(Q)]);var pr=a.useMemo(function(){var v=kr(_,m,It,Ne);return o()(v,$==null?void 0:$(It))},[It,$,_,m,Ne]);a.useImperativeHandle(c,function(){return{nativeElement:Cr.current,forceAlign:rt}});var Jr=a.useState(0),Dr=(0,l.Z)(Jr,2),Yr=Dr[0],Xr=Dr[1],qr=a.useState(0),Or=(0,l.Z)(qr,2),en=Or[0],tn=Or[1],xr=function(){if(be&&$e){var g=$e.getBoundingClientRect();Xr(g.width),tn(g.height)}},rn=function(){xr(),rt()},we=function(g){tr(!1),_e(),P==null||P(g)},Ir=function(){return new Promise(function(g){xr(),tt(function(){return g})})};(0,G.Z)(function(){et&&(_e(),et(),tt(null))},[et]);function je(v,g,U,K){Ye[v]=function(W){var $r;K==null||K(W),ue(g,U);for(var un=arguments.length,hn=new Array(un>1?un-1:0),Hr=1;Hr<un;Hr++)hn[Hr-1]=arguments[Hr];($r=he[v])===null||$r===void 0||$r.call.apply($r,[he,W].concat(hn))}}(Lr||yt)&&(Ye.onClick=function(v){var g;Ue.current&&yt?ue(!1):!Ue.current&&Lr&&(dt(v),ue(!0));for(var U=arguments.length,K=new Array(U>1?U-1:0),W=1;W<U;W++)K[W-1]=arguments[W];(g=he.onClick)===null||g===void 0||g.call.apply(g,[he,v].concat(K))}),yn(Z,yt,$e,se,h,ie,Kr,ue);var bt=$t.has("hover"),Ht=Ke.has("hover"),Ut,ar;bt&&(je("onMouseEnter",!0,H,function(v){dt(v)}),je("onPointerEnter",!0,H,function(v){dt(v)}),Ut=function(g){(Z||Ot)&&se!==null&&se!==void 0&&se.contains(g.target)&&ue(!0,H)},Ne&&(Ye.onMouseMove=function(v){var g;(g=he.onMouseMove)===null||g===void 0||g.call(he,v)})),Ht&&(je("onMouseLeave",!1,F),je("onPointerLeave",!1,F),ar=function(){ue(!1,F)}),$t.has("focus")&&je("onFocus",!0,z),Ke.has("focus")&&je("onBlur",!1,T),$t.has("contextMenu")&&(Ye.onContextMenu=function(v){var g;Ue.current&&Ke.has("contextMenu")?ue(!1):(dt(v),ue(!0)),v.preventDefault();for(var U=arguments.length,K=new Array(U>1?U-1:0),W=1;W<U;W++)K[W-1]=arguments[W];(g=he.onContextMenu)===null||g===void 0||g.call.apply(g,[he,v].concat(K))}),Lt&&(Ye.className=o()(he.className,Lt));var ir=(0,N.Z)((0,N.Z)({},he),Ye),zr={},nn=["onContextMenu","onClick","onMouseDown","onTouchStart","onMouseEnter","onMouseLeave","onFocus","onBlur"];nn.forEach(function(v){ee[v]&&(zr[v]=function(){for(var g,U=arguments.length,K=new Array(U),W=0;W<U;W++)K[W]=arguments[W];(g=ir[v])===null||g===void 0||g.call.apply(g,[ir].concat(K)),ee[v].apply(ee,K)})});var an=a.cloneElement(Dt,(0,N.Z)((0,N.Z)({},ir),zr)),on={x:Tr,y:Qr},sn=ke?(0,N.Z)({},ke!==!0?ke:{}):null;return a.createElement(a.Fragment,null,a.createElement(u.Z,{disabled:!Z,ref:_r,onResize:rn},a.createElement(jt,{getTriggerDOMNode:Jt},an)),a.createElement(ot.Provider,{value:gr},a.createElement(Wr,{portal:e,ref:br,prefixCls:m,popup:fe,className:o()(ne,pr),style:Pe,target:$e,onMouseEnter:Ut,onMouseLeave:ar,onPointerEnter:Ut,zIndex:A,open:Z,keepDom:Ot,fresh:xe,onClick:pt,mask:h,motion:Be,maskMotion:me,onVisibleChanged:we,onPrepare:Ir,forceRender:Re,autoDestroy:At,getPopupContainer:ce,align:It,arrow:sn,arrowPos:on,ready:Rr,offsetX:Vr,offsetY:Pr,offsetR:Nr,offsetB:ht,onAlign:rt,stretch:be,targetWidth:Yr/mt,targetHeight:en/Zr})))});return i}var Cn=En(s)},9038:function(nt,te,n){n.d(te,{m:function(){return J}});const N=()=>({height:0,opacity:0}),l=L=>{const{scrollHeight:q}=L;return{height:q,opacity:1}},j=L=>({height:L?L.offsetHeight:0}),a=(L,q)=>(q==null?void 0:q.deadline)===!0||q.propertyName==="height",Se=function(){return{motionName:`${arguments.length>0&&arguments[0]!==void 0?arguments[0]:"ant"}-motion-collapse`,onAppearStart:N,onEnterStart:N,onAppearActive:l,onEnterActive:l,onLeaveStart:j,onLeaveActive:N,onAppearEnd:a,onEnterEnd:a,onLeaveEnd:a,motionDeadline:500}},Le=null,J=(L,q,Ae)=>Ae!==void 0?Ae:`${L}-${q}`;var Ge=null},91226:function(nt,te,n){n.d(te,{R:function(){return j}});const N=a=>({animationDuration:a,animationFillMode:"both"}),l=a=>({animationDuration:a,animationFillMode:"both"}),j=function(a,Se,Le,J){const L=(arguments.length>4&&arguments[4]!==void 0?arguments[4]:!1)?"&":"";return{[`
      ${L}${a}-enter,
      ${L}${a}-appear
    `]:Object.assign(Object.assign({},N(J)),{animationPlayState:"paused"}),[`${L}${a}-leave`]:Object.assign(Object.assign({},l(J)),{animationPlayState:"paused"}),[`
      ${L}${a}-enter${a}-enter-active,
      ${L}${a}-appear${a}-appear-active
    `]:{animationName:Se,animationPlayState:"running"},[`${L}${a}-leave${a}-leave-active`]:{animationName:Le,animationPlayState:"running",pointerEvents:"none"}}}},48180:function(nt,te,n){n.d(te,{Z:function(){return s}});var N=n(58276),l=n(40020),j=n(97980),a=n(23390),Se=n(88252),Le=n(7672),J=n(97249),Ge=n(38532),L=l.createContext(null);function q(r){var o=r.children,u=r.onBatchResize,d=l.useRef(0),b=l.useRef([]),w=l.useContext(L),V=l.useCallback(function(Y,ge,ae){d.current+=1;var Pt=d.current;b.current.push({size:Y,element:ge,data:ae}),Promise.resolve().then(function(){Pt===d.current&&(u==null||u(b.current),b.current=[])}),w==null||w(Y,ge,ae)},[u,w]);return l.createElement(L.Provider,{value:V},o)}var Ae=n(51671),B=new Map;function G(r){r.forEach(function(o){var u,d=o.target;(u=B.get(d))===null||u===void 0||u.forEach(function(b){return b(d)})})}var De=new Ae.Z(G),Wt=null,Et=null;function at(r,o){B.has(r)||(B.set(r,new Set),De.observe(r)),B.get(r).add(o)}function Ct(r,o){B.has(r)&&(B.get(r).delete(o),B.get(r).size||(De.unobserve(r),B.delete(r)))}var Mt=n(63461),or=n(55082),kt=n(34578),Ft=n(47482),We=function(r){(0,kt.Z)(u,r);var o=(0,Ft.Z)(u);function u(){return(0,Mt.Z)(this,u),o.apply(this,arguments)}return(0,or.Z)(u,[{key:"render",value:function(){return this.props.children}}]),u}(l.Component);function Bt(r,o){var u=r.children,d=r.disabled,b=l.useRef(null),w=l.useRef(null),V=l.useContext(L),Y=typeof u=="function",ge=Y?u(b):u,ae=l.useRef({width:-1,height:-1,offsetWidth:-1,offsetHeight:-1}),Pt=!Y&&l.isValidElement(ge)&&(0,Ge.Yr)(ge),Ur=Pt?ge.ref:null,sr=(0,Ge.x1)(Ur,b),Kt=function(){var Ve;return(0,J.Z)(b.current)||(b.current&&(0,Le.Z)(b.current)==="object"?(0,J.Z)((Ve=b.current)===null||Ve===void 0?void 0:Ve.nativeElement):null)||(0,J.Z)(w.current)};l.useImperativeHandle(o,function(){return Kt()});var ur=l.useRef(r);ur.current=r;var cr=l.useCallback(function(ye){var Ve=ur.current,lr=Ve.onResize,Wr=Ve.data,fr=ye.getBoundingClientRect(),jt=fr.width,Gt=fr.height,ot=ye.offsetWidth,st=ye.offsetHeight,vr=Math.floor(jt),dr=Math.floor(Gt);if(ae.current.width!==vr||ae.current.height!==dr||ae.current.offsetWidth!==ot||ae.current.offsetHeight!==st){var hr={width:vr,height:dr,offsetWidth:ot,offsetHeight:st};ae.current=hr;var kr=ot===Math.round(jt)?jt:ot,mr=st===Math.round(Gt)?Gt:st,Qe=(0,Se.Z)((0,Se.Z)({},hr),{},{offsetWidth:kr,offsetHeight:mr});V==null||V(Qe,ye,Wr),lr&&Promise.resolve().then(function(){lr(Qe,ye)})}},[]);return l.useEffect(function(){var ye=Kt();return ye&&!d&&at(ye,cr),function(){return Ct(ye,cr)}},[b.current,d]),l.createElement(We,{ref:w},Pt?l.cloneElement(ge,{ref:sr}):ge)}var wt=l.forwardRef(Bt),_t=wt,it="rc-observer-key";function St(r,o){var u=r.children,d=typeof u=="function"?[u]:(0,j.Z)(u);return d.map(function(b,w){var V=(b==null?void 0:b.key)||"".concat(it,"-").concat(w);return l.createElement(_t,(0,N.Z)({},r,{key:V,ref:w===0?o:void 0}),b)})}var Rt=l.forwardRef(St);Rt.Collection=q;var s=Rt},85993:function(nt,te){var n={MAC_ENTER:3,BACKSPACE:8,TAB:9,NUM_CENTER:12,ENTER:13,SHIFT:16,CTRL:17,ALT:18,PAUSE:19,CAPS_LOCK:20,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,PRINT_SCREEN:44,INSERT:45,DELETE:46,ZERO:48,ONE:49,TWO:50,THREE:51,FOUR:52,FIVE:53,SIX:54,SEVEN:55,EIGHT:56,NINE:57,QUESTION_MARK:63,A:65,B:66,C:67,D:68,E:69,F:70,G:71,H:72,I:73,J:74,K:75,L:76,M:77,N:78,O:79,P:80,Q:81,R:82,S:83,T:84,U:85,V:86,W:87,X:88,Y:89,Z:90,META:91,WIN_KEY_RIGHT:92,CONTEXT_MENU:93,NUM_ZERO:96,NUM_ONE:97,NUM_TWO:98,NUM_THREE:99,NUM_FOUR:100,NUM_FIVE:101,NUM_SIX:102,NUM_SEVEN:103,NUM_EIGHT:104,NUM_NINE:105,NUM_MULTIPLY:106,NUM_PLUS:107,NUM_MINUS:109,NUM_PERIOD:110,NUM_DIVISION:111,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLOCK:144,SEMICOLON:186,DASH:189,EQUALS:187,COMMA:188,PERIOD:190,SLASH:191,APOSTROPHE:192,SINGLE_QUOTE:222,OPEN_SQUARE_BRACKET:219,BACKSLASH:220,CLOSE_SQUARE_BRACKET:221,WIN_KEY:224,MAC_FF_META:224,WIN_IME:229,isTextModifyingKeyEvent:function(l){var j=l.keyCode;if(l.altKey&&!l.ctrlKey||l.metaKey||j>=n.F1&&j<=n.F12)return!1;switch(j){case n.ALT:case n.CAPS_LOCK:case n.CONTEXT_MENU:case n.CTRL:case n.DOWN:case n.END:case n.ESC:case n.HOME:case n.INSERT:case n.LEFT:case n.MAC_FF_META:case n.META:case n.NUMLOCK:case n.NUM_CENTER:case n.PAGE_DOWN:case n.PAGE_UP:case n.PAUSE:case n.PRINT_SCREEN:case n.RIGHT:case n.SHIFT:case n.UP:case n.WIN_KEY:case n.WIN_KEY_RIGHT:return!1;default:return!0}},isCharacterKey:function(l){if(l>=n.ZERO&&l<=n.NINE||l>=n.NUM_ZERO&&l<=n.NUM_MULTIPLY||l>=n.A&&l<=n.Z||window.navigator.userAgent.indexOf("WebKit")!==-1&&l===0)return!0;switch(l){case n.SPACE:case n.QUESTION_MARK:case n.NUM_PLUS:case n.NUM_MINUS:case n.NUM_PERIOD:case n.NUM_DIVISION:case n.SEMICOLON:case n.DASH:case n.EQUALS:case n.COMMA:case n.PERIOD:case n.SLASH:case n.APOSTROPHE:case n.SINGLE_QUOTE:case n.OPEN_SQUARE_BRACKET:case n.BACKSLASH:case n.CLOSE_SQUARE_BRACKET:return!0;default:return!1}}};te.Z=n},79772:function(nt,te){te.Z=function(){if(typeof navigator=="undefined"||typeof window=="undefined")return!1;var n=navigator.userAgent||navigator.vendor||window.opera;return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(n)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(n==null?void 0:n.substr(0,4))}},51671:function(nt,te,n){var N=function(){if(typeof Map!="undefined")return Map;function s(r,o){var u=-1;return r.some(function(d,b){return d[0]===o?(u=b,!0):!1}),u}return function(){function r(){this.__entries__=[]}return Object.defineProperty(r.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),r.prototype.get=function(o){var u=s(this.__entries__,o),d=this.__entries__[u];return d&&d[1]},r.prototype.set=function(o,u){var d=s(this.__entries__,o);~d?this.__entries__[d][1]=u:this.__entries__.push([o,u])},r.prototype.delete=function(o){var u=this.__entries__,d=s(u,o);~d&&u.splice(d,1)},r.prototype.has=function(o){return!!~s(this.__entries__,o)},r.prototype.clear=function(){this.__entries__.splice(0)},r.prototype.forEach=function(o,u){u===void 0&&(u=null);for(var d=0,b=this.__entries__;d<b.length;d++){var w=b[d];o.call(u,w[1],w[0])}},r}()}(),l=typeof window!="undefined"&&typeof document!="undefined"&&window.document===document,j=function(){return typeof n.g!="undefined"&&n.g.Math===Math?n.g:typeof self!="undefined"&&self.Math===Math?self:typeof window!="undefined"&&window.Math===Math?window:Function("return this")()}(),a=function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(j):function(s){return setTimeout(function(){return s(Date.now())},1e3/60)}}(),Se=2;function Le(s,r){var o=!1,u=!1,d=0;function b(){o&&(o=!1,s()),u&&V()}function w(){a(b)}function V(){var Y=Date.now();if(o){if(Y-d<Se)return;u=!0}else o=!0,u=!1,setTimeout(w,r);d=Y}return V}var J=20,Ge=["top","right","bottom","left","width","height","size","weight"],L=typeof MutationObserver!="undefined",q=function(){function s(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=Le(this.refresh.bind(this),J)}return s.prototype.addObserver=function(r){~this.observers_.indexOf(r)||this.observers_.push(r),this.connected_||this.connect_()},s.prototype.removeObserver=function(r){var o=this.observers_,u=o.indexOf(r);~u&&o.splice(u,1),!o.length&&this.connected_&&this.disconnect_()},s.prototype.refresh=function(){var r=this.updateObservers_();r&&this.refresh()},s.prototype.updateObservers_=function(){var r=this.observers_.filter(function(o){return o.gatherActive(),o.hasActive()});return r.forEach(function(o){return o.broadcastActive()}),r.length>0},s.prototype.connect_=function(){!l||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),L?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},s.prototype.disconnect_=function(){!l||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},s.prototype.onTransitionEnd_=function(r){var o=r.propertyName,u=o===void 0?"":o,d=Ge.some(function(b){return!!~u.indexOf(b)});d&&this.refresh()},s.getInstance=function(){return this.instance_||(this.instance_=new s),this.instance_},s.instance_=null,s}(),Ae=function(s,r){for(var o=0,u=Object.keys(r);o<u.length;o++){var d=u[o];Object.defineProperty(s,d,{value:r[d],enumerable:!1,writable:!1,configurable:!0})}return s},B=function(s){var r=s&&s.ownerDocument&&s.ownerDocument.defaultView;return r||j},G=We(0,0,0,0);function De(s){return parseFloat(s)||0}function Wt(s){for(var r=[],o=1;o<arguments.length;o++)r[o-1]=arguments[o];return r.reduce(function(u,d){var b=s["border-"+d+"-width"];return u+De(b)},0)}function Et(s){for(var r=["top","right","bottom","left"],o={},u=0,d=r;u<d.length;u++){var b=d[u],w=s["padding-"+b];o[b]=De(w)}return o}function at(s){var r=s.getBBox();return We(0,0,r.width,r.height)}function Ct(s){var r=s.clientWidth,o=s.clientHeight;if(!r&&!o)return G;var u=B(s).getComputedStyle(s),d=Et(u),b=d.left+d.right,w=d.top+d.bottom,V=De(u.width),Y=De(u.height);if(u.boxSizing==="border-box"&&(Math.round(V+b)!==r&&(V-=Wt(u,"left","right")+b),Math.round(Y+w)!==o&&(Y-=Wt(u,"top","bottom")+w)),!or(s)){var ge=Math.round(V+b)-r,ae=Math.round(Y+w)-o;Math.abs(ge)!==1&&(V-=ge),Math.abs(ae)!==1&&(Y-=ae)}return We(d.left,d.top,V,Y)}var Mt=function(){return typeof SVGGraphicsElement!="undefined"?function(s){return s instanceof B(s).SVGGraphicsElement}:function(s){return s instanceof B(s).SVGElement&&typeof s.getBBox=="function"}}();function or(s){return s===B(s).document.documentElement}function kt(s){return l?Mt(s)?at(s):Ct(s):G}function Ft(s){var r=s.x,o=s.y,u=s.width,d=s.height,b=typeof DOMRectReadOnly!="undefined"?DOMRectReadOnly:Object,w=Object.create(b.prototype);return Ae(w,{x:r,y:o,width:u,height:d,top:o,right:r+u,bottom:d+o,left:r}),w}function We(s,r,o,u){return{x:s,y:r,width:o,height:u}}var Bt=function(){function s(r){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=We(0,0,0,0),this.target=r}return s.prototype.isActive=function(){var r=kt(this.target);return this.contentRect_=r,r.width!==this.broadcastWidth||r.height!==this.broadcastHeight},s.prototype.broadcastRect=function(){var r=this.contentRect_;return this.broadcastWidth=r.width,this.broadcastHeight=r.height,r},s}(),wt=function(){function s(r,o){var u=Ft(o);Ae(this,{target:r,contentRect:u})}return s}(),_t=function(){function s(r,o,u){if(this.activeObservations_=[],this.observations_=new N,typeof r!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=r,this.controller_=o,this.callbackCtx_=u}return s.prototype.observe=function(r){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element=="undefined"||!(Element instanceof Object))){if(!(r instanceof B(r).Element))throw new TypeError('parameter 1 is not of type "Element".');var o=this.observations_;o.has(r)||(o.set(r,new Bt(r)),this.controller_.addObserver(this),this.controller_.refresh())}},s.prototype.unobserve=function(r){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element=="undefined"||!(Element instanceof Object))){if(!(r instanceof B(r).Element))throw new TypeError('parameter 1 is not of type "Element".');var o=this.observations_;o.has(r)&&(o.delete(r),o.size||this.controller_.removeObserver(this))}},s.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},s.prototype.gatherActive=function(){var r=this;this.clearActive(),this.observations_.forEach(function(o){o.isActive()&&r.activeObservations_.push(o)})},s.prototype.broadcastActive=function(){if(this.hasActive()){var r=this.callbackCtx_,o=this.activeObservations_.map(function(u){return new wt(u.target,u.broadcastRect())});this.callback_.call(r,o,r),this.clearActive()}},s.prototype.clearActive=function(){this.activeObservations_.splice(0)},s.prototype.hasActive=function(){return this.activeObservations_.length>0},s}(),it=typeof WeakMap!="undefined"?new WeakMap:new N,St=function(){function s(r){if(!(this instanceof s))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var o=q.getInstance(),u=new _t(r,o,this);it.set(this,u)}return s}();["observe","unobserve","disconnect"].forEach(function(s){St.prototype[s]=function(){var r;return(r=it.get(this))[s].apply(r,arguments)}});var Rt=function(){return typeof j.ResizeObserver!="undefined"?j.ResizeObserver:St}();te.Z=Rt}}]);
