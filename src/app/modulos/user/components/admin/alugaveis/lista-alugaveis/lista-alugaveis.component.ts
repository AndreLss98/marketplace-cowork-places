import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { formatMoneyValue } from 'src/app/shared/constants/functions';
import { ALUGAVEL_STATUS, FIRST_PAGE_SIZE } from 'src/app/shared/constants/constants';

import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';
import { FilterPageableTableComponent } from 'src/app/shared/components/filter-pageable-table/filter-pageable-table.component';

@Component({
  selector: 'app-lista-alugaveis',
  templateUrl: './lista-alugaveis.component.html',
  styleUrls: ['./lista-alugaveis.component.scss']
})
export class ListaAlugaveisComponent extends FilterPageableTableComponent {

  public status: any =  Object.values(ALUGAVEL_STATUS).filter(status => status.value !== ALUGAVEL_STATUS.REMOVED.value);

  private tempFilters = { status: this.status[0].value };

  constructor(
    private router: Router,
    private alugaveisService: AlugaveisService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.configTable();
    this.fetchAll();
  }

  private configTable() {
    this.tableColumns = [
      { columnDef: "titulo", columnHeaderName: "Titulo", objectProperty: "titulo" },
      {
        columnDef: "valor",
        columnHeaderName: "Valor Diário",
        objectProperty: "valor",
        formatFunction: formatMoneyValue
      },
      {
        columnDef: "valor_mes",
        columnHeaderName: "Valor Mensal",
        objectProperty: "valor_mes",
        formatFunction: formatMoneyValue
      }
    ];
    this.displayedColumns = ["titulo", "valor", "valor_mes", "actions"];
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

  public fetchAll(pager?) {
    this.alugaveisService.getByStatus(
      pager? pager.pageIndex + 1 : 1,
      pager? pager.pageSize: FIRST_PAGE_SIZE,
      this.tempFilters)
    .subscribe(response => {
      this.pager.length = response.total_itens;
      this.data = response.results;
    }, (error) => {
      console.log("Error: ", error);
    });
  }

  visualizarDetalhesAlugavel({id}) {
    this.router.navigateByUrl(`user/anuncios/${id}`);
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
