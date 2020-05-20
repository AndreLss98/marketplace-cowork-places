import { HighlightService } from '../../../../shared/service/highlight.service';
import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

  public cardClass = "col-3";
  public spaces;
  public rooms;

  @HostListener('window:resize', ['$event'])
  onResize(event){
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
      this.spaces = this.highlights.getSomeSpaces(1)
      this.rooms = this.highlights.getSomeRooms(1)
    }else if(width < 1200){
      this.cardClass = "col-4";
      this.spaces = this.highlights.getSomeSpaces(2)
      this.rooms = this.highlights.getSomeRooms(2)
    }else if(width > 1200){
      this.cardClass = "col-3";
      this.spaces = this.highlights.getSomeSpaces(3)
      this.rooms = this.highlights.getSomeRooms(3)
    }
  }


}
