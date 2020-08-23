import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ALUGUEL_STATUS } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-detalhes-contrato',
  templateUrl: './detalhes-contrato.component.html',
  styleUrls: ['./detalhes-contrato.component.scss']
})
export class DetalhesContratoComponent implements OnInit {

  public aluguel: any;

  readonly API_URL = environment.apiUrl;
  readonly ALUGUEL_STATUS = ALUGUEL_STATUS;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {

  }

  ngOnInit(): void {
    this.aluguel = this.route.snapshot.data['aluguel'];
    this.aluguel.data_criacao = this.formatDate(this.aluguel.data_criacao);
    this.aluguel.dias_reservados.data_entrada = this.formatDate(this.aluguel.dias_reservados.data_entrada);
    this.aluguel.dias_reservados.data_saida = this.formatDate(this.aluguel.dias_reservados.data_saida);
  }

  viewUser(id: number) {
    this.router.navigateByUrl(`user/usuarios/${id}`);
  }

  public formatDate(date: any) {
    date = date.split('T')[0]
    date = new Date(date);
    let formattedDate = '';
    formattedDate = date.getDate() + 1 < 10? `0${date.getDate() + 1}/` : `${date.getDate() + 1}/`;
    formattedDate += date.getMonth() + 1 < 10? `0${date.getMonth() + 1}/` : `${date.getMonth() + 1}/`;
    formattedDate += date.getFullYear();
    return formattedDate;
  }
}
