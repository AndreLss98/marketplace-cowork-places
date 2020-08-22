import { AluguelService } from './../../service/aluguel.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alugueis-ativos',
  templateUrl: './alugueis-ativos.component.html',
  styleUrls: ['./alugueis-ativos.component.scss']
})
export class AlugueisAtivosComponent implements OnInit {

  @Input('aluguel') aluguel: any;

  constructor(
    public aluguelService: AluguelService,
  ) { }

  ngOnInit(): void {
    
  }

}
