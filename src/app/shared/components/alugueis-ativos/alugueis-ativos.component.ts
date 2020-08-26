import { Component, Input, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment';

import { AluguelService } from 'src/app/shared/service/aluguel.service';

@Component({
  selector: 'app-alugueis-ativos',
  templateUrl: './alugueis-ativos.component.html',
  styleUrls: ['./alugueis-ativos.component.scss']
})
export class AlugueisAtivosComponent implements OnInit {

  readonly BACK_BASE_URL = environment.apiUrl;

  @Input('aluguel') aluguel: any;

  constructor(
    public aluguelService: AluguelService,
  ) { }

  ngOnInit(): void {
    
  }

}
