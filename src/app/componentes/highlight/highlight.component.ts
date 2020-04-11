import { HighlightService } from './../../service/highlight.service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

  public cardClass = "col-3";
  public spaces;

  @HostListener('window:resize', ['$event'])
  onResize(event){
    this.checkWidth();
  }

  constructor(
    public highlights: HighlightService
  ) { 
    this.spaces = this.highlights.spaces;
  }

  ngOnInit(): void {
    
    this.checkWidth();
  }

  private checkWidth(){
    let width = $(window).width();
    if(width < 992){
      this.cardClass = "col-xl-6 d-flex justify-content-center";
      this.spaces = this.highlights.getSome(1);
    }else if(width < 1200){
      this.cardClass = "col-4";
      this.spaces = this.highlights.getSome(2);
    }else if(width > 1200){
      this.cardClass = "col-3";
      this.spaces = this.highlights.spaces;
    }
  }


}
