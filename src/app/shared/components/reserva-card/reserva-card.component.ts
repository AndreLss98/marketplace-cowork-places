import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { addDays, diffDates, formatMoneyValue } from 'src/app/shared/constants/functions';

@Component({
  selector: 'reserva-card',
  templateUrl: './reserva-card.component.html',
  styleUrls: ['./reserva-card.component.scss']
})
export class ReservaCardComponent implements OnInit {

  readonly diffDates = diffDates;
  readonly formatMoneyValue = formatMoneyValue;

  @Input('taxa')
  public taxa: number;

  @Input('valorDiaria')
  public valorDiaria: number;

  @Input('valorMensal')
  public valorMensal: number;

  public intervalForm: FormGroup;
  
  public qtdDias: number;
  public minDate = addDays(new Date(), 2);

  constructor(private formBuilder: FormBuilder) {
    this.intervalForm = formBuilder.group({
      entrada: ['', [Validators.required]],
      saida: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    
  }

  public validateRange() {

  }

}
