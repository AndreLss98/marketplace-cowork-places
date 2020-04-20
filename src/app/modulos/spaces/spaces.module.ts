import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpacesRoutingModule } from './spaces-routing.module';
import { SpacesComponent } from './spaces.component';


@NgModule({
  declarations: [SpacesComponent],
  imports: [
    CommonModule,
    SpacesRoutingModule
  ]
})
export class SpacesModule { }
