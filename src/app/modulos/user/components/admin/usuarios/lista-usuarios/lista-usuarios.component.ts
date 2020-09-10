import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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

  constructor(
    private router: Router,
    private userService: UserService,
    formBuilder: FormBuilder,
  ) {
    super(formBuilder);

    this.filters = formBuilder.group({
      status_cadastro: [USUARIO_STATUS.WAITING.value, []]
    });

    this.filters.valueChanges.subscribe(() => {
      this.fetchAll();
    })
  }

  ngOnInit(): void {
    this.configTable();
    this.fetchAll();
  }

  private configTable() {
    this.tableColumns = [
      { columnDef: "nome", columnHeaderName: "Nome", objectProperty: "nome" }
    ];
    this.displayedColumns = ["nome", "actions"];
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

  public fetchAll(pager?, filters?) {
    console.log('Pager: ', pager);
    console.log('Filters: ', filters);

    this.userService.getAll(
      pager? pager.pageIndex + 1 : 1,
      pager? this.pager.pageSize : FIRST_PAGE_SIZE,
      filters? filters : { status_cadastro: this.status[0].value })
    .subscribe(response => {
      console.log(response)
      this.pager.length = response.total_itens;
      this.data = response.results;
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
    this.fetchAll(this.pager, event);
  }
}