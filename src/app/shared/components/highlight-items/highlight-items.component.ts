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

  @Input('data') data: any;
  @Input('width') width:string = '277px'
  public backUrl = environment.apiUrl;
  private taxaTotal;
  public CARACTERISTICAS = ENUM_ALUGAVEL_CARACTERISTICAS;

  constructor(
    private router: Router,
    private alugavel: AlugavelService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {      
      this.data.valor = Number(this.data['valor'])
      this.alugavel.getTaxa().subscribe( res => {
        this.taxaTotal = res.taxa;
      })
    }, 10);
  }

  goToSpace() {
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
