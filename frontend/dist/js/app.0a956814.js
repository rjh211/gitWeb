(function(t){function e(e){for(var r,c,u=e[0],i=e[1],l=e[2],p=0,f=[];p<u.length;p++)c=u[p],o[c]&&f.push(o[c][0]),o[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);s&&s(e);while(f.length)f.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,u=1;u<n.length;u++){var i=n[u];0!==o[i]&&(r=!1)}r&&(a.splice(e--,1),t=c(c.s=n[0]))}return t}var r={},o={app:0},a=[];function c(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.m=t,c.c=r,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(n,r,function(e){return t[e]}.bind(null,r));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],i=u.push.bind(u);u.push=e,u=u.slice();for(var l=0;l<u.length;l++)e(u[l]);var s=i;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("64a9"),o=n.n(r);o.a},"56d7":function(t,e,n){"use strict";n.r(e);n("14c6"),n("08c1"),n("4842"),n("d9fc");var r=n("2b0e"),o=n("8c4f"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("hr"),n("router-view")],1)},c=[],u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"googlechart"},[n("form",{attrs:{method:"GET"}},[n("button",{on:{click:t.write}},[t._v(t._s(t.temp1))])]),n("form",{attrs:{action:"/Gchart/Tables",method:"POST"}},[n("button",[t._v(" axios Test ")]),n("button",{on:{click:t.write}},[t._v("change")])])])},i=[],l=n("bc3a"),s=n.n(l),p={name:"GChart",data:function(){return{tickets:[]}},methods:{write:function(){var t=this;s.a.post("./GChart/Tables").then(function(e){t.tickets=e.data,t.temp1=e.data}).catch(function(t){console.log(t)})},test:function(){var t=this;s.a.get("http://localhost:3000/api",{temp1:"success",temp2:"success"}).then(function(e){t.temp1=e}).catch(function(e){t.temp2=e})}},components:{},props:{temp1:String,temp2:String}},f=p,h=n("2877"),d=Object(h["a"])(f,u,i,!1,null,null,null),v=d.exports,m={name:"app",components:{GChart:v}},b=m,_=(n("034f"),Object(h["a"])(b,a,c,!1,null,null,null)),g=_.exports,w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",[t._v("Users")])},y=[],O={},j=Object(h["a"])(O,w,y,!1,null,null,null),x=j.exports,S=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("h1",[t._v("Home")])},T=[],k={},P=Object(h["a"])(k,S,T,!1,null,null,null),E=P.exports;r["a"].config.productionTip=!1,r["a"].use(o["a"]);var G=[{path:"/users",components:x},{path:"/",components:E}],$=new o["a"]({routes:G});new r["a"]({el:"#app",router:$,render:function(t){return t(g)}}).$mount("#app")},"64a9":function(t,e,n){}});
//# sourceMappingURL=app.0a956814.js.map