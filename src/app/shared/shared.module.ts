import { MdViewerComponent } from './components/md-viewer/md-viewer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from './materia.module';
import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { HighlightItemsComponent } from './components/highlight-items/highlight-items.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HighlightItemsComponent, MdViewerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    MarkdownModule,
    FormsModule
  ],
  exports: [FormsModule, MaterialModule, ReactiveFormsModule, HighlightItemsComponent, MdViewerComponent]
})
export class SharedModule { }
