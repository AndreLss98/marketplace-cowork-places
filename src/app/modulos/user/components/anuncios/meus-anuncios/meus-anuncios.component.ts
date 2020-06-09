import { HighlightService } from 'src/app/shared/service/highlight.service';
import { Component, OnInit } from '@angular/core';
import { highlightItem } from 'src/app/shared/interface/interface';

@Component({
  selector: 'app-meus-anuncios',
  templateUrl: './meus-anuncios.component.html',
  styleUrls: ['./meus-anuncios.component.scss']
})
export class MeusAnunciosComponent implements OnInit {

  public space: highlightItem;

  constructor(
    private spaces: HighlightService
  ) { }

  ngOnInit(): void {
    this.space = this.spaces.getSomeSpaces(1)[0];
  }

}
