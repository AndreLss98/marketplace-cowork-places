import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { ListaTiposComponent } from './components/tipos/lista-tipos/lista-tipos.component';
import { EspacosSalvosComponent } from './components/espacos-salvos/espacos-salvos.component';
import { MeusAnunciosComponent } from './components/anuncios/meus-anuncios/meus-anuncios.component';
import { CriarAnuncioComponent } from './components/anuncios/criar-anuncio/criar-anuncio.component';
import { InfoComponent } from './components/conta/info/info.component';
import { ListaPoliticasComponent } from './components/politicas/lista-politicas/lista-politicas.component';
import { ListaCaracteristicasComponent } from './components/caracteristicas/lista-caracteristicas/lista-caracteristicas.component';
import { ListaPerguntasComponent } from './components/questionario/lista-perguntas/lista-perguntas.component';
import { PessoaisComponent } from './components/documentos/pessoais/pessoais.component';
import { ListaUsuariosComponent } from './components/usuarios/lista-usuarios/lista-usuarios.component';
import { DetalhesUsuariosComponent } from './components/usuarios/detalhes-usuarios/detalhes-usuarios.component';
import { ListaAlugaveisComponent } from './components/alugaveis/lista-alugaveis/lista-alugaveis.component';
import { DetalhesAlugaveisComponent } from './components/alugaveis/detalhes-alugaveis/detalhes-alugaveis.component';


@NgModule({
  declarations: [UserComponent, PaymentsComponent, MeusAnunciosComponent, EspacosSalvosComponent, CriarAnuncioComponent, ListaTiposComponent, InfoComponent, ListaPoliticasComponent, ListaCaracteristicasComponent, ListaPerguntasComponent, PessoaisComponent, ListaUsuariosComponent, DetalhesUsuariosComponent, ListaAlugaveisComponent, DetalhesAlugaveisComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule { }
