import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';

import { UserService } from 'src/app/shared/service/user.service';
import { USUARIO_STATUS } from 'src/app/shared/constants/constants';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  public status: any =  Object.values(USUARIO_STATUS);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public users = [];

  private currentPage = 1;
  public currentPageSize = 5;
  public hasNext = false;
  public hasPrevious = false;

  public pageSizes = [5, 10, 20, 25];
  public displayedColumns = [ 'nome', 'email', 'edit' ];

  public filters: FormGroup;

  constructor(
    private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.filters = formBuilder.group({
      status_cadastro: [USUARIO_STATUS.WAITING.value, []]
    });

    this.filters.valueChanges.subscribe(() => {
      this.fetchAll();
    })
  }

  ngOnInit(): void {
    this.fetchAll();
  }

  public fetchAll() {
    this.userService.getAll(this.currentPage, this.currentPageSize, this.filters.value).subscribe(response => {
      this.users = response.results;
      response.next? this.hasNext = true : this.hasNext = false;
      response.previous? this.hasPrevious = true : this.hasPrevious = false;
    }, (error) => {
      console.log("Error: ", error);
    });
  }

  public nextPage() {
    ++this.currentPage;
    this.fetchAll();
  }

  public previousPage() {
    --this.currentPage;
    this.fetchAll();
  }

  public viewUserDetails(user) {
    this.router.navigate([`user/usuarios/${user.id}`]);
  }
}
