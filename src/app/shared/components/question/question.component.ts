import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

import { TIPOS_CAMPOS } from './../../constants/constants';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  readonly TIPOS_CAMPOS = TIPOS_CAMPOS;
  @Input() question: any;
  @Input() form: FormGroup;
  public propriedades;

  get isValid() { return this.form.controls[this.question.nome_campo].valid; }

  constructor() {
    
  }

  ngOnInit(): void {
    this.propriedades = this.question.campo.propriedades;
  }

}
