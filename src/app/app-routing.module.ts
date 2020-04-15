import { SearchResolver } from './modulos/search/resolver/searchResolver.resolve';
import { SearchComponent } from './modulos/search/search/search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modulos/home/home/home.component';
import { NotfoundComponent } from './modulos/notfound/notfound/notfound.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'search', component: SearchComponent , resolve: { source: SearchResolver }},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    SearchResolver
  ]
})
export class AppRoutingModule { }
