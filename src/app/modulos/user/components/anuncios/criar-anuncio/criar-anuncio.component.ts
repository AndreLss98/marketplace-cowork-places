import { element } from 'protractor';
import { UserService } from './../../../../../shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';
import { Alugavel } from './../../../../../shared/interface/interface';
import { AlugavelService } from './../../../../../shared/service/alugavel.service';
import { CaracteristicasService } from 'src/app/shared/service/caracteristicas.service';
import { TiposService } from 'src/app/shared/service/tipos.service';
import { ViacepService } from './../../../../../shared/service/viacep.service';
import { IbgeService } from './../../../../../shared/service/ibge.service';
import { environment } from './../../../../../../environments/environment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm, FormArray } from '@angular/forms';
import { ErrorStateMatcher, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { INFORMACOES_ADICIONAIS_LIMITE } from 'src/app/shared/constants/constants';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import { NgxImageCompressService } from 'ngx-image-compress';

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

  // Custom erro matcher
  matcher = new MyErrorStateMatcher();

  // stepper
  @ViewChild('stepper') stepper: MatStepper;

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
  public info_text = new FormControl('');

  // Valor maximo da taxa
  public max_taxa;

  // Dados cadastrais
  public dados_cadastrais: FormGroup;
  titulo = new FormControl('', [Validators.required]);
  tipo = new FormControl('', [Validators.required]); // id
  descricao = new FormControl('', [Validators.required]);
  cep = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{8}$/), Validators.minLength(8), Validators.maxLength(8)]);
  pais = new FormControl('Brasil', [Validators.required]); // usar o do ibge
  rua = new FormControl('', [Validators.required]);
  bairro = new FormControl('', [Validators.required]);
  numero = new FormControl(null);
  cidade = new FormControl('', [Validators.required]);
  estado = new FormControl('', [Validators.required]);
  complemento = new FormControl('', [Validators.required]);
  proprietario = new FormControl('', [Validators.required]);
  escritura = new FormControl('', [Validators.required]);
  contrato_locacao = new FormControl('');
  documento_proprietario = new FormControl('');

  // Caracteristicas do espaço
  public caracteristicas_espaco: FormGroup;
  area = new FormControl('', [Validators.required]);
  numero_pessoas = new FormControl('', [Validators.required]);
  quantidade_mesas = new FormControl('', [Validators.required]);
  vagas = new FormControl('', [Validators.required]);
  internet = new FormControl('', [Validators.required]);
  horario_funcionamento = new FormControl('', [Validators.required])
  caracteristicas = [];
  info =  new FormArray([]);

  // Preço e taxa
  public valores: FormGroup;
  taxa = new FormControl(7, [Validators.required]);
  custo_dia = new FormControl('', [Validators.required]);
  
  // imagens
  public imagens = [];

  // Documentos
  private documentos = [];

  constructor(
    private form: FormBuilder,
    private ibge: IbgeService,
    private user: UserService,
    private tipos: TiposService,
    private snackBar: MatSnackBar,
    private viacep: ViacepService,
    private alugavel: AlugavelService,
    private caracService: CaracteristicasService,
    private imageCompress: NgxImageCompressService
  ) {

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
      documento_proprietario: this.documento_proprietario
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
    this.ibge.getEstados().subscribe( response => {
      this.estados = response;
    });

    this.tipos.getAll().subscribe( response => {
      this.categorias = response;
    });

    this.alugavel.getTaxa().subscribe(response => {
      this.max_taxa = response.taxa;
    })
  }

  carregarCaracteristicas(){
    this.caracService.getAll().subscribe(response => {
      console.log(response);
      response.forEach(element => {
        console.log(element);
        if(element.id > 6){
          element.value = false;
          this.caracteristicas.push(element);
        }
      });
    //   this.caracteristicas = buffer;
    });
  }

  loadDistritoByEstado(){
    let uf_id = this.estado.value;
    this.ibge.getCidadesPorEstado(uf_id).subscribe( response => {
      this.distritos = response;
    })
  }

  validarCep(){
    this.viacep.validaCep(this.cep.value).subscribe( response => {
      if(response['erro'] == true){
        this.cep.setErrors({'notfound': true})
        return;
      }
      this.rua.setValue(response['logradouro']);
      this.bairro.setValue(response['bairro']);

      this.ibge.getMunicipioPorId(response['ibge']).subscribe( data => {
        console.log("Peguei", data);
        this.estado.setValue(data['microrregiao']['mesorregiao']['UF'].id);
        this.loadDistritoByEstado();
      })
    }, err => {
      console.log(err);
    })
  }

  formatarNumerio(campo){
    let v = this[campo].value;
    v=v.replace(/\D/g,"");
    this[campo].setValue(v);
  }

  carregarDocumento(event, field){
    var allowedExtensions =  /(\.jpg|\.jpeg|\.png|\.pdf)$/;
   
    if (!allowedExtensions.exec(event.target.files.item(0).name)) { 
      this[field].value = '';
      // event.target.files = [];
      this.snackBar.open('Formato invalido!', 'Ok', {duration: 5000})
      return false; 
    }else{
      this.alugavel.saveDoc(event.target.files.item(0), field)
        .subscribe(response=>{
          console.log(response);
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

  checkBoxChange(elemento){
    elemento.value = !elemento.value;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    if(type == 'entrada'){
      this.entrada = moment(event.value)
    }else if(type == 'saida'){
      this.saida = moment(event.value)
    }
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({image}) => {
      console.log(image);
      this.imageCompress.compressFile(image, 100, 50).then(
        result => {
          let image = {
            base64: result,
            id: ''
          }
          this.alugavel.saveImage(image.base64).subscribe(response => {
            image.id = response.img.id
            this.imagens.push(image);
          }, err => {
            this.snackBar.open('Ocorreu algum erro!', 'Ok', {duration: 5000})
          });
        }
      );
    });
  }

  removeFoto(index){
    this.imagens.splice(index, 1);
  }

  changeOrder(currentPosition, newPosition){
    this.imagens.splice(newPosition, 0, this.imagens.splice(currentPosition, 1)[0]);
  }

  calculaCustoDia(): number{
    let total = 0;
    if(this.taxa.value == 7){
      return Number(this.custo_dia.value);
    }else if(this.taxa.value == 3.5){
      return Number(this.custo_dia.value * (this.taxa.value/100 + 1))
    }else{
      return Number(this.custo_dia.value * 1.07)
    }
  }

  calculaTaxa(): number{
    return Number(this.custo_dia.value * (this.taxa.value/100))
  }

  calculaTotal(): number{
    return Number(this.calculaCustoDia() + this.calculaTaxa());
  }

  calculaTotalPeriodo():number{
    let b = this.entrada;
    let a = this.saida;
    if(a == undefined || b == undefined){ 
      return Number(30 * this.calculaTotal());
    }else{
      return Number(a.diff(b, 'days') * this.calculaTotal());
    }
  }


  nextStep(step: MatStepper){
    switch (step.selectedIndex) {
      case 1:
        if(this.dados_cadastrais.valid){
          this.carregarCaracteristicas();
          nextStep();
        }
        break;
      case 2:
        if(this.caracteristicas_espaco.valid){
          nextStep();
        }
        break;
      case 3:
        if(this.valores.valid){
          nextStep();
        }
        break;
      default:
        console.log(step);
        break;
    }

    function nextStep(){
      setTimeout(() => {
        step.next();
      }, 1);
    }
  }
  
  addInfo(){
    if(this.info.length >= INFORMACOES_ADICIONAIS_LIMITE){
      this.snackBar.open('Limite alcançado!', 'Ok', {duration: 5000});
      return;
    }
    this.info.push(new FormControl(this.info_text.value));
    this.info_text.setValue('');
  }

  removeInfo(index){
    this.info.removeAt(index);
  }

  finalizarCadastro(){
    let alugavel_infos = [];
    this.info.value.forEach(element => {
      alugavel_infos.push({descricao: element})
    });

    let alugavel_caracteristicas = [];
    alugavel_caracteristicas.push({caracteristica_id: 1, valor: this.area.value});
    alugavel_caracteristicas.push({caracteristica_id: 2, valor: this.internet.value});
    alugavel_caracteristicas.push({caracteristica_id: 3, valor: this.quantidade_mesas.value});
    alugavel_caracteristicas.push({caracteristica_id: 4, valor: this.vagas.value});
    alugavel_caracteristicas.push({caracteristica_id: 5, valor: this.horario_funcionamento.value});
    alugavel_caracteristicas.push({caracteristica_id: 6, valor: this.numero_pessoas.value});
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

    let alugavel_cidade = this.distritos.find(element => element.id = this.cidade.value).nome;
    let alugavel_estado = this.estados.find(element => element.id = this.estado.value).nome;

    let alugavel: Alugavel = {
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
        complemento: this.complemento.value
      },
      caracteristicas: alugavel_caracteristicas,
      infos: alugavel_infos,
      imagens: alugavel_imagens,
      documentos: alugavel_doc
    }

    console.log(alugavel);

    this.alugavel.createAlugavel(alugavel).subscribe(response => {
      alert("Deu bom")
      console.log("Cadastro criado: ", response);
    }, err => console.log("Deu erro: ", err));
  }

}
