function _classCallCheck(a,o){if(!(a instanceof o))throw new TypeError("Cannot call a class as a function")}function _defineProperties(a,o){for(var t=0;t<o.length;t++){var e=o[t];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(a,e.key,e)}}function _createClass(a,o,t){return o&&_defineProperties(a.prototype,o),t&&_defineProperties(a,t),a}(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{WI8p:function(a,o,t){"use strict";t.r(o);var e,i=t("PCNd"),n=t("ofXK"),s=t("tyNb"),r=t("fXoL"),c=t("9BeE"),d=t("1yaQ"),b=t("FKr1"),l=t("3Pt+"),p=t("kmnG"),f=t("qFsG"),g=t("iadO"),m=((e=function(){function a(){_classCallCheck(this,a)}return _createClass(a,[{key:"ngOnInit",value:function(){}},{key:"addEvent",value:function(a,o){console.log("".concat(a,": ").concat(o.value))}}]),a}()).\u0275fac=function(a){return new(a||e)},e.\u0275cmp=r.Kb({type:e,selectors:[["app-card-reservar"]],inputs:{dados:["data","dados"]},features:[r.Bb([{provide:b.f,useValue:"pt-br"},{provide:b.c,useClass:d.d,deps:[b.f,d.a]},{provide:b.e,useValue:d.b}])],decls:66,vars:11,consts:[[1,"row"],[1,"col","content"],[1,"d-flex","flex-column"],[2,"width","100%"],[2,"color","black","font-weight","500"],["matInput","","disabled","",2,"color","black","font-weight","500",3,"matDatepicker","min","dateInput","dateChange"],["matSuffix","",3,"for"],["disabled","false","format",""],["pickerEntrada",""],["matInput","","disabled","",2,"color","black","font-weight","500",3,"matDatepicker","max","min","dateInput","dateChange"],["pickerSaida",""],[1,"d-flex",2,"color","black","justify-content","space-between","font-weight","500"],[2,"text-align","right","padding-right","6px"],[2,"border-bottom","1px solid black","height","20px","margin-bottom","10px"],[1,"d-flex",2,"color","black","justify-content","space-between","font-weight","bold"],[1,"d-flex","align-items-center","justify-content-center",2,"padding","20px"],["type","submit",1,"btn","btn-reservar"],[1,"d-flex","align-items-center","justify-content-center"],["href","",2,"color","black","font-weight","500"],[1,"d-flex","align-items-center","justify-content-around","flex-wrap",2,"padding-top","20px","padding-right","auto","padding-left","auto"],[1,"d-flex","flex-column","align-items-center"],[1,"material-icons",2,"background","#00fd00","border-radius","25px","padding","10px"],[2,"font-size","12px","font-weight","bold"],[1,"d-flex","align-items-center","justify-content-center",2,"padding","40px 20px 10px 20px"]],template:function(a,o){if(1&a&&(r.Wb(0,"div",0),r.Wb(1,"div",1),r.Wb(2,"form"),r.Wb(3,"div",2),r.Wb(4,"div"),r.Wb(5,"mat-form-field",3),r.Wb(6,"mat-label",4),r.Lc(7,"Entrada"),r.Vb(),r.Wb(8,"input",5),r.ic("dateInput",(function(a){return o.addEvent("input",a)}))("dateChange",(function(a){return o.addEvent("change",a)})),r.Vb(),r.Rb(9,"mat-datepicker-toggle",6),r.Rb(10,"mat-datepicker",7,8),r.Vb(),r.Vb(),r.Wb(12,"div"),r.Wb(13,"mat-form-field",3),r.Wb(14,"mat-label",4),r.Lc(15,"Sa\xedda"),r.Vb(),r.Wb(16,"input",9),r.ic("dateInput",(function(a){return o.addEvent("input",a)}))("dateChange",(function(a){return o.addEvent("change",a)})),r.Vb(),r.Rb(17,"mat-datepicker-toggle",6),r.Rb(18,"mat-datepicker",7,10),r.Vb(),r.Vb(),r.Vb(),r.Wb(20,"div",11),r.Wb(21,"span"),r.Lc(22,"N\xba de pessoas"),r.Vb(),r.Wb(23,"span",12),r.Lc(24),r.Vb(),r.Vb(),r.Rb(25,"div",13),r.Wb(26,"div",11),r.Wb(27,"span"),r.Lc(28,"CUSTO/TEMPO"),r.Vb(),r.Wb(29,"span",12),r.Lc(30),r.Vb(),r.Vb(),r.Wb(31,"div",11),r.Wb(32,"span"),r.Lc(33,"TAXAS"),r.Vb(),r.Wb(34,"span",12),r.Lc(35),r.Vb(),r.Vb(),r.Wb(36,"div",14),r.Wb(37,"span"),r.Lc(38,"TOTAL"),r.Vb(),r.Wb(39,"span",12),r.Lc(40),r.Vb(),r.Vb(),r.Wb(41,"div",15),r.Wb(42,"button",16),r.Lc(43,"RESERVAR"),r.Vb(),r.Vb(),r.Wb(44,"div",17),r.Wb(45,"a",18),r.Lc(46,"Adicione mais itens \xe0 sua reserva."),r.Vb(),r.Vb(),r.Wb(47,"div",19),r.Wb(48,"div",20),r.Wb(49,"span",21),r.Lc(50,"share"),r.Vb(),r.Wb(51,"span",22),r.Lc(52,"Compartilhar"),r.Vb(),r.Vb(),r.Wb(53,"div",20),r.Wb(54,"span",21),r.Lc(55,"favorite"),r.Vb(),r.Wb(56,"span",22),r.Lc(57,"Salvar"),r.Vb(),r.Vb(),r.Wb(58,"div",20),r.Wb(59,"span",21),r.Lc(60,"location_on"),r.Vb(),r.Wb(61,"span",22),r.Lc(62,"Localiza\xe7\xe3o"),r.Vb(),r.Vb(),r.Vb(),r.Wb(63,"div",23),r.Wb(64,"a",18),r.Lc(65,"*POL\xcdTICA DE CANCELAMENTO."),r.Vb(),r.Vb(),r.Vb(),r.Vb(),r.Vb()),2&a){var t=r.Ac(11),e=r.Ac(19);r.Cb(8),r.sc("matDatepicker",t)("min",o.dados.disponibilidade.min),r.Cb(1),r.sc("for",t),r.Cb(7),r.sc("matDatepicker",e)("max",o.dados.disponibilidade.max)("min",o.dados.disponibilidade.min),r.Cb(1),r.sc("for",e),r.Cb(7),r.Mc(o.dados.dadosEspaco.npessoas),r.Cb(6),r.Nc("R$ ",o.dados.valores.valor,""),r.Cb(5),r.Nc("R$ ",o.dados.valores.taxa,""),r.Cb(5),r.Nc("R$ ",o.dados.valores.total,"")}},directives:[l.w,l.p,l.q,p.c,p.f,f.b,g.b,g.d,p.g,g.a],styles:[".content[_ngcontent-%COMP%]{background-color:#fff;border-radius:15px;padding-top:15px}.content[_ngcontent-%COMP%]   .btn-reservar[_ngcontent-%COMP%]{background:linear-gradient(90deg,#00fd00,#00ffab);width:200px!important;height:50px;border-radius:15px;font-weight:700}"]}),e),u=t("ihCf"),v=t("bTqV"),x=t("tkCS");function h(a,o){if(1&a&&r.Rb(0,"li",67),2&a){var t=o.index;r.sc("ngClass",0==t?"active":""),r.Db("data-slide-to",t)}}function V(a,o){if(1&a&&(r.Wb(0,"div",68),r.Rb(1,"img",69),r.Vb()),2&a){var t=o.$implicit;r.sc("ngClass",0==o.index?"carousel-item active":"carousel-item"),r.Cb(1),r.sc("src",t.url||"assets/imgs/logo/logo_preta-min.png",r.Ec)}}function W(a,o){if(1&a&&(r.Wb(0,"span",70),r.Lc(1),r.Vb()),2&a){var t=o.$implicit;r.Cb(1),r.Mc(t)}}function C(a,o){1&a&&(r.Wb(0,"div",30),r.Wb(1,"span",31),r.Lc(2,"wifi"),r.Vb(),r.Wb(3,"p",32),r.Lc(4,"Wi-Fi"),r.Vb(),r.Vb())}function w(a,o){if(1&a&&(r.Wb(0,"div",71),r.Wb(1,"span",72),r.Lc(2,"check"),r.Vb(),r.Wb(3,"span"),r.Lc(4),r.Vb(),r.Vb()),2&a){var t=o.$implicit;r.Cb(4),r.Nc(" ",t,"")}}function L(a,o){if(1&a&&(r.Wb(0,"div",71),r.Wb(1,"span",72),r.Lc(2,"check"),r.Vb(),r.Wb(3,"span"),r.Lc(4),r.Vb(),r.Vb()),2&a){var t=o.$implicit;r.Cb(4),r.Nc(" ",t,"")}}function k(a,o){if(1&a&&(r.Wb(0,"span"),r.Lc(1),r.Vb()),2&a){var t=o.$implicit;r.Cb(1),r.Nc(". ",t,"")}}function y(a,o){if(1&a&&(r.Wb(0,"span"),r.Lc(1),r.Vb()),2&a){var t=o.$implicit;r.Cb(1),r.Nc(". ",t,"")}}function O(a,o){if(1&a&&(r.Wb(0,"span",73),r.Lc(1),r.Vb()),2&a){var t=o.$implicit;r.Cb(1),r.Mc(t)}}function M(a,o){if(1&a&&(r.Wb(0,"span",84),r.Lc(1),r.Vb()),2&a){var t=o.$implicit;r.Cb(1),r.Mc(t)}}function P(a,o){if(1&a&&(r.Wb(0,"div",74),r.Wb(1,"div",75),r.Wb(2,"span",76),r.Lc(3,"account_circle"),r.Vb(),r.Wb(4,"span",77),r.Lc(5),r.Vb(),r.Vb(),r.Wb(6,"div",78),r.Jc(7,M,2,1,"span",79),r.Wb(8,"span",80),r.Lc(9),r.Vb(),r.Vb(),r.Wb(10,"div"),r.Wb(11,"span",81),r.Lc(12),r.Vb(),r.Vb(),r.Wb(13,"div",82),r.Wb(14,"span",83),r.Lc(15),r.Vb(),r.Vb(),r.Vb()),2&a){var t=o.$implicit,e=r.mc();r.Cb(5),r.Mc(t.autor),r.Cb(2),r.sc("ngForOf",e.countStars(t.nota)),r.Cb(2),r.Mc(t.titulo),r.Cb(3),r.Mc(t.data),r.Cb(3),r.Mc(t.comentario)}}function F(a,o){1&a&&r.Rb(0,"app-highlight-items",85),2&a&&r.sc("data",o.$implicit)}var R,_,z=[{path:"",component:(R=function(){function a(o){_classCallCheck(this,a),this.highlight=o,this.data={images:[{url:"https://i.picsum.photos/id/237/1000/500.jpg",title:"Titulo 1",description:"Descri\xe7\xe3o sobre a imagem"},{url:"https://i.picsum.photos/id/238/1000/500.jpg",title:"Titulo 2",description:"Descri\xe7\xe3o sobre a imagem"},{url:"https://i.picsum.photos/id/239/1000/500.jpg",title:"Titulo 3",description:"Descri\xe7\xe3o sobre a imagem"}],dadosCompra:{valores:{valor:"1000.00",taxa:"100.00",total:"1100.00"},dadosEspaco:{npessoas:2,localizacao:"Rua Central - Goi\xe2nia - Goi\xe1s",m2:100,vagas:2,mesas:2,wifi:!0,funcionamento:{domg:!1,seg:!0,terc:!0,qua:!0,qui:!0,sex:!0,sab:!1},condicoes:["Para loca\xe7\xf5es com prazo superior a 30 dias \xe9 necess\xe1rio a utiliza\xe7\xe3o de um contrato e contrata\xe7\xe3o de um seguro.","Poder\xe1 ser dividido em at\xe9 10x a 1\xaa loca\xe7\xe3o. Limitada a cada usuario.","Caso o prazo se estenda por mais de 30 dias, o locador poder\xe1 aprovar ou n\xe3o a solicita\xe7\xe3o."],adicionais:["Proibido animais","Proibido fumar","Limite de convidados","Proibido acesso de crian\xe7as","N\xe3o \xe9 permitdo o consumo de bebidas alco\xf3licas","Refei\xe7\xf5es somente na copa"]},descProprietario:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",itemsDisponiveis:["Internet Wi-Fi","Impressora A4 com Scanner","Servi\xe7os de copa (\xe1gua e caf\xe9)","Revistaria","Estacionamento","Ar condicionado"],avaliacao:{nota:4.5,comentarios:[{autor:"Paulo Jose",data:"28 de mar\xe7o de 2020",titulo:"Incrivel! Gostei muito!",nota:2.5,comentario:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using"},{autor:"Paulo Jose",data:"28 de mar\xe7o de 2020",titulo:"Incrivel! Gostei muito!",nota:3.5,comentario:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using"}]},disponibilidade:{min:"20200427",max:"20200527"}}}}return _createClass(a,[{key:"countStars",value:function(a){for(var o=[],t=0,e=0;e<Math.floor(a);e++)t++,o.push("start");for(a-t&&o.push("star_half");o.length<5;)o.push("star_outline");return o}},{key:"ngOnInit",value:function(){this.espacos_similares=window.innerWidth<=600?this.highlight.getSomeSpaces(1):window.innerWidth<=900?this.highlight.getSomeSpaces(2):window.innerWidth<=1224?this.highlight.getSomeSpaces(3):this.highlight.getSomeSpaces(4)}}]),a}(),R.\u0275fac=function(a){return new(a||R)(r.Qb(c.a))},R.\u0275cmp=r.Kb({type:R,selectors:[["app-spaces"]],decls:119,vars:25,consts:[["id","content",1,"container-fluid"],[1,"row"],[1,"col","d-flex","flex-row","align-items-center","justify-content-start"],[1,"d-flex","justify-content-center","flex-column"],[2,"font-size","25px","font-weight","bold"],[2,"font-weight","bold","font-size","12px"],[1,"d-flex","justify-content-around",2,"margin-left","50px"],[1,"material-icons",2,"font-size","50px","color","#09fe9d"],[2,"font-weight","bold","margin","auto","display","table","padding-left","5px"],[2,"height","40px"],[1,"col-lg-9"],[1,"col"],["id","spacesCarousel",1,"carousel","slide","myCarousel",2,"max-height","430px"],[1,"carousel-indicators"],["data-target","#spacesCarousel",3,"ngClass",4,"ngFor","ngForOf"],[1,"carousel-inner"],[3,"ngClass",4,"ngFor","ngForOf"],["href","#spacesCarousel","role","button","data-slide","prev",1,"carousel-control-prev"],["aria-hidden","true",1,"carousel-control-prev-icon"],[1,"sr-only"],["href","#spacesCarousel","role","button","data-slide","next",1,"carousel-control-next"],["aria-hidden","true",1,"carousel-control-next-icon"],[1,"row","endereco",2,"margin-bottom","15px"],[1,"col-xl-3","d-flex","align-items-center"],[2,"font-size","20px","padding","5px 10px 5px 10px","border-radius","7px","color","white","background-color","black"],["class","material-icons","style","color: black; width: 24px; height: 24px; margin-left: 5px;",4,"ngFor","ngForOf"],[1,"col-xl-4","d-flex","align-items-center"],[2,"color","black","font-size","20px","font-weight","500"],[1,"col-xl-1"],[1,"col-xl-4","d-flex","flex-row","align-items-center"],[1,"col-xl-3","d-flex","flex-column","align-items-center",2,"padding","0"],[1,"material-icons"],[2,"color","gray","font-size","11px"],["src","assets/svg/desk.svg","alt","",2,"width","24px"],["src","assets/svg/car.svg","alt","",2,"width","24px"],["class","col-xl-3 d-flex flex-column align-items-center","style","padding: 0",4,"ngIf"],[1,"col-lg-3"],[3,"data"],[1,"row",2,"padding-right","10%","margin-top","40px"],[1,"d-flex","flex-column"],[2,"font-weight","500","padding-bottom","10px"],[2,"font-weight","500","margin-top","30px","padding-bottom","10px"],["class","d-flex flex-row",4,"ngFor","ngForOf"],[2,"border-bottom","2px solid #b1b1b1","padding-top","30px"],[4,"ngFor","ngForOf"],[2,"font-weight","500","margin-top","30px","padding-bottom","10px","font-size","20px"],["appearance","outline"],[2,"font-size","15px"],["matInput","","cdkTextareaAutosize","","cdkAutosizeMinRows","5","cdkAutosizeMaxRows","5","maxlength","350"],["autosize","cdkTextareaAutosize"],["mat-flat-button","","color","primary"],["id","avaliacoes",1,"container-fluid"],[1,"row",2,"margin-top","40px"],[1,"col","d-flex","flex-row","align-items-center","justify-content-start","flex-wrap"],[1,"d-flex","justify-content-center"],[2,"font-size","31px"],["class","material-icons color-verde","style","font-size: 50px ;margin-left: 5px; width: 50px;",4,"ngFor","ngForOf"],[2,"margin","auto","display","table","font-size","35px","padding-left","5px","font-weight","bold"],[1,"row",2,"margin-top","20px","margin-right","20%"],["class","col","style","margin-bottom: 15px;",4,"ngFor","ngForOf"],[2,"height","45px"],[2,"padding-left","15px"],["href","",2,"font-weight","bold","font-size","20px","color","black"],[1,"row","back-verde-escuro",2,"padding-right","10%","padding-left","10%","padding-top","30px","padding-bottom","30px"],[2,"width","100%","color","black","font-size","20px","font-weight","bold","margin-bottom","20px"],[1,"d-flex","w-100","flex-row","back-verde-escuro","flex-wrap","justify-content-between"],["width","240px",3,"data",4,"ngFor","ngForOf"],["data-target","#spacesCarousel",3,"ngClass"],[3,"ngClass"],[1,"d-block","w-100",3,"src"],[1,"material-icons",2,"color","black","width","24px","height","24px","margin-left","5px"],[1,"d-flex","flex-row"],[1,"material-icons","color-verde"],[1,"material-icons","color-verde",2,"font-size","50px","margin-left","5px","width","50px"],[1,"col",2,"margin-bottom","15px"],[1,"d-flex","justify-content-start"],[1,"material-icons","color-verde-escuro",2,"font-size","50px"],[2,"font-weight","500","margin-top","auto","margin-bottom","auto","display","table","padding-left","10px","font-size","15px"],[1,"d-flex"],["class","material-icons color-verde","style","font-size: 20px ;margin-left: 5px; width: 20px; margin-top: auto; margin-bottom: auto;",4,"ngFor","ngForOf"],[2,"margin-top","auto","margin-bottom","auto","padding-left","5px"],[2,"margin-left","5px"],[1,"d-flex",2,"margin-top","15px"],[2,"padding-left","5px","text-align","justify"],[1,"material-icons","color-verde",2,"font-size","20px","margin-left","5px","width","20px","margin-top","auto","margin-bottom","auto"],["width","240px",3,"data"]],template:function(a,o){1&a&&(r.Wb(0,"div",0),r.Wb(1,"div",1),r.Wb(2,"div",2),r.Wb(3,"div",3),r.Wb(4,"span",4),r.Lc(5,"Escrit\xf3rio Central"),r.Vb(),r.Wb(6,"span",5),r.Lc(7,"SALA COMERCIAL"),r.Vb(),r.Vb(),r.Wb(8,"div",6),r.Wb(9,"span",7),r.Lc(10,"face"),r.Vb(),r.Wb(11,"span",8),r.Lc(12,"P\xe1gina do Locador"),r.Vb(),r.Vb(),r.Vb(),r.Vb(),r.Rb(13,"div",9),r.Wb(14,"div",1),r.Wb(15,"div",10),r.Wb(16,"div",1),r.Wb(17,"div",11),r.Wb(18,"div",12),r.Wb(19,"ol",13),r.Jc(20,h,1,2,"li",14),r.Vb(),r.Wb(21,"div",15),r.Jc(22,V,2,2,"div",16),r.Vb(),r.Wb(23,"a",17),r.Rb(24,"span",18),r.Wb(25,"span",19),r.Lc(26,"Proximo"),r.Vb(),r.Vb(),r.Wb(27,"a",20),r.Rb(28,"span",21),r.Wb(29,"span",19),r.Lc(30,"Anterior"),r.Vb(),r.Vb(),r.Vb(),r.Vb(),r.Vb(),r.Wb(31,"div",22),r.Wb(32,"div",23),r.Wb(33,"span",24),r.Lc(34),r.nc(35,"number"),r.Vb(),r.Jc(36,W,2,1,"span",25),r.Vb(),r.Wb(37,"div",26),r.Wb(38,"span",27),r.Lc(39),r.Vb(),r.Vb(),r.Rb(40,"div",28),r.Wb(41,"div",29),r.Wb(42,"div",30),r.Wb(43,"span",31),r.Lc(44,"aspect_ratio"),r.Vb(),r.Wb(45,"p",32),r.Lc(46),r.Vb(),r.Vb(),r.Wb(47,"div",30),r.Rb(48,"img",33),r.Wb(49,"p",32),r.Lc(50),r.Vb(),r.Vb(),r.Wb(51,"div",30),r.Rb(52,"img",34),r.Wb(53,"p",32),r.Lc(54),r.Vb(),r.Vb(),r.Jc(55,C,5,0,"div",35),r.Vb(),r.Vb(),r.Vb(),r.Wb(56,"div",36),r.Rb(57,"app-card-reservar",37),r.Vb(),r.Vb(),r.Wb(58,"div",38),r.Wb(59,"div",11),r.Wb(60,"div",39),r.Wb(61,"span",40),r.Lc(62,"Descri\xe7\xe3o do propriet\xe1rio"),r.Vb(),r.Wb(63,"span"),r.Lc(64),r.Vb(),r.Vb(),r.Wb(65,"div",39),r.Wb(66,"span",41),r.Lc(67,"Dispon\xedvel"),r.Vb(),r.Jc(68,w,5,1,"div",42),r.Vb(),r.Wb(69,"div",39),r.Wb(70,"span",41),r.Lc(71,"Funcionamento"),r.Vb(),r.Jc(72,L,5,1,"div",42),r.Wb(73,"span"),r.Lc(74,". O prazo come\xe7a ap\xf3s a confirma\xe7\xe3o do pagamento"),r.Vb(),r.Vb(),r.Rb(75,"div",43),r.Wb(76,"div",39),r.Wb(77,"span",41),r.Lc(78,"Condi\xe7\xf5es"),r.Vb(),r.Jc(79,k,2,1,"span",44),r.Vb(),r.Rb(80,"div",43),r.Wb(81,"div",39),r.Wb(82,"span",41),r.Lc(83,"Informa\xe7\xf5es adicionais"),r.Vb(),r.Jc(84,y,2,1,"span",44),r.Vb(),r.Rb(85,"div",43),r.Wb(86,"div",39),r.Wb(87,"span",45),r.Lc(88,"Ainda tem alguma d\xfavida? Deixe sua pergunta ao locador"),r.Vb(),r.Wb(89,"mat-form-field",46),r.Wb(90,"mat-label",47),r.Lc(91,"Deixe sua d\xfavida aqui."),r.Vb(),r.Rb(92,"textarea",48,49),r.Vb(),r.Wb(94,"button",50),r.Lc(95,"ENVIAR"),r.Vb(),r.Vb(),r.Vb(),r.Vb(),r.Vb(),r.Wb(96,"div",51),r.Wb(97,"div",52),r.Wb(98,"div",53),r.Wb(99,"div",54),r.Wb(100,"span",55),r.Lc(101,"Avalia\xe7\xf5es"),r.Vb(),r.Vb(),r.Wb(102,"div",6),r.Jc(103,O,2,1,"span",56),r.Wb(104,"span",57),r.Lc(105),r.nc(106,"number"),r.Vb(),r.Vb(),r.Vb(),r.Vb(),r.Wb(107,"div",58),r.Jc(108,P,16,5,"div",59),r.Vb(),r.Rb(109,"div",60),r.Wb(110,"div",61),r.Wb(111,"a",62),r.Lc(112,"Veja mais avalia\xe7\xf5es >"),r.Vb(),r.Vb(),r.Rb(113,"div",60),r.Wb(114,"div",63),r.Wb(115,"span",64),r.Lc(116,"Espa\xe7os similares"),r.Vb(),r.Wb(117,"div",65),r.Jc(118,F,1,1,"app-highlight-items",66),r.Vb(),r.Vb(),r.Vb()),2&a&&(r.Cb(20),r.sc("ngForOf",o.data.images),r.Cb(2),r.sc("ngForOf",o.data.images),r.Cb(12),r.Mc(r.pc(35,19,o.data.dadosCompra.avaliacao.nota,"1.1")),r.Cb(2),r.sc("ngForOf",o.countStars(o.data.dadosCompra.avaliacao.nota)),r.Cb(3),r.Mc(o.data.dadosCompra.dadosEspaco.localizacao),r.Cb(7),r.Nc("",o.data.dadosCompra.dadosEspaco.m2," m2"),r.Cb(4),r.Nc("",o.data.dadosCompra.dadosEspaco.mesas," mesas"),r.Cb(4),r.Nc("",o.data.dadosCompra.dadosEspaco.vagas," vagas"),r.Cb(1),r.sc("ngIf",o.data.dadosCompra.dadosEspaco.wifi),r.Cb(2),r.sc("data",o.data.dadosCompra),r.Cb(7),r.Mc(o.data.dadosCompra.descProprietario),r.Cb(4),r.sc("ngForOf",o.data.dadosCompra.itemsDisponiveis),r.Cb(4),r.sc("ngForOf",o.data.dadosCompra.itemsDisponiveis),r.Cb(7),r.sc("ngForOf",o.data.dadosCompra.dadosEspaco.condicoes),r.Cb(5),r.sc("ngForOf",o.data.dadosCompra.dadosEspaco.adicionais),r.Cb(19),r.sc("ngForOf",o.countStars(o.data.dadosCompra.avaliacao.nota)),r.Cb(2),r.Mc(r.pc(106,22,o.data.dadosCompra.avaliacao.nota,"1.1")),r.Cb(3),r.sc("ngForOf",o.data.dadosCompra.avaliacao.comentarios),r.Cb(10),r.sc("ngForOf",o.espacos_similares))},directives:[n.l,n.m,m,p.c,p.f,f.b,u.b,v.a,n.k,x.a],pipes:[n.e],styles:[".color-preto[_ngcontent-%COMP%]{color:#000}.color-verde[_ngcontent-%COMP%]{color:#00fd00}.color-verde-escuro[_ngcontent-%COMP%]{color:#00ffab}.back-preto[_ngcontent-%COMP%]{background-color:#000}.back-verde[_ngcontent-%COMP%]{background-color:#00fd00}.back-verde-escuro[_ngcontent-%COMP%]{background-color:#00ffab}#content[_ngcontent-%COMP%]{padding-bottom:100px;padding-top:100px;background-color:#f4f4f4}#content[_ngcontent-%COMP%]   .myCarousel[_ngcontent-%COMP%]{border-radius:15px;overflow:hidden}#content[_ngcontent-%COMP%]   .endereco[_ngcontent-%COMP%]{background-color:#fff;margin-top:15px;margin-left:0;margin-right:0;padding:15px;border-radius:15px}#avaliacoes[_ngcontent-%COMP%]{background-color:#fff;border-top:1px solid #b1b1b1}"]}),R)}],E=((_=function a(){_classCallCheck(this,a)}).\u0275mod=r.Ob({type:_}),_.\u0275inj=r.Nb({factory:function(a){return new(a||_)},imports:[[s.d.forChild(z)],s.d]}),_);t.d(o,"SpacesModule",(function(){return A}));var I,A=((I=function a(){_classCallCheck(this,a)}).\u0275mod=r.Ob({type:I}),I.\u0275inj=r.Nb({factory:function(a){return new(a||I)},imports:[[i.a,n.c,E]]}),I)}}]);