import { Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { BasicTableComponent } from '../basic-table/basic-table.component';

@Component({
  selector: 'pageable-table',
  templateUrl: './pageable-table.component.html',
  styleUrls: ['./pageable-table.component.scss']
})
export class PageableTableComponent extends BasicTableComponent {
  public pageSizes = [ 5, 10, 20 ];
  public pager: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 5
  };

  constructor() {
    super();
  }

  ngOnInit(): void {

  }
  public emitEvent(event, {id}) {
    event.emit({ id });
  }
}
