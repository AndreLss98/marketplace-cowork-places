import { highlightItem } from './../../interface/interface';
import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-highlight-items',
  templateUrl: './highlight-items.component.html',
  styleUrls: ['./highlight-items.component.scss']
})
export class HighlightItemsComponent implements OnInit {

  @Input('data') data: highlightItem;
  @Input('width') width:string = '277px'

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToSpace(){
    this.router.navigateByUrl("/spaces/"+this.data.id)
  }

  countStars(): string[] {
    let n:number = this.data.rank;
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
