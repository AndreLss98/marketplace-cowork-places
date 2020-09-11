import { HighlightService } from '../../../../shared/service/highlight.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { TIPOS_ALUGAVEIS } from 'src/app/shared/constants/constants';

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
    this.highlights.getSome(quantity, TIPOS_ALUGAVEIS.sala_reuniao).subscribe(response => {
      this.rooms = response.results;
    });
  }
}
