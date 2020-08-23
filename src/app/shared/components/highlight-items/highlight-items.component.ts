import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ENUM_ALUGAVEL_CARACTERISTICAS } from '../../constants/constants';

@Component({
  selector: 'app-highlight-items',
  templateUrl: './highlight-items.component.html',
  styleUrls: ['./highlight-items.component.scss']
})
export class HighlightItemsComponent implements OnInit {

  @Input('data') data: any = undefined;
  @Input('width') width:string = '277px';

  @Input('custom-redirect') custom_redirect: string = '';

  @Input('alugavel_id') alugavel_id: number = undefined;

  public backUrl = environment.apiUrl;
  private taxaTotal;
  public CARACTERISTICAS = ENUM_ALUGAVEL_CARACTERISTICAS;

  constructor(
    private router: Router,
    private alugavel: AlugavelService,
    private alugaveis: AlugaveisService
  ) { }

  ngOnInit(): void {
    if(this.alugavel_id){
      this.alugaveis.getById(this.alugavel_id).subscribe( res => {
        this.data = res;
      });
    }

    setTimeout(() => {      
      this.data.valor = Number(this.data['valor'])
      this.alugavel.getTaxa().subscribe( res => {
        this.taxaTotal = res.taxa;
      })
    }, 10);
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

  custoDia(){
    return Number( this.data.valor * ( (this.taxaTotal / 100) + 1 ) );
  }
}
