import { NgModule } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MapsComponent } from './components/maps/maps.component';
import { HeaderComponent } from './components/header/header.component';
import { DropzoneComponent } from './components/dropzone/dropzone.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { MdViewerComponent } from './components/md-viewer/md-viewer.component';
import { BasicModalComponent } from './modal/basic-modal/basic-modal.component';
import { BasicTableComponent } from './components/basic-table/basic-table.component';
import { ImgCircularComponent } from './components/img-circular/img-circular.component';
import { ReservaCardComponent } from './components/reserva-card/reserva-card.component';
import { PageableTableComponent } from './components/pageable-table/pageable-table.component';
import { CancelDialogComponent } from './components/contrato/cancel-dialog/cancel-dialog.component';
import { FormCreateFieldComponent } from './components/form-create-field/form-create-field.component';
import { QuestionAnsweredComponent } from './components/question-answered/question-answered.component';
import { CardItemAlugavelComponent } from './components/card-item-alugavel/card-item-alugavel.component';
import { FilterPageableTableComponent } from './components/filter-pageable-table/filter-pageable-table.component';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import { MdePopoverModule } from '@material-extended/mde';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    MapsComponent,
    HeaderComponent,
    DropzoneComponent,
    MdViewerComponent,
    ContratoComponent,
    BasicModalComponent,
    BasicTableComponent,
    ImgCircularComponent,
    ReservaCardComponent,
    CancelDialogComponent,
    PageableTableComponent,
    FormCreateFieldComponent,
    QuestionAnsweredComponent,
    CardItemAlugavelComponent,
    FilterPageableTableComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    MarkdownModule,
    ReactiveFormsModule,

    MatBadgeModule,
    MdePopoverModule,
    ScrollingModule,
    MatButtonModule,
    MatTreeModule,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  exports: [
    MapsComponent,
    MdViewerComponent,
    ContratoComponent,
    DropzoneComponent,
    BasicModalComponent,
    BasicTableComponent,
    ReactiveFormsModule,
    ImgCircularComponent,
    ReservaCardComponent,
    CancelDialogComponent,
    PageableTableComponent,
    FormCreateFieldComponent,
    QuestionAnsweredComponent,
    CardItemAlugavelComponent,
    FilterPageableTableComponent,

    MatBadgeModule,
    MdePopoverModule,
    ScrollingModule,
    MatButtonModule,
    MatTreeModule,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class SharedModule { }
