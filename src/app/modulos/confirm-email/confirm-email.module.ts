import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmEmailRoutingModule } from './confirm-email-routing.module';
import { ConfirmEmailComponent } from './confirm-email.component';


@NgModule({
  declarations: [ConfirmEmailComponent],
  imports: [
    CommonModule,
    SharedModule,
    ConfirmEmailRoutingModule
  ]
})
export class ConfirmEmailModule { }
