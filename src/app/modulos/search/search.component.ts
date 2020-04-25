import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HighlightService } from 'src/app/service/highlight.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  
  public result;
  private quantity:number = 20;
  private offset = 'auto';
  private position;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private highlight: HighlightService
  ) {
    this.position = $(window).scrollTop(); 
   }

  ngOnInit(): void {
    this.result = this.route.snapshot.data.source;
    this.route.queryParams.subscribe( (data) => {
      console.log("Tem algo aqui", data)
      if(data.location){
        this.result = this.highlight.getSomeSpaces(20)
      }
    })
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    $('#navTop').removeClass('hide');
    $('#navTop').addClass('up');
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  scrollEvent(event) {

    this.checkOffset();

    var scroll = $(window).scrollTop();
    
    // scroll to bottom
    if(scroll > this.position + 30) {  
        $('#navTop').removeClass('up');
        $('#navTop').addClass('hide');

      if($(document).scrollTop() + window.innerHeight > $('#footer').offset().top){
        $("#searchScroll").removeClass("slideDown");
        $("#searchScroll").addClass("slideUp");
      }else{
        $("#searchScroll").removeClass("slideUp");
        $("#searchScroll").addClass("slideDown");
      }
        // this.offset = '20px'
        this.position = scroll;
    // Scroll to top
    } else if (scroll < this.position){
        $('#navTop').removeClass('hide');
        $('#navTop').addClass('up');

        $("#searchScroll").removeClass("slideDown");
        $("#searchScroll").addClass("slideUp");
        this.position = scroll;
        // this.offset = 'auto';
    }
  }

  onScrollContent(){
    if(this.quantity < 20){
      this.quantity = this.quantity + 10;
    }
    this.result = this.highlight.getSomeSpaces(this.quantity)
  }

  private checkOffset() {
    if($('#searchScroll').offset().top + $('#searchScroll').height() >= $('#footer').offset().top - 125){

      $('#searchScroll').css('position', 'absolute');
      $('#searchScroll').css('top', ($('#footer').offset().top - $('#searchScroll').height()) - 125 +'px');
    }
    if($(document).scrollTop() + window.innerHeight < $('#footer').offset().top){
      
      $('#searchScroll').css('position', 'fixed')
      $('#searchScroll').css('top', this.offset)
    }
  }

}
