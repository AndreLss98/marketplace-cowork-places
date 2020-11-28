import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TIPOS_CAMPOS } from 'src/app/shared/constants/constants';
import { TipoCamposService } from 'src/app/shared/service/tipo-campos.service';

@Component({
  selector: 'form-create-field',
  templateUrl: './form-create-field.component.html',
  styleUrls: ['./form-create-field.component.scss']
})
export class FormCreateFieldComponent implements OnInit {

  readonly TIPOS_CAMPOS = TIPOS_CAMPOS;
  public tipos_campo = Object.keys(TIPOS_CAMPOS)

  @Output()
  public formChange = new EventEmitter();

  @Output()
  public possibilidadesChange = new EventEmitter();

  @Input()
  public editMode: boolean = false;
  public fieldForm: FormGroup;
  public propriedadesFields = [];

  private _possibilidades = [];

  constructor(
    private tipoCampoService: TipoCamposService
  ) {
    
  }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.fieldForm.controls['tipo_campo'].valueChanges.subscribe(() => {
      if (this.fieldForm.controls['tipo_campo'].value) this.configForm();
    });
    
    setTimeout(() => {
      if (this.editMode) this.fieldForm.controls['tipo_campo'].disable();
      if (this.fieldForm.controls['tipo_campo'].value) this.configForm();
    }, 100);
  }

  @Input('original-form')
  get original_form() {
    return this.fieldForm;
  }

  set original_form(form) {
    this.fieldForm = form;
    this.formChange.emit(this.original_form);
  }

  @Input('possibilidades')
  get possibilidades() {
    return this._possibilidades;
  }

  set possibilidades(possibilidade) {
    this._possibilidades = possibilidade;
    this.possibilidadesChange.emit(this._possibilidades);
  }

  get propriedadesForm() {
    return this.original_form.controls['propriedades'];
  }

  set propriedadesForm(form) {
    this.original_form.controls['propriedades'] =  form;
  }

  private configForm() {
    let group = {};
    let fields = [];
    this.propriedadesFields = [];

    Object.keys(TIPOS_CAMPOS[this.fieldForm.controls['tipo_campo'].value].campos).forEach(field => {
      let tempField = TIPOS_CAMPOS[this.fieldForm.controls['tipo_campo'].value].campos[field];
      tempField.name = field;
      if (this.editMode === false) {
        group[field] = tempField.required ? new FormControl(tempField.type === 'boolean'? false : null, [Validators.required]) : new FormControl(tempField.type === 'boolean'? false : null);
      }
      fields.push(tempField);
    });

    if (this.editMode === false) {
      this.propriedadesForm = new FormGroup(group);
    }

    this.propriedadesForm.valueChanges.subscribe(() => {
      this.original_form.markAsDirty();
      this.original_form.updateValueAndValidity();
    });

    this.propriedadesFields = fields;
  }

  public adicionarPossibilidade(valor) {
    this.possibilidades.unshift({ valor });
    this.original_form.markAsDirty();
  }

  public removePossibilidade(index) {
    const possibilidade = this.possibilidades[index];
    if (possibilidade.id) {
      this.tipoCampoService.deletePossibilidadeDeSelecao(possibilidade.id).subscribe(() => {
        this.possibilidades.splice(index, 1);
        this.original_form.markAsDirty();
      }, (error) => {
        console.log(error);
      });
    } else {
      this.possibilidades.splice(index, 1);
      this.original_form.markAsDirty();
    }
  }
}
