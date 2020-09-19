import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocacoesComponent } from './components/anuncios/locacoes/locacoes.component';

import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from './../../shared/shared.module';

import { UserComponent } from './user.component';
import { SafetyComponent } from './components/conta/safety/safety.component';
import { FeedbackComponent } from './components/admin/feedback/feedback.component';
import { EspacosSalvosComponent } from './components/espacos-salvos/espacos-salvos.component';
import { AnuncioFormComponent } from './components/anuncios/anuncio-form/anuncio-form.component';
import { MeusAlugueisComponent } from './components/alugueis/meus-alugueis/meus-alugueis.component';
import { MeusAnunciosComponent } from './components/anuncios/meus-anuncios/meus-anuncios.component';
import { ListaUsuariosComponent } from './components/admin/usuarios/lista-usuarios/lista-usuarios.component';
import { ListaContratosComponent } from './components/admin/contratos/lista-contratos/lista-contratos.component';
import { ListaPoliticasComponent } from './components/admin/politicas/lista-politicas/lista-politicas.component';
import { ListaAlugaveisComponent } from './components/admin/alugaveis/lista-alugaveis/lista-alugaveis.component';
import { DetalhesContratoComponent } from './components/admin/contratos/detalhes-contrato/detalhes-contrato.component';
import { DetalhesUsuariosComponent } from './components/admin/usuarios/detalhes-usuarios/detalhes-usuarios.component';
import { DetalhesAlugaveisComponent } from './components/admin/alugaveis/detalhes-alugaveis/detalhes-alugaveis.component';
import { DocumentosPessoaisComponent } from './components/admin/usuarios/documentos/pessoais/documentos-pessoais.component';
import { ListaTiposAlugaveisComponent } from './components/admin/alugaveis/lista-tipos-alugaveis/lista-tipos-alugaveis.component';
import { ListaCaracteristicasAlugaveisComponent } from './components/admin/alugaveis/lista-caracteristicas-alugaveis/lista-caracteristicas-alugaveis.component';
import { DadosPessoaisComponent } from './components/conta/informacoes-pessoais/dados-pessoais/dados-pessoais.component';
import { DocPessoaisComponent } from './components/conta/informacoes-pessoais/doc-pessoais/doc-pessoais.component';
import { DadosBancariosComponent } from './components/conta/informacoes-pessoais/dados-bancarios/dados-bancarios.component';


@NgModule({
  declarations: [
    UserComponent,
    SafetyComponent,
    FeedbackComponent,
    LocacoesComponent,
    AnuncioFormComponent,
    MeusAnunciosComponent,
    DocPessoaisComponent,
    MeusAlugueisComponent,
    ListaUsuariosComponent,
    ListaContratosComponent,
    EspacosSalvosComponent,
    ListaPoliticasComponent,
    DadosPessoaisComponent,
    ListaAlugaveisComponent,
    DadosBancariosComponent,
    DetalhesContratoComponent,
    DetalhesUsuariosComponent,
    DetalhesAlugaveisComponent,
    DocumentosPessoaisComponent,
    ListaTiposAlugaveisComponent,
    ListaCaracteristicasAlugaveisComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ]
})
export class UserModule { }
