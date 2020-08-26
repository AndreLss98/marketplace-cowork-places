import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpacesComponent } from './spaces.component';

import { SpacesResolverService } from './resolver/spaces-resolver.service';
import { CondicoesResolverService } from './resolver/condicoes-resolver.service';

const routes: Routes = [
  { 
    path: '', 
    component: SpacesComponent,
    resolve: {
      data: SpacesResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpacesRoutingModule { }
