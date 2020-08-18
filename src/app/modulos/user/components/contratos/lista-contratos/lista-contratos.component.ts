import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ALUGUEL_STATUS } from 'src/app/shared/constants/constants';

@Component({
selector: 'app-lista-contratos',
  templateUrl: './lista-contratos.component.html',
  styleUrls: ['./lista-contratos.component.scss']
})
export class ListaContratosComponent implements OnInit {

  public contratos = [];
  public status: any =  Object.values(ALUGUEL_STATUS);
  public filters: FormGroup;
  public displayedColumns: ['entrada', 'saida', 'valor_total']

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.filters = formBuilder.group({
      status: ["", []]
    })
  }

  ngOnInit(): void {

  }

}
