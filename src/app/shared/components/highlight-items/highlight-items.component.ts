import { Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-highlight-items',
  templateUrl: './highlight-items.component.html',
  styleUrls: ['./highlight-items.component.scss']
})
export class HighlightItemsComponent implements OnInit {

  @Input('local') local: string;
  @Input('description') description: string;
  @Input('image') image: string;
  @Input('cost') cost: number;
  @Input('tax') tax: number;
  @Input('rank') rank: number;
  @Input('customId') customId: number;
  @Input('width') width:string = '277px'

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToSpace(){
    this.router.navigateByUrl("/spaces/"+this.customId)
  }

  countStars(): string[] {
    let n:number = this.rank;
    let array = [];
    let j = 0;

    for (let index = 0; index < Math.floor(n); index++) {
      j++
      array.push('start');
      console.log("entrei",j)
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
