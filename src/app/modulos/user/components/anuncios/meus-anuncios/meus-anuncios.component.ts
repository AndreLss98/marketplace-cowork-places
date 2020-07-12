import { Router } from '@angular/router';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';
import { Component, OnInit } from '@angular/core';
import { highlightItem } from 'src/app/shared/interface/interface';
import { ALUGAVEL_STATUS } from 'src/app/shared/constants/constants';



@Component({
  selector: 'app-meus-anuncios',
  templateUrl: './meus-anuncios.component.html',
  styleUrls: ['./meus-anuncios.component.scss']
})
export class MeusAnunciosComponent implements OnInit {

  public space: highlightItem;
  public espacos_aprovados = [];
  public espacos_em_avaliaco = [];
  public espacos_reprovados = [];

  constructor(
    private alugavel: AlugavelService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.alugavel.getAllByUser().subscribe(response => {
      this.espacos_aprovados = response.filter(espaco =>  {return espaco.status == ALUGAVEL_STATUS.APPROVED.value});
      this.espacos_em_avaliaco = response.filter(espaco => { return espaco.status ==  ALUGAVEL_STATUS.WAITING.value});
      this.espacos_reprovados = response.filter(espaco => {return espaco.status ==  ALUGAVEL_STATUS.DISAPPROVED.value});
    });
  }

  editSpace(idSpace){
    this.router.navigate(['/user/anuncios/editaranuncio'], {queryParams: {id: idSpace, edit: true} , skipLocationChange: true});
  }

}
