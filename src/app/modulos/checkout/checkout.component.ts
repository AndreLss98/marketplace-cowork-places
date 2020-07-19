import { Router } from '@angular/router';
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
    private router: Router,
    private checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
    console.log('Reserva: ', this.checkoutService.reserva);
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
        console.log('You have successfully created order: ', order);
        this.checkoutService.updateReserva(this.checkoutService.reserva.id, { paypal_order_id: order.id }).subscribe(response => {
          this.router.navigate(['/']);
        });
      },
      onError: error => {
        console.log('Erro na reserva: ', error);
        this.router.navigate([`/spaces/${this.checkoutService.reserva.alugavel_id}`]);
      }
    }).render(this.paypalElement.nativeElement);
  }

  private generatePayPalSubscriptionButtons(plan_id) {
    paypal.Buttons({
      createSubscription: (data, actions) => {
        return actions.subscription.create({
          plan_id
        });
      },
      onApprove: (data, actions) => {
        console.log('You have successfully created subscription: ', data);
        this.checkoutService.updateReserva(this.checkoutService.reserva.id, { subscription_id: data.subscriptionID }).subscribe(response => {
          this.router.navigate(['/']);
        });
      },
      onError: error => {
        console.log('Erro na reserva: ', error);
        this.router.navigate([`/spaces/${this.checkoutService.reserva.alugavel_id}`]);
      }
    }).render(this.paypalElement.nativeElement);
  }

}
