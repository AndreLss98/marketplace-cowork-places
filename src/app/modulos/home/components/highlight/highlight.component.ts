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
  public tipo_id: number;

  constructor(
    public highlights: HighlightService
  ) {

  }

  ngOnInit(): void {
    this.fetchAlugaveis(3);
  }

  private fetchAlugaveis(quantity: number) {
    this.highlights.getSome(quantity, this.tipo_id).subscribe(response => {
      this.rooms = response.results;
    });
  }
}
