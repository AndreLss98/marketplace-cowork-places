import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';

import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public usersAllowed = [];
  public usersNotAllowed = [];

  private notAllowedCurrentPage = 1;
  public notAllowedCurrentPageSize = 5;
  public hasNextNotAlloweds = false;
  public hasPreviousNotAlloweds = false;

  public allowedCurrentPage = 1;
  public allowedCurrentPageSize = 5;
  public hasNextAlloweds = false;
  public hasPreviousAlloweds = false;

  public displayedColumnsAllowedTable = [ 'nome', 'email', 'edit' ];
  public displayedColumnsNotAllowedTable = [ 'nome', 'email', 'edit' ];

  public pageSizes = [5, 10, 20, 25];

  constructor(
    private router: Router,
    private userService: UserService,
  ) {

  }

  ngOnInit(): void {
    this.fetchAllNotAllowed();
    this.fetchAllAllowed();
  }

  public fetchAllNotAllowed() {
    this.userService.getAll(this.notAllowedCurrentPage, this.notAllowedCurrentPageSize, { cadastro_validado: false }).subscribe(response => {
      this.usersNotAllowed = response.results;
      if (this.usersNotAllowed.length === 0 && this.notAllowedCurrentPage > 1) {
        this.notAllowedCurrentPage = 1;
        this.fetchAllNotAllowed();
      }
      response.next? this.hasNextNotAlloweds = true : this.hasNextNotAlloweds = false;
      response.previous? this.hasPreviousNotAlloweds = true : this.hasPreviousNotAlloweds = false;
    }, (error) => {
      console.log("Error: ", error);
    });
  }

  public fetchAllAllowed() {
    this.userService.getAll(this.allowedCurrentPage, this.allowedCurrentPageSize, { cadastro_validado: true }).subscribe(response => {
      this.usersAllowed = response.results;
      response.next? this.hasNextAlloweds = true : this.hasNextAlloweds = false;
      response.previous? this.hasPreviousAlloweds = true : this.hasPreviousAlloweds = false;
    }, (error) => {
      console.log("Error: ", error);
    });
  }

  public nextPageOfNotAlloweds() {
    ++this.notAllowedCurrentPage;
    this.fetchAllNotAllowed();
  }

  public previousPageOfNotAlloweds() {
    --this.notAllowedCurrentPage;
    this.fetchAllNotAllowed();
  }

  public nextPageOfAlloweds() {
    ++this.allowedCurrentPage;
    this.fetchAllAllowed();
  }

  public previousPageOfAlloweds() {
    --this.allowedCurrentPage;
    this.fetchAllAllowed();
  }

  public viewUserDetails(user) {
    console.log('Usuario: ', user);
    this.router.navigate([`user/usuarios/${user.id}`]);
  }
}
