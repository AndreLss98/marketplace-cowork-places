import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { formatDate } from 'src/app/shared/constants/functions';
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
  public pageSizes = [ 5, 10, 20 ];
  public total_itens = 0;
  public pager: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 5
  };

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private aluguelService: AluguelService,
    private router: Router
  ) {
    this.filters = formBuilder.group({
      status: [ALUGUEL_STATUS.CREATED.value, []]
    });

    this.filters.valueChanges.subscribe(() => {
      this.fetchContratos();
    });
  }

  ngOnInit(): void {
    this.contratos = this.route.snapshot['data'].contratos.results;
    this.pager.length = this.route.snapshot['data'].contratos.total_itens;
    this.processDatas();
  }

  private fetchContratos() {
    this.aluguelService.getAllOfPlatform(this.pager.pageIndex + 1, this.pager.pageSize, this.filters.value).subscribe(response => {
      this.contratos = response.results;
      this.pager.length = response.total_itens;
      this.processDatas();
    });
  }

  private processDatas() {
    this.contratos.forEach(contrato => {
      contrato.dias_reservados.data_saida = formatDate(new Date(contrato.dias_reservados.data_saida))
      contrato.dias_reservados.data_entrada =  formatDate(new Date(contrato.dias_reservados.data_entrada));
    });
  }

  public pageUpdate(event) {
    this.pager = event;
    this.fetchContratos();
  }

  public viewDetails(id) {
    this.router.navigateByUrl(`user/contratos/${id}`);
  }
}
