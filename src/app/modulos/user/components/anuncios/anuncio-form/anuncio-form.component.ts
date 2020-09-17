import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { formatMoneyValue, desformatMoneyValue, formatCEP, desformatCEP } from 'src/app/shared/constants/functions';

import { IbgeService } from 'src/app/shared/service/ibge.service';
import { MapsService } from 'src/app/shared/service/maps.service';
import { TiposService } from 'src/app/shared/service/tipos.service';
import { ViacepService } from 'src/app/shared/service/viacep.service';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';


@Component({
  selector: 'app-criar-anuncio',
  templateUrl: './anuncio-form.component.html',
  styleUrls: ['./anuncio-form.component.scss']
})
export class AnuncioFormComponent implements OnInit {

  readonly sendImgsUrl = `${environment.apiUrl}/alugaveis/imagem`;
  readonly sendDocsUrl = `${environment.apiUrl}/alugaveis/documentos`;

  readonly formatMoneyValue = formatMoneyValue;
  readonly desformatMoneyValue = desformatMoneyValue;
  readonly formatCEP = formatCEP;

  public tipos = [];
  public maxTax: number;
  public thumbsTaxs = [];

  public informacoesForm: FormGroup;
  public imgsForm: FormGroup;
  public caracteristicasForm: FormGroup;
  public caracteristicas = [];
  public enderecoForm: FormGroup;
  public lngLatPlace;
  public estados;
  public distritos;
  public documentosForm: FormGroup;
  public documentos = [
    { proprietario: null, nome: "Escritura pública ou contrato de alienação", nome_campo: 'escritura' },
    { proprietario: false, nome: "Contrato de locação", nome_campo: 'contrato' },
    { proprietario: false, nome: "Documento com foto e CPF do proprietário", nome_campo: 'cpf_selfie' }
  ];
  public valoresForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private mapService: MapsService,
    private ibgeService: IbgeService,
    private formBuilder: FormBuilder,
    private cepService: ViacepService,
    private tiposService: TiposService,
    private alugavelService: AlugavelService,
  ) {
    this.informacoesForm = formBuilder.group({
      titulo: ['', [Validators.minLength(1), Validators.maxLength(40), Validators.required]],
      tipo_id: [null, [Validators.required]],
      descricao: ['', [Validators.minLength(1), Validators.maxLength(500), Validators.required]]
    });

    this.imgsForm = formBuilder.group({
      imgs: [null, [Validators.required]]
    });

    this.informacoesForm.controls['tipo_id'].valueChanges.subscribe(() => {
      this.tiposService.getAllCaracteristicasByTipo(this.informacoesForm.controls['tipo_id'].value).subscribe(response => {
        this.caracteristicas = response;
        this.configCaracteristicasForm();
      });
    });

    this.caracteristicasForm = formBuilder.group({});

    this.enderecoForm = formBuilder.group({
      cep: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.required]],
      rua: ['', [Validators.minLength(1), Validators.maxLength(200), Validators.required]],
      numero: [null, []],
      bairro: ['', [Validators.required]],
      complemento: ['', [Validators.minLength(1), Validators.maxLength(250)]],
      estado: ['', [Validators.minLength(1), Validators.maxLength(200), Validators.required]],
      cidade: ['', [Validators.minLength(1), Validators.maxLength(200), Validators.required]],
      latitude: [null, [Validators.required]],
      longitude: [null, [Validators.required]],
    });

    this.documentosForm = formBuilder.group({
      proprietario: [null, [Validators.required]],
      escritura: [null, []],
      contrato: [null, []],
      cpf_selfie: [null, []]
    });

    this.valoresForm = formBuilder.group({
      valor: ['', [Validators.required]],
      valor_mes: ['', []],
      taxa: [null, []]
    });
  }

  ngOnInit(): void {
    this.tipos = this.route.snapshot.data['tipos'];
    this.configTax();
    this.ibgeService.getEstados().subscribe( response => {
      this.estados = response;
    });
  }

  private configTax() {
    this.maxTax = this.route.snapshot.data['taxa'].taxa;
    this.thumbsTaxs = [0, this.maxTax/2, this.maxTax]
  }

  public formatField(field: string, form: FormGroup, formatFunction) {
    form.controls[field].setValue(formatFunction(form.controls[field].value));
  }

  public bindingFormField(field: string, form: FormGroup, data: any) {
    form.controls[field].setValue(data);
    return form.controls[field].value;
  }

  private configCaracteristicasForm() {
    let group = {};
    this.caracteristicas.forEach(caracteristica => {
      group[caracteristica.id] = new FormControl(caracteristica.tipo_campo.propriedades.standard || '', [ Validators.required ]);
    });

    this.caracteristicasForm = new FormGroup(group);
  }

  public onLocalChange(event) {
    this.enderecoForm.controls['latitude'].setValue(event.lat);
    this.enderecoForm.controls['longitude'].setValue(event.lng);
  }

  public validarCep() {
    this.cepService.validaCep(desformatCEP(this.enderecoForm.controls['cep'].value)).subscribe( response => {
      this.lngLatPlace = null;
      this.enderecoForm.controls['estado'].enable();
      this.enderecoForm.controls['cidade'].enable();

      if(response['erro'] === true){
        this.enderecoForm.controls['cep'].setErrors({'notfound': true})
        return;
      }

      this.enderecoForm.controls['rua'].setValue(response['logradouro']);
      this.enderecoForm.controls['bairro'].setValue(response['bairro']);
      this.enderecoForm.controls['complemento'].enable();

      this.mapService.getLatitudeLongitude(this.enderecoForm.controls['cep'].value).subscribe(response => {
        this.lngLatPlace = {
          latitude: response.results[0].geometry.location.lat,
          longitude: response.results[0].geometry.location.lng
        }
      }, (error) => {
        console.log(error);
      });

      this.ibgeService.getMunicipioPorId(response['ibge']).subscribe( data => {
        this.enderecoForm.controls['estado'].setValue(data['microrregiao']['mesorregiao']['UF'].id);
        this.enderecoForm.controls['cidade'].setValue(data['microrregiao'].id);
        this.enderecoForm.controls['estado'].disable();
        this.enderecoForm.controls['cidade'].disable();
        this.distritos = [{id: data['microrregiao'].id, nome: data['microrregiao'].nome}]
      }, err => {
        this.snackBar.open("Ocorreu alguem problema, tente novamente mais tarde", 'OK', {duration: 5000, verticalPosition: 'top'});
      })
    }, err => {
      // console.log(err);
    });
  }

  public loadDistritoByEstado(){
    let uf_id = this.enderecoForm.controls['estado'].value;
    this.ibgeService.getCidadesPorEstado(uf_id).subscribe(response => {
      this.distritos = response;
    });
  }

  public save() {
    console.log(this.informacoesForm);
    console.log(this.imgsForm);
    console.log(this.caracteristicasForm);
    console.log(this.documentosForm);
    console.log(this.enderecoForm);
    console.log(this.valoresForm);

    let anuncio = {
      ...this.informacoesForm.value,
      proprietario: this.documentosForm.controls['proprietario'].value,
      local: {
        ...this.enderecoForm.value
      },
      ...this.valoresForm.value,
      imagens: this.imgsForm.controls['imgs'].value.map(element => element.img.id),
      documentos: Object.keys(this.documentosForm.value).filter(key => key !== 'proprietario' && this.documentosForm.value[key]).map(key => this.documentosForm.value[key][0].id),
      caracteristicas: Object.keys(this.caracteristicasForm.value).map(caracteristica => {
        return { caracteristica_id: Number(caracteristica), valor: this.caracteristicasForm.value[caracteristica] }
      })
    };

    anuncio.valor = desformatMoneyValue(anuncio.valor);
    anuncio.valor_mes = desformatMoneyValue(anuncio.valor_mes);
  }
}
