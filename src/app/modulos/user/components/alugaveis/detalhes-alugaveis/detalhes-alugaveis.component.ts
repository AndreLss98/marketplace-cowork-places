import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';

@Component({
  selector: 'app-detalhes-alugaveis',
  templateUrl: './detalhes-alugaveis.component.html',
  styleUrls: ['./detalhes-alugaveis.component.scss']
})
export class DetalhesAlugaveisComponent implements OnInit {

  public alugavel: any;
  public backURL = `${environment.apiUrl}/`;

  public displayedColumns = [ 'caracteristica', 'valor' ];
  public displayedDocumentsColumns = [ 'documento', 'action' ];

  constructor(
    private route: ActivatedRoute,
    private alugavelService: AlugavelService
  ) {

  }

  ngOnInit(): void {
    this.alugavel = this.route.snapshot.data.alugavel;
    console.log('Alugavel: ', this.alugavel);
  }

  onAvailableChange() {
    this.alugavelService.alterAvailable(this.alugavel.id, this.alugavel.disponivel).subscribe(response => {
      console.log('Alterado');
    }, (error) => {
      this.alugavel.disponivel = !this.alugavel.disponivel;
    })
  }

}
