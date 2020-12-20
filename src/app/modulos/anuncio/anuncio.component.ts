import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginComponent } from 'src/app/shared/modal/login/login.component';

import { environment } from 'src/environments/environment';
import { stringValueToBoolean, diffDates } from 'src/app/shared/constants/functions';
import { ENUM_ALUGAVEL_CARACTERISTICAS, ALUGAVEL_STATUS, TIPOS_CAMPOS } from 'src/app/shared/constants/constants';

import { UserService } from 'src/app/shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';
import { CheckoutService } from 'src/app/shared/service/checkout.service';
import { FavoritosService } from 'src/app/shared/service/favoritos.service';
import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';

@Component({
  selector: 'app-spaces',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.scss'],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'pt-br'
    }
  ]
})
export class SpacesComponent implements OnInit {

  readonly TIPOS_CAMPOS = TIPOS_CAMPOS;
  readonly SUPPORT_PHONE = environment.supportPhone;
  public CARACTERISTICAS = ENUM_ALUGAVEL_CARACTERISTICAS;

  public max_taxa;

  public backUrl = environment.apiUrl;

  public anuncio;

  public view = 'photos';

  public caracteristicasComIcone = [];
  public caracteristicasSemIcone = [];
  public imgUrl;
  public intervalData;

  public reservaForm: FormGroup;

  constructor(
    private router: Router,
    private login: LoginService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public userService: UserService,
    private checkoutService: CheckoutService,
    private alugavelService: AlugavelService,
    public alugaveisService: AlugaveisService,
    private favoritoService: FavoritosService,
  ) {

  }

  ngOnInit(): void {
    this.alugaveisService.anuncio = this.route.snapshot.data['espaco'];
    this.alugaveisService.anuncio.valor = Number(this.alugaveisService.anuncio.valor);
    this.alugaveisService.anuncio.valor_mes = Number(this.alugaveisService.anuncio.valor_mes);
    this.max_taxa = Number(this.route.snapshot.data['taxa'].taxa);

    this.route.params.subscribe(routeParams => {
      this.alugaveisService.getById(Number(routeParams.id)).subscribe(response => {
        this.alugaveisService.anuncio = response;
        console.log(response);

        this.imgUrl = response.anunciante_img;
      }, () => {
        this.configComponent();
      });
    });
  }

  ngAfterViewInit() {

  }

  private configComponent() {

    this.configCaracteristicas();

    this.alugavelService.getAllByUser(this.alugaveisService.anuncio.anunciante_id).subscribe(response => {
      this.alugaveisService.maisAnunciosDoAnunciante = response
        .filter(anuncio => anuncio.id !== this.alugaveisService.anuncio.id && anuncio.status === ALUGAVEL_STATUS.APPROVED.value);
    });
  }

  public favoritar() {
    if (this.anuncio.anunciante_id === this.userService.user_data.id) {
      this.snackBar.open('Você é o proprietário desse anúncio', 'OK', { duration: 1000 });
      return;
    }
    this.favoritoService.favoritar(this.anuncio.id).subscribe(res => {
      this.snackBar.open('Adicionado aos espaços salvos', 'OK', { duration: 1000 });
    }, err => {
      this.snackBar.open('Espaço já está salvo', 'OK', { duration: 1000 });
    });
  }

  public checkout() {
    if (!this.login.checkLogedIn()) return this.matDialog.open(LoginComponent);

    this.checkoutService.reserva = {
      max_taxa: this.max_taxa,
      anuncio: this.alugaveisService.anuncio,
      ...this.intervalData
    }

    if ((diffDates(this.intervalData.interval.entrada, this.intervalData.interval.saida) + 1) <= 31) {
      this.checkoutService.checkout(this.checkoutService.reserva).subscribe(response => {
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
        console.log("Aluguel recorrente error: ", error);
      });
    }
  }

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

  public configCaracteristicas() {
    this.alugaveisService.anuncio.caracteristicas.forEach(caracteristica => {
      if (caracteristica.tipo_campo.tipo === TIPOS_CAMPOS.BINARIO.nome) caracteristica.valor = stringValueToBoolean(caracteristica.valor);

      if (caracteristica.tipo_campo.tipo === TIPOS_CAMPOS.SELECAO.nome) {
        caracteristica.valor = caracteristica.tipo_campo.propriedades.possibilidades.find(possibilidade => possibilidade.id === Number(caracteristica.valor)).valor;
      }
    });
    this.caracteristicasComIcone = this.alugaveisService.anuncio.caracteristicas.filter(caracteristica => caracteristica.icone);

    this.caracteristicasSemIcone = this.alugaveisService.anuncio.caracteristicas
      .filter(caracteristica => !caracteristica.icone)
      .filter(caracteristica => caracteristica.valor);
  }
}
