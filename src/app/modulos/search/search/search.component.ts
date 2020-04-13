import { HighlightService } from './../../../service/highlight.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public result;
  private quantity:number = 20;

  constructor(
    public highlight: HighlightService
  ) { }

  ngOnInit(): void {
    this.result = this.highlight.getSomeSpaces(this.quantity)
  }

  onScroll(){
    if(this.quantity < 50){
      this.quantity = this.quantity + 10;
    }
    this.result = this.highlight.getSomeSpaces(this.quantity)
  }
}
