import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpacesRoutingModule } from './spaces-routing.module';
import { SpacesComponent } from './spaces.component';
import { CardReservarComponent } from './components/card-reservar/card-reservar.component';


@NgModule({
  declarations: [SpacesComponent, CardReservarComponent],
  imports: [
    SharedModule,
    CommonModule,
    SpacesRoutingModule
  ]
})
export class SpacesModule { }
