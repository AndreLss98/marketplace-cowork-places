import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './materia.module';

import { NgModule } from '@angular/core';
import { HighlightItemsComponent } from './components/highlight-items/highlight-items.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [HighlightItemsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [FormsModule, MaterialModule, ReactiveFormsModule, HighlightItemsComponent]
})
export class SharedModule { }
