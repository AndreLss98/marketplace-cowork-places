import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { environment } from 'src/environments/environment';

import { TiposService } from 'src/app/shared/service/tipos.service';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';

import { formatMoneyValue, desformatMoneyValue } from 'src/app/shared/constants/functions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViacepService } from 'src/app/shared/service/viacep.service';
import { MapsService } from 'src/app/shared/service/maps.service';
import { IbgeService } from 'src/app/shared/service/ibge.service';

@Component({
  selector: 'app-criar-anuncio',
  templateUrl: './anuncio-form.component.html',
  styleUrls: ['./anuncio-form.component.scss']
})
export class AnuncioFormComponent implements OnInit {

  readonly sendImgsUrl = `${environment.apiUrl}/alugaveis/imagem`;

  readonly formatMoneyValue = formatMoneyValue;
  readonly desformatMoneyValue = desformatMoneyValue;

  public tipos = [];
  public maxTax: number;
  public thumbsTaxs = [];

  public informacoesForm: FormGroup;
  public caracteristicasForm: FormGroup;
  public caracteristicas = [];
  public enderecoForm: FormGroup;
  public lngLatPlace;
  public estados;
  public distritos;
  public documentosForm: FormGroup;
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
      tipo: [null, [Validators.required]],
      descricao: ['', [Validators.minLength(1), Validators.maxLength(500), Validators.required]]
    });

    this.informacoesForm.controls['tipo'].valueChanges.subscribe(() => {
      this.tiposService.getAllCaracteristicasByTipo(this.informacoesForm.controls['tipo'].value).subscribe(response => {
        this.caracteristicas = response;
        console.log(response);
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
      proprietario: [null, [Validators.required]]
    });

    this.valoresForm = formBuilder.group({
      valor: ['', [Validators.required]],
      valor_mes: ['', []],
      taxa: [null, [Validators.required]]
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

  private configCaracteristicasForm() {
    let group = {};
    this.caracteristicas.forEach(caracteristica => {
      group[caracteristica.nome] = new FormControl(caracteristica.tipo_campo.propriedades.standard || '', [Validators.required]);
    });

    this.caracteristicasForm = new FormGroup(group);
  }

  public onLocalChange(event) {
    this.enderecoForm.controls['latitude'].setValue(event.lat);
    this.enderecoForm.controls['longitude'].setValue(event.lng);
  }

  public validarCep() {
    this.cepService.validaCep(this.enderecoForm.controls['cep'].value).subscribe( response => {
      this.lngLatPlace = null;
      this.enderecoForm.controls['estado'].enable();
        this.enderecoForm.controls['cidade'].enable();
      if(response['erro'] == true){
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
        console.log(data);
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
}
