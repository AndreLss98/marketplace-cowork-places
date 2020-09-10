import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

import { PageableTableComponent } from '../pageable-table/pageable-table.component';

export interface FormField {
  type: 'text' | 'select';
  nome_campo: string;
  valor_inicial?: any;
  label: string;
  placeholder?: string;
  hint?: string;
  options?: { value: string, name: string }[];
  resetOption?: boolean;
}

@Component({
  selector: 'filter-pageable-table',
  templateUrl: './filter-pageable-table.component.html',
  styleUrls: ['./filter-pageable-table.component.scss']
})
export class FilterPageableTableComponent extends PageableTableComponent {

  @Output('filterChanges')
  public filterChanges = new EventEmitter();
  @Input('formFields')
  public formFields: FormField[] = [];
  
  public filters: FormGroup;
  private _form: any = {};

  constructor(private formBuilder: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    this.configForm();
  }

  public emitPageEvent(event) {
    this.pageEvent.emit(event);
  }

  private configForm() {
    this.formFields.forEach(field => {
      this._form[field.nome_campo] = new FormControl(field.valor_inicial || '');
    });

    this.filters = new FormGroup(this._form);
    this.filters.valueChanges.subscribe(() => {
      this.filterChanges.emit(this.filters.value);
    });
  }
}
