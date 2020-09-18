import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpacesComponent } from './anuncio.component';

import { AnuncioResolverService } from './resolver/anuncio-resolver.service';
import { TaxaResolverService } from '../user/resolvers/taxa-resolver.service';

const routes: Routes = [
  { 
    path: '', 
    component: SpacesComponent,
    resolve: {
      espaco: AnuncioResolverService,
      taxa: TaxaResolverService,
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpacesRoutingModule { }
