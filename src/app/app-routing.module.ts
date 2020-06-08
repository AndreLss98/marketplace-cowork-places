import { UserGuard } from './modulos/user/guard/user.guard';
import { SearchResolver } from './modulos/search/resolver/searchResolver.resolve';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modulos/home/home.module').then(m => m.HomeModule) },
  { path: 'home', loadChildren: () => import('./modulos/home/home.module').then(m => m.HomeModule) },
  { path: 'spaces/:id', loadChildren: () => import('./modulos/spaces/spaces.module').then(m => m.SpacesModule) },
  { path: 'about', loadChildren: () => import('./modulos/about/about.module').then(m => m.AboutModule) },
  { 
    path: 'user', 
    loadChildren: () => import('./modulos/user/user.module').then(m => m.UserModule),
    canLoad: [UserGuard]
  },
  { path: '**', loadChildren: () => import('./modulos/notfound/notfound.module').then(m => m.NotfoundModule) },
  { 
    path: 'search', 
    loadChildren: () => import('./modulos/search/search.module').then(m => m.SearchModule),
    resolve: {
      source: SearchResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    SearchResolver,
    UserGuard
  ]
})
export class AppRoutingModule { }
