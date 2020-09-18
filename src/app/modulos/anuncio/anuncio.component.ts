import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { LoginComponent } from 'src/app/shared/modal/login/login.component';

import { environment } from 'src/environments/environment';
import { formatDate } from 'src/app/shared/constants/functions';
import { ENUM_ALUGAVEL_CARACTERISTICAS, ALUGAVEL_STATUS } from 'src/app/shared/constants/constants';

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

  public CARACTERISTICAS = ENUM_ALUGAVEL_CARACTERISTICAS;

  public max_taxa;
  
  public backUrl = environment.apiUrl;

  public espaco;
  public espacos = [];

  public view = 'photos';

  // public rangeFilter = (date: Date | null): boolean => {
  //   const reservedRange = this.reservedDays.find(range => date.getTime() >= range.data_entrada.getTime() &&  date.getTime() <= range.data_saida.getTime());
  //   return reservedRange? false : true;
  // }

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
    
  }

  ngOnInit(): void {
    this.espaco = this.route.snapshot.data['espaco'];
    this.max_taxa = Number(this.route.snapshot.data['taxa'].taxa);

    console.log(this.route.snapshot.data);

    this.alugavelService.getAllByUser(this.espaco.anunciante_id).subscribe(response => {
      this.espacos = response.filter(anuncio => anuncio.id !== this.espaco.id && anuncio.status === ALUGAVEL_STATUS.APPROVED.name);
    });

    // this.alugavelService.getDiasReservados(this.espaco.id).subscribe(response => {
    //   this.reservedDays = response;
    //   for (let reserved of this.reservedDays) {
    //     reserved.data_entrada = new Date(reserved.data_entrada);
    //     reserved.data_entrada.setDate(reserved.data_entrada.getDate() + 1);
    //     reserved.data_entrada.setHours(0, 0, 0);

    //     reserved.data_saida = new Date(reserved.data_saida);
    //     reserved.data_saida.setDate(reserved.data_saida.getDate() + 1);
    //     reserved.data_saida.setHours(0, 0, 0);
    //   }
    // });
  }

  ngAfterViewInit() {
    const topo = document.getElementById("sidebar");
    topo.scrollIntoView({ behavior: 'auto' });
  }

  // public validateRange() {
  //   if (this.reservaForm.controls.saida.value) {
  //     const conflictRange = this.reservedDays.find(range => range.data_entrada.getTime() > this.reservaForm.controls.entrada.value.getTime() && range.data_entrada.getTime() < this.reservaForm.controls.saida.value.getTime());
  //     if (conflictRange) {
  //       this.reservaForm.controls.entrada.setValue(null);
  //       this.reservaForm.controls.saida.setValue(null);
  //       this.snackBar.open('Intervalo inválido', 'Ok', { duration: 2000 });
  //     }
  //   }
  // }

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
        data_entrada: formatDate(this.reservaForm.controls['entrada'].value),
        data_saida: formatDate(this.reservaForm.controls['saida'].value)
      },
      valor: 100,
      alugavel_id: this.espaco.id
    };

    // if (this.totalDias() <= 31 || Math.round(this.totalDias() / 31) === 1) {
    //   this.checkoutService.checkout(this.checkoutService.reserva).subscribe(response => {
    //     this.checkoutService.reserva.titulo = this.espaco.titulo;
    //     this.checkoutService.reserva.id = response.id;
    //     this.router.navigate(['/checkout']);
    //   }, (error) => {
    //     console.log("Aluguel error: ", error);
    //   });
    // } else {
    //   this.checkoutService.checkout(this.checkoutService.reserva).subscribe(response => {
    //     this.checkoutService.reserva.paypal_plan_id = response.paypal_plan_id;
    //     this.checkoutService.reserva.id = response.id;
    //     this.router.navigate(['/checkout']);
    //   }, (error) => {
    //     console.log("Aluguel error: ", error);
    //   });
    // }
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
}
