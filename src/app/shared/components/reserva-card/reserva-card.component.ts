import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Financeiro } from 'src/app/shared/classes/financeiro';
import { addDays, diffDates, formatMoneyValue } from 'src/app/shared/constants/functions';

@Component({
  selector: 'reserva-card',
  templateUrl: './reserva-card.component.html',
  styleUrls: ['./reserva-card.component.scss']
})
export class ReservaCardComponent extends Financeiro implements OnInit {

  private maxTax: number;

  readonly diffDates = diffDates;
  readonly formatMoneyValue = formatMoneyValue;

  @Input('taxa')
  public taxa: number;

  @Input('taxaMaxima')
  public taxaMaxima: number;

  @Input('valorDiaria')
  public valorDiaria: number;

  @Input('valorMensal')
  public valorMensal: number;

  @Output('formValue')
  public formChangeEvent = new EventEmitter();

  public intervalForm: FormGroup;
  public minDate = addDays(new Date(), 2);

  constructor(
    private formBuilder: FormBuilder
  ) {
    super();
    this.intervalForm = formBuilder.group({
      entrada: ['', [Validators.required]],
      saida: ['', [Validators.required]],
    });

    this.intervalForm.valueChanges.subscribe(() => {
      this.formChangeEvent.emit({
        formValid: this.intervalForm.valid,
        interval: this.intervalForm.value,
        total: this.qtdDias() >= 31 && this.valorMensal?
        this.total(this.totalNoValorMensal(this.qtdDias(), this.calcularDiaria(this.valorMensal, this.taxa, this.taxaMaxima)), this.totalTaxas(this.qtdDias(), this.calcularTaxa(this.taxaMaxima, this.valorMensal / 31))):
        this.total(this.totalNoValorDiaria(this.qtdDias(), this.calcularDiaria(this.valorDiaria, this.taxa, this.taxaMaxima)), this.totalTaxas(this.qtdDias(), this.calcularTaxa(this.taxaMaxima, this.valorDiaria)))
      });
    });
  }

  ngOnInit(): void { }

  public validateRange() {

  }

  public qtdDias() {
    return diffDates(this.intervalForm.controls['entrada'].value, this.intervalForm.controls['saida'].value) + 1;
  }

  public qtdMeses() {
    return Math.floor(this.qtdDias() / 31);
  }

}
