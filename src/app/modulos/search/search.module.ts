import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchRoutingModule } from './search-routing.module';

import { SearchComponent } from './search.component';

@NgModule({
  declarations: [ SearchComponent ],
  imports: [
    SharedModule,
    CommonModule,
    SearchRoutingModule,
    InfiniteScrollModule,
  ]
})
export class SearchModule { }
