import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from './../../shared/shared.module';

import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';

import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatListModule,
    AboutRoutingModule,
    MarkdownModule.forChild(),
  ]
})
export class AboutModule { }
