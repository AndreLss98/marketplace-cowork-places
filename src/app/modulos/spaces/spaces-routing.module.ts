import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpacesComponent } from './spaces.component';

import { SpacesResolverService } from './resolver/spaces-resolver.service';
import { TaxaResolverService } from '../user/resolvers/taxa-resolver.service';

const routes: Routes = [
  { 
    path: '', 
    component: SpacesComponent,
    resolve: {
      espaco: SpacesResolverService,
      taxa: TaxaResolverService,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpacesRoutingModule { }
