import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { SearchResolver } from './modulos/search/resolver/searchResolver.resolve';

import { UserGuard } from './modulos/user/guard/user.guard';
import { AnuncioGuard } from './modulos/anuncio/guard/anuncio.guard';
import { CheckoutGuardGuard } from './modulos/checkout/guard/checkout-guard.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./modulos/home/home.module').then(m => m.HomeModule) },
  { path: 'about', loadChildren: () => import('./modulos/about/about.module').then(m => m.AboutModule) },
  { path: 'confirm-email', loadChildren: () => import('./modulos/confirm-email/confirm-email.module').then(m => m.ConfirmEmailModule) },
  { 
    path: 'spaces/:id',
    loadChildren: () => import('./modulos/anuncio/anuncio.module').then(m => m.AnuncioModule),
    canActivate: [AnuncioGuard]
  },
  {
    path: 'user', 
    loadChildren: () => import('./modulos/user/user.module').then(m => m.UserModule),
    // canLoad: [UserGuard]
  },
  { 
    path: 'search', 
    loadChildren: () => import('./modulos/search/search.module').then(m => m.SearchModule),
    resolve: {
      source: SearchResolver
    }
  },
  { 
    path: 'checkout', 
    loadChildren: () => import('./modulos/checkout/checkout.module').then(m => m.CheckoutModule),
    canLoad: [CheckoutGuardGuard]
  },
  { path: '**', loadChildren: () => import('./modulos/notfound/notfound.module').then(m => m.NotfoundModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top', preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
  providers: [
    UserGuard,
    CheckoutGuardGuard
  ]
})
export class AppRoutingModule { }
