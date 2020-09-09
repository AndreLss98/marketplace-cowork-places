import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { UserService } from 'src/app/shared/service/user.service';
import { USUARIO_STATUS, FIRST_PAGE_SIZE } from 'src/app/shared/constants/constants';

import { PageableTableComponent } from 'src/app/shared/components/pageable-table/pageable-table.component';

@Component({
  selector: 'lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent extends PageableTableComponent {

  public status: any =  Object.values(USUARIO_STATUS);

  public filters: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    super();

    this.filters = formBuilder.group({
      status_cadastro: [USUARIO_STATUS.WAITING.value, []]
    });

    this.filters.valueChanges.subscribe(() => {
      this.fetchAll();
    })
  }

  ngOnInit(): void {
    this.fetchAll();
    this.configTable();
  }

  private configTable() {
    this.tableColumns = [
      { columnDef: "nome", columnHeaderName: "Nome", objectProperty: "nome" }
    ];
    this.displayedColumns = ["nome", "actions"];
    this.actions = { editar: false, excluir: false, visualizar: true };
  }

  public fetchAll(pager?) {
    this.userService.getAll(
      pager? pager.pageIndex + 1 : 1 ,
      pager? this.pager.pageSize : FIRST_PAGE_SIZE ,
      this.filters.value)
    .subscribe(response => {
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
}