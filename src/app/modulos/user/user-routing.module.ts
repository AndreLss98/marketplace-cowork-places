import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user.component';
import { InfoComponent } from './components/conta/info/info.component';
import { SafetyComponent } from './components/conta/safety/safety.component';
import { FeedbackComponent } from './components/admin/feedback/feedback.component';
import { LocacoesComponent } from './components/anuncios/locacoes/locacoes.component';
import { EspacosSalvosComponent } from './components/espacos-salvos/espacos-salvos.component';
import { MeusAlugueisComponent } from './components/alugueis/meus-alugueis/meus-alugueis.component';
import { CriarAnuncioComponent } from './components/anuncios/criar-anuncio/criar-anuncio.component';
import { MeusAnunciosComponent } from './components/anuncios/meus-anuncios/meus-anuncios.component';
import { ListaUsuariosComponent } from './components/admin/usuarios/lista-usuarios/lista-usuarios.component';
import { ListaPoliticasComponent } from './components/admin/politicas/lista-politicas/lista-politicas.component';
import { ListaContratosComponent } from './components/admin/contratos/lista-contratos/lista-contratos.component';
import { ListaAlugaveisComponent } from './components/admin/alugaveis/lista-alugaveis/lista-alugaveis.component';
import { DetalhesUsuariosComponent } from './components/admin/usuarios/detalhes-usuarios/detalhes-usuarios.component';
import { DetalhesContratoComponent } from './components/admin/contratos/detalhes-contrato/detalhes-contrato.component';
import { DetalhesAlugaveisComponent } from './components/admin/alugaveis/detalhes-alugaveis/detalhes-alugaveis.component';

import { FeedbacksResolverService } from './resolvers/feedbacks-resolver.service';
import { ContratosListResolverService } from './resolvers/contratos-list-resolver.service';
import { DetalhesUsuarioResolverService } from './resolvers/detalhes-usuario-resolver.service';
import { DetalhesAlugavelResolverService } from './resolvers/detalhes-alugavel-resolver.service';
import { DetalhesContratoResolverService } from './resolvers/detalhes-contrato-resolver.service';
import { AnunciosLocacoesResolverService } from './resolvers/anuncios-locacoes-resolver.service';
import { AlugueisMeusalugueisResolverService } from './resolvers/alugueis-meusalugueis-resolver.service';

import { CriarAnuncioGuard } from './guard/criar-anuncio.guard';
import { EditarAnuncioGuard } from './guard/editar-anuncio.guard';


const routes: Routes = [
  { path: '', component: UserComponent,
  children:  [
    { path: 'conta/info', component: InfoComponent},
    { path: 'conta/safety', component: SafetyComponent},
    { path: 'usuarios', component: ListaUsuariosComponent},
    { path: 'anuncios', component: ListaAlugaveisComponent},
    { path: 'politicas', component: ListaPoliticasComponent},
    { path: 'espacossalvos', component: EspacosSalvosComponent},
    { path: 'anuncios/meusanuncios', component: MeusAnunciosComponent},
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
