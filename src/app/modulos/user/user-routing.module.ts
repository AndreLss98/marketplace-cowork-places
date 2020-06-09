import { CriarAnuncioComponent } from './components/anuncios/criar-anuncio/criar-anuncio.component';
import { EspacosSalvosComponent } from './components/espacos-salvos/espacos-salvos.component';
import { MeusAnunciosComponent } from './components/anuncios/meus-anuncios/meus-anuncios.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { PaymentsComponent } from './components/payments/payments.component';

const routes: Routes = [
  { path: '', component: UserComponent, 
  children:  [
    { path: 'payments', component: PaymentsComponent},
    { path: 'anuncios/meusanuncios', component: MeusAnunciosComponent},
    { path: 'anuncios/criaranuncio', component: CriarAnuncioComponent},
    { path: 'espacos/salvos', component: EspacosSalvosComponent},
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
