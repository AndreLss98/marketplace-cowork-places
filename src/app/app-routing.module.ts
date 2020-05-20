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
  { path: 'spaces', loadChildren: () => import('./modulos/spaces/spaces.module').then(m => m.SpacesModule) },
  { path: 'spaces/:id', loadChildren: () => import('./modulos/spaces/spaces.module').then(m => m.SpacesModule) },
  { path: 'about', loadChildren: () => import('./modulos/about/about.module').then(m => m.AboutModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    SearchResolver
  ]
})
export class AppRoutingModule { }
