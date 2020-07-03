import { CheckoutService } from './../../shared/service/checkout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private checkoutService: CheckoutService
  ) { }

  ngOnInit(): void {
    console.log("DEu bom pai", this.checkoutService.data_entrada, this.checkoutService.data_saida, this.checkoutService.espaco);
  }

}
