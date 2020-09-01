import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ALUGUEL_STATUS } from 'src/app/shared/constants/constants';

@Component({
  templateUrl: './meus-alugueis.component.html',
  styleUrls: ['./meus-alugueis.component.scss']
})
export class MeusAlugueisComponent implements OnInit {

  private alugueis;
  // public em_processamento = [];
  public ativos = [];
  public inativos = [];
  public cancelados = [];

  constructor(
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.alugueis = this.route.snapshot.data.alugueis;
    console.log(this.alugueis)
    
    this.processaAlugueis();
  }

  private processaAlugueis(){
    this.alugueis.forEach(aluguel => {
      if(aluguel.status === ALUGUEL_STATUS.ACTIVE.value) {
        this.ativos.push(aluguel);
      }else if(aluguel.status === ALUGUEL_STATUS.CREATED.value) {
        this.inativos.push(aluguel)
      }else if (aluguel.status === ALUGUEL_STATUS.CANCELED.value) {
        this.cancelados.push(aluguel);
      }
    });
  }

}
