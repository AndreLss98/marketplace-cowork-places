import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpacesComponent } from './anuncio.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { SpacesRoutingModule } from './anuncio-routing.module';


@NgModule({
  declarations: [ SpacesComponent ],
  imports: [
    SharedModule,
    CommonModule,
    SpacesRoutingModule
  ]
})
export class AnuncioModule { }
