import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Financeiro } from 'src/app/shared/classes/financeiro';
import { addDays, diffDates, formatMoneyValue, desformatMoneyValue } from 'src/app/shared/constants/functions';

import { AlugavelService } from 'src/app/shared/service/alugavel.service';

@Component({
  selector: 'reserva-card',
  templateUrl: './reserva-card.component.html',
  styleUrls: ['./reserva-card.component.scss']
})
export class ReservaCardComponent extends Financeiro implements OnInit {

  readonly diffDates = diffDates;
  readonly formatMoneyValue = formatMoneyValue;
  readonly desformatMoneyValue = desformatMoneyValue;

  @Input()
  public readOnly: boolean = false;

  @Input()
  public readInterval;

  @Input('taxa')
  public taxa: number = 0;

  @Input('taxaMaxima')
  public taxaMaxima: number;

  @Input('reservasMaxima')
  public reservasMaxima: number;

  @Input('valorDiaria')
  public valorDiaria: number;

  @Input('valorMensal')
  public valorMensal: number;

  @Input('anuncio_id')
  public anuncio_id: number;

  @Input()
  public simulateMode: boolean = false;

  @Output('formValue')
  public formChangeEvent = new EventEmitter();

  public intervalForm: FormGroup;
  public minDate = addDays(new Date(), 2);

  private diasReservados = [];

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private alugavelService: AlugavelService,
  ) {
    super();
    this.intervalForm = formBuilder.group({
      entrada: [addDays(new Date(), 2), [Validators.required]],
      saida: [addDays(new Date(), 2), [Validators.required]],
      qtd_reservas: [1, [Validators.min(1), Validators.max(this.reservasMaxima)]]
    });

    this.intervalForm.valueChanges.subscribe(() => {
      this.valorMensal = desformatMoneyValue(this.valorMensal)
      const emitObject = {
        formValid: this.intervalForm.valid,
        interval: this.intervalForm.value,
        total: this.qtdDias() >= 31 && this.valorMensal?
        this.total(this.totalNoValorMensal(this.qtdDias(), this.calcularDiaria(this.valorMensal, this.taxa, this.taxaMaxima)), this.totalTaxas(this.qtdDias(), this.calcularTaxa(this.taxaMaxima, this.valorMensal / 31))):
        this.total(this.totalNoValorDiaria(this.qtdDias(), this.calcularDiaria(this.valorDiaria, this.taxa, this.taxaMaxima)), this.totalTaxas(this.qtdDias(), this.calcularTaxa(this.taxaMaxima, this.valorDiaria)))
      };
      this.formChangeEvent.emit(emitObject);
    });
  }

  ngOnInit(): void {
    if (this.readInterval) {
      this.intervalForm.reset(this.readInterval);
    }

    if (this.anuncio_id) this.alugavelService.getDiasReservados(this.anuncio_id).subscribe(response => {
      this.diasReservados = response;
      for (let reserved of this.diasReservados) {
        reserved.data_entrada = new Date(reserved.data_entrada);
        reserved.data_entrada.setDate(reserved.data_entrada.getDate() + 1);
        reserved.data_entrada.setHours(0, 0, 0);

        reserved.data_saida = new Date(reserved.data_saida);
        reserved.data_saida.setDate(reserved.data_saida.getDate() + 1);
        reserved.data_saida.setHours(0, 0, 0);
      }
    });
  }

  public validateRange() {
    if (this.intervalForm.controls['saida'].value) {
      const conflictRange = this.diasReservados.find(range => range.data_entrada.getTime() > this.intervalForm.controls['entrada'].value.getTime() && range.data_entrada.getTime() < this.intervalForm.controls['saida'].value.getTime());
      if (conflictRange) {
        this.intervalForm.controls['entrada'].setValue(null);
        this.intervalForm.controls['saida'].setValue(null);
        this.snackBar.open('Intervalo inválido', 'Ok', { duration: 4000 });
      }
    }
  }

  public qtdDias() {
    return diffDates(this.intervalForm.controls['entrada'].value, this.intervalForm.controls['saida'].value) + 1;
  }

  public qtdMeses() {
    return Math.floor(this.qtdDias() / 31);
  }

  public rangeFilter = (date: Date | null): boolean => {
    const intervalorReservado = this.diasReservados.find(
      range => date.getTime() >= range.data_entrada.getTime() &&  date.getTime() <= range.data_saida.getTime());
    
      return intervalorReservado? false : true;
  }

  addQtdReservas() {
    this.intervalForm.controls['qtd_reservas'].setValue(this.intervalForm.controls['qtd_reservas'].value + 1);
  }

  removeQtdReservas() {
    if (this.intervalForm.controls['qtd_reservas'].value > 1) {
      this.intervalForm.controls['qtd_reservas'].setValue(this.intervalForm.controls['qtd_reservas'].value - 1);
    }
  }
}
