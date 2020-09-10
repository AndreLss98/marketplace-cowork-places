import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { formatDate } from 'src/app/shared/constants/functions';
import { ALUGUEL_STATUS, FIRST_PAGE_SIZE } from 'src/app/shared/constants/constants';

import { AluguelService } from 'src/app/shared/service/aluguel.service';
import { FilterPageableTableComponent } from 'src/app/shared/components/filter-pageable-table/filter-pageable-table.component';

@Component({
selector: 'app-lista-contratos',
  templateUrl: './lista-contratos.component.html',
  styleUrls: ['./lista-contratos.component.scss']
})
export class ListaContratosComponent extends FilterPageableTableComponent {

  public status: any =  Object.values(ALUGUEL_STATUS);
  private tempFilters = { status: this.status[0].value };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private aluguelService: AluguelService,
  ) {
    super();
    
  }
  
  ngOnInit(): void {
    this.data = this.route.snapshot['data'].contratos.results;
    this.pager.length = this.route.snapshot['data'].contratos.total_itens;
    this.processDatas();
    this.configTable();
  }

  private configTable() {
    this.tableColumns = [
      { columnDef: "valor", columnHeaderName: "Valor", objectProperty: "valor" }
    ];
    this.displayedColumns = ["valor", "actions"];
    this.formFields = [
      {
        type: "select",
        nome_campo: "status",
        label: "Status cadastro",
        options: this.status,
        resetOption: false,
        valor_inicial: this.status[0].value
      }
    ]
    this.actions = { editar: false, excluir: false, visualizar: true };
  }

  private fetchAll(pager?) {
    this.aluguelService.getAllOfPlatform(
      pager? this.pager.pageIndex + 1 : 1,
      pager? this.pager.pageSize : FIRST_PAGE_SIZE,
      this.tempFilters)
    .subscribe(response => {
      this.data = response.results;
      this.pager.length = response.total_itens;
      this.processDatas();
    });
  }

  private processDatas() {
    this.data.forEach(contrato => {
      contrato.dias_reservados.data_saida = formatDate(new Date(contrato.dias_reservados.data_saida))
      contrato.dias_reservados.data_entrada =  formatDate(new Date(contrato.dias_reservados.data_entrada));
    });
  }

  public viewDetails({id}) {
    this.router.navigateByUrl(`user/contratos/${id}`);
  }

  public pagerEvent(event) {
    this.pager = event;
    this.fetchAll(event);
  }

  public onFilterChanges(event) {
    this.pager.pageIndex = 0;
    this.tempFilters = event;
    this.fetchAll(this.pager);
  }
}
