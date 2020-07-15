import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { CheckoutService } from './../../shared/service/checkout.service';

declare var paypal;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;

  constructor(
    private checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
    console.log('Reserva: ', this.checkoutService.reserva);
    this.generatePayPalButtons();
  }

  private generatePayPalButtons() {
    paypal.Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [{
            description: this.checkoutService.reserva.titulo,
            amount: {
              currency_code: 'BRL',
              value: this.checkoutService.reserva.valor
            }
          }]
        });
      },
      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log('Reserva concluída: ', order);
      },
      onError: error => {
        console.log('Erro na reserva: ', error);
      }
    }).render(this.paypalElement.nativeElement);
  }

}
