function _classCallCheck(a,o){if(!(a instanceof o))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,o){for(var t=0;t<o.length;t++){var e=o[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(a,e.key,e)}}function _createClass(a,o,t){return o&&_defineProperties(a.prototype,o),t&&_defineProperties(a,t),a}(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{WI8p:function(a,o,t){"use strict";t.r(o);var e,i=t("PCNd"),n=t("ofXK"),s=t("tyNb"),c=t("fXoL"),r=t("9BeE"),d=t("1yaQ"),b=t("FKr1"),l=t("3Pt+"),p=t("kmnG"),f=t("qFsG"),g=t("iadO"),m=((e=function(){function a(){_classCallCheck(this,a)}return _createClass(a,[{key:"ngOnInit",value:function(){}},{key:"addEvent",value:function(a,o){console.log("".concat(a,": ").concat(o.value))}}]),a}()).\u0275fac=function(a){return new(a||e)},e.\u0275cmp=c.Kb({type:e,selectors:[["app-card-reservar"]],inputs:{dados:["data","dados"]},features:[c.Bb([{provide:b.f,useValue:"pt-br"},{provide:b.c,useClass:d.d,deps:[b.f,d.a]},{provide:b.e,useValue:d.b}])],decls:66,vars:11,consts:[[1,"row"],[1,"col","content"],[1,"d-flex","flex-column"],[2,"width","100%"],[2,"color","black","font-weight","500"],["matInput","","disabled","",2,"color","black","font-weight","500",3,"matDatepicker","min","dateInput","dateChange"],["matSuffix","",3,"for"],["disabled","false","format",""],["pickerEntrada",""],["matInput","","disabled","",2,"color","black","font-weight","500",3,"matDatepicker","max","min","dateInput","dateChange"],["pickerSaida",""],[1,"d-flex",2,"color","black","justify-content","space-between","font-weight","500"],[2,"text-align","right","padding-right","6px"],[2,"border-bottom","1px solid black","height","20px","margin-bottom","10px"],[1,"d-flex",2,"color","black","justify-content","space-between","font-weight","bold"],[1,"d-flex","align-items-center","justify-content-center",2,"padding","20px"],["type","submit",1,"btn","btn-reservar"],[1,"d-flex","align-items-center","justify-content-center"],["href","",2,"color","black","font-weight","500"],[1,"d-flex","align-items-center","justify-content-around","flex-wrap",2,"padding-top","20px","padding-right","auto","padding-left","auto"],[1,"d-flex","flex-column","align-items-center"],[1,"material-icons",2,"background","#00fd00","border-radius","25px","padding","10px"],[2,"font-size","12px","font-weight","bold"],[1,"d-flex","align-items-center","justify-content-center",2,"padding","40px 20px 10px 20px"]],template:function(a,o){if(1&a&&(c.Wb(0,"div",0),c.Wb(1,"div",1),c.Wb(2,"form"),c.Wb(3,"div",2),c.Wb(4,"div"),c.Wb(5,"mat-form-field",3),c.Wb(6,"mat-label",4),c.Lc(7,"Entrada"),c.Vb(),c.Wb(8,"input",5),c.ic("dateInput",(function(a){return o.addEvent("input",a)}))("dateChange",(function(a){return o.addEvent("change",a)})),c.Vb(),c.Rb(9,"mat-datepicker-toggle",6),c.Rb(10,"mat-datepicker",7,8),c.Vb(),c.Vb(),c.Wb(12,"div"),c.Wb(13,"mat-form-field",3),c.Wb(14,"mat-label",4),c.Lc(15,"Sa\xedda"),c.Vb(),c.Wb(16,"input",9),c.ic("dateInput",(function(a){return o.addEvent("input",a)}))("dateChange",(function(a){return o.addEvent("change",a)})),c.Vb(),c.Rb(17,"mat-datepicker-toggle",6),c.Rb(18,"mat-datepicker",7,10),c.Vb(),c.Vb(),c.Vb(),c.Wb(20,"div",11),c.Wb(21,"span"),c.Lc(22,"N\xba de pessoas"),c.Vb(),c.Wb(23,"span",12),c.Lc(24),c.Vb(),c.Vb(),c.Rb(25,"div",13),c.Wb(26,"div",11),c.Wb(27,"span"),c.Lc(28,"CUSTO/TEMPO"),c.Vb(),c.Wb(29,"span",12),c.Lc(30),c.Vb(),c.Vb(),c.Wb(31,"div",11),c.Wb(32,"span"),c.Lc(33,"TAXAS"),c.Vb(),c.Wb(34,"span",12),c.Lc(35),c.Vb(),c.Vb(),c.Wb(36,"div",14),c.Wb(37,"span"),c.Lc(38,"TOTAL"),c.Vb(),c.Wb(39,"span",12),c.Lc(40),c.Vb(),c.Vb(),c.Wb(41,"div",15),c.Wb(42,"button",16),c.Lc(43,"RESERVAR"),c.Vb(),c.Vb(),c.Wb(44,"div",17),c.Wb(45,"a",18),c.Lc(46,"Adicione mais itens \xe0 sua reserva."),c.Vb(),c.Vb(),c.Wb(47,"div",19),c.Wb(48,"div",20),c.Wb(49,"span",21),c.Lc(50,"share"),c.Vb(),c.Wb(51,"span",22),c.Lc(52,"Compartilhar"),c.Vb(),c.Vb(),c.Wb(53,"div",20),c.Wb(54,"span",21),c.Lc(55,"favorite"),c.Vb(),c.Wb(56,"span",22),c.Lc(57,"Salvar"),c.Vb(),c.Vb(),c.Wb(58,"div",20),c.Wb(59,"span",21),c.Lc(60,"location_on"),c.Vb(),c.Wb(61,"span",22),c.Lc(62,"Localiza\xe7\xe3o"),c.Vb(),c.Vb(),c.Vb(),c.Wb(63,"div",23),c.Wb(64,"a",18),c.Lc(65,"*POL\xcdTICA DE CANCELAMENTO."),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb()),2&a){var t=c.Ac(11),e=c.Ac(19);c.Cb(8),c.sc("matDatepicker",t)("min",o.dados.disponibilidade.min),c.Cb(1),c.sc("for",t),c.Cb(7),c.sc("matDatepicker",e)("max",o.dados.disponibilidade.max)("min",o.dados.disponibilidade.min),c.Cb(1),c.sc("for",e),c.Cb(7),c.Mc(o.dados.dadosEspaco.npessoas),c.Cb(6),c.Nc("R$ ",o.dados.valores.valor,""),c.Cb(5),c.Nc("R$ ",o.dados.valores.taxa,""),c.Cb(5),c.Nc("R$ ",o.dados.valores.total,"")}},directives:[l.w,l.p,l.q,p.c,p.f,f.b,g.b,g.d,p.g,g.a],styles:[".content[_ngcontent-%COMP%]{background-color:#fff;border-radius:15px;padding-top:15px}.content[_ngcontent-%COMP%]   .btn-reservar[_ngcontent-%COMP%]{background:linear-gradient(90deg,#00fd00,#00ffab);width:200px!important;height:50px;border-radius:15px;font-weight:700}"]}),e),u=t("ihCf"),v=t("bTqV"),x=t("tkCS");function h(a,o){if(1&a&&c.Rb(0,"li",67),2&a){var t=o.index;c.sc("ngClass",0==t?"active":""),c.Db("data-slide-to",t)}}function V(a,o){if(1&a&&(c.Wb(0,"div",68),c.Rb(1,"img",69),c.Wb(2,"div",70),c.Wb(3,"h5"),c.Lc(4),c.Vb(),c.Wb(5,"span"),c.Lc(6),c.Vb(),c.Vb(),c.Vb()),2&a){var t=o.$implicit;c.sc("ngClass",0==o.index?"carousel-item active":"carousel-item"),c.Cb(1),c.sc("src",t.url||"assets/imgs/logo/logo_preta-min.png",c.Ec),c.Cb(3),c.Mc(t.title),c.Cb(2),c.Mc(t.description)}}function W(a,o){if(1&a&&(c.Wb(0,"span",71),c.Lc(1),c.Vb()),2&a){var t=o.$implicit;c.Cb(1),c.Mc(t)}}function C(a,o){1&a&&(c.Wb(0,"div",30),c.Wb(1,"span",31),c.Lc(2,"wifi"),c.Vb(),c.Wb(3,"p",32),c.Lc(4,"Wi-Fi"),c.Vb(),c.Vb())}function w(a,o){if(1&a&&(c.Wb(0,"div",72),c.Wb(1,"span",73),c.Lc(2,"check"),c.Vb(),c.Wb(3,"span"),c.Lc(4),c.Vb(),c.Vb()),2&a){var t=o.$implicit;c.Cb(4),c.Nc(" ",t,"")}}function L(a,o){if(1&a&&(c.Wb(0,"div",72),c.Wb(1,"span",73),c.Lc(2,"check"),c.Vb(),c.Wb(3,"span"),c.Lc(4),c.Vb(),c.Vb()),2&a){var t=o.$implicit;c.Cb(4),c.Nc(" ",t,"")}}function k(a,o){if(1&a&&(c.Wb(0,"span"),c.Lc(1),c.Vb()),2&a){var t=o.$implicit;c.Cb(1),c.Nc(". ",t,"")}}function y(a,o){if(1&a&&(c.Wb(0,"span"),c.Lc(1),c.Vb()),2&a){var t=o.$implicit;c.Cb(1),c.Nc(". ",t,"")}}function O(a,o){if(1&a&&(c.Wb(0,"span",74),c.Lc(1),c.Vb()),2&a){var t=o.$implicit;c.Cb(1),c.Mc(t)}}function M(a,o){if(1&a&&(c.Wb(0,"span",85),c.Lc(1),c.Vb()),2&a){var t=o.$implicit;c.Cb(1),c.Mc(t)}}function P(a,o){if(1&a&&(c.Wb(0,"div",75),c.Wb(1,"div",76),c.Wb(2,"span",77),c.Lc(3,"account_circle"),c.Vb(),c.Wb(4,"span",78),c.Lc(5),c.Vb(),c.Vb(),c.Wb(6,"div",79),c.Jc(7,M,2,1,"span",80),c.Wb(8,"span",81),c.Lc(9),c.Vb(),c.Vb(),c.Wb(10,"div"),c.Wb(11,"span",82),c.Lc(12),c.Vb(),c.Vb(),c.Wb(13,"div",83),c.Wb(14,"span",84),c.Lc(15),c.Vb(),c.Vb(),c.Vb()),2&a){var t=o.$implicit,e=c.mc();c.Cb(5),c.Mc(t.autor),c.Cb(2),c.sc("ngForOf",e.countStars(t.nota)),c.Cb(2),c.Mc(t.titulo),c.Cb(3),c.Mc(t.data),c.Cb(3),c.Mc(t.comentario)}}function F(a,o){1&a&&c.Rb(0,"app-highlight-items",86),2&a&&c.sc("data",o.$implicit)}var R,_,z=[{path:"",component:(R=function(){function a(o){_classCallCheck(this,a),this.highlight=o,this.data={images:[{url:"https://i.picsum.photos/id/237/1000/500.jpg",title:"Titulo 1",description:"Descri\xe7\xe3o sobre a imagem"},{url:"https://i.picsum.photos/id/238/1000/500.jpg",title:"Titulo 2",description:"Descri\xe7\xe3o sobre a imagem"},{url:"https://i.picsum.photos/id/239/1000/500.jpg",title:"Titulo 3",description:"Descri\xe7\xe3o sobre a imagem"}],dadosCompra:{valores:{valor:"1000.00",taxa:"100.00",total:"1100.00"},dadosEspaco:{npessoas:2,localizacao:"Rua Central - Goi\xe2nia - Goi\xe1s",m2:100,vagas:2,mesas:2,wifi:!0,funcionamento:{domg:!1,seg:!0,terc:!0,qua:!0,qui:!0,sex:!0,sab:!1},condicoes:["Para loca\xe7\xf5es com prazo superior a 30 dias \xe9 necess\xe1rio a utiliza\xe7\xe3o de um contrato e contrata\xe7\xe3o de um seguro.","Poder\xe1 ser dividido em at\xe9 10x a 1\xaa loca\xe7\xe3o. Limitada a cada usuario.","Caso o prazo se estenda por mais de 30 dias, o locador poder\xe1 aprovar ou n\xe3o a solicita\xe7\xe3o."],adicionais:["Proibido animais","Proibido fumar","Limite de convidados","Proibido acesso de crian\xe7as","N\xe3o \xe9 permitdo o consumo de bebidas alco\xf3licas","Refei\xe7\xf5es somente na copa"]},descProprietario:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",itemsDisponiveis:["Internet Wi-Fi","Impressora A4 com Scanner","Servi\xe7os de copa (\xe1gua e caf\xe9)","Revistaria","Estacionamento","Ar condicionado"],avaliacao:{nota:4.5,comentarios:[{autor:"Paulo Jose",data:"28 de mar\xe7o de 2020",titulo:"Incrivel! Gostei muito!",nota:2.5,comentario:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using"},{autor:"Paulo Jose",data:"28 de mar\xe7o de 2020",titulo:"Incrivel! Gostei muito!",nota:3.5,comentario:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using"}]},disponibilidade:{min:"20200427",max:"20200527"}}}}return _createClass(a,[{key:"countStars",value:function(a){for(var o=[],t=0,e=0;e<Math.floor(a);e++)t++,o.push("start");for(a-t&&o.push("star_half");o.length<5;)o.push("star_outline");return o}},{key:"ngOnInit",value:function(){this.espacos_similares=window.innerWidth<=600?this.highlight.getSomeSpaces(1):window.innerWidth<=900?this.highlight.getSomeSpaces(2):window.innerWidth<=1224?this.highlight.getSomeSpaces(3):this.highlight.getSomeSpaces(4)}}]),a}(),R.\u0275fac=function(a){return new(a||R)(c.Qb(r.a))},R.\u0275cmp=c.Kb({type:R,selectors:[["app-spaces"]],decls:119,vars:25,consts:[["id","content",1,"container-fluid"],[1,"row"],[1,"col","d-flex","flex-row","align-items-center","justify-content-start"],[1,"d-flex","justify-content-center","flex-column"],[2,"font-size","25px","font-weight","bold"],[2,"font-weight","bold","font-size","12px"],[1,"d-flex","justify-content-around",2,"margin-left","50px"],[1,"material-icons",2,"font-size","50px","color","#09fe9d"],[2,"font-weight","bold","margin","auto","display","table","padding-left","5px"],[2,"height","40px"],[1,"col-lg-9"],[1,"col"],["id","spacesCarousel",1,"carousel","slide","myCarousel",2,"max-height","430px"],[1,"carousel-indicators"],["data-target","#spacesCarousel",3,"ngClass",4,"ngFor","ngForOf"],[1,"carousel-inner"],[3,"ngClass",4,"ngFor","ngForOf"],["href","#spacesCarousel","role","button","data-slide","prev",1,"carousel-control-prev"],["aria-hidden","true",1,"carousel-control-prev-icon"],[1,"sr-only"],["href","#spacesCarousel","role","button","data-slide","next",1,"carousel-control-next"],["aria-hidden","true",1,"carousel-control-next-icon"],[1,"row","endereco",2,"margin-bottom","15px"],[1,"col-xl-3","d-flex","align-items-center"],[2,"font-size","20px","padding","5px 10px 5px 10px","border-radius","7px","color","white","background-color","black"],["class","material-icons","style","color: black; width: 24px; height: 24px; margin-left: 5px;",4,"ngFor","ngForOf"],[1,"col-xl-4","d-flex","align-items-center"],[2,"color","black","font-size","20px","font-weight","500"],[1,"col-xl-1"],[1,"col-xl-4","d-flex","flex-row","align-items-center"],[1,"col-xl-3","d-flex","flex-column","align-items-center",2,"padding","0"],[1,"material-icons"],[2,"color","gray","font-size","11px"],["src","assets/svg/desk.svg","alt","",2,"width","24px"],["src","assets/svg/car.svg","alt","",2,"width","24px"],["class","col-xl-3 d-flex flex-column align-items-center","style","padding: 0",4,"ngIf"],[1,"col-lg-3"],[3,"data"],[1,"row",2,"padding-right","10%","margin-top","40px"],[1,"d-flex","flex-column"],[2,"font-weight","500","padding-bottom","10px"],[2,"font-weight","500","margin-top","30px","padding-bottom","10px"],["class","d-flex flex-row",4,"ngFor","ngForOf"],[2,"border-bottom","2px solid #b1b1b1","padding-top","30px"],[4,"ngFor","ngForOf"],[2,"font-weight","500","margin-top","30px","padding-bottom","10px","font-size","20px"],["appearance","outline"],[2,"font-size","15px"],["matInput","","cdkTextareaAutosize","","cdkAutosizeMinRows","5","cdkAutosizeMaxRows","5","maxlength","350"],["autosize","cdkTextareaAutosize"],["mat-flat-button","","color","primary"],["id","avaliacoes",1,"container-fluid"],[1,"row",2,"margin-top","40px"],[1,"col","d-flex","flex-row","align-items-center","justify-content-start","flex-wrap"],[1,"d-flex","justify-content-center"],[2,"font-size","31px"],["class","material-icons color-verde","style","font-size: 50px ;margin-left: 5px; width: 50px;",4,"ngFor","ngForOf"],[2,"margin","auto","display","table","font-size","35px","padding-left","5px","font-weight","bold"],[1,"row",2,"margin-top","20px","margin-right","20%"],["class","col","style","margin-bottom: 15px;",4,"ngFor","ngForOf"],[2,"height","45px"],[2,"padding-left","15px"],["href","",2,"font-weight","bold","font-size","20px","color","black"],[1,"row","back-verde-escuro",2,"padding-right","10%","padding-left","10%","padding-top","30px","padding-bottom","30px"],[2,"width","100%","color","black","font-size","20px","font-weight","bold","margin-bottom","20px"],[1,"d-flex","w-100","flex-row","back-verde-escuro","flex-wrap","justify-content-between"],["width","240px",3,"data",4,"ngFor","ngForOf"],["data-target","#spacesCarousel",3,"ngClass"],[3,"ngClass"],[1,"d-block","w-100",3,"src"],[1,"carousel-caption","d-none","d-md-block"],[1,"material-icons",2,"color","black","width","24px","height","24px","margin-left","5px"],[1,"d-flex","flex-row"],[1,"material-icons","color-verde"],[1,"material-icons","color-verde",2,"font-size","50px","margin-left","5px","width","50px"],[1,"col",2,"margin-bottom","15px"],[1,"d-flex","justify-content-start"],[1,"material-icons","color-verde-escuro",2,"font-size","50px"],[2,"font-weight","500","margin-top","auto","margin-bottom","auto","display","table","padding-left","10px","font-size","15px"],[1,"d-flex"],["class","material-icons color-verde","style","font-size: 20px ;margin-left: 5px; width: 20px; margin-top: auto; margin-bottom: auto;",4,"ngFor","ngForOf"],[2,"margin-top","auto","margin-bottom","auto","padding-left","5px"],[2,"margin-left","5px"],[1,"d-flex",2,"margin-top","15px"],[2,"padding-left","5px","text-align","justify"],[1,"material-icons","color-verde",2,"font-size","20px","margin-left","5px","width","20px","margin-top","auto","margin-bottom","auto"],["width","240px",3,"data"]],template:function(a,o){1&a&&(c.Wb(0,"div",0),c.Wb(1,"div",1),c.Wb(2,"div",2),c.Wb(3,"div",3),c.Wb(4,"span",4),c.Lc(5,"Escrit\xf3rio Central"),c.Vb(),c.Wb(6,"span",5),c.Lc(7,"SALA COMERCIAL"),c.Vb(),c.Vb(),c.Wb(8,"div",6),c.Wb(9,"span",7),c.Lc(10,"face"),c.Vb(),c.Wb(11,"span",8),c.Lc(12,"P\xe1gina do Locador"),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Rb(13,"div",9),c.Wb(14,"div",1),c.Wb(15,"div",10),c.Wb(16,"div",1),c.Wb(17,"div",11),c.Wb(18,"div",12),c.Wb(19,"ol",13),c.Jc(20,h,1,2,"li",14),c.Vb(),c.Wb(21,"div",15),c.Jc(22,V,7,4,"div",16),c.Vb(),c.Wb(23,"a",17),c.Rb(24,"span",18),c.Wb(25,"span",19),c.Lc(26,"Proximo"),c.Vb(),c.Vb(),c.Wb(27,"a",20),c.Rb(28,"span",21),c.Wb(29,"span",19),c.Lc(30,"Anterior"),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Wb(31,"div",22),c.Wb(32,"div",23),c.Wb(33,"span",24),c.Lc(34),c.nc(35,"number"),c.Vb(),c.Jc(36,W,2,1,"span",25),c.Vb(),c.Wb(37,"div",26),c.Wb(38,"span",27),c.Lc(39),c.Vb(),c.Vb(),c.Rb(40,"div",28),c.Wb(41,"div",29),c.Wb(42,"div",30),c.Wb(43,"span",31),c.Lc(44,"aspect_ratio"),c.Vb(),c.Wb(45,"p",32),c.Lc(46),c.Vb(),c.Vb(),c.Wb(47,"div",30),c.Rb(48,"img",33),c.Wb(49,"p",32),c.Lc(50),c.Vb(),c.Vb(),c.Wb(51,"div",30),c.Rb(52,"img",34),c.Wb(53,"p",32),c.Lc(54),c.Vb(),c.Vb(),c.Jc(55,C,5,0,"div",35),c.Vb(),c.Vb(),c.Vb(),c.Wb(56,"div",36),c.Rb(57,"app-card-reservar",37),c.Vb(),c.Vb(),c.Wb(58,"div",38),c.Wb(59,"div",11),c.Wb(60,"div",39),c.Wb(61,"span",40),c.Lc(62,"Descri\xe7\xe3o do propriet\xe1rio"),c.Vb(),c.Wb(63,"span"),c.Lc(64),c.Vb(),c.Vb(),c.Wb(65,"div",39),c.Wb(66,"span",41),c.Lc(67,"Dispon\xedvel"),c.Vb(),c.Jc(68,w,5,1,"div",42),c.Vb(),c.Wb(69,"div",39),c.Wb(70,"span",41),c.Lc(71,"Funcionamento"),c.Vb(),c.Jc(72,L,5,1,"div",42),c.Wb(73,"span"),c.Lc(74,". O prazo come\xe7a ap\xf3s a confirma\xe7\xe3o do pagamento"),c.Vb(),c.Vb(),c.Rb(75,"div",43),c.Wb(76,"div",39),c.Wb(77,"span",41),c.Lc(78,"Condi\xe7\xf5es"),c.Vb(),c.Jc(79,k,2,1,"span",44),c.Vb(),c.Rb(80,"div",43),c.Wb(81,"div",39),c.Wb(82,"span",41),c.Lc(83,"Informa\xe7\xf5es adicionais"),c.Vb(),c.Jc(84,y,2,1,"span",44),c.Vb(),c.Rb(85,"div",43),c.Wb(86,"div",39),c.Wb(87,"span",45),c.Lc(88,"Ainda tem alguma d\xfavida? Deixe sua pergunta ao locador"),c.Vb(),c.Wb(89,"mat-form-field",46),c.Wb(90,"mat-label",47),c.Lc(91,"Deixe sua d\xfavida aqui."),c.Vb(),c.Rb(92,"textarea",48,49),c.Vb(),c.Wb(94,"button",50),c.Lc(95,"ENVIAR"),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Wb(96,"div",51),c.Wb(97,"div",52),c.Wb(98,"div",53),c.Wb(99,"div",54),c.Wb(100,"span",55),c.Lc(101,"Avalia\xe7\xf5es"),c.Vb(),c.Vb(),c.Wb(102,"div",6),c.Jc(103,O,2,1,"span",56),c.Wb(104,"span",57),c.Lc(105),c.nc(106,"number"),c.Vb(),c.Vb(),c.Vb(),c.Vb(),c.Wb(107,"div",58),c.Jc(108,P,16,5,"div",59),c.Vb(),c.Rb(109,"div",60),c.Wb(110,"div",61),c.Wb(111,"a",62),c.Lc(112,"Veja mais avalia\xe7\xf5es >"),c.Vb(),c.Vb(),c.Rb(113,"div",60),c.Wb(114,"div",63),c.Wb(115,"span",64),c.Lc(116,"Espa\xe7os similares"),c.Vb(),c.Wb(117,"div",65),c.Jc(118,F,1,1,"app-highlight-items",66),c.Vb(),c.Vb(),c.Vb()),2&a&&(c.Cb(20),c.sc("ngForOf",o.data.images),c.Cb(2),c.sc("ngForOf",o.data.images),c.Cb(12),c.Mc(c.pc(35,19,o.data.dadosCompra.avaliacao.nota,"1.1")),c.Cb(2),c.sc("ngForOf",o.countStars(o.data.dadosCompra.avaliacao.nota)),c.Cb(3),c.Mc(o.data.dadosCompra.dadosEspaco.localizacao),c.Cb(7),c.Nc("",o.data.dadosCompra.dadosEspaco.m2," m2"),c.Cb(4),c.Nc("",o.data.dadosCompra.dadosEspaco.mesas," mesas"),c.Cb(4),c.Nc("",o.data.dadosCompra.dadosEspaco.vagas," vagas"),c.Cb(1),c.sc("ngIf",o.data.dadosCompra.dadosEspaco.wifi),c.Cb(2),c.sc("data",o.data.dadosCompra),c.Cb(7),c.Mc(o.data.dadosCompra.descProprietario),c.Cb(4),c.sc("ngForOf",o.data.dadosCompra.itemsDisponiveis),c.Cb(4),c.sc("ngForOf",o.data.dadosCompra.itemsDisponiveis),c.Cb(7),c.sc("ngForOf",o.data.dadosCompra.dadosEspaco.condicoes),c.Cb(5),c.sc("ngForOf",o.data.dadosCompra.dadosEspaco.adicionais),c.Cb(19),c.sc("ngForOf",o.countStars(o.data.dadosCompra.avaliacao.nota)),c.Cb(2),c.Mc(c.pc(106,22,o.data.dadosCompra.avaliacao.nota,"1.1")),c.Cb(3),c.sc("ngForOf",o.data.dadosCompra.avaliacao.comentarios),c.Cb(10),c.sc("ngForOf",o.espacos_similares))},directives:[n.l,n.m,m,p.c,p.f,f.b,u.b,v.a,n.k,x.a],pipes:[n.e],styles:[".color-preto[_ngcontent-%COMP%]{color:#000}.color-verde[_ngcontent-%COMP%]{color:#00fd00}.color-verde-escuro[_ngcontent-%COMP%]{color:#00ffab}.back-preto[_ngcontent-%COMP%]{background-color:#000}.back-verde[_ngcontent-%COMP%]{background-color:#00fd00}.back-verde-escuro[_ngcontent-%COMP%]{background-color:#00ffab}#content[_ngcontent-%COMP%]{padding-bottom:100px;padding-top:100px;background-color:#f4f4f4}#content[_ngcontent-%COMP%]   .myCarousel[_ngcontent-%COMP%]{border-radius:15px;overflow:hidden}#content[_ngcontent-%COMP%]   .endereco[_ngcontent-%COMP%]{background-color:#fff;margin-top:15px;margin-left:0;margin-right:0;padding:15px;border-radius:15px}#avaliacoes[_ngcontent-%COMP%]{background-color:#fff;border-top:1px solid #b1b1b1}"]}),R)}],E=((_=function a(){_classCallCheck(this,a)}).\u0275mod=c.Ob({type:_}),_.\u0275inj=c.Nb({factory:function(a){return new(a||_)},imports:[[s.c.forChild(z)],s.c]}),_);t.d(o,"SpacesModule",(function(){return A}));var I,A=((I=function a(){_classCallCheck(this,a)}).\u0275mod=c.Ob({type:I}),I.\u0275inj=c.Nb({factory:function(a){return new(a||I)},imports:[[i.a,n.c,E]]}),I)}}]);