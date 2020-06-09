import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { MeusAnunciosComponent } from './components/anuncios/meus-anuncios/meus-anuncios.component';
import { EspacosSalvosComponent } from './components/espacos-salvos/espacos-salvos.component';
import { CriarAnuncioComponent } from './components/anuncios/criar-anuncio/criar-anuncio.component';


@NgModule({
  declarations: [UserComponent, PaymentsComponent, MeusAnunciosComponent, EspacosSalvosComponent, CriarAnuncioComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule { }
