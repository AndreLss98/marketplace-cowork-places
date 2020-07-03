import { SpacesResolverService } from './resolver/spaces-resolver.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpacesComponent } from './spaces.component';

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
