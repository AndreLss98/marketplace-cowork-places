import { Component, OnInit } from '@angular/core';

import { HighlightService } from 'src/app/shared/service/highlight.service';
import { FavoritosService } from 'src/app/shared/service/favoritos.service';

@Component({
  selector: 'app-espacos-salvos',
  templateUrl: './espacos-salvos.component.html',
  styleUrls: ['./espacos-salvos.component.scss']
})
export class EspacosSalvosComponent implements OnInit {
  
  public space;
  public favoritos = [];

  constructor(
    private spaces: HighlightService,
    private favoritosService: FavoritosService
  ) {

  }

  ngOnInit(): void {
    this.space = this.spaces.getSomeSpaces(1)[0];
    this.favoritosService.getAll().subscribe(response => {
      console.log('Favoritos: ', response);
      this.favoritos = response;
    })
  }

}
