(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{WI8p:function(a,t,e){"use strict";e.r(t);var o=e("PCNd"),n=e("ofXK"),i=e("fXoL"),c=e("L8er");let r=(()=>{class a{constructor(a){this.alugaveis=a}resolve(a,t){return this.alugaveis.getById(a.paramMap.get("id"))}}return a.\u0275fac=function(t){return new(t||a)(i.ec(c.a))},a.\u0275prov=i.Mb({token:a,factory:a.\u0275fac,providedIn:"root"}),a})();var s=e("tyNb"),b=e("AytR"),d=e("wd/R"),l=e("FKr1"),p=e("1yaQ"),u=e("9BeE"),g=e("B5ND"),f=e("sVv3"),h=e("dNgK"),m=e("kmnG"),x=e("qFsG"),v=e("iadO");function V(a,t){if(1&a&&i.Rb(0,"li",55),2&a){const a=t.index;i.sc("ngClass",0==a?"active":""),i.Db("data-slide-to",a)}}const C=function(a){return{"background-image":a}};function W(a,t){if(1&a&&(i.Wb(0,"div",56),i.Rb(1,"div",57),i.Rb(2,"img",58),i.Vb()),2&a){const a=t.$implicit,e=t.index,o=i.mc();i.sc("ngClass",0==e?"carousel-item active":"carousel-item"),i.Cb(1),i.sc("ngStyle",i.wc(3,C,"url("+o.backUrl+"/imgs/"+a.url+")")),i.Cb(1),i.sc("src",o.backUrl+"/imgs/"+a.url||"assets/imgs/logo/logo_preta-min.png",i.Ec)}}function k(a,t){if(1&a&&(i.Wb(0,"span",62),i.Lc(1),i.Vb()),2&a){const a=t.$implicit;i.Cb(1),i.Mc(a)}}function w(a,t){if(1&a&&(i.Wb(0,"div",59),i.Wb(1,"span",60),i.Lc(2),i.nc(3,"number"),i.Vb(),i.Jc(4,k,2,1,"span",61),i.Vb()),2&a){const a=i.mc();i.Cb(2),i.Mc(i.pc(3,2,a.espaco.nota,"1.1")),i.Cb(2),i.sc("ngForOf",a.countStars(a.espaco.nota))}}function L(a,t){if(1&a&&(i.Wb(0,"span"),i.Lc(1),i.Vb()),2&a){const a=t.$implicit;i.Cb(1),i.Nc(". ",a,"")}}function O(a,t){if(1&a&&(i.Wb(0,"span"),i.Lc(1),i.Vb()),2&a){const a=t.$implicit;i.Cb(1),i.Nc(". ",a.descricao,"")}}const _=[{path:"",component:(()=>{class a{constructor(a,t,e,o,n,i){this.highlight=a,this.route=t,this.checkoutService=e,this.alugavelService=o,this.router=n,this.snackBar=i,this.hoje=d().format(),this.backUrl=b.a.apiUrl,this.data={dadosCompra:{dadosEspaco:{condicoes:["Para loca\xe7\xf5es com prazo superior a 30 dias \xe9 necess\xe1rio a utiliza\xe7\xe3o de um contrato e contrata\xe7\xe3o de um seguro.","Poder\xe1 ser dividido em at\xe9 10x a 1\xaa loca\xe7\xe3o. Limitada a cada usuario.","Caso o prazo se estenda por mais de 30 dias, o locador poder\xe1 aprovar ou n\xe3o a solicita\xe7\xe3o."]}}}}ngOnInit(){console.log(this.hoje),this.alugavelService.getTaxa().subscribe(a=>{this.max_taxa=Number(a.taxa)}),this.espaco=this.route.snapshot.data.data,console.log("Resolver: ",this.espaco)}countStars(a){let t=[],e=0;for(let o=0;o<Math.floor(a);o++)e++,t.push("start");for(a-e&&t.push("star_half");t.length<5;)t.push("star_outline");return t}checkout(){if(null!=this.entrada&&null!=this.saida){this.checkoutService.data_entrada=this.entrada,this.checkoutService.data_saida=this.saida,this.checkoutService.espaco=this.espaco;const a={dias_reservados:{data_entrada:this.formatDate(new Date(this.entrada)),data_saida:this.formatDate(new Date(this.saida))},valor:this.calculaTotalPeriodo(this.espaco.taxa,this.espaco.valor).toFixed(2),alugavel_id:this.espaco.id};this.checkoutService.checkout(a).subscribe(a=>{console.log("Response: ",a),window.open(a.paymentUrl,"_blank")},a=>{console.log("Aluguel error: ",a)})}else this.snackBar.open("Selecione as datas de entrada e sa\xedda","OK",{duration:3e3})}calculaCustoDia(a,t){return Number(a==this.max_taxa?t:a==this.max_taxa/2?t*(a/100+1):t*(this.max_taxa/100+1))}calculaTaxa(a,t){return Number(t*(a/100))}calculaTotal(a,t){return Number(this.calculaCustoDia(a,t)+this.calculaTaxa(a,t))}calculaTotalPeriodo(a,t){let e=this.entrada,o=this.saida;return Number(null==o||null==e?this.calculaTotal(a,t):(o.diff(e,"days")+1)*this.calculaTotal(a,t))}totalDias(){let a=this.entrada,t=this.saida;return Number(null==t||null==a?1:t.diff(a,"days")+1)}selecionaData(a,t){"entrada"==a?this.entrada=d(t.value):"saida"==a&&(this.saida=d(t.value))}formatDate(a){return`${a.getFullYear()}-${a.getMonth()+1}-${a.getDate()}`}}return a.\u0275fac=function(t){return new(t||a)(i.Qb(u.a),i.Qb(s.a),i.Qb(g.a),i.Qb(f.a),i.Qb(s.b),i.Qb(h.a))},a.\u0275cmp=i.Kb({type:a,selectors:[["app-spaces"]],features:[i.Bb([{provide:l.f,useValue:"pt-br"},{provide:l.c,useClass:p.d,deps:[l.f,p.a]},{provide:l.e,useValue:p.b}])],decls:125,vars:24,consts:[["id","content",1,"container-fluid"],[1,"row"],[1,"col","d-flex","flex-row","align-items-center","justify-content-start"],[1,"d-flex","justify-content-center","flex-column"],[2,"font-size","25px","font-weight","bold"],[2,"font-weight","bold","font-size","15px"],[2,"height","40px"],[1,"col-lg-9"],["id","spacesCarousel",1,"carousel","slide","myCarousel",2,"max-height","572px"],[1,"carousel-indicators"],["data-target","#spacesCarousel",3,"ngClass",4,"ngFor","ngForOf"],[1,"carousel-inner"],[3,"ngClass",4,"ngFor","ngForOf"],["href","#spacesCarousel","role","button","data-slide","prev",1,"carousel-control-prev"],["aria-hidden","true",1,"carousel-control-prev-icon"],[1,"sr-only"],["href","#spacesCarousel","role","button","data-slide","next",1,"carousel-control-next"],["aria-hidden","true",1,"carousel-control-next-icon"],[1,"col-lg-3"],[1,"myCard","col"],[1,"d-flex","flex-column"],[2,"width","100%"],[2,"color","black","font-weight","500"],["disabled","","matInput","",2,"color","black","font-weight","500",3,"matDatepicker","min","max","dateChange"],["matSuffix","",3,"for"],["disabled","false","format",""],["pickerEntrada",""],["disabled","","matInput","",2,"color","black","font-weight","500",3,"matDatepicker","min","dateChange"],["pickerSaida",""],[1,"d-flex",2,"color","black","justify-content","space-between","font-weight","500"],[2,"text-align","right","padding-right","6px"],[2,"border-bottom","1px solid black","height","20px","margin-bottom","10px"],[1,"d-flex",2,"color","black","justify-content","space-between","font-weight","bold"],[1,"d-flex","align-items-center","justify-content-center",2,"padding","20px"],["type","button",1,"btn","btn-reservar",3,"click"],[1,"d-flex","align-items-center","justify-content-center"],[1,"d-flex","align-items-center","justify-content-around","flex-wrap",2,"padding-top","20px","padding-right","auto","padding-left","auto"],[1,"d-flex","flex-column","align-items-center"],[1,"material-icons",2,"background","#00fd00","border-radius","25px","padding","10px"],[2,"font-size","12px","font-weight","bold"],[1,"d-flex","align-items-center","justify-content-center",2,"padding","40px 20px 10px 20px"],["href","",2,"color","black","font-weight","500"],[1,"row","endereco",2,"margin-bottom","15px"],["class","col-xl-3 d-flex align-items-center",4,"ngIf"],[1,"col-xl-7","d-flex","align-items-center"],[2,"color","black","font-size","20px","font-weight","500"],[1,"col-xl-1"],[1,"row",2,"padding-right","10%","margin-top","40px"],[1,"col"],[2,"font-weight","600","padding-bottom","10px"],[2,"border-bottom","2px solid #b1b1b1","padding-top","30px"],[2,"font-weight","600","margin-top","30px","padding-bottom","10px"],[4,"ngFor","ngForOf"],["href","",2,"font-weight","500","margin-top","30px","padding-bottom","10px","font-size","20px"],["id","avaliacoes",1,"container-fluid"],["data-target","#spacesCarousel",3,"ngClass"],[3,"ngClass"],[1,"bg-image",3,"ngStyle"],[1,"d-block","carouselImage",3,"src"],[1,"col-xl-3","d-flex","align-items-center"],[2,"font-size","20px","padding","5px 10px 5px 10px","border-radius","7px","color","white","background-color","black"],["class","material-icons","style","color: black; width: 24px; height: 24px; margin-left: 5px;",4,"ngFor","ngForOf"],[1,"material-icons",2,"color","black","width","24px","height","24px","margin-left","5px"]],template:function(a,t){if(1&a&&(i.Wb(0,"div",0),i.Wb(1,"div",1),i.Wb(2,"div",2),i.Wb(3,"div",3),i.Wb(4,"span",4),i.Lc(5),i.Vb(),i.Wb(6,"span",5),i.Lc(7),i.Vb(),i.Vb(),i.Vb(),i.Vb(),i.Rb(8,"div",6),i.Wb(9,"div",1),i.Wb(10,"div",7),i.Wb(11,"div",8),i.Wb(12,"ol",9),i.Jc(13,V,1,2,"li",10),i.Vb(),i.Wb(14,"div",11),i.Jc(15,W,3,5,"div",12),i.Vb(),i.Wb(16,"a",13),i.Rb(17,"span",14),i.Wb(18,"span",15),i.Lc(19,"Proximo"),i.Vb(),i.Vb(),i.Wb(20,"a",16),i.Rb(21,"span",17),i.Wb(22,"span",15),i.Lc(23,"Anterior"),i.Vb(),i.Vb(),i.Vb(),i.Vb(),i.Wb(24,"div",18),i.Wb(25,"div",19),i.Wb(26,"div",20),i.Wb(27,"div"),i.Wb(28,"mat-form-field",21),i.Wb(29,"mat-label",22),i.Lc(30,"Entrada"),i.Vb(),i.Wb(31,"input",23),i.ic("dateChange",(function(a){return t.selecionaData("entrada",a)})),i.Vb(),i.Rb(32,"mat-datepicker-toggle",24),i.Rb(33,"mat-datepicker",25,26),i.Vb(),i.Vb(),i.Wb(35,"div"),i.Wb(36,"mat-form-field",21),i.Wb(37,"mat-label",22),i.Lc(38,"Sa\xedda"),i.Vb(),i.Wb(39,"input",27),i.ic("dateChange",(function(a){return t.selecionaData("saida",a)})),i.Vb(),i.Rb(40,"mat-datepicker-toggle",24),i.Rb(41,"mat-datepicker",25,28),i.Vb(),i.Vb(),i.Vb(),i.Wb(43,"div",29),i.Wb(44,"span"),i.Lc(45,"N\xba de pessoas"),i.Vb(),i.Wb(46,"span",30),i.Lc(47),i.Vb(),i.Vb(),i.Wb(48,"div",29),i.Wb(49,"span"),i.Lc(50,"Quantidade de dias"),i.Vb(),i.Wb(51,"span",30),i.Lc(52),i.Vb(),i.Vb(),i.Rb(53,"div",31),i.Wb(54,"div",29),i.Wb(55,"span"),i.Lc(56,"CUSTO POR DIA"),i.Vb(),i.Wb(57,"span",30),i.Lc(58),i.Vb(),i.Vb(),i.Wb(59,"div",29),i.Wb(60,"span"),i.Lc(61,"TAXAS"),i.Vb(),i.Wb(62,"span",30),i.Lc(63),i.Vb(),i.Vb(),i.Wb(64,"div",29),i.Wb(65,"span"),i.Lc(66,"CUSTO POR DIA TOTAL"),i.Vb(),i.Wb(67,"span",30),i.Lc(68),i.Vb(),i.Vb(),i.Wb(69,"div",32),i.Wb(70,"span"),i.Lc(71,"TOTAL"),i.Vb(),i.Wb(72,"span",30),i.Lc(73),i.Vb(),i.Vb(),i.Wb(74,"div",33),i.Wb(75,"button",34),i.ic("click",(function(){return t.checkout()})),i.Lc(76,"RESERVAR"),i.Vb(),i.Vb(),i.Rb(77,"div",35),i.Wb(78,"div",36),i.Wb(79,"div",37),i.Wb(80,"span",38),i.Lc(81,"share"),i.Vb(),i.Wb(82,"span",39),i.Lc(83,"Compartilhar"),i.Vb(),i.Vb(),i.Wb(84,"div",37),i.Wb(85,"span",38),i.Lc(86,"favorite"),i.Vb(),i.Wb(87,"span",39),i.Lc(88,"Salvar"),i.Vb(),i.Vb(),i.Wb(89,"div",37),i.Wb(90,"span",38),i.Lc(91,"location_on"),i.Vb(),i.Wb(92,"span",39),i.Lc(93,"Localiza\xe7\xe3o"),i.Vb(),i.Vb(),i.Vb(),i.Wb(94,"div",40),i.Wb(95,"a",41),i.Lc(96,"*POL\xcdTICA DE CANCELAMENTO."),i.Vb(),i.Vb(),i.Vb(),i.Vb(),i.Vb(),i.Wb(97,"div",42),i.Jc(98,w,5,5,"div",43),i.Wb(99,"div",44),i.Wb(100,"span",45),i.Lc(101),i.Vb(),i.Vb(),i.Rb(102,"div",46),i.Vb(),i.Wb(103,"div",47),i.Wb(104,"div",48),i.Wb(105,"div",20),i.Wb(106,"span",49),i.Lc(107,"Descri\xe7\xe3o do propriet\xe1rio"),i.Vb(),i.Wb(108,"span"),i.Lc(109),i.Vb(),i.Vb(),i.Rb(110,"div",50),i.Wb(111,"div",20),i.Wb(112,"span",51),i.Lc(113,"Condi\xe7\xf5es"),i.Vb(),i.Jc(114,L,2,1,"span",52),i.Vb(),i.Rb(115,"div",50),i.Wb(116,"div",20),i.Wb(117,"span",51),i.Lc(118,"Informa\xe7\xf5es adicionais"),i.Vb(),i.Jc(119,O,2,1,"span",52),i.Vb(),i.Rb(120,"div",50),i.Wb(121,"div",20),i.Wb(122,"a",53),i.Lc(123,"Ainda tem alguma d\xfavida? Deixe sua pergunta ao locador"),i.Vb(),i.Vb(),i.Vb(),i.Vb(),i.Vb(),i.Rb(124,"div",54)),2&a){const a=i.Ac(34),e=i.Ac(42);i.Cb(5),i.Mc(t.espaco.titulo),i.Cb(2),i.Mc(t.espaco.tipo.nome),i.Cb(6),i.sc("ngForOf",t.espaco.imagens),i.Cb(2),i.sc("ngForOf",t.espaco.imagens),i.Cb(16),i.sc("matDatepicker",a)("min",t.hoje)("max",t.saida),i.Cb(1),i.sc("for",a),i.Cb(7),i.sc("matDatepicker",e)("min",t.entrada),i.Cb(1),i.sc("for",e),i.Cb(7),i.Mc(t.espaco.caracteristicas[3].valor),i.Cb(5),i.Mc(t.totalDias()),i.Cb(6),i.Nc("R$ ",t.calculaCustoDia(t.espaco.taxa,t.espaco.valor).toFixed(2),""),i.Cb(5),i.Nc("R$ ",t.calculaTaxa(t.espaco.taxa,t.espaco.valor).toFixed(2),""),i.Cb(5),i.Nc("R$ ",t.calculaTotal(t.espaco.taxa,t.espaco.valor).toFixed(2),""),i.Cb(5),i.Nc("R$ ",t.calculaTotalPeriodo(t.espaco.taxa,t.espaco.valor).toFixed(2),""),i.Cb(25),i.sc("ngIf",t.espaco.nota),i.Cb(3),i.Pc("",t.espaco.local.rua," - ",t.espaco.local.cidade," - ",t.espaco.local.estado,""),i.Cb(8),i.Mc(t.espaco.descricao),i.Cb(5),i.sc("ngForOf",t.data.dadosCompra.dadosEspaco.condicoes),i.Cb(5),i.sc("ngForOf",t.espaco.infos)}},directives:[n.l,m.c,m.f,x.b,v.b,v.d,m.g,v.a,n.m,n.k,n.n],pipes:[n.e],styles:[".color-preto[_ngcontent-%COMP%]{color:#000}.color-verde[_ngcontent-%COMP%]{color:#00fd00}.color-verde-escuro[_ngcontent-%COMP%]{color:#00ffab}.back-preto[_ngcontent-%COMP%]{background-color:#000}.back-verde[_ngcontent-%COMP%]{background-color:#00fd00}.back-verde-escuro[_ngcontent-%COMP%]{background-color:#00ffab}#content[_ngcontent-%COMP%]{padding-bottom:30px;padding-top:30px;background-color:#f4f4f4}#content[_ngcontent-%COMP%]   .myCarousel[_ngcontent-%COMP%]{border-radius:15px;overflow:hidden}#content[_ngcontent-%COMP%]   .endereco[_ngcontent-%COMP%]{background-color:#fff;margin-top:15px;margin-left:0;margin-right:0;padding:15px;border-radius:15px}.carouselImage[_ngcontent-%COMP%]{-o-object-fit:contain;object-fit:contain;height:572px;position:inherit;margin-left:auto;margin-right:auto}.carousel-item[_ngcontent-%COMP%]{background-color:#fff}.bg-image[_ngcontent-%COMP%]{overflow:hidden;filter:blur(8px);-webkit-filter:blur(8px);height:120%;width:100%;background-position:50%;background-repeat:no-repeat;background-size:cover;position:absolute}.myCard[_ngcontent-%COMP%]{background-color:#fff;border-radius:15px;padding-top:15px}.myCard[_ngcontent-%COMP%]   .btn-reservar[_ngcontent-%COMP%]{background:linear-gradient(90deg,#00fd00,#00ffab);width:200px!important;height:50px;border-radius:15px;font-weight:700}#avaliacoes[_ngcontent-%COMP%]{background-color:#fff;border-top:1px solid #b1b1b1}"]}),a})(),resolve:{data:r}}];let y=(()=>{class a{}return a.\u0275mod=i.Ob({type:a}),a.\u0275inj=i.Nb({factory:function(t){return new(t||a)},imports:[[s.d.forChild(_)],s.d]}),a})();e.d(t,"SpacesModule",(function(){return M}));let M=(()=>{class a{}return a.\u0275mod=i.Ob({type:a}),a.\u0275inj=i.Nb({factory:function(t){return new(t||a)},imports:[[o.a,n.c,y]]}),a})()}}]);