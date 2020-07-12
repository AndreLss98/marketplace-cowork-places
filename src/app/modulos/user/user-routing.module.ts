import { CriarAnuncioGuard } from './guard/criar-anuncio.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

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
import { ListaUsuariosComponent } from './components/usuarios/lista-usuarios/lista-usuarios.component';
import { DetalhesUsuarioResolverService } from './resolvers/detalhes-usuario-resolver.service';
import { DetalhesUsuariosComponent } from './components/usuarios/detalhes-usuarios/detalhes-usuarios.component';
import { ListaAlugaveisComponent } from './components/alugaveis/lista-alugaveis/lista-alugaveis.component';
import { DetalhesAlugavelResolverService } from './resolvers/detalhes-alugavel-resolver.service';
import { DetalhesAlugaveisComponent } from './components/alugaveis/detalhes-alugaveis/detalhes-alugaveis.component';
import { CondicoesComponent } from './components/condicoes/condicoes.component';
import { EditarAnuncioGuard } from './guard/editar-anuncio.guard';

const routes: Routes = [
  { path: '', component: UserComponent,
  children:  [
    { path: 'conta/info', component: InfoComponent},
    { path: 'tipos', component: ListaTiposComponent},
    { path: 'payments', component: PaymentsComponent},
    { path: 'documentos', component: PessoaisComponent},
    { path: 'usuarios', component: ListaUsuariosComponent},
    { path: 'anuncios', component: ListaAlugaveisComponent},
    { path: 'politicas', component: ListaPoliticasComponent},
    { path: 'questionario', component: ListaPerguntasComponent},
    { path: 'espacossalvos', component: EspacosSalvosComponent},
    { path: 'anuncios/meusanuncios', component: MeusAnunciosComponent},
    { path: 'caracteristicas', component: ListaCaracteristicasComponent},
    { path: 'condicoes', component: CondicoesComponent},
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
      path: 'usuarios/:id',
      resolve: {
        user: DetalhesUsuarioResolverService
      },
      component: DetalhesUsuariosComponent
    },
    { 
      path: 'anuncios/:id',
      resolve: {
        alugavel: DetalhesAlugavelResolverService
      },
      component: DetalhesAlugaveisComponent
    },
  ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
