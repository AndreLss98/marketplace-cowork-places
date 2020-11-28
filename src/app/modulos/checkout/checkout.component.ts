import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';
import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';

import { CheckoutService } from './../../shared/service/checkout.service';
import * as moment from 'moment';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MatStepper } from '@angular/material/stepper';

declare var paypal;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  public backUrl = environment.apiUrl;

  public politica_uso = environment.apiUrl + '/md/politica_uso.md';
  public politica_pagamento = environment.apiUrl + '/md/politica_pagamento.md';

  constructor(
    private router: Router,
    private alugaveis: AlugaveisService,
    public checkoutService: CheckoutService,
    private alugavelService: AlugavelService
  ) {
  }

  ngOnInit(): void {
    this.checkoutService.reserva.anuncio.valor = Number(this.checkoutService.reserva.anuncio.valor);
    this.checkoutService.reserva.anuncio.valor_mes = Number(this.checkoutService.reserva.anuncio.valor_mes);
    this.checkoutService.reserva.anuncio.taxa = Number(this.checkoutService.reserva.anuncio.taxa);

    if (this.checkoutService.reserva.paypal_plan_id) {
      this.generatePayPalSubscriptionButtons(this.checkoutService.reserva.paypal_plan_id);
    } else {
      this.generatePayPalOrderButtons();
    }
  }

  private generatePayPalOrderButtons() {
    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            description: this.checkoutService.reserva.anuncio.titulo,
            amount: {
              currency_code: 'BRL',
              value: this.checkoutService.reserva.total
            }
          }],
          application_context: {
            locale: 'pt-BR'
          }
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        // console.log('You have successfully created order: ', order);
        this.checkoutService.updateReserva(this.checkoutService.reserva.id, { paypal_order_id: order.id }).subscribe(response => {
          this.router.navigate(['/user/alugueis'], { replaceUrl: true });
        });
      },
      onError: error => {
        // console.log('Erro na reserva: ', error);
        this.router.navigate([`/spaces/${this.checkoutService.reserva.alugavel_id}`], { replaceUrl: true });
      }
    }).render(this.paypalElement.nativeElement);
  }

  private generatePayPalSubscriptionButtons(plan_id) {
    paypal.Buttons({
      createSubscription: (data, actions) => {
        return actions.subscription.create({
          plan_id,
          locale: 'pt-BR',
          shipping_preference: 'NO_SHIPPING'
        });
      },
      onApprove: (data, actions) => {
        // console.log('You have successfully created subscription: ', data);
        this.checkoutService.updateReserva(this.checkoutService.reserva.id, { subscription_id: data.subscriptionID }).subscribe(response => {
          this.router.navigate(['/user/alugueis'], { replaceUrl: true });
        });
      },
      onError: error => {
        // console.log('Erro na reserva: ', error);
        this.router.navigate([`/spaces/${this.checkoutService.reserva.alugavel_id}`], { replaceUrl: true });
      }
    }).render(this.paypalElement.nativeElement);
  }
}
