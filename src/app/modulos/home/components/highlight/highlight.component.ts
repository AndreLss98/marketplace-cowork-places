import { HighlightService } from '../../../../shared/service/highlight.service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

  public cardClass = "col-3";
  public rooms = [];
  public spaces = [];

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.checkWidth();
  }

  constructor(
    public highlights: HighlightService
  ) {

  }

  ngOnInit(): void {
    this.checkWidth();
  }

  private checkWidth(){
    let width = $(window).width();
    if(width < 992){
      this.cardClass = "col-xl-6 d-flex justify-content-center";
      this.fetchAlugaveis(1);
    }else if(width < 1200){
      this.cardClass = "col-4";
      this.fetchAlugaveis(2);
    }else if(width > 1200){
      this.cardClass = "col-3";
      this.fetchAlugaveis(3);
    }
  }

  private fetchAlugaveis(quantity: number) {
    this.highlights.getSome(quantity, 1).subscribe(response => {
      this.rooms = response.results;
    });
    this.highlights.getSome(quantity, 2).subscribe(response => {
      this.spaces = response.results;
    });
  }


}
