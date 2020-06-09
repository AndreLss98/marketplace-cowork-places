import { HighlightService } from 'src/app/shared/service/highlight.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-espacos-salvos',
  templateUrl: './espacos-salvos.component.html',
  styleUrls: ['./espacos-salvos.component.scss']
})
export class EspacosSalvosComponent implements OnInit {
  
  public space;

  constructor(
    private spaces: HighlightService
  ) { }

  ngOnInit(): void {
    this.space = this.spaces.getSomeSpaces(1)[0];
  }

}
