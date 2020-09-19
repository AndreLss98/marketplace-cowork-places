import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginComponent } from 'src/app/shared/modal/login/login.component';

import { environment } from 'src/environments/environment';
import { formatDate, stringValueToBoolean, diffDates, formatServerDate } from 'src/app/shared/constants/functions';
import { ENUM_ALUGAVEL_CARACTERISTICAS, ALUGAVEL_STATUS, TIPOS_CAMPOS } from 'src/app/shared/constants/constants';

import { UserService } from 'src/app/shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';
import { CheckoutService } from 'src/app/shared/service/checkout.service';
import { FavoritosService } from 'src/app/shared/service/favoritos.service';

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

  public CARACTERISTICAS = ENUM_ALUGAVEL_CARACTERISTICAS;

  public max_taxa;
  
  public backUrl = environment.apiUrl;

  public anuncio;
  public maisEspacosDoLocador = [];

  public view = 'photos';

  public caracteristicasComIcone = [];
  public caracteristicasSemIcone = [];

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
    private favoritoService: FavoritosService,
  ) {
    
  }

  ngOnInit(): void {
    this.anuncio = this.route.snapshot.data['espaco'];
    this.max_taxa = Number(this.route.snapshot.data['taxa'].taxa);

    this.configCaracteristicas();


    this.alugavelService.getAllByUser(this.anuncio.anunciante_id).subscribe(response => {
      this.maisEspacosDoLocador = response.filter(anuncio => anuncio.id !== this.anuncio.id && anuncio.status === ALUGAVEL_STATUS.APPROVED.value);
    });
  }

  ngAfterViewInit() {
    
  }

  public favoritar() {
    if (this.anuncio.anunciante_id === this.userService.user_data.id) {
      this.snackBar.open('Você é o proprietário desse anúncio', 'OK', {duration: 1000});
      return;
    }
    this.favoritoService.favoritar(this.anuncio.id).subscribe(res => {
      this.snackBar.open('Adicionado aos espaços salvos', 'OK', {duration: 1000});
    }, err => {
      this.snackBar.open('Espaço já está salvo', 'OK', {duration: 1000});
    });
  }

  public checkout() {
    if(!this.login.checkLogedIn()) return this.matDialog.open(LoginComponent);

    this.checkoutService.reserva = {
      max_taxa: this.max_taxa,
      anuncio: this.anuncio,
      ...this.intervalData,
    }

    if ((diffDates(this.intervalData.entrada, this.intervalData.entrada) + 1) <= 31) {
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
        console.log("Aluguel error: ", error);
      });
    }
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

  public configCaracteristicas() {
    this.anuncio.caracteristicas.forEach(caracteristica => {
      if (caracteristica.tipo_campo.tipo === TIPOS_CAMPOS.BINARIO.nome) caracteristica.valor = stringValueToBoolean(caracteristica.valor);
    });
    this.caracteristicasComIcone = this.anuncio.caracteristicas.filter(caracteristica => caracteristica.icone);
    this.caracteristicasSemIcone = this.anuncio.caracteristicas.filter(caracteristica => !caracteristica.icone);
  }
}
