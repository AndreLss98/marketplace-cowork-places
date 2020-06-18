import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { InfoComponent } from './components/conta/info/info.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ListaTiposComponent } from './components/tipos/lista-tipos/lista-tipos.component';
import { EspacosSalvosComponent } from './components/espacos-salvos/espacos-salvos.component';
import { CriarAnuncioComponent } from './components/anuncios/criar-anuncio/criar-anuncio.component';
import { MeusAnunciosComponent } from './components/anuncios/meus-anuncios/meus-anuncios.component';
import { ListaPoliticasComponent } from './components/politicas/lista-politicas/lista-politicas.component';

const routes: Routes = [
  { path: '', component: UserComponent,
  children:  [
    { path: 'tipos', component: ListaTiposComponent},
    { path: 'payments', component: PaymentsComponent},
    { path: 'espacossalvos', component: EspacosSalvosComponent},
    { path: 'anuncios/meusanuncios', component: MeusAnunciosComponent},
    { path: 'anuncios/criaranuncio', component: CriarAnuncioComponent},
    { path: 'conta/info', component: InfoComponent},
    { path: 'politicas', component: ListaPoliticasComponent},
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
