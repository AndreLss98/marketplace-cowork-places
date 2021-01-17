import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoliticasResolver } from 'src/app/shared/resolvers/politicas-resolver';

import { AboutComponent } from './about.component';

const routes: Routes = [
  {
    path: '',
    component: AboutComponent,
    resolve: {
      politicas: PoliticasResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
