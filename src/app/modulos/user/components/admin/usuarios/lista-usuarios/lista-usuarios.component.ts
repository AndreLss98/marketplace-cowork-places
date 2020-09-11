import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { UserService } from 'src/app/shared/service/user.service';
import { USUARIO_STATUS, FIRST_PAGE_SIZE } from 'src/app/shared/constants/constants';

import { FilterPageableTableComponent } from 'src/app/shared/components/filter-pageable-table/filter-pageable-table.component';

@Component({
  selector: 'lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent extends FilterPageableTableComponent {

  public status: any =  Object.values(USUARIO_STATUS);
  private tempFilters = { status_cadastro: this.status[0].value };

  constructor(
    private router: Router,
    private userService: UserService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.configTable();
    this.fetchAll();
  }

  private configTable() {
    this.tableColumns = [
      { columnDef: "nome", columnHeaderName: "Nome", objectProperty: "nome" },
      { columnDef: "email", columnHeaderName: "Email", objectProperty: "email" }
    ];
    this.displayedColumns = ["nome", "email", "actions"];
    this.formFields = [
      {
        type: "select",
        nome_campo: "status_cadastro",
        label: "Status cadastro",
        options: this.status,
        resetOption: false,
        valor_inicial: this.status[0].value
      }
    ]
    this.actions = { editar: false, excluir: false, visualizar: true };
  }

  public fetchAll(pager?) {
    this.userService.getAll(
      pager? pager.pageIndex + 1 : 1,
      pager? this.pager.pageSize : FIRST_PAGE_SIZE,
      this.tempFilters)
    .subscribe(response => {
      this.pager.length = response.total_itens;
      this.data = response.results;
      this.data.forEach(user => {
        user.nome = `${user.nome} ${user.sobrenome}`;
        delete user.sobrenome;
      })
    }, (error) => {
      console.log("Error: ", error);
    });
  }

  public viewUserDetails(event) {
    this.router.navigate([`user/usuarios/${event.id}`]);
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