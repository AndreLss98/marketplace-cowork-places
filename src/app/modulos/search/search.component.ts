import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';

import { MenuService } from 'src/app/shared/service/menu.service';
import { HighlightService } from 'src/app/shared/service/highlight.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  private offset = 'auto';
  
  private position;

  public tiposServico = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    public highlightService: HighlightService
  ) {
    this.position = $(window).scrollTop();
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe((data) => {
      console.log("params: ", data)
      if (data.tipo_id) {
        this.highlightService.fetch({ tipo_id: data.tipo_id });
      } else {
        this.highlightService.fetch();
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
    if (scroll > this.position + 50) {
      $('#navTop').removeClass('up');
      $('#navTop').addClass('hide');

      if ($(document).scrollTop() + window.innerHeight > $('#footer').offset().top) {
        $("#searchScroll").removeClass("slideDown");
        $("#searchScroll").addClass("slideUp");
      } else {
        $("#searchScroll").removeClass("slideUp");
        $("#searchScroll").addClass("slideDown");
      }
      // this.offset = '20px'
      this.position = scroll;
      // Scroll to top
    } else if (scroll < this.position) {
      $('#navTop').removeClass('hide');
      $('#navTop').addClass('up');

      $("#searchScroll").removeClass("slideDown");
      $("#searchScroll").addClass("slideUp");
      this.position = scroll;
      // this.offset = 'auto';
    }
  }

  onScrollContent() {
    // this.result = this.highlight.getSomeSpaces(this.quantity)
  }

  private checkOffset() {
    if ($('#searchScroll').offset().top + $('#searchScroll').height() >= $('#footer').offset().top - 233) {
      $('#searchScroll').css('position', 'absolute');
      $('#searchScroll').css('top', ($('#footer').offset().top - $('#searchScroll').height()) - 233 + 'px');
    }
    if ($(document).scrollTop() + window.innerHeight < $('#footer').offset().top) {
      $('#searchScroll').css('position', 'fixed')
      $('#searchScroll').css('top', this.offset)
    }
  }

}
