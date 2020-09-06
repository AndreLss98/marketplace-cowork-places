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
  @ViewChild('stepper') stepper: MatStepper;
  public backUrl = environment.apiUrl;
  public alugavel;
  public entrada;
  public saida;
  private taxa;
  private max_taxa;

  public termos: FormGroup;
  termo1 = new FormControl('', [Validators.required]);
  termo2 = new FormControl('', [Validators.required]);

  public politica_uso = environment.apiUrl + '/md/politica_uso.md';
  public politica_pagamento = environment.apiUrl + '/md/politica_pagamento.md';

  constructor(
    private router: Router,
    public checkoutService: CheckoutService,
    private alugaveis: AlugaveisService,
    private alugavelService: AlugavelService,
    private form: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.termos = this.form.group({
      termo1: this.termo1,
      termo2: this.termo2
    })
  }

  ngOnInit(): void {
    moment.locale('pt-BR');
    this.entrada = moment(this.checkoutService.reserva.dias_reservados.data_entrada);
    this.saida = moment(this.checkoutService.reserva.dias_reservados.data_saida);
    
    this.alugavelService.getTaxa().subscribe(response => {
      this.max_taxa = Number(response.taxa);
    });
    
    this.alugaveis.getById(this.checkoutService.reserva.alugavel_id).subscribe(response => {
      this.alugavel = response;
    });
    
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
          this.router.navigate(['/user/alugueis']);
        });
      },
      onError: error => {
        // console.log('Erro na reserva: ', error);
        this.router.navigate([`/spaces/${this.checkoutService.reserva.alugavel_id}`]);
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
          this.router.navigate(['/user/alugueis']);
        });
      },
      onError: error => {
        // console.log('Erro na reserva: ', error);
        this.router.navigate([`/spaces/${this.checkoutService.reserva.alugavel_id}`]);
      }
    }).render(this.paypalElement.nativeElement);
  }

  public concordar(step: MatStepper){
    if(!this.termos.valid){
      this.snackBar.open("Para prosseguir aceite os termos", "Ok", {duration: 5000})
    }else{
      setTimeout(() => {
        step.next();
      }, 1);
    }
  }

  public totalDias(entrada, saida) {
    return Number(saida.diff(entrada, 'days') + 1);
  }

  public calculaTaxa(taxa, custo_dia): number {
    return Number(custo_dia * (taxa / 100))
  }

  public calculaTotal(taxa, custo_dia): number {
    return Number(this.calculaCustoDia(taxa, custo_dia) + this.calculaTaxa(taxa, custo_dia));
  }

  public calculaTotalPeriodo(taxa, custo_dia): number {
    let b = this.entrada;
    let a = this.saida;
    if (a == undefined || b == undefined) {
      return Number(this.calculaTotal(taxa, custo_dia));
    } else {
      return Number((a.diff(b, 'days') + 1) * this.calculaTotal(taxa, custo_dia));
    }
  }

  public calculaCustoDia(taxa, custo_dia): number {
    if (taxa == this.max_taxa) {
      return Number(custo_dia);
    } else if (taxa == this.max_taxa / 2) {
      return Number(custo_dia * (taxa / 100 + 1))
    } else {
      return Number(custo_dia * (this.max_taxa / 100 + 1))
    }
  }
}
