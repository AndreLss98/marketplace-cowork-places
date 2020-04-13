import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbox',
  templateUrl: './searchbox.component.html',
  styleUrls: ['./searchbox.component.scss']
})
export class SearchboxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function() {

      $(window).scroll((event)=>{
        checkOffset();
      });

      function checkOffset() {
        if($('#searchBox').offset().top + $('#searchBox').height() >= $('#footer').offset().top - 125){
          console.log("entrei aqui")
          $('#searchBox').css('position', 'absolute');
          $('#searchBox').css('top', ($('#footer').offset().top - $('#searchBox').height() - 125) +'px');
        }
        if($(document).scrollTop() + window.innerHeight < $('#footer').offset().top){
          
          console.log('entrei')
          $('#searchBox').css('position', 'fixed')
          $('#searchBox').css('top', 'auto')
        }

    }

    });
  }

}
