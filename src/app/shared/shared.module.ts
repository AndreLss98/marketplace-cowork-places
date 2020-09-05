import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { MapsComponent } from './maps/maps.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { MdViewerComponent } from './components/md-viewer/md-viewer.component';
import { BasicModalComponent } from './modal/basic-modal/basic-modal.component';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { ImgCircularComponent } from './components/img-circular/img-circular.component';
import { HighlightItemsComponent } from './components/highlight-items/highlight-items.component';
import { CancelDialogComponent } from './components/contrato/cancel-dialog/cancel-dialog.component';
import { QuestionAnsweredComponent } from './components/question-answered/question-answered.component';

@NgModule({
  declarations: [ 
    MapsComponent,
    MdViewerComponent,
    ContratoComponent,
    BasicModalComponent,
    ImgCircularComponent,
    ErrorDialogComponent,
    CancelDialogComponent,
    HighlightItemsComponent,
    QuestionAnsweredComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule, 
    MarkdownModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    MapsComponent,
    MaterialModule,
    MdViewerComponent,
    ContratoComponent,
    BasicModalComponent,
    ReactiveFormsModule,
    ErrorDialogComponent,
    ImgCircularComponent,
    CancelDialogComponent,
    HighlightItemsComponent,
    QuestionAnsweredComponent,
  ]
})
export class SharedModule { }
