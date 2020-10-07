import { Component, OnInit } from '@angular/core';

import { HighlightService } from 'src/app/shared/service/highlight.service';

@Component({
  selector: 'highlights',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent implements OnInit {

  public cardClass = "col-3";
  public rooms = [];
  public spaces = [];

  constructor(
    public highlights: HighlightService
  ) {

  }

  ngOnInit(): void {
    this.fetchAlugaveis(3);
  }

  private fetchAlugaveis(quantity: number) {
    this.highlights.getSome(quantity).subscribe(response => {
      this.rooms = response.results;
    });
  }
}
