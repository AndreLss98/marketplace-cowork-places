import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { desformatCEP, formatCEP } from 'src/app/shared/constants/functions';

import { MapsService } from 'src/app/shared/service/maps.service';
import { IbgeService } from 'src/app/shared/service/ibge.service';
import { ViacepService } from 'src/app/shared/service/viacep.service';
import { cep_regex } from '../../constants/regular_expressions';

@Component({
  selector: 'form-endereco',
  templateUrl: './form-endereco.component.html',
  styleUrls: ['./form-endereco.component.scss']
})
export class FormEnderecoComponent implements OnInit {

  readonly formatCEP = formatCEP;

  @Input()
  public showMap: boolean = true;

  @Input()
  public original_form: FormGroup;

  @Output('formChange')
  public formChange = new EventEmitter();
  
  public estados;
  public distritos: any = [
    { nome: "Goiânia" }
  ];
  public lngLatPlace;

  public _enderecoForm: FormGroup;

  get enderecoForm() {
    return this._enderecoForm;
  }

  set enderecoForm(form) {
    this._enderecoForm = form;
    this.formChange.emit(this._enderecoForm);
  }

  constructor(
    private snackBar: MatSnackBar,
    private mapService: MapsService,
    private ibgeService: IbgeService,
    private formBuilder: FormBuilder,
    private cepService: ViacepService
  ) {
    
  }
  
  ngOnInit(): void {
    this.enderecoForm = this.formBuilder.group({
      cep: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.required]],
      rua: ['', [Validators.minLength(1), Validators.maxLength(200), Validators.required]],
      numero: [null, []],
      bairro: ['', [Validators.required]],
      complemento: ['', [Validators.minLength(1), Validators.maxLength(250)]],
      estado: ['', [Validators.minLength(1), Validators.maxLength(200), Validators.required]],
      cidade: ['', [Validators.minLength(1), Validators.maxLength(200), Validators.required]],
      latitude: [null, []],
      longitude: [null, []]
    });

    setTimeout(() => {
      this.enderecoForm.valueChanges.subscribe(() => {
        if (this.original_form) this.original_form.updateValueAndValidity();
      });
    })

    
    // if (this.original_form) {
    //   this.original_form.valueChanges.subscribe(() => {
    //     this.validarCep();
    //   });
    // }

    this.ibgeService.getEstados().subscribe(response => {
      this.estados = response;
    });
  }

  public validarCep() {
    if (cep_regex.test(this.enderecoForm.controls['cep'].value)) {
      this.cepService.validaCep(desformatCEP(this.enderecoForm.controls['cep'].value))
      .subscribe(response => {
        this.lngLatPlace = null;
        this.enderecoForm.controls['estado'].enable();
        this.enderecoForm.controls['cidade'].enable();
  
        if(response['erro'] === true) {
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
          this.enderecoForm.controls['estado'].setValue(data['microrregiao']['mesorregiao']['UF'].nome);
          this.enderecoForm.controls['cidade'].setValue(data['microrregiao'].nome);
          this.distritos = [{id: data['microrregiao'].id, nome: data['microrregiao'].nome}]
        }, (error) => {
          this.snackBar.open(
            "Ocorreu algum problema, tente novamente mais tarde",
            "OK",
            { duration: 5000, verticalPosition: "bottom" });
          console.log(error);
        })
      }, (error) => {
        console.log(error);
      });
    }
  }

  public loadDistritoByEstado() {
    let uf_id = this.enderecoForm.controls['estado'].value;
    this.ibgeService.getCidadesPorEstado(uf_id).subscribe(response => {
      this.distritos = response;
    });
  }

  public onLocalChange(event) {
    this.enderecoForm.controls['latitude'].setValue(event.lat);
    this.enderecoForm.controls['longitude'].setValue(event.lng);
  }

  public formatField(field: string, form: FormGroup, formatFunction) {
    form.controls[field].setValue(formatFunction(form.controls[field].value));
  }
}
