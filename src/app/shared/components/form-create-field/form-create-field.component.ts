import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { TIPOS_CAMPOS } from 'src/app/shared/constants/constants';

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

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit() {
    this.fieldForm.controls['tipo_campo'].valueChanges.subscribe(() => {
      this.editMode = false;
      if (this.fieldForm.controls['tipo_campo'].value) this.configForm();
    });
    setTimeout(() => {
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

  get propriedadesForm() {
    return this.original_form.controls['propriedades'];
  }

  set propriedadesForm(form) {
    this.original_form.controls['propriedades'] =  form;
  }

  @Input()
  get possibilidades() {
    return this._possibilidades;
  }

  set possibilidades(possibilidades) {
    this._possibilidades = possibilidades;
    this.possibilidadesChange.emit(this.possibilidades);
  }

  private configForm() {
    let group = {};
    let fields = [];
    this.propriedadesFields = [];

    Object.keys(TIPOS_CAMPOS[this.fieldForm.controls['tipo_campo'].value].campos).forEach(field => {
      let tempField = TIPOS_CAMPOS[this.fieldForm.controls['tipo_campo'].value].campos[field];
      tempField.name = field;
      if (!this.editMode) {
        group[field] = tempField.required ? new FormControl(tempField.type === 'boolean'? false : null, [Validators.required]) : new FormControl(tempField.type === 'boolean'? false : null);
      }
      fields.push(tempField);
    });

    if (!this.editMode) this.propriedadesForm = new FormGroup(group);
    this.propriedadesForm.valueChanges.subscribe(() => {
      this.original_form.updateValueAndValidity();
    });

    this.propriedadesFields = fields;
  }

  public adicionarPossibilidade(valor) {
    this.possibilidades.unshift({ valor });
  }

  public removePossibilidade(index) {
    this.possibilidades.splice(index, 1);
  }
}
