(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{Gk9A:function(e,s,t){"use strict";t.r(s),t.d(s,"ConfirmEmailModule",(function(){return u}));var n=t("PCNd"),i=t("ofXK"),a=t("tyNb"),c=t("fXoL"),r=t("HabH"),o=t("bv9b");function l(e,s){1&e&&c.Rb(0,"img",4)}function m(e,s){1&e&&(c.Wb(0,"div",5),c.Rb(1,"mat-progress-bar",6),c.Vb())}const d=[{path:"",component:(()=>{class e{constructor(e,s){this.route=e,this.userService=s,this.loading=!0,this.validate=!1,this.message="Email sendo verificado!"}ngOnInit(){this.route.queryParams.subscribe(e=>{const{token:s}=e;s&&this.userService.validateEmail(s).subscribe(e=>{this.loading=!1,this.validate=!0,this.message="Email validado!"},e=>{this.loading=!1,this.message="Erro ao validar email!"})})}}return e.\u0275fac=function(s){return new(s||e)(c.Qb(a.a),c.Qb(r.a))},e.\u0275cmp=c.Kb({type:e,selectors:[["app-confirm-email"]],decls:5,vars:3,consts:[[1,"w-100","h-50","d-flex","justify-content-center","align-items-center","flex-column"],["src","assets/svg/checkmark.svg","class","checkmark",4,"ngIf"],[1,"message"],["class","w-50",4,"ngIf"],["src","assets/svg/checkmark.svg",1,"checkmark"],[1,"w-50"],["mode","indeterminate",1,"w-100"]],template:function(e,s){1&e&&(c.Wb(0,"div",0),c.Ic(1,l,1,0,"img",1),c.Wb(2,"span",2),c.Kc(3),c.Vb(),c.Ic(4,m,2,0,"div",3),c.Vb()),2&e&&(c.Cb(1),c.rc("ngIf",s.validate),c.Cb(2),c.Lc(s.message),c.Cb(1),c.rc("ngIf",s.loading))},directives:[i.l,o.a],styles:["span.message[_ngcontent-%COMP%]{text-align:center;font-size:25px}img[_ngcontent-%COMP%]{width:150px}"]}),e})()}];let b=(()=>{class e{}return e.\u0275mod=c.Ob({type:e}),e.\u0275inj=c.Nb({factory:function(s){return new(s||e)},imports:[[a.d.forChild(d)],a.d]}),e})(),u=(()=>{class e{}return e.\u0275mod=c.Ob({type:e}),e.\u0275inj=c.Nb({factory:function(s){return new(s||e)},imports:[[i.c,n.a,b]]}),e})()}}]);