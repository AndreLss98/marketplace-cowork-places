import { Component, OnInit } from '@angular/core';

import { PoliticasService } from '../../service/politicas.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public politicas = [];

  constructor(
    private politicasService: PoliticasService
  ) { }

  ngOnInit(): void {
    this.politicasService.getAll().subscribe((response: any) => {
      this.politicas = response.filter(politica => politica.aprovado);
      console.log('Politicas: ', this.politicas);
    });
  }

}
