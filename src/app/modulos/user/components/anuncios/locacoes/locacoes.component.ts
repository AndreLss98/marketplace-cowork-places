import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { ALUGUEL_STATUS } from 'src/app/shared/constants/constants';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  templateUrl: './locacoes.component.html',
  styleUrls: ['./locacoes.component.scss']
})
export class LocacoesComponent implements OnInit {

  private alugueis;
  public ativos = [];
  public inativos = [];
  public cancelados = [];

  constructor(
    private route : ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.alugueis = this.route.snapshot.data.alugueis;
    this.processaAlugueis();
  }
  private processaAlugueis() {
    this.ativos = this.alugueis.filter(contrato => contrato.status === ALUGUEL_STATUS.ACTIVE.value);
    this.inativos = this.alugueis.filter(contrato => contrato.status === ALUGUEL_STATUS.CREATED.value);
    this.cancelados = this.alugueis.filter(contrato => contrato.status === ALUGUEL_STATUS.CANCELED.value);
  }

  onContractsChange() {
    this.userService.getAlugueis(true).subscribe(response => {
      this.alugueis = response;
      this.ativos = [];
      this.inativos = [];
      this.cancelados = [];
      this.processaAlugueis();
    });
  }
}
