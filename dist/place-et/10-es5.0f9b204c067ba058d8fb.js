function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{fvP5:function(e,n,t){"use strict";t.r(n);var r,c,o,s=t("PCNd"),i=t("ofXK"),a=t("tyNb"),u=t("fXoL"),f=t("AytR"),l=t("tk/3"),p=((r=function(){function e(n){_classCallCheck(this,e),this.http=n}return _createClass(e,[{key:"getUserById",value:function(e){return this.http.get(f.a.apiUrl+"/usuarios/"+e)}}]),e}()).\u0275fac=function(e){return new(e||r)(u.ec(l.b))},r.\u0275prov=u.Mb({token:r,factory:r.\u0275fac,providedIn:"root"}),r),b=[{path:":id",component:(c=function(){function e(n){_classCallCheck(this,e),this.userService=n}return _createClass(e,[{key:"ngOnInit",value:function(){this.userService.getUserById(1).subscribe((function(e){console.log(e)}))}}]),e}(),c.\u0275fac=function(e){return new(e||c)(u.Qb(p))},c.\u0275cmp=u.Kb({type:c,selectors:[["app-user"]],decls:2,vars:0,template:function(e,n){1&e&&(u.Wb(0,"p"),u.Lc(1,"user works!"),u.Vb())},styles:[""]}),c)}],h=((o=function e(){_classCallCheck(this,e)}).\u0275mod=u.Ob({type:o}),o.\u0275inj=u.Nb({factory:function(e){return new(e||o)},imports:[[a.c.forChild(b)],a.c]}),o);t.d(n,"UserModule",(function(){return y}));var d,y=((d=function e(){_classCallCheck(this,e)}).\u0275mod=u.Ob({type:d}),d.\u0275inj=u.Nb({factory:function(e){return new(e||d)},imports:[[i.c,h,s.a]]}),d)}}]);