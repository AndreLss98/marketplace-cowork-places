import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { PageableTableComponent } from '../pageable-table/pageable-table.component';

export interface FormField {
  type: 'text' | 'select';
  nome_campo: string;
  valor_inicial?: any;
  label: string;
  placeholder?: string;
  hint?: string;
  options?: { value: string }[]
}

@Component({
  selector: 'filter-pageable-table',
  templateUrl: './filter-pageable-table.component.html',
  styleUrls: ['./filter-pageable-table.component.scss']
})
export class FilterPageableTableComponent extends PageableTableComponent {

  @Input('formFields')
  public formFields: FormField[] = [];
  public filters: FormGroup;

  constructor() {
    super();
    this.formFields = [
      { type: "text", label: "Teste", nome_campo: "nome", hint: "Ajuda é o carai" },
      { type: "select", label: "Status", nome_campo: "status", options: [ { value: "Approved" }, { value: "Disapproved" } ] },
      { type: "select", label: "Status", nome_campo: "status", options: [ { value: "Approved" }, { value: "Disapproved" } ] },
      { type: "select", label: "Status", nome_campo: "status", options: [ { value: "Approved" }, { value: "Disapproved" } ] },
      { type: "text", label: "TesteII", nome_campo: "sobrenome", hint: "Ajuda é o carai" }
    ]
    // this.filters[]
  }

  ngOnInit(): void {
    this.filters = null;
    // this.formFields.forEach(field => {
    //   this.filters[field.nome_campo] = new FormControl(field.valor_inicial || '');
    // });
  }

  public emitPageEvent(event) {
    this.pageEvent.emit(event);
  }
}
