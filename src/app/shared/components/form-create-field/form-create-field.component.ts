import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { TIPOS_CAMPOS } from 'src/app/shared/constants/constants';

@Component({
  selector: 'form-create-field',
  templateUrl: './form-create-field.component.html',
  styleUrls: ['./form-create-field.component.scss']
})
export class FormCreateFieldComponent implements OnInit {

  readonly TIPOS_CAMPOS = TIPOS_CAMPOS;
  public tipos_campo = Object.keys(TIPOS_CAMPOS)

  public fieldForm: FormGroup;
  public propriedadeFields = [];
  public possibilidades = [];

  constructor(private formBuilder: FormBuilder) {
    this.fieldForm = formBuilder.group({
      tipo_campo: ['', [Validators.required]],
      propriedades: ['']
    });

    this.fieldForm.controls['tipo_campo'].valueChanges.subscribe(() => {
      this.configForm();
    });
  }

  ngOnInit(): void { };

  private configForm() {
    let group = {};
    let fields = [];
    this.propriedadeFields = [];

    Object.keys(TIPOS_CAMPOS[this.fieldForm.controls['tipo_campo'].value].campos).forEach(field => {
      let tempField = TIPOS_CAMPOS[this.fieldForm.controls['tipo_campo'].value].campos[field];
      tempField.name = field;
      group[field] = tempField.required ? new FormControl(null, [Validators.required]) : new FormControl(null);
      fields.push(tempField);
    });
    this.fieldForm.controls.propriedades = new FormGroup(group);
    this.propriedadeFields = fields;
  }

  public adicionarPossibilidade(valor) {
    this.possibilidades.unshift({ valor });
  }

  public removePossibilidade(index) {
    this.possibilidades.splice(index, 1);
  }
}
