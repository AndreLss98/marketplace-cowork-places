import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
  public filters: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    public highlightService: HighlightService
  ) {
    this.position = $(window).scrollTop();
  }

  ngOnInit(): void {
    console.log(this.route);
    this.route.queryParams.subscribe((data) => {
      this.filters = data;
      if (this.filters) {
        this.highlightService.fetch(this.filters);
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

  onScrollContent() {
    // this.result = this.highlight.getSomeSpaces(this.quantity)
  }
}
