import { Route, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';

@Component({
  selector: 'app-lista-alugaveis',
  templateUrl: './lista-alugaveis.component.html',
  styleUrls: ['./lista-alugaveis.component.scss']
})
export class ListaAlugaveisComponent implements OnInit {

  public alugaveisDisponiveis = [];
  public alugaveisNaoDisponiveis = [];

  public notAvailablesPage = 1;
  public notAvailablesPageSize = 5;
  public hasNextNotAvailable = false;
  public hasPreviousNotAvailable = false;

  public availablesPage = 1;
  public availablesPageSize = 5;
  public hasNextAvailable = false;
  public hasPreviousAvailable = false;

  public displayedColumnsAvailableTable = [ 'titulo', 'preco', 'edit' ];
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
  }

  visualizarDetalhesAlugavel(id) {
    this.router.navigateByUrl(`user/anuncios/${id}`);
  }

  public fetchAllNotAvailable() {
    this.alugaveisService.getAllNotAvailable(this.notAvailablesPage, this.notAvailablesPageSize).subscribe(response => {
      this.alugaveisNaoDisponiveis = response.results;
    });
  }

  public fetchAllAvailable() {
    this.alugaveisService.getAllAvailable(this.availablesPage, this.availablesPageSize).subscribe(response => {
      this.alugaveisDisponiveis = response.results;
    });
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
}
