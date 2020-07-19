import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import * as moment from 'moment';

import { environment } from './../../../environments/environment';
import { ENUM_ALUGAVEL_CARACTERISTICAS } from './../../shared/constants/constants';

import { AlugavelService } from 'src/app/shared/service/alugavel.service';
import { CheckoutService } from './../../shared/service/checkout.service';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.scss'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class SpacesComponent implements OnInit {

  public CARACTERISTICAS = ENUM_ALUGAVEL_CARACTERISTICAS;

  // Datas de entrada e saida
  public saida;
  public entrada;
  public hoje = moment().format();

  // Valor maximo de taxa para calcular;
  private max_taxa;
  
  public backUrl = environment.apiUrl;

  public data = {
    dadosCompra: {}
  }

  public espaco;
  public espacos = [];
  public condicoes = [];

  public view = 'photos';

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private checkoutService: CheckoutService,
    private alugavelService: AlugavelService,
  ) { }

  ngOnInit(): void {
    this.alugavelService.getTaxa().subscribe(response => {
      this.max_taxa = Number(response.taxa);
    });

    this.espaco = this.route.snapshot.data['data'];
    this.condicoes = this.route.snapshot.data['condicoes'];
    this.alugavelService.getAllByUser(this.espaco.anunciante_id).subscribe(response => {
      this.espacos = response.filter(anuncio => anuncio.id !== this.espaco.id);
    })
  }

  /**
   * Retorna um array com os nomes dos icones, para as estrelas da avalição
   * pode ser star, star_half, star_outline
   */
  public countStars(n: number): string[] {
    let array = [];
    let j = 0;

    for (let index = 0; index < Math.floor(n); index++) {
      j++
      array.push('start');
    }

    if (n - j) {
      array.push('star_half');
    }

    while (array.length < 5) {
      array.push('star_outline')
    }

    return array;
  }

  public checkout() {
    if (this.entrada != undefined && this.saida != undefined) {
      this.checkoutService.reserva = {
        dias_reservados: {
          data_entrada: this.formatDate(new Date(this.entrada)),
          data_saida: this.formatDate(new Date(this.saida))
        },
        valor: this.calculaTotalPeriodo(this.espaco.taxa, this.espaco.valor).toFixed(2),
        alugavel_id: this.espaco.id
      };

      if (this.totalDias() <= 30) {
        this.checkoutService.checkout(this.checkoutService.reserva).subscribe(response => {
          this.checkoutService.reserva.titulo = this.espaco.titulo;
          this.checkoutService.reserva.id = response.id;
          console.log('Response: ', response);
          this.router.navigate(['/checkout']);
        }, (error) => {
          console.log("Aluguel error: ", error);
        });
      } else {
        this.checkoutService.checkout(this.checkoutService.reserva).subscribe(response => {
          console.log('Response: ', response);
          this.checkoutService.reserva = response;
          this.router.navigate(['/checkout']);
        }, (error) => {
          console.log("Aluguel error: ", error);
        });
      }
    } else {
      this.snackBar.open('Selecione as datas de entrada e saída', 'OK', { duration: 3000 })
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

  public totalDias() {
    let b = this.entrada;
    let a = this.saida;
    if (a == undefined || b == undefined) {
      return Number(1);
    } else {
      return Number(a.diff(b, 'days') + 1);
    }
  }

  selecionaData(type: string, event: MatDatepickerInputEvent<Date>) {
    if (type == 'entrada') {
      this.entrada = moment(event.value)
    } else if (type == 'saida') {
      this.saida = moment(event.value)
    }
  }

  private formatDate(date: Date) {
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return `${date.getFullYear()}-${month}-${day}`;
  }
}
