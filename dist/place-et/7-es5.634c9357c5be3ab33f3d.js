function _classCallCheck(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,n){for(var e=0;e<n.length;e++){var o=n[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function _createClass(t,n,e){return n&&_defineProperties(t.prototype,n),e&&_defineProperties(t,e),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"P+xa":function(t,n,e){"use strict";e.r(n);var o,i,r=e("PCNd"),a=e("ofXK"),s=e("lR5k"),c=e("tyNb"),u=e("AytR"),l=e("fXoL"),p=((o=function(){function t(n){_classCallCheck(this,t),this.route=n,this.post=""}return _createClass(t,[{key:"ngOnInit",value:function(){var t=this;this.sub=this.route.params.subscribe((function(n){t.post="".concat(u.a.apiUrl,"/md/").concat(n.nome)}))}},{key:"ngOnDestroy",value:function(){this.sub&&this.sub.unsubscribe()}}]),t}()).\u0275fac=function(t){return new(t||o)(l.Qb(c.a))},o.\u0275cmp=l.Kb({type:o,selectors:[["app-about"]],decls:2,vars:1,consts:[[1,"container-fluid",2,"background-color","rgb(70, 70, 70)"],["markdown","","id","markdown",2,"color","white","text-align","justify","padding-top","50px","padding-bottom","50px",3,"src"]],template:function(t,n){1&t&&(l.Wb(0,"div",0),l.Rb(1,"div",1),l.Vb()),2&t&&(l.Cb(1),l.sc("src",n.post))},directives:[s.a],styles:[""]}),o),f=[{path:"",component:p},{path:":nome",component:p,pathMatch:"full"}],b=((i=function t(){_classCallCheck(this,t)}).\u0275mod=l.Ob({type:i}),i.\u0275inj=l.Nb({factory:function(t){return new(t||i)},imports:[[c.d.forChild(f)],c.d]}),i);e.d(n,"AboutModule",(function(){return h}));var d,h=((d=function t(){_classCallCheck(this,t)}).\u0275mod=l.Ob({type:d}),d.\u0275inj=l.Nb({factory:function(t){return new(t||d)},imports:[[a.c,b,r.a,s.b.forChild()]]}),d)}}]);