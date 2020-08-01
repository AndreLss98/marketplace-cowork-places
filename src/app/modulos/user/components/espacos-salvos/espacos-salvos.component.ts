import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';

import { FavoritosService } from 'src/app/shared/service/favoritos.service';

@Component({
  selector: 'app-espacos-salvos',
  templateUrl: './espacos-salvos.component.html',
  styleUrls: ['./espacos-salvos.component.scss']
})
export class EspacosSalvosComponent implements OnInit {
  
  public favoritos = [];

  constructor(
    private favoritosService: FavoritosService,
    private snack: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.carregarFavoritos();
  }

  public removerFavoritos(id){
    this.favoritosService.desfavoritar(id).subscribe(res => {
      this.snack.open("Removido", "Ok", {duration: 1000});
      this.carregarFavoritos();
    });
  }

  public carregarFavoritos(){
    this.favoritosService.getAll().subscribe(response => {
      //console.log('Favoritos: ', response);
      this.favoritos = response;
    })
  }

}
