import { Component, Input, OnInit } from '@angular/core';

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

  @Input()
  public tipo;

  constructor(
    public highlights: HighlightService
  ) {

  }

  ngOnInit(): void {
    this.fetchAlugaveis(3);
  }

  private fetchAlugaveis(quantity: number) {
    this.highlights.getSome(quantity, this.tipo.id).subscribe(response => {
      this.rooms = response.results;
    });
  }
}
