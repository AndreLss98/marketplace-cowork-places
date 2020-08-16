import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { MapsComponent } from './maps/maps.component';
import { MdViewerComponent } from './components/md-viewer/md-viewer.component';
import { HighlightItemsComponent } from './components/highlight-items/highlight-items.component';
import { AlugueisAtivosComponent } from './components/alugueis-ativos/alugueis-ativos.component';
import { RouterModule } from '@angular/router';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';

@NgModule({
  declarations: [ 
    MapsComponent,
    MdViewerComponent,
    ErrorDialogComponent,
    HighlightItemsComponent,
    AlugueisAtivosComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MarkdownModule,
    FormsModule,
    RouterModule, 
  ],
  exports: [
    FormsModule, 
    MapsComponent,
    MaterialModule, 
    MdViewerComponent, 
    ReactiveFormsModule, 
    ErrorDialogComponent,
    HighlightItemsComponent, 
    AlugueisAtivosComponent,
  ]
})
export class SharedModule { }
