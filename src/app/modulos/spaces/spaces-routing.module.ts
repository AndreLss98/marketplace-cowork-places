import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpacesComponent } from './spaces.component';

const routes: Routes = [{ path: '', component: SpacesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpacesRoutingModule { }
