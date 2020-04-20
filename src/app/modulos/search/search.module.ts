import { SearchboxComponent } from './components/searchbox/searchbox.component';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FilterComponent } from './components/filter/filter.component';


@NgModule({
  declarations: [SearchComponent, SearchboxComponent, FilterComponent ],
  imports: [
    SharedModule,
    CommonModule,
    SearchRoutingModule,
    InfiniteScrollModule
  ]
})
export class SearchModule { }
