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
    // let width = $(window).width();
    // if(width < 992){
    //   this.cardClass = "col-6";
    //   this.spaces = this.highlights.getSome(4);
    // }else if(width < 1200){
    //   this.cardClass = "col-4";
    //   this.spaces = this.highlights.getSome(6);
    // }else if(width > 1200){
    //   this.cardClass = "col-3";
    //   this.spaces = this.highlights.spaces;
    // }
  }


}
