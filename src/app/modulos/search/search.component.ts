import { Component, OnInit } from '@angular/core';
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private highlight: HighlightService
  ) { }

  ngOnInit(): void {
    this.jquery();
    this.result = this.route.snapshot.data.source;
    this.route.queryParams.subscribe( (data) => {
      console.log("Tem algo aqui", data)
      if(data.location){
        this.result = this.highlight.getSomeSpaces(20)
      }
    })
  }

  doSearch(){
    this.router.navigateByUrl("/spaces")
  }

  onScroll(){
    if(this.quantity < 50){
      this.quantity = this.quantity + 10;
    }
    this.result = this.highlight.getSomeSpaces(this.quantity)
  }

  jquery(){
    $(document).ready(function() {

      $(window).scroll((event)=>{
        checkOffset();
      });

      var offset = 'auto';

      function checkOffset() {
        if($('#searchScroll').offset().top + $('#searchScroll').height() >= $('#footer').offset().top){
          console.log("entrei aqui")
          $('#searchScroll').css('position', 'absolute');
          $('#searchScroll').css('top', ($('#footer').offset().top - $('#searchScroll').height()) +'px');
        }
        if($(document).scrollTop() + window.innerHeight < $('#footer').offset().top){
          
          console.log('entrei')
          $('#searchScroll').css('position', 'fixed')
          $('#searchScroll').css('top', offset)
        }
      }
      var position = $(window).scrollTop(); 

      $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if(scroll > position + 30) {
            $('#navTop').removeClass('up');
            $('#navTop').addClass('hide');
            offset = '20px'
            position = scroll;
        } else if (scroll < position){
            $('#navTop').removeClass('hide');
            $('#navTop').addClass('up');
            position = scroll;
            offset = 'auto';
        }
      });
    });

  }


}
