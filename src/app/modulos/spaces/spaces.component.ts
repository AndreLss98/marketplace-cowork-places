import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as moment from 'moment';

import { LoginComponent } from 'src/app/shared/modal/login/login.component';

import { environment } from 'src/environments/environment';
import { ENUM_ALUGAVEL_CARACTERISTICAS } from 'src/app/shared/constants/constants';

import { UserService } from 'src/app/shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';
import { CheckoutService } from 'src/app/shared/service/checkout.service';
import { FavoritosService } from 'src/app/shared/service/favoritos.service';

@Component({
  selector: 'app-spaces',
  templateUrl: './spaces.component.html',
  styleUrls: ['./spaces.component.scss'],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-br'
    }
  ]
})
export class SpacesComponent implements OnInit {

  public CARACTERISTICAS = ENUM_ALUGAVEL_CARACTERISTICAS;

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
  public isDaily: boolean = true;

  public reservedDays: any = [];
  readonly minDate = this.setMinDate();

  public rangeFilter = (date: Date | null): boolean => {
    const reservedRange = this.reservedDays.find(range => date.getTime() >= range.data_entrada.getTime() &&  date.getTime() <= range.data_saida.getTime());
    return reservedRange? false : true;
  }

  public reservaForm: FormGroup;

  constructor(
    private router: Router,
    private login: LoginService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
    private alugavelService: AlugavelService,
    private favoritoService: FavoritosService,
  ) {
    this.reservaForm = formBuilder.group({
      entrada: ['', [Validators.required]],
      saida: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.alugavelService.getTaxa().subscribe(response => {
      this.max_taxa = Number(response.taxa);
    });

    this.espaco = this.route.snapshot.data['data'];
    this.condicoes = this.route.snapshot.data['condicoes'];

    this.alugavelService.getDiasReservados(this.espaco.id).subscribe(response => {
      this.reservedDays = response;
      for (let reserved of this.reservedDays) {
        reserved.data_entrada = new Date(reserved.data_entrada);
        reserved.data_entrada.setDate(reserved.data_entrada.getDate() + 1);
        reserved.data_entrada.setHours(0, 0, 0);

        reserved.data_saida = new Date(reserved.data_saida);
        reserved.data_saida.setDate(reserved.data_saida.getDate() + 1);
        reserved.data_saida.setHours(0, 0, 0);
      }
    });

    this.alugavelService.getAllByUser(this.espaco.anunciante_id).subscribe(response => {
      this.espacos = response.filter(anuncio => anuncio.id !== this.espaco.id);
    });
  }

  public validateRange() {
    if (this.reservaForm.controls.saida.value) {
      const conflictRange = this.reservedDays.find(range => range.data_entrada.getTime() > this.reservaForm.controls.entrada.value.getTime() && range.data_entrada.getTime() < this.reservaForm.controls.saida.value.getTime());
      if (conflictRange) {
        this.reservaForm.controls.entrada.setValue(null);
        this.reservaForm.controls.saida.setValue(null);
        this.snackBar.open('Intervalo inválido', 'Ok', { duration: 2000 });
      }
    }
  }

  public favoritar() {
    if (this.espaco.anunciante_id === this.userService.user_data.id) {
      this.snackBar.open('Você é o proprietário desse anúncio', 'OK', {duration: 1000});
      return;
    }
    this.favoritoService.favoritar(this.espaco.id).subscribe(res => {
      this.snackBar.open('Adicionado aos espaços salvos', 'OK', {duration: 1000});
    }, err => {
      this.favoritoService.desfavoritar(this.espaco.id).subscribe( response => {
        this.snackBar.open('Removido dos espaços salvos', 'OK', {duration: 1000});
      })
    });
  }

  public checkout() {
    if(!this.login.checkLogedIn()){
      this.matDialog.open(LoginComponent);
      return;
    }

    this.checkoutService.reserva = {
      dias_reservados: {
        data_entrada: this.formatDate(this.reservaForm.controls['entrada'].value),
        data_saida: this.formatDate(this.reservaForm.controls['saida'].value)
      },
      valor: this.calculaTotalPeriodo().toFixed(2),
      alugavel_id: this.espaco.id
    };

    if (this.totalDias() <= 31 || Math.round(this.totalDias() / 31) === 1) {
      this.checkoutService.checkout(this.checkoutService.reserva).subscribe(response => {
        this.checkoutService.reserva.titulo = this.espaco.titulo;
        this.checkoutService.reserva.id = response.id;
        this.router.navigate(['/checkout']);
      }, (error) => {
        console.log("Aluguel error: ", error);
      });
    } else {
      this.checkoutService.checkout(this.checkoutService.reserva).subscribe(response => {
        this.checkoutService.reserva.paypal_plan_id = response.paypal_plan_id;
        this.checkoutService.reserva.id = response.id;
        this.router.navigate(['/checkout']);
      }, (error) => {
        console.log("Aluguel error: ", error);
      });
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

  public calculaCustoMes(taxa, custo_mes): number {
    if (this.espaco.valor_mes == 0) {
      return this.calculaCustoDia(taxa, this.espaco.valor) * 31;
    } else if (taxa == this.max_taxa) {
      return Number(custo_mes);
    } else if (taxa == this.max_taxa / 2) {
      return Number(custo_mes * (taxa / 100 + 1))
    } else {
      return Number(custo_mes * (this.max_taxa / 100 + 1))
    }
  }

  public calculaTaxa(taxa, custo): number {
    if (custo == 0) return Number(this.espaco.valor * (taxa / 100))
    return Number(custo * (taxa / 100))
  }

  public calculaTaxaMes(taxa, custo_mes): number {
    if (this.espaco.valor_mes == 0) return this.calculaTaxa(taxa, this.espaco.valor);
    return Number(custo_mes * (taxa / 100));
  }

  public calculaTotal(taxa, custo_dia): number {
    return Number(this.calculaCustoDia(taxa, custo_dia) + this.calculaTaxa(taxa, custo_dia));
  }

  public calculaTotalMes(taxa, custo_mes): number {
    return Number(this.calculaCustoMes(taxa, custo_mes) + this.calculaTaxaMes(taxa, custo_mes));
  }

  public calculaTotalPeriodo(): number {
    let b = moment(this.reservaForm.controls['entrada'].value);
    let a = moment(this.reservaForm.controls['saida'].value);

    if (a == undefined || b == undefined) {
      this.isDaily = true;
      return Number(this.calculaTotal(this.espaco.taxa, this.espaco.valor));
    } else if((a.diff(b, 'days') + 1) > 30) {
      this.isDaily = false;
      if (this.espaco.valor_mes == 0) return Number((a.diff(b, 'days') + 1) * this.calculaTotal(this.espaco.taxa, this.espaco.valor));
      return Number((a.diff(b, 'days') + 1) * this.calculaTotalMes(this.espaco.taxa, this.espaco.valor_mes)) / 31;
    } else {
      this.isDaily = true;
      return Number((a.diff(b, 'days') + 1) * this.calculaTotal(this.espaco.taxa, this.espaco.valor));
    }
  }

  public totalDias() {
    let b = moment(this.reservaForm.controls['entrada'].value);
    let a = moment(this.reservaForm.controls['saida'].value);
    if (a == undefined || b == undefined) {
      return Number(1);
    } else {
      return Number(a.diff(b, 'days') + 1);
    }
  }

  public formatDate(date: Date) {
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return `${date.getFullYear()}-${month}-${day}`;
  }

  public formDateFormat(field) {
    if (!field) return '';
    console.log('Date: ', field);
    const date = new Date(field);
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return `${day}/${month}/${date.getFullYear()}`;
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

  private setMinDate() {
    let today = new Date();
    today.setDate(today.getDate() + 2);
    return today;
  }
}
