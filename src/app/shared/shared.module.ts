import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';

import { MapsComponent } from './maps/maps.component';
import { MdViewerComponent } from './components/md-viewer/md-viewer.component';
import { HighlightItemsComponent } from './components/highlight-items/highlight-items.component';

@NgModule({
  declarations: [HighlightItemsComponent, MdViewerComponent, MapsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MarkdownModule,
    FormsModule,
  ],
  exports: [
    FormsModule, 
    MapsComponent,
    MaterialModule, 
    MdViewerComponent, 
    ReactiveFormsModule, 
    HighlightItemsComponent, 
  ]
})
export class SharedModule { }
