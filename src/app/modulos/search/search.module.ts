import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterComponent } from './components/filter/filter.component';
import { SearchBoxMobileComponent } from './components/search-box-mobile/search-box-mobile.component';


@NgModule({
  declarations: [SearchComponent, SearchboxComponent, FilterComponent, SearchBoxMobileComponent ],
  imports: [
    SharedModule,
    CommonModule,
    SearchRoutingModule,
    InfiniteScrollModule,
  ]
})
export class SearchModule { }
