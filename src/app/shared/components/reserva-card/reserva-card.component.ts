import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'reserva-card',
  templateUrl: './reserva-card.component.html',
  styleUrls: ['./reserva-card.component.scss']
})
export class ReservaCardComponent implements OnInit {

  public qtdDias: number;
  public taxaDiaria: number;
  public valorDiaria: number;
  public valorMensal: number;

  constructor() { }

  ngOnInit(): void { }

}
