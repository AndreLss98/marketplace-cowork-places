import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';
import { ALUGAVEL_STATUS } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-lista-alugaveis',
  templateUrl: './lista-alugaveis.component.html',
  styleUrls: ['./lista-alugaveis.component.scss']
})
export class ListaAlugaveisComponent implements OnInit {

  public alugaveisReprovados = [];
  public alugaveisDisponiveis = [];
  public alugaveisNaoDisponiveis = [];

  public disapprovedPage = 1;
  public disapprovedPageSize = 5;
  public hasNextDisapproved = false;
  public hasPreviousDisapproved = false;

  public notAvailablesPage = 1;
  public notAvailablesPageSize = 5;
  public hasNextNotAvailable = false;
  public hasPreviousNotAvailable = false;

  public availablesPage = 1;
  public availablesPageSize = 5;
  public hasNextAvailable = false;
  public hasPreviousAvailable = false;

  public displayedColumnsAvailableTable = [ 'titulo', 'preco', 'edit' ];
  public displayedColumnsDisapprovedTable = [ 'titulo', 'preco', 'edit' ];
  public displayedColumnsNotAvailableTable = [ 'titulo', 'preco', 'edit' ];

  public pageSizes = [ 5, 10, 20 ];

  constructor(
    private router: Router,
    private alugaveisService: AlugaveisService,
  ) {

  }

  ngOnInit(): void {
    this.fetchAllAvailable();
    this.fetchAllNotAvailable();
    this.fetchAllDisapproved();
  }

  visualizarDetalhesAlugavel(id) {
    this.router.navigateByUrl(`user/anuncios/${id}`);
  }

  public fetchAllNotAvailable() {
    this.alugaveisService.getByStatus(this.notAvailablesPage, this.notAvailablesPageSize, ALUGAVEL_STATUS.WAITING.value).subscribe(response => {
      this.alugaveisNaoDisponiveis = response.results;
    })
  }

  public fetchAllDisapproved() {
    this.alugaveisService.getByStatus(this.disapprovedPage, this.disapprovedPageSize, ALUGAVEL_STATUS.DISAPPROVED.value).subscribe(response => {
      this.alugaveisReprovados = response.results;
    })
  }

  public fetchAllAvailable() {
    this.alugaveisService.getByStatus(this.availablesPage, this.availablesPageSize, ALUGAVEL_STATUS.APPROVED.value).subscribe(response => {
      this.alugaveisDisponiveis = response.results;
    })
  }

  public previousPageOfNotAvailables() {
    --this.notAvailablesPage;
    this.fetchAllNotAvailable();
  }

  public nextPageOfNotAvailables() {
    ++this.notAvailablesPage;
    this.fetchAllNotAvailable();
  }

  public previousPageOfAvailables() {
    --this.notAvailablesPage;
    this.fetchAllNotAvailable();
  }

  public nextPageOfAvailables() {
    ++this.notAvailablesPage;
    this.fetchAllNotAvailable();
  }

  public previousPageOfDisapproved() {
    --this.disapprovedPage;
    this.fetchAllDisapproved();
  }

  public nextPageOfDisapproved() {
    ++this.disapprovedPage;
    this.fetchAllDisapproved();
  }
}
