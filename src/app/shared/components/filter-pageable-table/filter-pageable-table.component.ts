import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { PageableTableComponent } from '../pageable-table/pageable-table.component';

export interface FormField {
  nome_campo: string;
  valor_inicial?: any;
  label: string;
  placeholder?: string;
  hint?: string;
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
    // this.filters[]
  }

  ngOnInit(): void {
    this.filters = null;
    this.formFields.forEach(field => {
      this.filters[field.nome_campo] = new FormControl(field.valor_inicial || '');
    });
  }

  public emitPageEvent(event) {
    this.pageEvent.emit(event);
  }
}
