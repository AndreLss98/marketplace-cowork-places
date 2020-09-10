import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ALUGUEL_STATUS } from 'src/app/shared/constants/constants';
import { formatDate, formatMoneyValue } from 'src/app/shared/constants/functions';

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
    this.aluguel.data_criacao = formatDate(this.aluguel.data_criacao);
    this.aluguel.dias_reservados.data_entrada = formatDate(this.aluguel.dias_reservados.data_entrada);
    this.aluguel.dias_reservados.data_saida = formatDate(this.aluguel.dias_reservados.data_saida);
    this.aluguel.valor = formatMoneyValue(this.aluguel.valor);
  }

  viewUser(id: number) {
    this.router.navigateByUrl(`user/usuarios/${id}`);
  }
}
