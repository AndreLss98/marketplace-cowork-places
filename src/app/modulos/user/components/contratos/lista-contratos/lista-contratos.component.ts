import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

import { ALUGUEL_STATUS } from 'src/app/shared/constants/constants';
import { AluguelService } from 'src/app/shared/service/aluguel.service';

@Component({
selector: 'app-lista-contratos',
  templateUrl: './lista-contratos.component.html',
  styleUrls: ['./lista-contratos.component.scss']
})
export class ListaContratosComponent implements OnInit {

  public contratos = [];
  public status: any =  Object.values(ALUGUEL_STATUS);

  public filters: FormGroup;
  public displayedColumns = ['entrada', 'saida', 'valor_total', 'view'];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private aluguelService: AluguelService
  ) {
    this.filters = formBuilder.group({
      status: [ALUGUEL_STATUS.ACTIVE.value, []]
    });

    this.filters.valueChanges.subscribe(() => {
      this.fetchContratos();
    })
  }

  ngOnInit(): void {
    this.contratos = this.route.snapshot['data'].contratos;
    this.processDatas()
  }

  private formtDate(date: Date) {
    const day = date.getDate() + 1 < 10? `0${date.getDate() + 1}`: date.getDate() + 1;
    const month = date.getMonth() < 10? `0${date.getMonth()}`: date.getMonth();
    return `${day}/${month}/${date.getFullYear()}`;
  }

  private fetchContratos() {
    this.aluguelService.getAllOfPlatform().subscribe(response => {
      this.contratos = response;
      this.processDatas();
    });
  }

  private processDatas() {
    this.contratos.forEach(contrato => {
      contrato.dias_reservados.data_entrada =  this.formtDate(new Date(contrato.dias_reservados.data_entrada));
      contrato.dias_reservados.data_saida =  this.formtDate(new Date(contrato.dias_reservados.data_saida));
    });
  }
}
