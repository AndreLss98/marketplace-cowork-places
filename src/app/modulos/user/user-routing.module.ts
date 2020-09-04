import { AnunciosLocacoesResolverService } from './resolvers/anuncios-locacoes-resolver.service';
import { LocacoesComponent } from './components/anuncios/locacoes/locacoes.component';
import { AlugueisMeusalugueisResolverService } from './resolvers/alugueis-meusalugueis-resolver.service';
import { MeusAlugueisComponent } from './components/alugueis/meus-alugueis/meus-alugueis.component';
import { SafetyComponent } from './components/conta/safety/safety.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { InfoComponent } from './components/conta/info/info.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
// import { CondicoesComponent } from './components/condicoes/condicoes.component';
import { PessoaisComponent } from './components/documentos/pessoais/pessoais.component';
import { ListaTiposComponent } from './components/tipos/lista-tipos/lista-tipos.component';
import { EspacosSalvosComponent } from './components/espacos-salvos/espacos-salvos.component';
import { CriarAnuncioComponent } from './components/anuncios/criar-anuncio/criar-anuncio.component';
import { MeusAnunciosComponent } from './components/anuncios/meus-anuncios/meus-anuncios.component';
import { ListaUsuariosComponent } from './components/usuarios/lista-usuarios/lista-usuarios.component';
import { ListaAlugaveisComponent } from './components/alugaveis/lista-alugaveis/lista-alugaveis.component';
import { ListaPoliticasComponent } from './components/politicas/lista-politicas/lista-politicas.component';
import { ListaContratosComponent } from './components/contratos/lista-contratos/lista-contratos.component';
// import { ListaPerguntasComponent } from './components/questionario/lista-perguntas/lista-perguntas.component';
import { DetalhesUsuariosComponent } from './components/usuarios/detalhes-usuarios/detalhes-usuarios.component';
import { DetalhesContratoComponent } from './components/contratos/detalhes-contrato/detalhes-contrato.component';
import { DetalhesAlugaveisComponent } from './components/alugaveis/detalhes-alugaveis/detalhes-alugaveis.component';
import { ListaCaracteristicasComponent } from './components/caracteristicas/lista-caracteristicas/lista-caracteristicas.component';

import { ContratosListResolverService } from './resolvers/contratos-list-resolver.service';
import { DetalhesUsuarioResolverService } from './resolvers/detalhes-usuario-resolver.service';
import { DetalhesAlugavelResolverService } from './resolvers/detalhes-alugavel-resolver.service';

import { CriarAnuncioGuard } from './guard/criar-anuncio.guard';
import { EditarAnuncioGuard } from './guard/editar-anuncio.guard';
import { DetalhesContratoResolverService } from './resolvers/detalhes-contrato-resolver.service';
import { FeedbacksResolverService } from './resolvers/feedbacks-resolver.service';

const routes: Routes = [
  { path: '', component: UserComponent,
  children:  [
    { path: 'conta/info', component: InfoComponent},
    { path: 'conta/safety', component: SafetyComponent},
    { path: 'tipos', component: ListaTiposComponent},
    { path: 'payments', component: PaymentsComponent},
    { path: 'documentos', component: PessoaisComponent},
    { path: 'usuarios', component: ListaUsuariosComponent},
    { path: 'anuncios', component: ListaAlugaveisComponent},
    { path: 'politicas', component: ListaPoliticasComponent},
    // { path: 'questionario', component: ListaPerguntasComponent},
    { path: 'espacossalvos', component: EspacosSalvosComponent},
    { path: 'anuncios/meusanuncios', component: MeusAnunciosComponent},
    { path: 'caracteristicas', component: ListaCaracteristicasComponent},
    // { path: 'condicoes', component: CondicoesComponent},
    {
      path: 'feedbacks',
      resolve: {
        feedbacks: FeedbacksResolverService
      },
      component: FeedbackComponent
    },
    {
      path: 'contratos',
      resolve: {
        contratos: ContratosListResolverService
      },
      component: ListaContratosComponent
    },
    {
      path: 'contratos/:id',
      resolve: {
        aluguel: DetalhesContratoResolverService
      },
      component: DetalhesContratoComponent
    },
    { 
      path: 'anuncios/editaranuncio', 
      component: CriarAnuncioComponent,
      canActivate: [EditarAnuncioGuard]
    },
    { 
      path: 'anuncios/criaranuncio', 
      component: CriarAnuncioComponent,
      canActivate: [CriarAnuncioGuard]
    },
    { 
      path: 'anuncios/locacoes', 
      resolve: {
        alugueis: AnunciosLocacoesResolverService
      },
      component: LocacoesComponent,
    },
    { 
      path: 'anuncios/:id',
      resolve: {
        alugavel: DetalhesAlugavelResolverService
      },
      component: DetalhesAlugaveisComponent
    },
    { 
      path: 'usuarios/:id',
      resolve: {
        user: DetalhesUsuarioResolverService
      },
      component: DetalhesUsuariosComponent
    },
    { 
      path: 'alugueis',
      resolve: {
        alugueis: AlugueisMeusalugueisResolverService
      },
      component: MeusAlugueisComponent
    },
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
