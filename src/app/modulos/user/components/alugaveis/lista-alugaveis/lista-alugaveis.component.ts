import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { ALUGAVEL_STATUS } from 'src/app/shared/constants/constants';

import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';

@Component({
  selector: 'app-lista-alugaveis',
  templateUrl: './lista-alugaveis.component.html',
  styleUrls: ['./lista-alugaveis.component.scss']
})
export class ListaAlugaveisComponent implements OnInit {

  public status: any =  Object.values(ALUGAVEL_STATUS);

  public alugaveis = [];

  public currentPage = 1;
  public currentPageSize = 5;
  public hasNext = false;
  public hasPrevious = false;

  public displayedColumns = [ 'titulo', 'preco', 'edit' ];

  public pageSizes = [ 5, 10, 20 ];
  
  public filters: FormGroup;

  constructor(
    private router: Router,
    private alugaveisService: AlugaveisService,
    private formBuilder: FormBuilder
  ) {
    this.filters = formBuilder.group({
      status_cadastro: [ALUGAVEL_STATUS.WAITING.value, []]
    });

    this.filters.valueChanges.subscribe(() => {
      this.fetchAll();
    })
  }

  ngOnInit(): void {
    this.fetchAll();
  }

  visualizarDetalhesAlugavel(id) {
    this.router.navigateByUrl(`user/anuncios/${id}`);
  }

  public fetchAll() {
    this.alugaveisService.getByStatus(this.currentPage, this.currentPageSize, this.filters.controls.status_cadastro.value).subscribe(response => {
      this.alugaveis = response.results;
    })
  }

  public previousPage() {
    --this.currentPage;
    this.fetchAll();
  }

  public nextPage() {
    ++this.currentPage;
    this.fetchAll();
  }
}
