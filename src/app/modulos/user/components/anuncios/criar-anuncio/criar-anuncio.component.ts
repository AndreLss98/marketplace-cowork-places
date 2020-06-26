import { AlugavelService } from './../../../../../shared/service/alugavel.service';
import { element } from 'protractor';
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
  numero = new FormControl('');
  cidade = new FormControl('', [Validators.required]);
  estado = new FormControl('', [Validators.required]);
  complemento = new FormControl('', [Validators.required]);
  proprietario = new FormControl(true, [Validators.required]);
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
  
  // Fotos
  public fotos = [];

  constructor(
    private form: FormBuilder,
    private ibge: IbgeService,
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

      this.ibge.getCidadePorId(response['ibge']).subscribe( data => {
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

  fileChange(event, field){
    var allowedExtensions =  /(\.jpg|\.jpeg|\.png|\.pdf)$/;
   
    if (!allowedExtensions.exec(event.target.files.item(0).name)) { 
      this[field].value = '';
      // event.target.files = [];
      this.snackBar.open('Formato invalido!', 'Ok', {duration: 5000})
      return false; 
    }else{
      // console.log(this.files); 
      // this.files.push(event.target.files.item(0))
    }       
  }

  checkBoxChange(elemento){
    elemento.value = !elemento.value;
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(moment(event.value));
    if(type == 'entrada'){
      this.entrada = moment(event.value)
    }else if(type == 'saida'){
      console.log('entrei');
      this.saida = moment(event.value)
    }
  }

  compressFile() {
    this.imageCompress.uploadFile().then(({image}) => {
      console.log(image)
      this.imageCompress.compressFile(image, 100, 50).then(
        result => {
          let image = {
            base64: result,
          }
          this.fotos.push(image);
        }
      );
    });
  }

  removeFoto(index){
    this.fotos.splice(index, 1);
  }

  changeOrder(currentPosition, newPosition){
    this.fotos.splice(newPosition, 0, this.fotos.splice(currentPosition, 1)[0]);
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
        if(this.dados_cadastrais.valid || !environment.production){
          this.carregarCaracteristicas();
          nextStep();
        }else{
          console.log(this.dados_cadastrais.valid, this.dados_cadastrais.controls);
        }
        break;
      case 2:
        if(this.caracteristicas_espaco.valid || !environment.production){
          nextStep();
        }
        break;
      case 3:
        if(this.valores.valid || !environment.production){
          nextStep();
        }
        break;
      default:
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

}
