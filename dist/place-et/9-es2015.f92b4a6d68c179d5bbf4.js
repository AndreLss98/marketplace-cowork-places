(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{Y25l:function(t,e,n){"use strict";n.r(e);var o=n("PCNd"),i=n("ofXK"),r=n("tyNb"),c=n("fXoL"),a=n("9BeE"),s=n("3Pt+"),l=n("kmnG"),d=n("qFsG"),p=n("/1cH"),h=n("d3UM"),u=n("FKr1");function f(t,e){if(1&t&&(c.Wb(0,"mat-option",12),c.Lc(1),c.Vb()),2&t){const t=e.$implicit;c.sc("value",t),c.Cb(1),c.Nc(" ",t," ")}}function g(t,e){if(1&t&&(c.Wb(0,"mat-option",12),c.Lc(1),c.Vb()),2&t){const t=e.$implicit;c.sc("value",t.value),c.Cb(1),c.Nc(" ",t.viewValue," ")}}let b=(()=>{class t{constructor(t){this.form=t,this.options=[],this.location=new s.e(""),this.foods=[{value:"steak-0",viewValue:"Steak"},{value:"pizza-1",viewValue:"Pizza"},{value:"tacos-2",viewValue:"Tacos"}],this.rangeValues=[20,80],this.searchForm=this.form.group({location:this.location})}handleChange(t){console.log(t)}ngOnInit(){}onSubmit(){}}return t.\u0275fac=function(e){return new(e||t)(c.Qb(s.d))},t.\u0275cmp=c.Kb({type:t,selectors:[["app-search-box-mobile"]],decls:22,vars:4,consts:[[1,"container","content"],[3,"formGroup","ngSubmit"],[1,"row"],[1,"col"],[1,"row",2,"margin-left","0"],["appearance","none","floatLabel","always",2,"width","100%","margin-bottom","-1.25em"],[2,"color","white"],["type","text","matInput","","formControlName","location","placeholder","Ex: Goi\xe2nia","maxlength","40",1,"inputCidade",3,"matAutocomplete"],["auto","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],["appearance","none","color","accent","floatLabel","always",2,"width","100%","margin-bottom","-1.25em"],["disableOptionCentering",""],[3,"value"]],template:function(t,e){if(1&t&&(c.Wb(0,"div",0),c.Wb(1,"form",1),c.ic("ngSubmit",(function(){return e.onSubmit()})),c.Wb(2,"div",2),c.Wb(3,"div",3),c.Wb(4,"div",4),c.Wb(5,"mat-form-field",5),c.Wb(6,"mat-label",6),c.Lc(7,"BUSQUE POR CIDADE OU BAIRRO."),c.Vb(),c.Rb(8,"input",7),c.Wb(9,"mat-autocomplete",null,8),c.Jc(11,f,2,2,"mat-option",9),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Wb(12,"div",3),c.Wb(13,"div",4),c.Wb(14,"mat-form-field",10),c.Wb(15,"mat-label",6),c.Lc(16,"TIPO DE SERVI\xc7O"),c.Vb(),c.Wb(17,"mat-select",11),c.Wb(18,"mat-option"),c.Lc(19,"None"),c.Vb(),c.Jc(20,g,2,2,"mat-option",9),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Rb(21,"div",3),c.Vb(),c.Vb(),c.Vb()),2&t){const t=c.Ac(10);c.Cb(1),c.sc("formGroup",e.searchForm),c.Cb(7),c.sc("matAutocomplete",t),c.Cb(3),c.sc("ngForOf",e.options),c.Cb(9),c.sc("ngForOf",e.foods)}},directives:[s.w,s.p,s.h,l.c,l.f,d.b,s.b,p.c,s.o,s.f,s.j,p.a,i.l,h.a,u.n],styles:[".content[_ngcontent-%COMP%]{background-color:#fabb27;border-radius:15px;margin-bottom:30px;padding-top:15px;padding-bottom:15px;position:fixed;z-index:2;bottom:50px}.inputCidade[_ngcontent-%COMP%]{color:#fff}"]}),t})();var m=n("vxfF");function x(t,e){if(1&t&&(c.Wb(0,"mat-option",28),c.Lc(1),c.Vb()),2&t){const t=e.$implicit;c.sc("value",t),c.Cb(1),c.Nc(" ",t," ")}}let C=(()=>{class t{constructor(t,e){this.route=t,this.form=e,this.searchInputs={location:"",minValue:"",maxValue:"",minArea:"",maxArea:""},this.location=new s.e("",[s.u.pattern(/([a-z]|[A-Z])/g)]),this.minValue=new s.e("",[s.u.pattern(/[^\D]/g)]),this.maxValue=new s.e("",[s.u.pattern(/[^\D]/g)]),this.minArea=new s.e("",[s.u.pattern(/[^\D]/g)]),this.maxArea=new s.e("",[s.u.pattern(/[^\D]/g)]),this.options=["One","Two","Three"],this.searchForm=this.form.group({location:this.location,minValue:this.minValue,maxValue:this.maxValue,minArea:this.minArea,maxArea:this.maxArea})}ngOnInit(){this.location.valueChanges.subscribe(t=>{console.log(t)})}checkText(t){this.searchInputs[t]=this.searchInputs[t].replace(/\D/g,"")}clearFilters(){this.searchInputs={location:"",minValue:"",maxValue:"",minArea:"",maxArea:""}}onSubmit(){if(!this.searchForm.valid)return;let{location:t,minValue:e,maxValue:n,minArea:o,maxArea:i}=this.searchForm.controls;this.route.navigate(["/search"],{queryParams:{location:t.value,minValue:e.value,maxValue:n.value,minArea:o.value,maxArea:i.value},skipLocationChange:!0})}}return t.\u0275fac=function(e){return new(e||t)(c.Qb(r.b),c.Qb(s.d))},t.\u0275cmp=c.Kb({type:t,selectors:[["app-searchbox"]],decls:56,vars:7,consts:[["id","searchBox",1,"container"],[3,"formGroup","ngSubmit"],[1,"row"],[1,"col","d-flex","justify-content-start"],[1,"col"],["appearance","none",2,"width","100%"],[2,"color","white"],["type","text","matInput","","formControlName","location","placeholder","Ex: Goi\xe2nia","maxlength","40",1,"inputCidade",3,"matAutocomplete"],["auto","matAutocomplete"],[3,"value",4,"ngFor","ngForOf"],[1,"row",2,"padding-bottom","0","padding-top","0"],[1,"dropdown"],["type","button","id","dropdownMenu2","data-toggle","dropdown","aria-haspopup","true","aria-expanded","false",1,"btn","dropdown-toggle"],["aria-labelledby","dropdownMenu2",1,"dropdown-menu"],["type","button",1,"dropdown-item"],[1,"row",2,"padding-bottom","0","padding-top","10px"],["id","searchBoxValue",1,"row"],[1,"col-6"],["formControlName","minValue","type","text","placeholder","m\xedn","maxlength","10",1,"btn",2,"width","100%",3,"ngModel","ngModelChange","keyup"],["formControlName","maxValue","type","text","placeholder","m\xe1x","maxlength","10",1,"btn",2,"width","100%",3,"ngModel","ngModelChange","keyup"],["id","searchBoxArea",1,"row"],["formControlName","minArea","type","text","placeholder","m\xedn","maxlength","4",1,"btn",2,"width","100%",3,"ngModel","ngModelChange","keyup"],["formControlName","maxArea","type","text","placeholder","m\xe1x","maxlength","4",1,"btn",2,"width","100%",3,"ngModel","ngModelChange","keyup"],[1,"row",2,"padding-top","15px"],[1,"col-6","d-flex","justify-content-start","align-items-center"],["type","button",1,"btn","limpar",3,"click"],[1,"col-6","d-flex","justify-content-end"],["type","submit",1,"btn","submit"],[3,"value"]],template:function(t,e){if(1&t&&(c.Wb(0,"div",0),c.Wb(1,"form",1),c.ic("ngSubmit",(function(){return e.onSubmit()})),c.Wb(2,"div",2),c.Wb(3,"div",3),c.Wb(4,"span"),c.Lc(5,"LOCALIZA\xc7\xc3O"),c.Vb(),c.Vb(),c.Vb(),c.Wb(6,"div",2),c.Wb(7,"div",4),c.Wb(8,"mat-form-field",5),c.Wb(9,"mat-label",6),c.Lc(10,"Busque por cidade ou bairro."),c.Vb(),c.Rb(11,"input",7),c.Wb(12,"mat-autocomplete",null,8),c.Jc(14,x,2,2,"mat-option",9),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Wb(15,"div",10),c.Wb(16,"div",4),c.Wb(17,"span"),c.Lc(18,"TIPO DE SERVI\xc7O"),c.Vb(),c.Vb(),c.Vb(),c.Wb(19,"div",2),c.Wb(20,"div",4),c.Wb(21,"div",11),c.Wb(22,"button",12),c.Lc(23," Selecione "),c.Vb(),c.Wb(24,"div",13),c.Wb(25,"button",14),c.Lc(26,"Action"),c.Vb(),c.Wb(27,"button",14),c.Lc(28,"Another action"),c.Vb(),c.Wb(29,"button",14),c.Lc(30,"Something else here"),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Wb(31,"div",15),c.Wb(32,"div",4),c.Wb(33,"span"),c.Lc(34,"VALOR"),c.Vb(),c.Vb(),c.Vb(),c.Wb(35,"div",16),c.Wb(36,"div",17),c.Wb(37,"input",18),c.ic("ngModelChange",(function(t){return e.searchInputs.minValue=t}))("keyup",(function(){return e.checkText("minValue")})),c.Vb(),c.Vb(),c.Wb(38,"div",17),c.Wb(39,"input",19),c.ic("ngModelChange",(function(t){return e.searchInputs.maxValue=t}))("keyup",(function(){return e.checkText("maxValue")})),c.Vb(),c.Vb(),c.Vb(),c.Wb(40,"div",15),c.Wb(41,"div",4),c.Wb(42,"span"),c.Lc(43,"\xc1REA"),c.Vb(),c.Vb(),c.Vb(),c.Wb(44,"div",20),c.Wb(45,"div",17),c.Wb(46,"input",21),c.ic("ngModelChange",(function(t){return e.searchInputs.minArea=t}))("keyup",(function(){return e.checkText("minArea")})),c.Vb(),c.Vb(),c.Wb(47,"div",17),c.Wb(48,"input",22),c.ic("ngModelChange",(function(t){return e.searchInputs.maxArea=t}))("keyup",(function(){return e.checkText("maxArea")})),c.Vb(),c.Vb(),c.Vb(),c.Wb(49,"div",23),c.Wb(50,"div",24),c.Wb(51,"button",25),c.ic("click",(function(){return e.clearFilters()})),c.Lc(52,"Limpar"),c.Vb(),c.Vb(),c.Wb(53,"div",26),c.Wb(54,"button",27),c.Lc(55,"Aplicar"),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb()),2&t){const t=c.Ac(13);c.Cb(1),c.sc("formGroup",e.searchForm),c.Cb(10),c.sc("matAutocomplete",t),c.Cb(3),c.sc("ngForOf",e.options),c.Cb(23),c.sc("ngModel",e.searchInputs.minValue),c.Cb(2),c.sc("ngModel",e.searchInputs.maxValue),c.Cb(7),c.sc("ngModel",e.searchInputs.minArea),c.Cb(2),c.sc("ngModel",e.searchInputs.maxArea)}},directives:[s.w,s.p,s.h,l.c,l.f,d.b,s.b,p.c,s.o,s.f,s.j,p.a,i.l,u.n],styles:[".color-preto[_ngcontent-%COMP%]{color:#000}.color-verde[_ngcontent-%COMP%]{color:#00fd00}.color-verde-escuro[_ngcontent-%COMP%]{color:#00ffab}.back-preto[_ngcontent-%COMP%]{background-color:#000}.back-verde[_ngcontent-%COMP%]{background-color:#00fd00}.back-verde-escuro[_ngcontent-%COMP%]{background-color:#00ffab}#searchBox[_ngcontent-%COMP%]{width:330px;min-height:375px;background-color:#ffcd00;border-radius:20px;padding:30px 20px 15px}#searchBox[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{color:#fff;font-size:16px}#searchBox[_ngcontent-%COMP%]   .inputCidade[_ngcontent-%COMP%]{color:#fff;font-size:14px;background-color:#ffcd00;padding-bottom:6px;border:none;border-bottom:2px solid #fff;width:100%}#searchBox[_ngcontent-%COMP%]   .inputCidade[_ngcontent-%COMP%]::-webkit-input-placeholder{font-size:14px;color:#fff}#searchBox[_ngcontent-%COMP%]   .inputCidade[_ngcontent-%COMP%]::-moz-placeholder{font-size:14px;color:#fff}#searchBox[_ngcontent-%COMP%]   .inputCidade[_ngcontent-%COMP%]::-ms-input-placeholder{font-size:14px;color:#fff}#searchBox[_ngcontent-%COMP%]   .inputCidade[_ngcontent-%COMP%]::placeholder{font-size:14px;color:#fff}#searchBox[_ngcontent-%COMP%]   .inputCidade[_ngcontent-%COMP%]:focus{outline:none}#searchBox[_ngcontent-%COMP%]   .dropdown[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]{width:100%;text-align:start;background-color:#ffcd00;border-radius:0;border:none;border-bottom:2px solid #fff;color:#fff;font-size:14px;padding-left:0}#searchBox[_ngcontent-%COMP%]   .dropdown[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]:focus{outline:none;box-shadow:none}#searchBox[_ngcontent-%COMP%]   .dropdown-toggle[_ngcontent-%COMP%]:after{float:right;font-size:20px;margin-top:8px}#searchBox[_ngcontent-%COMP%]   #searchBoxValue[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{height:45px;color:#ffcd00;background-color:#fff;padding-right:5px;padding-left:5px;border-radius:7px}#searchBox[_ngcontent-%COMP%]   #searchBoxValue[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-input-placeholder{color:#ffcd00;text-transform:uppercase;font-size:14px}#searchBox[_ngcontent-%COMP%]   #searchBoxValue[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-moz-placeholder{color:#ffcd00;text-transform:uppercase;font-size:14px}#searchBox[_ngcontent-%COMP%]   #searchBoxValue[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-ms-input-placeholder{color:#ffcd00;text-transform:uppercase;font-size:14px}#searchBox[_ngcontent-%COMP%]   #searchBoxValue[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#ffcd00;text-transform:uppercase;font-size:14px}#searchBox[_ngcontent-%COMP%]   #searchBoxValue[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:focus{outline:0;box-shadow:none}#searchBox[_ngcontent-%COMP%]   #searchBoxArea[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{height:45px;color:#ffcd00;background-color:#fff;padding-right:5px;padding-left:5px;border-radius:7px}#searchBox[_ngcontent-%COMP%]   #searchBoxArea[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-webkit-input-placeholder{color:#ffcd00;text-transform:uppercase;font-size:14px}#searchBox[_ngcontent-%COMP%]   #searchBoxArea[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-moz-placeholder{color:#ffcd00;text-transform:uppercase;font-size:14px}#searchBox[_ngcontent-%COMP%]   #searchBoxArea[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-ms-input-placeholder{color:#ffcd00;text-transform:uppercase;font-size:14px}#searchBox[_ngcontent-%COMP%]   #searchBoxArea[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#ffcd00;text-transform:uppercase;font-size:14px}#searchBox[_ngcontent-%COMP%]   #searchBoxArea[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:focus{outline:0;box-shadow:none}#searchBox[_ngcontent-%COMP%]   .limpar[_ngcontent-%COMP%]{width:100%;border-radius:7px;border:2px solid rgba(0,0,0,.27);color:rgba(0,0,0,.61);background-color:#ffcd00}#searchBox[_ngcontent-%COMP%]   .limpar[_ngcontent-%COMP%]:hover{background-color:#ce9615}#searchBox[_ngcontent-%COMP%]   .limpar[_ngcontent-%COMP%]:focus{outline:0;box-shadow:none}#searchBox[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]{width:100%;border-radius:7px;border:2px solid #fff;color:#fff;background-color:#ffcd00}#searchBox[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]:hover{background-color:#ce9615}#searchBox[_ngcontent-%COMP%]   .submit[_ngcontent-%COMP%]:focus{outline:0;box-shadow:none}"]}),t})();var w=n("bSwM");function O(t,e){if(1&t&&(c.Wb(0,"mat-checkbox",5),c.Lc(1),c.Vb()),2&t){const t=e.$implicit;c.Cb(1),c.Mc(t)}}let M=(()=>{class t{constructor(t){this.form=t,this.items=["Aasdasd","Basdasdas","Casdasdasd","Dasdasdasd","Basdasdas","Casdasdasd","Dasdasdasd","Basdasdas","Casdasdasd","Dasdasdasd","Basdasdas","Casdasdasd","Dasdasdasd","Basdasdas","Casdasdasd","Dasdasdasd"],this.searchForm=this.form.group({})}ngOnInit(){}onSubmit(){}}return t.\u0275fac=function(e){return new(e||t)(c.Qb(s.d))},t.\u0275cmp=c.Kb({type:t,selectors:[["app-filter"]],decls:6,vars:2,consts:[["id","searchFilter",1,"container",2,"margin-top","10px"],[3,"formGroup","ngSubmit"],[1,"title"],[1,"w-100","d-flex","flex-column",2,"padding-top","10px"],["appearance","none","color","warn",4,"ngFor","ngForOf"],["appearance","none","color","warn"]],template:function(t,e){1&t&&(c.Wb(0,"div",0),c.Wb(1,"form",1),c.ic("ngSubmit",(function(){return e.onSubmit()})),c.Wb(2,"span",2),c.Lc(3,"CARACTER\xcdSTICAS DO ESPA\xc7O"),c.Vb(),c.Wb(4,"div",3),c.Jc(5,O,2,1,"mat-checkbox",4),c.Vb(),c.Vb(),c.Vb()),2&t&&(c.Cb(1),c.sc("formGroup",e.searchForm),c.Cb(4),c.sc("ngForOf",e.items))},directives:[s.w,s.p,s.h,i.l,w.a],styles:["#searchFilter[_ngcontent-%COMP%]{width:330px;min-height:375px;background-color:#f4f4f4;border-radius:20px;padding:30px 20px 15px;margin-bottom:275px;box-shadow:0 0 2px 1px #d6d6d6}#searchFilter[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{font-size:14px;font-weight:700}#searchFilter[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{height:30px}#searchFilter[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%]{font-size:13px;color:#686868;border-top:1px solid #e4e4e4;padding-top:8px}#searchFilter[_ngcontent-%COMP%]   .mat-checkbox-layout[_ngcontent-%COMP%]{margin-top:5px;margin-bottom:5px}"],changeDetection:0}),t})();var P=n("LRne"),_=n("xgIS"),S=n("5+tZ"),V=n("lJxs"),v=n("vkgz"),y=n("pLZG"),W=n("7o/Q"),T=n("D0XW");class k{constructor(t,e){this.period=t,this.scheduler=e}call(t,e){return e.subscribe(new A(t,this.period,this.scheduler))}}class A extends W.a{constructor(t,e,n){super(t),this.period=e,this.scheduler=n,this.hasValue=!1,this.add(n.schedule(B,e,{subscriber:this,period:e}))}_next(t){this.lastValue=t,this.hasValue=!0}notifyNext(){this.hasValue&&(this.hasValue=!1,this.destination.next(this.lastValue))}}function B(t){let{subscriber:e,period:n}=t;e.notifyNext(),this.schedule(t,n)}function D(t,e,n,o){const i=window&&!!window.document&&window.document.documentElement;let r=i&&e?window:n;if(t&&(r=t&&i&&"string"==typeof t?function(t,e,n){return(n?window.document:e).querySelector(t)}(t,n.nativeElement,o):t,!r))throw new Error("ngx-infinite-scroll {resolveContainerElement()}: selector for");return r}function F(t){return t&&!t.firstChange}const z={clientHeight:"clientHeight",offsetHeight:"offsetHeight",scrollHeight:"scrollHeight",pageYOffset:"pageYOffset",offsetTop:"offsetTop",scrollTop:"scrollTop",top:"top"},H={clientHeight:"clientWidth",offsetHeight:"offsetWidth",scrollHeight:"scrollWidth",pageYOffset:"pageXOffset",offsetTop:"offsetLeft",scrollTop:"scrollLeft",top:"left"};class I{constructor(t=!0){this.vertical=t,this.propsMap=t?z:H}clientHeightKey(){return this.propsMap.clientHeight}offsetHeightKey(){return this.propsMap.offsetHeight}scrollHeightKey(){return this.propsMap.scrollHeight}pageYOffsetKey(){return this.propsMap.pageYOffset}offsetTopKey(){return this.propsMap.offsetTop}scrollTopKey(){return this.propsMap.scrollTop}topKey(){return this.propsMap.top}}function L(t){return["Window","global"].some(e=>Object.prototype.toString.call(t).includes(e))}function E(t,e){return t?e.document.documentElement:null}function K(t,e){const n=function({container:t,isWindow:e,axis:n}){const{offsetHeightKey:o,clientHeightKey:i}=N(n);return R(t,e,o,i)}(e);return e.isWindow?function(t,e,n){const{axis:o,container:i,isWindow:r}=n,{offsetHeightKey:c,clientHeightKey:a}=N(o),s=t+j(E(r,i),o,r),l=R(e.nativeElement,r,c,a);return{height:t,scrolled:s,totalToScroll:function(t,e,n){const o=e.topKey();if(t.getBoundingClientRect)return t.getBoundingClientRect()[o]+j(t,e,n)}(e.nativeElement,o,r)+l,isWindow:r}}(n,t,e):function(t,e,n){const{axis:o,container:i}=n;return{height:t,scrolled:i[o.scrollTopKey()],totalToScroll:i[o.scrollHeightKey()],isWindow:!1}}(n,0,e)}function N(t){return{offsetHeightKey:t.offsetHeightKey(),clientHeightKey:t.clientHeightKey()}}function R(t,e,n,o){if(isNaN(t[n])){const n=E(e,t);return n?n[o]:0}return t[n]}function j(t,e,n){const o=e.pageYOffsetKey(),i=e.scrollTopKey(),r=e.offsetTopKey();return isNaN(window[o])?E(n,t)[i]:t.ownerDocument?t.ownerDocument.defaultView[o]:t[r]}function U(t,e,n){let o,i;if(t.totalToScroll<=0)return!1;const r=t.isWindow?t.scrolled:t.height+t.scrolled;return n?(o=(t.totalToScroll-r)/t.totalToScroll,i=e.down/10):(o=t.scrolled/(t.scrolled+(t.totalToScroll-r)),i=e.up/10),o<=i}class G{constructor({totalToScroll:t}){this.lastScrollPosition=0,this.lastTotalToScroll=0,this.totalToScroll=0,this.triggered={down:0,up:0},this.totalToScroll=t}updateScrollPosition(t){return this.lastScrollPosition=t}updateTotalToScroll(t){this.lastTotalToScroll!==t&&(this.lastTotalToScroll=this.totalToScroll,this.totalToScroll=t)}updateScroll(t,e){this.updateScrollPosition(t),this.updateTotalToScroll(e)}updateTriggeredFlag(t,e){e?this.triggered.down=t:this.triggered.up=t}isTriggeredScroll(t,e){return e?this.triggered.down===t:this.triggered.up===t}}function q(t){const{scrollDown:e,stats:{scrolled:n}}=t;return{type:e?"[NGX_ISE] DOWN":"[NGX_ISE] UP",payload:{currentScrollPosition:n}}}let Q=(()=>{class t{constructor(t,e){this.element=t,this.zone=e,this.scrolled=new c.o,this.scrolledUp=new c.o,this.infiniteScrollDistance=2,this.infiniteScrollUpDistance=1.5,this.infiniteScrollThrottle=150,this.infiniteScrollDisabled=!1,this.infiniteScrollContainer=null,this.scrollWindow=!0,this.immediateCheck=!1,this.horizontal=!1,this.alwaysCallback=!1,this.fromRoot=!1}ngAfterViewInit(){this.infiniteScrollDisabled||this.setup()}ngOnChanges({infiniteScrollContainer:t,infiniteScrollDisabled:e,infiniteScrollDistance:n}){const o=F(t),i=F(e),r=F(n),c=!i&&!this.infiniteScrollDisabled||i&&!e.currentValue||r;(o||i||r)&&(this.destroyScroller(),c&&this.setup())}setup(){"undefined"!=typeof window&&this.zone.runOutsideAngular(()=>{this.disposeScroller=function(t){const{scrollContainer:e,scrollWindow:n,element:o,fromRoot:i}=t,r=function({windowElement:t,axis:e}){return function(t,e){return Object.assign({},t,{container:t.isWindow||e&&!e.nativeElement?e:e.nativeElement})}({axis:e,isWindow:L(t)},t)}({axis:new I(!t.horizontal),windowElement:D(e,n,o,i)}),c=new G({totalToScroll:K(o,r)}),a={up:t.upDistance,down:t.downDistance};return function(t){let e=Object(_.a)(t.container,"scroll");return t.throttle&&(e=e.pipe(function(t,e=T.a){return n=>n.lift(new k(t,e))}(t.throttle))),e}({container:r.container,throttle:t.throttle}).pipe(Object(S.a)(()=>Object(P.a)(K(o,r))),Object(V.a)(t=>function(t,e,n){const{scrollDown:o,fire:i}=function(t,e,n){const o=function(t,e){return t<e.scrolled}(t,e);return{fire:U(e,n,o),scrollDown:o}}(t,e,n);return{scrollDown:o,fire:i,stats:e}}(c.lastScrollPosition,t,a)),Object(v.a)(({stats:t})=>c.updateScroll(t.scrolled,t.totalToScroll)),Object(y.a)(({fire:e,scrollDown:n,stats:{totalToScroll:o}})=>function(t,e,n){return!(!t||!e)||!(n||!e)}(t.alwaysCallback,e,c.isTriggeredScroll(o,n))),Object(v.a)(({scrollDown:t,stats:{totalToScroll:e}})=>{c.updateTriggeredFlag(e,t)}),Object(V.a)(q))}({fromRoot:this.fromRoot,alwaysCallback:this.alwaysCallback,disable:this.infiniteScrollDisabled,downDistance:this.infiniteScrollDistance,element:this.element,horizontal:this.horizontal,scrollContainer:this.infiniteScrollContainer,scrollWindow:this.scrollWindow,throttle:this.infiniteScrollThrottle,upDistance:this.infiniteScrollUpDistance}).subscribe(t=>this.zone.run(()=>this.handleOnScroll(t)))})}handleOnScroll({type:t,payload:e}){switch(t){case"[NGX_ISE] DOWN":return this.scrolled.emit(e);case"[NGX_ISE] UP":return this.scrolledUp.emit(e);default:return}}ngOnDestroy(){this.destroyScroller()}destroyScroller(){this.disposeScroller&&this.disposeScroller.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(c.Qb(c.l),c.Qb(c.A))},t.\u0275dir=c.Lb({type:t,selectors:[["","infiniteScroll",""],["","infinite-scroll",""],["","data-infinite-scroll",""]],inputs:{infiniteScrollDistance:"infiniteScrollDistance",infiniteScrollUpDistance:"infiniteScrollUpDistance",infiniteScrollThrottle:"infiniteScrollThrottle",infiniteScrollDisabled:"infiniteScrollDisabled",infiniteScrollContainer:"infiniteScrollContainer",scrollWindow:"scrollWindow",immediateCheck:"immediateCheck",horizontal:"horizontal",alwaysCallback:"alwaysCallback",fromRoot:"fromRoot"},outputs:{scrolled:"scrolled",scrolledUp:"scrolledUp"},features:[c.Ab]}),t})(),J=(()=>{class t{}return t.\u0275mod=c.Ob({type:t}),t.\u0275inj=c.Nb({factory:function(e){return new(e||t)},providers:[],imports:[[]]}),t})();var X=n("tkCS");function Y(t,e){1&t&&c.Rb(0,"app-highlight-items",8),2&t&&c.sc("data",e.$implicit)}const Z=[{path:"",component:(()=>{class t{constructor(t,e,n){this.router=t,this.route=e,this.highlight=n,this.quantity=50,this.offset="auto",this.position=$(window).scrollTop()}ngOnInit(){this.result=this.route.snapshot.data.source,this.route.queryParams.subscribe(t=>{console.log("Tem algo aqui",t),t.location&&(this.result=this.highlight.getSomeSpaces(20))})}ngOnDestroy(){$("#navTop").removeClass("hide"),$("#navTop").addClass("up")}scrollEvent(t){this.checkOffset();var e=$(window).scrollTop();e>this.position+30?($("#navTop").removeClass("up"),$("#navTop").addClass("hide"),$(document).scrollTop()+window.innerHeight>$("#footer").offset().top?($("#searchScroll").removeClass("slideDown"),$("#searchScroll").addClass("slideUp")):($("#searchScroll").removeClass("slideUp"),$("#searchScroll").addClass("slideDown")),this.position=e):e<this.position&&($("#navTop").removeClass("hide"),$("#navTop").addClass("up"),$("#searchScroll").removeClass("slideDown"),$("#searchScroll").addClass("slideUp"),this.position=e)}onScrollContent(){this.quantity<20&&(this.quantity=this.quantity+10),this.result=this.highlight.getSomeSpaces(this.quantity)}checkOffset(){$("#searchScroll").offset().top+$("#searchScroll").height()>=$("#footer").offset().top-125&&($("#searchScroll").css("position","absolute"),$("#searchScroll").css("top",$("#footer").offset().top-$("#searchScroll").height()-125+"px")),$(document).scrollTop()+window.innerHeight<$("#footer").offset().top&&($("#searchScroll").css("position","fixed"),$("#searchScroll").css("top",this.offset))}}return t.\u0275fac=function(e){return new(e||t)(c.Qb(r.b),c.Qb(r.a),c.Qb(a.a))},t.\u0275cmp=c.Kb({type:t,selectors:[["app-search"]],hostBindings:function(t,e){1&t&&c.ic("scroll",(function(t){return e.scrollEvent(t)}),!1,c.Cc)},decls:11,vars:2,consts:[["id","content",1,"container-fluid"],["id","searchBoxAndFilterMobile",1,"row"],[1,"row"],["id","searchBoxAndFilter",2,"padding-right","15px","padding-left","15px","min-height","375px"],["id","searchScroll",2,"position","fixed"],[2,"width","340px","min-height","100vh",3,"itemSize"],["id","searchHighlight","infiniteScroll","",1,"h-100","d-flex","align-items-start","flex-row","flex-wrap",2,"padding-right","15px","padding-left","15px","scroll-margin-top","200px",3,"infiniteScrollDistance","scrolled"],["style","padding-bottom: 15px;","width","210px",3,"data",4,"ngFor","ngForOf"],["width","210px",2,"padding-bottom","15px",3,"data"]],template:function(t,e){1&t&&(c.Wb(0,"div",0),c.Wb(1,"div",1),c.Rb(2,"app-search-box-mobile"),c.Vb(),c.Wb(3,"div",2),c.Wb(4,"div",3),c.Wb(5,"div",4),c.Wb(6,"cdk-virtual-scroll-viewport",5),c.Rb(7,"app-searchbox"),c.Rb(8,"app-filter"),c.Vb(),c.Vb(),c.Vb(),c.Wb(9,"div",6),c.ic("scrolled",(function(){return e.onScrollContent()})),c.Jc(10,Y,1,1,"app-highlight-items",7),c.Vb(),c.Vb(),c.Vb()),2&t&&(c.Cb(9),c.sc("infiniteScrollDistance",2),c.Cb(1),c.sc("ngForOf",e.result))},directives:[b,m.c,m.a,C,M,Q,i.l,X.a],styles:["#content[_ngcontent-%COMP%]{min-height:100%;min-width:85%;padding:100px 40px;background-color:#f4f4f4}#content[_ngcontent-%COMP%]   cdk-virtual-scroll-viewport[_ngcontent-%COMP%]::-webkit-scrollbar{width:0;background:transparent}#content[_ngcontent-%COMP%]   cdk-virtual-scroll-viewport[_ngcontent-%COMP%]{-ms-overflow-style:none!important;scrollbar-width:none!important;overflow:-moz-scrollbars-none!important;-ms-overflow-style:none}#content[_ngcontent-%COMP%]   #searchHighlight[_ngcontent-%COMP%]{flex:0 0 72%;max-width:72%;justify-content:space-between;align-items:start}#content[_ngcontent-%COMP%]   #searchBoxAndFilter[_ngcontent-%COMP%]{flex:0 0 28%;max-width:28%}#content[_ngcontent-%COMP%]   #searchBoxAndFilterMobile[_ngcontent-%COMP%]{display:none}@media (max-width:1285px){#content[_ngcontent-%COMP%]   #searchHighlight[_ngcontent-%COMP%]{flex:0 0 65%;max-width:65%}#content[_ngcontent-%COMP%]   #searchBoxAndFilter[_ngcontent-%COMP%]{flex:0 0 35%;max-width:35%}}@media (max-width:1085px){#content[_ngcontent-%COMP%]   #searchHighlight[_ngcontent-%COMP%]{flex:0 0 55%;max-width:55%}#content[_ngcontent-%COMP%]   #searchBoxAndFilter[_ngcontent-%COMP%]{flex:0 0 45%;max-width:45%}}@media (max-width:810px){#content[_ngcontent-%COMP%]   #searchBoxAndFilter[_ngcontent-%COMP%], #content[_ngcontent-%COMP%]   #searchHighlight[_ngcontent-%COMP%]{flex:0 0 50%;max-width:50%}}@media (max-width:768px){#content[_ngcontent-%COMP%]   #searchHighlight[_ngcontent-%COMP%]{flex:0 0 100%;max-width:100%}#content[_ngcontent-%COMP%]   #searchBoxAndFilter[_ngcontent-%COMP%]{display:none}#content[_ngcontent-%COMP%]   #searchBoxAndFilterMobile[_ngcontent-%COMP%]{display:block}}@media (max-width:425px){#content[_ngcontent-%COMP%]{padding-top:30px}#content[_ngcontent-%COMP%]   #searchHighlight[_ngcontent-%COMP%]{justify-content:center!important}}.slideUp[_ngcontent-%COMP%]{top:auto}.slideDown[_ngcontent-%COMP%]{top:20px!important}"]}),t})()}];let tt=(()=>{class t{}return t.\u0275mod=c.Ob({type:t}),t.\u0275inj=c.Nb({factory:function(e){return new(e||t)},imports:[[r.c.forChild(Z)],r.c]}),t})();n.d(e,"SearchModule",(function(){return et}));let et=(()=>{class t{}return t.\u0275mod=c.Ob({type:t}),t.\u0275inj=c.Nb({factory:function(e){return new(e||t)},imports:[[o.a,i.c,tt,J]]}),t})()}}]);