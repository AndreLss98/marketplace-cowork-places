import { CURRENCY_PATTERN } from './../../../../../shared/constants/constants';
import { Router } from '@angular/router';
import { UserService } from './../../../../../shared/service/user.service';
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
  titulo = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
  tipo = new FormControl('', [Validators.required]); // id
  descricao = new FormControl('', [Validators.required, Validators.maxLength(500), Validators.minLength(2)]);
  cep = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{8}$/), Validators.minLength(8), Validators.maxLength(8)]);
  pais = new FormControl('Brasil', [Validators.required]); // usar o do ibge
  rua = new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
  bairro = new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
  numero = new FormControl(null, [Validators.maxLength(20)]);
  cidade = new FormControl('', [Validators.required]);
  estado = new FormControl('', [Validators.required]);
  complemento = new FormControl({value: '', disabled: true}, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]);
  proprietario = new FormControl('', [Validators.required]);
  escritura = new FormControl('', [Validators.required]);
  contrato_locacao = new FormControl('');
  documento_proprietario = new FormControl('');

  // Caracteristicas do espaço
  public caracteristicas_espaco: FormGroup;
  area = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  numero_pessoas = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  quantidade_mesas = new FormControl('', [Validators.required]);
  vagas = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  internet = new FormControl('', [Validators.required]);
  horario_funcionamento = new FormControl('', [Validators.required, Validators.maxLength(100)])
  caracteristicas = [];
  info =  new FormArray([]);

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
    private snackBar: MatSnackBar,
    private viacep: ViacepService,
    private alugavel: AlugavelService,
    private caracService: CaracteristicasService,
    private imageCompress: NgxImageCompressService,
    private router: Router
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

  public getFormattedPrice(campo) {
    let v = this[campo].value;
    v=v.replace(/[&\/\\#,+()$~%'":*?<>{} A-Za-z]/g,"");
    this[campo].setValue(v);
  }

  public carregarCaracteristicas(){
    this.caracService.getAll().subscribe(response => {
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

  public validarCep(){
    this.viacep.validaCep(this.cep.value).subscribe( response => {
      if(response['erro'] == true){
        this.cep.setErrors({'notfound': true})
        return;
      }
      this.cep_validado = true;
      this.rua.setValue(response['logradouro']);
      this.bairro.setValue(response['bairro']);
      this.complemento.enable();

      this.ibge.getMunicipioPorId(response['ibge']).subscribe( data => {
        this.estado.setValue(data['microrregiao']['mesorregiao']['UF'].id);
        this.distritos = [{id: data['microrregiao'].id, nome: data['microrregiao'].nome}]
        this.cidade.setValue(data['microrregiao'].id);
        this.verificaCidade();
        this.estado.disable();
        this.cidade.disable();
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
    var allowedExtensions =  /(\.jpg|\.jpeg|\.png|\.pdf)$/;
   
    if (!allowedExtensions.exec(event.target.files.item(0).name)) { 
      this[field].value = '';
      // event.target.files = [];
      this.snackBar.open('Formato invalido!', 'Ok', {duration: 5000})
      return false; 
    }else{
      this.alugavel.saveDoc(event.target.files.item(0), field)
        .subscribe(response=>{
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

  public checkBoxChange(elemento){
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

  public removeFoto(index){
    this.imagens.splice(index, 1);
  }

  public changeOrder(currentPosition, newPosition){
    this.imagens.splice(newPosition, 0, this.imagens.splice(currentPosition, 1)[0]);
  }

  public calculaCustoDia(): number{
    let total = 0;
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
    console.log(step.selectedIndex);
    switch (step.selectedIndex) {
      case 0: 
        if(!this.termos.valid){
          this.snackBar.open("Para prosseguir aceite os termos", "Ok", {duration: 5000})
        }else{
          nextStep();
        }
        break;
      case 1:
        if(!this.escritura.valid) {
          this.snackBar.open("Insira todos os documentos necessarios", "OK", {duration: 5000});
          return;
        }
        if(this.dados_cadastrais.valid){
          this.carregarCaracteristicas();
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
          this.finalizarCadastro( nextStep() );
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
  
  public addInfo(){
    if(this.info_text.value == '' || this.info_text.value == undefined) return;
    if(this.info.length >= INFORMACOES_ADICIONAIS_LIMITE){
      this.snackBar.open('Limite alcançado!', 'Ok', {duration: 5000});
      return;
    }
    this.info.push(new FormControl(this.info_text.value));
    this.info_text.setValue('');
  }

  public removeInfo(index){
    this.info.removeAt(index);
  }

  public finalizarCadastro(callback){
    let alugavel_infos = [];
    this.info.controls.forEach(element => {
      alugavel_infos.push({descricao: element.value})
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
      callback();
    }, err => console.log("Deu erro: ", err));
  }

}
