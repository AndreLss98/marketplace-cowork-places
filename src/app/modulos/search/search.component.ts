import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HighlightService } from 'src/app/service/highlight.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  public result;
  private quantity:number = 20;

  constructor(
    private route: ActivatedRoute,
    private highlight: HighlightService
  ) { }

  ngOnInit(): void {
    this.result = this.route.snapshot.data.source;
    this.route.queryParams.subscribe( (data) => {
      console.log("Tem algo aqui", data)
      if(data.location){
        this.result = this.highlight.getSomeSpaces(20)
      }
    })
  }

  onScroll(){
    if(this.quantity < 50){
      this.quantity = this.quantity + 10;
    }
    this.result = this.highlight.getSomeSpaces(this.quantity)
  }

}
