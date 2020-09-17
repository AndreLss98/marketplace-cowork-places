import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { highlightItem } from 'src/app/shared/interface/interface';
import { ALUGAVEL_STATUS } from 'src/app/shared/constants/constants';

import { AlugavelService } from 'src/app/shared/service/alugavel.service';

@Component({
  selector: 'app-meus-anuncios',
  templateUrl: './meus-anuncios.component.html',
  styleUrls: ['./meus-anuncios.component.scss']
})
export class MeusAnunciosComponent implements OnInit {

  public space: highlightItem;
  public espacos_aprovados = [];
  public espacos_em_avaliacao = [];
  public espacos_reprovados = [];
  public espacos_desativados = [];

  constructor(
    private router: Router,
    private alugavel: AlugavelService,
  ) { }

  ngOnInit(): void {
    this.carregaAlugavel();
  }

  editSpace(idSpace) {
    this.router.navigate(['/user/anuncios/editaranuncio'], { queryParams: { id: idSpace, edit: true }, skipLocationChange: true });
  }

  alterarStatus(id, status) {
    let update;
    if (status === 'approved') {
      update = 'removed'
    } else if (status === 'removed') {
      update = 'waiting'
    }

    this.alugavel.alterAvaible(id, update).subscribe(res => {
      this.carregaAlugavel();
    });
  }

  carregaAlugavel() {
    this.alugavel.getAllByUser().subscribe(response => {
      this.espacos_aprovados = response.filter(espaco => { return espaco.status === ALUGAVEL_STATUS.APPROVED.value });
      this.espacos_em_avaliacao = response.filter(espaco => { return espaco.status === ALUGAVEL_STATUS.WAITING.value });
      this.espacos_reprovados = response.filter(espaco => { return espaco.status === ALUGAVEL_STATUS.DISAPPROVED.value });
      this.espacos_desativados = response.filter(espaco => { return espaco.status === ALUGAVEL_STATUS.REMOVED.value });
    });
  }
}
