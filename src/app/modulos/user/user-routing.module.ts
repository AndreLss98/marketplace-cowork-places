import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { InfoComponent } from './components/conta/info/info.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { PessoaisComponent } from './components/documentos/pessoais/pessoais.component';
import { ListaTiposComponent } from './components/tipos/lista-tipos/lista-tipos.component';
import { EspacosSalvosComponent } from './components/espacos-salvos/espacos-salvos.component';
import { CriarAnuncioComponent } from './components/anuncios/criar-anuncio/criar-anuncio.component';
import { MeusAnunciosComponent } from './components/anuncios/meus-anuncios/meus-anuncios.component';
import { ListaPoliticasComponent } from './components/politicas/lista-politicas/lista-politicas.component';
import { ListaPerguntasComponent } from './components/questionario/lista-perguntas/lista-perguntas.component';
import { ListaCaracteristicasComponent } from './components/caracteristicas/lista-caracteristicas/lista-caracteristicas.component';

const routes: Routes = [
  { path: '', component: UserComponent,
  children:  [
    { path: 'tipos', component: ListaTiposComponent},
    { path: 'payments', component: PaymentsComponent},
    { path: 'conta/info', component: InfoComponent},
    { path: 'documentos', component: PessoaisComponent},
    { path: 'politicas', component: ListaPoliticasComponent},
    { path: 'questionario', component: ListaPerguntasComponent},
    { path: 'espacossalvos', component: EspacosSalvosComponent},
    { path: 'anuncios/meusanuncios', component: MeusAnunciosComponent},
    { path: 'anuncios/criaranuncio', component: CriarAnuncioComponent},
    { path: 'caracteristicas', component: ListaCaracteristicasComponent},
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
