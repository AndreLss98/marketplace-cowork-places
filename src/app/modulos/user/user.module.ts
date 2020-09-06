import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocacoesComponent } from './components/anuncios/locacoes/locacoes.component';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from './../../shared/shared.module';

import { UserComponent } from './user.component';
import { InfoComponent } from './components/conta/info/info.component';
import { SafetyComponent } from './components/conta/safety/safety.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { CondicoesComponent } from './components/condicoes/condicoes.component';
import { InfoModalComponent } from './components/conta/info/info-modal.component';
import { FeedbackComponent } from './components/admin/feedback/feedback.component';
import { EspacosSalvosComponent } from './components/espacos-salvos/espacos-salvos.component';
import { MeusAlugueisComponent } from './components/alugueis/meus-alugueis/meus-alugueis.component';
import { CriarAnuncioComponent } from './components/anuncios/criar-anuncio/criar-anuncio.component';
import { MeusAnunciosComponent } from './components/anuncios/meus-anuncios/meus-anuncios.component';
import { SafetyModalComponent } from './components/conta/safety/safety-modal/safety-modal.component';
import { ListaAlugaveisComponent } from './components/alugaveis/lista-alugaveis/lista-alugaveis.component';
import { ListaContratosComponent } from './components/contratos/lista-contratos/lista-contratos.component';
import { ListaPoliticasComponent } from './components/politicas/lista-politicas/lista-politicas.component';
import { ListaUsuariosComponent } from './components/admin/usuarios/lista-usuarios/lista-usuarios.component';
import { ListaPerguntasComponent } from './components/questionario/lista-perguntas/lista-perguntas.component';
import { DetalhesUsuariosComponent } from './components/admin/usuarios/detalhes-usuarios/detalhes-usuarios.component';
import { DocumentosPessoaisComponent } from './components/admin/usuarios/documentos/pessoais/documentos-pessoais.component';

import { DetalhesContratoComponent } from './components/contratos/detalhes-contrato/detalhes-contrato.component';
import { DetalhesAlugaveisComponent } from './components/alugaveis/detalhes-alugaveis/detalhes-alugaveis.component';

import { ListaTiposAlugaveisComponent } from './components/alugaveis/lista-tipos-alugaveis/lista-tipos-alugaveis.component';
import { ListaCaracteristicasAlugaveisComponent } from './components/alugaveis/lista-caracteristicas-alugaveis/lista-caracteristicas-alugaveis.component';

@NgModule({
  declarations: [
    UserComponent, 
    InfoComponent, 
    SafetyComponent, 
    PaymentsComponent,
    FeedbackComponent,
    LocacoesComponent,
    CondicoesComponent, 
    InfoModalComponent,
    CriarAnuncioComponent, 
    MeusAnunciosComponent, 
    MeusAlugueisComponent,
    ListaUsuariosComponent, 
    ListaContratosComponent,
    EspacosSalvosComponent,
    ListaPoliticasComponent, 
    ListaAlugaveisComponent, 
    ListaPerguntasComponent, 
    DetalhesUsuariosComponent, 
    DetalhesAlugaveisComponent, 
    DocumentosPessoaisComponent,
    ListaTiposAlugaveisComponent,
    ListaCaracteristicasAlugaveisComponent,
    SafetyModalComponent, DetalhesContratoComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
  ]
})
export class UserModule { }
