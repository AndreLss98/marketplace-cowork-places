import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ALUGUEL_STATUS } from 'src/app/shared/constants/constants';
import { UserService } from 'src/app/shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';

@Component({
  templateUrl: './meus-alugueis.component.html',
  styleUrls: ['./meus-alugueis.component.scss']
})
export class MeusAlugueisComponent implements OnInit {

  private alugueis;
  public ativos = [];
  public inativos = [];
  public cancelados = [];

  constructor(
    private route : ActivatedRoute,
    private userService: UserService,
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.fetchAll();
    this.loginService.userLoginEvent.subscribe(() => {
      this.fetchAll();
    })
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

  onContractChanges() {
    this.userService.getAlugueis().subscribe(response => {
      this.alugueis = response;
      this.ativos = [];
      this.inativos = [];
      this.cancelados = [];
      this.processaAlugueis();
    })
  }

  private fetchAll() {
    this.userService.getAlugueis().subscribe(response => {
      this.alugueis = response;
      this.processaAlugueis();
    });
  }
}
