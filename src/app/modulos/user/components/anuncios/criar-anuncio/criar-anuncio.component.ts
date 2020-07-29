import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ErrorStateMatcher, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import { environment } from 'src/environments/environment';
import { CURRENCY_PATTERN, ENUM_ALUGAVEL_CARACTERISTICAS } from 'src/app/shared/constants/constants';
import { INFORMACOES_ADICIONAIS_LIMITE } from 'src/app/shared/constants/constants';

import { UserService } from 'src/app/shared/service/user.service';
import { IbgeService } from 'src/app/shared/service/ibge.service';
import { TiposService } from 'src/app/shared/service/tipos.service';
import { ViacepService } from 'src/app/shared/service/viacep.service';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';
import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';
import { CaracteristicasService } from 'src/app/shared/service/caracteristicas.service';
import { MapsService } from 'src/app/shared/service/maps.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-criar-anuncio',
  templateUrl: './criar-anuncio.component.html',
  styleUrls: ['./criar-anuncio.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-br'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class CriarAnuncioComponent implements OnInit {

  public lngLatPlace;

  public editMode = false;
  private espaco_id;

  // caminho imagem documento espaço
  public documentoEspacoImg = 'url("/assets/svg/documento_espaco_verde.svg")' 
  public documentoEspacoImgAmarelo = 'url("/assets/svg/documento_espaco_amarelo.svg")' 
  public cnhImg = 'url("/assets/svg/cnh_verde.svg")' 
  public cnhImgAmarelo = 'url("/assets/svg/cnh_amarelo.svg")' 

  // Permite a edição dos campos;
  public editavel = true;

  // Id do alugavel, caso em modo de edição;
  private idAlugavel;

  // Custom erro matcher
  matcher = new MyErrorStateMatcher();
  public valor;

  // stepper
  @ViewChild('stepper') stepper: MatStepper;

  // Flag de controle de campos de endereço,
  public cep_validado:boolean = false;

  // Entrada e saida para simular valor
  public entrada;
  public saida;

  // Tipos 
  public categorias;
  // Estados e distritos
  public estados;
  public distritos;
  // Politica de uso
  public politica_de_uso = environment.apiUrl + '/md/politica_de_uso.md';
  // Item para ser adicionado a lista de info
  public info_text = new FormControl('', [Validators.minLength(2), Validators.maxLength(50)]);

  // Valor maximo da taxa
  public max_taxa;

  // Termos
  public termos: FormGroup;
  termo1 = new FormControl('', [Validators.required]);
  termo2 = new FormControl('', [Validators.required]);

  // Dados cadastrais
  public dados_cadastrais: FormGroup;
  titulo = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]);
  tipo = new FormControl('', [Validators.required]); // id
  descricao = new FormControl('', [Validators.required, Validators.maxLength(500), Validators.minLength(2)]);
  cep = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{8}$/), Validators.minLength(8), Validators.maxLength(8)]);
  pais = new FormControl('Brasil', [Validators.required]); // usar o do ibge
  rua = new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
  bairro = new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
  numero = new FormControl(null, [Validators.maxLength(20)]);
  cidade = new FormControl('', [Validators.required]);
  estado = new FormControl('', [Validators.required]);
  complemento = new FormControl('', [Validators.maxLength(100)]);
  proprietario = new FormControl('', [Validators.required]);
  escritura = new FormControl('', []);
  contrato_locacao = new FormControl('');
  documento_proprietario = new FormControl('');
  latitude = new FormControl(null, [Validators.required]);
  longitude = new FormControl(null, [Validators.required]);

  // Caracteristicas do espaço
  public caracteristicas_espaco: FormGroup;
  area = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  numero_pessoas = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  quantidade_mesas = new FormControl('', [Validators.required]);
  vagas = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  internet = new FormControl('', [Validators.required]);
  horario_funcionamento = new FormControl('', [Validators.required, Validators.maxLength(100)])
  caracteristicas = [];
  info = [];

  // Preço e taxa
  public valores: FormGroup;
  taxa = new FormControl(0, [Validators.required]);
  custo_dia = new FormControl('', [Validators.required, Validators.pattern(CURRENCY_PATTERN)]);
  
  // imagens
  public imagens = [];

  // Documentos
  private documentos = [];

  constructor(
    private form: FormBuilder,
    private ibge: IbgeService,
    private user: UserService,
    private tipos: TiposService,
    private route: ActivatedRoute,
    private viacep: ViacepService,
    private snackBar: MatSnackBar,
    private mapService: MapsService,
    private alugaveis: AlugaveisService,
    private alugavelService: AlugavelService,
    private imageCompress: NgxImageCompressService,
    private caracteristicasService: CaracteristicasService,
  ) {

    this.termos = this.form.group({
      termo1: this.termo1,
      termo2: this.termo2
    })

    this.dados_cadastrais = this.form.group({
      titulo: this.titulo,
      tipo: this.tipo,
      descricao: this.descricao,
      cep: this.cep,
      pais: this.pais,
      rua: this.rua,
      bairro: this.bairro,
      numero: this.numero,
      cidade: this.cidade,
      estado: this.estado,
      complemento: this.complemento,
      proprietario: this.proprietario,
      escritura: this.escritura,
      contrato_locacao: this.contrato_locacao,
      documento_proprietario: this.documento_proprietario,
      latitude: this.latitude,
      longitude: this.longitude
    });

    this.caracteristicas_espaco = this.form.group({
      area: this.area,
      numero_pessoas: this.numero_pessoas,
      quantidade_mesas: this.quantidade_mesas,
      vagas: this.vagas,
      internet: this.internet,
      horario_funcionamento: this.horario_funcionamento,
      info_text: this.info_text
    });

    this.valores = this.form.group({
      taxa: this.taxa,
      custo_dia: this.custo_dia
    });
  }

  ngOnInit(): void {
    this.carregarCaracteristicas();

    this.route.queryParams.subscribe(response => {
      if(response.edit){
        this.editMode = response.edit;
        this.espaco_id = response.id;

        this.escritura.disable();
        this.loadData();
      }
    }).unsubscribe();
    

    this.ibge.getEstados().subscribe( response => {
      this.estados = response;
    });

    this.tipos.getAll().subscribe( response => {
      this.categorias = response;
    });

    this.alugavelService.getTaxa().subscribe(response => {
      this.max_taxa = response.taxa;
    })
  }

  public onLocalChange(event) {
    this.latitude.setValue(event.lat);
    this.longitude.setValue(event.lng);
  }

  public getFormattedPrice(campo) {
    let v = this[campo].value;
    v=v.replace(/[&\/\\#,+()$~%'":*?<>{} A-Za-z]/g,"");
    this[campo].setValue(v);
  }

  public carregarCaracteristicas(){
    this.caracteristicasService.getAll().subscribe(response => {
      response.forEach(element => {
        if(element.id > 6){
          element.value = false;
          this.caracteristicas.push(element);
        }
      });
    //   this.caracteristicas = buffer;
    });
  }

  public loadDistritoByEstado(){
    let uf_id = this.estado.value;
    this.ibge.getCidadesPorEstado(uf_id).subscribe( response => {
      this.distritos = response;
    });
  }

  public verificaCidade(){
    // 520870705 = GOIANIA
    if(this.cidade.value != 52010){
      this.cep.setErrors({nao_disponivel: true});
    }
  }

  public validarCep() {
    this.viacep.validaCep(this.cep.value).subscribe( response => {
      this.lngLatPlace = null;
      if(response['erro'] == true){
        this.cep.setErrors({'notfound': true})
        return;
      }
      this.cep_validado = true;
      this.rua.setValue(response['logradouro']);
      this.bairro.setValue(response['bairro']);
      this.complemento.enable();

      this.mapService.getLatitudeLongitude(this.cep.value).subscribe(response => {
        this.lngLatPlace = {
          latitude: response.results[0].geometry.location.lat,
          longitude: response.results[0].geometry.location.lng
        }
      });

      this.ibge.getMunicipioPorId(response['ibge']).subscribe( data => {
        this.estado.setValue(data['microrregiao']['mesorregiao']['UF'].id);
        this.distritos = [{id: data['microrregiao'].id, nome: data['microrregiao'].nome}]
        this.cidade.setValue(data['microrregiao'].id);
        this.verificaCidade();
        this.estado.disable();
        this.cidade.disable();
        // console.log(this.estados, data['microrregiao']['mesorregiao']['UF'].id);
      })
    }, err => {
      // console.log(err);
    })
  }

  public formatarNumerio(campo){
    let v = this[campo].value;
    v=v.replace(/\D/g,"");
    this[campo].setValue(v);
  }

  public carregarDocumento(event, field){
    console.log(event);
    var allowedExtensions =  /(\.jpg|\.jpeg|\.png|\.pdf)$/;
   
    if (!allowedExtensions.exec(event.target.files.item(0).name)) { 
      this[field].value = '';
      // event.target.files = [];
      this.snackBar.open('Formato invalido!', 'Ok', {duration: 5000})
      return false; 
    }else{
      this.alugavelService.saveDoc(event.target.files.item(0), field).subscribe(response=>{
        let doc = {
          nome: field,
          id: response.id
        }
        this.documentos.push(doc);
      })
      // console.log(this.files); 
      // this.files.push(event.target.files.item(0))
    }       
  }

  public checkBoxChange(elemento) {
    elemento.value = !elemento.value;
  }

  public addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if(type == 'entrada'){
      this.entrada = moment(event.value)
    }else if(type == 'saida'){
      this.saida = moment(event.value)
    }
  }

  public compressFile() {
    this.imageCompress.uploadFile().then(({image}) => {
      this.imageCompress.compressFile(image, 100, 50).then(
        result => {
          let image = {
            base64: result,
            id: ''
          }
          this.alugavelService.saveImage(image.base64).subscribe(response => {
            image.id = response.img.id
            this.imagens.push(image);
          }, err => {
            this.snackBar.open('Ocorreu algum erro!', 'Ok', {duration: 5000})
          });
        }
      );
    });
  }

  public removeFoto(index){
    if(this.editMode){
      this.alugavelService.removeImage(this.idAlugavel, this.imagens[index].id).subscribe(response => console.log(response));;
    }
    this.imagens.splice(index, 1);
  }

  public changeOrder(currentPosition, newPosition){
    this.imagens.splice(newPosition, 0, this.imagens.splice(currentPosition, 1)[0]);
  }

  public calculaCustoDia(): number{
    if(this.taxa.value == this.max_taxa){
      return Number(this.custo_dia.value);
    }else if(this.taxa.value == (this.max_taxa / 2)){
      return Number(this.custo_dia.value * (this.taxa.value/100 + 1))
    }else{
      return Number(this.custo_dia.value * (this.max_taxa/ 100 + 1))
    }
  }

  public calculaTaxa(): number{
    return Number(this.custo_dia.value * (this.taxa.value/100))
  }

  public calculaTotal(): number{
    return Number(this.calculaCustoDia() + this.calculaTaxa());
  }

  public calculaTotalPeriodo():number{
    let b = this.entrada;
    let a = this.saida;
    if(a == undefined || b == undefined){ 
      return Number(1 * this.calculaTotal());
    }else{
      return Number((a.diff(b, 'days')+1) * this.calculaTotal());
    }
  }

  public nextStep(step: MatStepper){
    switch (step.selectedIndex) {
      case 0:
        if(!this.termos.valid){
          this.snackBar.open("Para prosseguir aceite os termos", "Ok", {duration: 5000})
        }else{
          nextStep();
        }
        break;
      case 1:
        console.log(this.dados_cadastrais.controls);
        if(!this.escritura.valid && !this.editMode) {
          this.snackBar.open("Insira todos os documentos necessarios", "OK", {duration: 5000});
          return;
        }
        if(this.dados_cadastrais.valid){
          // this.carregarCaracteristicas();
          nextStep();
        }
        break;
      case 2:
        console.log(this.imagens);
        if(this.imagens.length == 0){
          this.snackBar.open("Adicione imagens ao seu espaço", "OK", {duration: 5000});
          return;
        }
        if(this.caracteristicas_espaco.valid){
          nextStep();
        }
        break;
      case 3:
        if(this.valores.valid){
          let alugavel = this.buildObjToSave();
          console.log('Alugavel: ', alugavel)
          if(this.editMode){
            this.alugavelService.saveAlugavel(alugavel, this.idAlugavel).subscribe(response => {
              nextStep();
            }, err => {
              this.snackBar.open("Ocorreu algum erro!", "OK", {duration: 5000});
              console.log(err);
            });
          }else{
            this.alugavelService.createAlugavel(alugavel).subscribe(response => {
              nextStep();
            }, err => {
              this.snackBar.open("Ocorreu algum erro!", "OK", {duration: 5000});
              console.log(err);
            });
          }
        }
        break;
      default:
        console.log(step);
    }

    function nextStep(){
      setTimeout(() => {
        step.next();
      }, 1);
    }
  }
  
  public addInfo(){
    if(this.info_text.value == '' || this.info_text.value == undefined) return;
    if(this.info.length >= INFORMACOES_ADICIONAIS_LIMITE){
      this.snackBar.open('Limite alcançado!', 'Ok', {duration: 5000});
      return;
    }
    this.info.push({descricao: this.info_text.value});
    this.info_text.setValue('');
  }

  public removeInfo(index){
    if(this.editMode){
      this.alugavelService.removeInfo(this.idAlugavel, this.info[index].id).subscribe(response => console.log(response));
    }
    this.info.splice(index, 1);
  }

  public buildObjToSave(): any{
    this.editavel = false;

    let alugavel_infos = [];
    this.info.forEach(element => {
      if(this.editMode) {
        alugavel_infos.push(
          {
            id: element.id,
            descricao: element.descricao
          })
      }else{
        alugavel_infos.push({descricao: element.descricao})
      }
    });

    let alugavel_caracteristicas = [];
    alugavel_caracteristicas.push({caracteristica_id: ENUM_ALUGAVEL_CARACTERISTICAS.AREA, valor: this.area.value});
    alugavel_caracteristicas.push({caracteristica_id: ENUM_ALUGAVEL_CARACTERISTICAS.INTERNET, valor: this.internet.value});
    alugavel_caracteristicas.push({caracteristica_id: ENUM_ALUGAVEL_CARACTERISTICAS.QUANTIDADE_MESAS, valor: this.quantidade_mesas.value});
    alugavel_caracteristicas.push({caracteristica_id: ENUM_ALUGAVEL_CARACTERISTICAS.QUANTIDADE_VAGAS, valor: this.vagas.value});
    alugavel_caracteristicas.push({caracteristica_id: ENUM_ALUGAVEL_CARACTERISTICAS.HORARIO_FUNCIONAMENTO, valor: this.horario_funcionamento.value});
    alugavel_caracteristicas.push({caracteristica_id: ENUM_ALUGAVEL_CARACTERISTICAS.QUANTIDADE_PESSOAS, valor: this.numero_pessoas.value});
    
    this.caracteristicas.forEach(element => {
      alugavel_caracteristicas.push({caracteristica_id: element.id, valor: element.value.toString()})
    });

    let alugavel_doc = [];
    this.documentos.forEach(element => {
      alugavel_doc.push(element.id);
    });
    
    let alugavel_imagens = [];
    this.imagens.forEach(element => {
      alugavel_imagens.push(element.id);
    });

    let alugavel_cidade = this.distritos.find(element => element.id == this.cidade.value).nome;
    let alugavel_estado = this.estados.find(element => element.id == this.estado.value).nome;

    let alugavel: any = {
      anunciante_id : this.user.user_data.id,
      tipo_id: this.tipo.value,
      taxa: this.taxa.value,
      descricao: this.descricao.value,
      valor: this.custo_dia.value,
      titulo: this.titulo.value,
      proprietario: this.proprietario.value,
      local: {
        cep: this.cep.value,
        pais: this.pais.value,
        rua: this.rua.value,
        cidade: alugavel_cidade,
        estado: alugavel_estado,
        bairro: this.bairro.value,
        numero: this.numero.value,
        complemento: this.complemento.value,
        latitude: this.latitude.value,
        longitude: this.longitude.value
      },
      caracteristicas: alugavel_caracteristicas,
      infos: alugavel_infos,
      imagens: alugavel_imagens,
      documentos: alugavel_doc
    }
    return alugavel;
  }

  private loadData(){
    this.alugaveis.getById(this.espaco_id).subscribe(response => {
      console.log("Load data: ", response);

      // Salva o id do alugavel;
      this.idAlugavel = response.id;
      // Carregar valor e taxa
      this.taxa.setValue(Number(response.taxa));
      this.custo_dia.setValue(Number(response.valor));
      
      // Carrega dados cadastrais
      this.cep.disable()
      this.numero.disable();
      this.complemento.disable();
      this.titulo.setValue(response.titulo);
      this.tipo.setValue(response.tipo.id);
      this.descricao.setValue(response.descricao);
      this.cep.setValue(response.local.cep);
      this.validarCep();
      this.rua.setValue(response.local.rua);
      this.complemento.setValue(response.local.complemento);
      this.numero.setValue(response.local.numero);
      this.bairro.setValue(response.local.bairro);
      this.proprietario.setValue(response.proprietario.toString());
      this.documento_proprietario.disable();

      response.documentos.forEach(element => {
        this.documentos.push({nome: element.nome, id: element.id});
      });
      
      response.imagens.forEach(element => {
        this.imagens.push({
          id: element.id,
          url: environment.apiUrl + '/imgs/' + element.url
        });
      });

      let caracteristicas = response.caracteristicas;
      this.area.setValue(this.getCaracteristica(caracteristicas, ENUM_ALUGAVEL_CARACTERISTICAS.AREA).valor);
      this.internet.setValue(this.getCaracteristica(caracteristicas, ENUM_ALUGAVEL_CARACTERISTICAS.INTERNET).valor);
      this.vagas.setValue(this.getCaracteristica(caracteristicas, ENUM_ALUGAVEL_CARACTERISTICAS.QUANTIDADE_VAGAS).valor);
      this.quantidade_mesas.setValue(this.getCaracteristica(caracteristicas, ENUM_ALUGAVEL_CARACTERISTICAS.QUANTIDADE_MESAS).valor);
      this.numero_pessoas.setValue(this.getCaracteristica(caracteristicas, ENUM_ALUGAVEL_CARACTERISTICAS.QUANTIDADE_PESSOAS).valor);
      this.horario_funcionamento.setValue(this.getCaracteristica(caracteristicas, ENUM_ALUGAVEL_CARACTERISTICAS.HORARIO_FUNCIONAMENTO).valor);

      this.caracteristicas.forEach( element => {
        caracteristicas.forEach(caracteristica => {
          if(element.id === caracteristica.id) element.value = (caracteristica.valor == "true");
        });
      });

      response.infos.forEach(element => {
        this.info.push({
          id: element.id,
          descricao: element.descricao
        });
      });
    });
  }

  private getCaracteristica(caracteristicas, id) {
    return caracteristicas.find(caracteristica => caracteristica.id === id);
  }

}
