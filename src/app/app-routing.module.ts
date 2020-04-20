import { SearchResolver } from './modulos/search/resolver/searchResolver.resolve';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modulos/home/home.module').then(m => m.HomeModule) },
  { path: 'home', loadChildren: () => import('./modulos/home/home.module').then(m => m.HomeModule) },
  { 
    path: 'search', 
    loadChildren: () => import('./modulos/search/search.module').then(m => m.SearchModule),
    resolve: {
      source: SearchResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule],
  providers: [
    SearchResolver
  ]
})
export class AppRoutingModule { }
