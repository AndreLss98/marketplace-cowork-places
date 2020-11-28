import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { environment } from 'src/environments/environment';

import { Financeiro } from 'src/app/shared/classes/financeiro';
import { ENUM_ALUGAVEL_CARACTERISTICAS, TIPOS_CAMPOS } from 'src/app/shared/constants/constants';
import { desformatMoneyValue, formatMoneyValue, stringValueToBoolean } from 'src/app/shared/constants/functions';

import { AlugavelService } from 'src/app/shared/service/alugavel.service';
import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';

@Component({
  selector: 'card-item-alugavel',
  templateUrl: './card-item-alugavel.component.html',
  styleUrls: ['./card-item-alugavel.component.scss']
})
export class CardItemAlugavelComponent extends Financeiro implements OnInit {

  readonly formatMoneyValue = formatMoneyValue;
  readonly desformatMoneyValue = desformatMoneyValue;
  readonly TIPOS_CAMPOS = TIPOS_CAMPOS;

  @Input('data')
  public data;

  @Input('custom-redirect')
  public custom_redirect: string;

  @Input('alugavel_id')
  public alugavel_id: number;

  public backUrl = environment.apiUrl;
  public taxaTotal;
  public CARACTERISTICAS = ENUM_ALUGAVEL_CARACTERISTICAS;

  constructor(
    private router: Router,
    private alugavelService: AlugavelService,
    private alugaveis: AlugaveisService
  ) {
    super();
  }

  ngOnInit(): void {
    this.alugavelService.getTaxa().subscribe(response => {
      this.taxaTotal = response.taxa;
    });
    
    this.data.caracteristicas = this.data.caracteristicas.filter(caracteristica => caracteristica.icone).slice(0, 4);
    this.data.caracteristicas.forEach(caracteristica => {
      if (caracteristica.tipo_campo.tipo === TIPOS_CAMPOS.BINARIO.nome) caracteristica.valor = stringValueToBoolean(caracteristica.valor);
      if (caracteristica.tipo_campo.tipo === TIPOS_CAMPOS.SELECAO.nome) {
        caracteristica.valor = caracteristica.tipo_campo.propriedades.possibilidades.find(possibilidade => possibilidade.id === Number(caracteristica.valor)).valor;
      }
    });
  }

  goToSpace() {
    if (this.custom_redirect) return this.router.navigateByUrl(this.custom_redirect + this.data.id);
    this.router.navigate([`/spaces/${this.data.id}`]);
  }

  countStars(n): string[] {
    let array = [];
    let j = 0;

    for (let index = 0; index < Math.floor(n); index++) {
      j++
      array.push('start');
    }

    if(n-j){
      array.push('star_half');
    }

    while(array.length < 5){
      array.push('star_outline')
    }
    
    return array;
  }
}
