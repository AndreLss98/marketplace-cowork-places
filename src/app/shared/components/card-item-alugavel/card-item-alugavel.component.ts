import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

import { environment } from 'src/environments/environment';

import { formatMoneyValue } from '../../constants/functions';
import { Financeiro } from 'src/app/shared/classes/financeiro';
import { ENUM_ALUGAVEL_CARACTERISTICAS } from '../../constants/constants';

import { AlugavelService } from 'src/app/shared/service/alugavel.service';
import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';

@Component({
  selector: 'card-item-alugavel',
  templateUrl: './card-item-alugavel.component.html',
  styleUrls: ['./card-item-alugavel.component.scss']
})
export class CardItemAlugavelComponent extends Financeiro implements OnInit {

  readonly formatMoneyValue = formatMoneyValue;

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
    private alugavel: AlugavelService,
    private alugaveis: AlugaveisService
  ) {
    super();
  }

  ngOnInit(): void {
    this.alugavel.getTaxa().subscribe(response => {
      this.taxaTotal = response.taxa;
    });
    
    if(this.alugavel_id){
      this.alugaveis.getById(this.alugavel_id).subscribe( res => {
        this.data = res;
      });
    }
  }

  goToSpace() {
    if (this.custom_redirect) return this.router.navigateByUrl(this.custom_redirect + this.data.id);
    this.router.navigateByUrl("/spaces/" + this.data.id)
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
