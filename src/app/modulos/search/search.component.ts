import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HighlightService } from 'src/app/shared/service/highlight.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public tiposServico = [];
  public filters: any;

  constructor(
    private route: ActivatedRoute,
    public highlightService: HighlightService
  ) {
    
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

  onScrollContent() {
    
  }
}
