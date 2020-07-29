import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared.module';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { InfoComponent } from './components/conta/info/info.component';
import { SafetyComponent } from './components/conta/safety/safety.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { CondicoesComponent } from './components/condicoes/condicoes.component';
import { PessoaisComponent } from './components/documentos/pessoais/pessoais.component';
import { ListaTiposComponent } from './components/tipos/lista-tipos/lista-tipos.component';
import { EspacosSalvosComponent } from './components/espacos-salvos/espacos-salvos.component';
import { CriarAnuncioComponent } from './components/anuncios/criar-anuncio/criar-anuncio.component';
import { MeusAnunciosComponent } from './components/anuncios/meus-anuncios/meus-anuncios.component';
import { ListaUsuariosComponent } from './components/usuarios/lista-usuarios/lista-usuarios.component';
import { ListaAlugaveisComponent } from './components/alugaveis/lista-alugaveis/lista-alugaveis.component';
import { ListaPoliticasComponent } from './components/politicas/lista-politicas/lista-politicas.component';
import { ListaPerguntasComponent } from './components/questionario/lista-perguntas/lista-perguntas.component';
import { DetalhesUsuariosComponent } from './components/usuarios/detalhes-usuarios/detalhes-usuarios.component';
import { DetalhesAlugaveisComponent } from './components/alugaveis/detalhes-alugaveis/detalhes-alugaveis.component';
import { ListaCaracteristicasComponent } from './components/caracteristicas/lista-caracteristicas/lista-caracteristicas.component';


@NgModule({
  declarations: [UserComponent, PaymentsComponent, MeusAnunciosComponent, EspacosSalvosComponent, CriarAnuncioComponent, ListaTiposComponent, InfoComponent, ListaPoliticasComponent, ListaCaracteristicasComponent, ListaPerguntasComponent, PessoaisComponent, ListaUsuariosComponent, DetalhesUsuariosComponent, ListaAlugaveisComponent, DetalhesAlugaveisComponent, CondicoesComponent, FeedbackComponent, SafetyComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule { }
