import { PageEvent } from '@angular/material/paginator';
import { Component, Output, EventEmitter, Input } from '@angular/core';

import { FIRST_PAGE_SIZE } from '../../constants/constants';

import { BasicTableComponent } from '../basic-table/basic-table.component';

@Component({
  selector: 'pageable-table',
  templateUrl: './pageable-table.component.html',
  styleUrls: ['./pageable-table.component.scss']
})
export class PageableTableComponent extends BasicTableComponent {

  @Output('pageEvent') pageEvent = new EventEmitter

  public pageSizes = [
    FIRST_PAGE_SIZE,
    FIRST_PAGE_SIZE * 2,
    FIRST_PAGE_SIZE * 4,
    FIRST_PAGE_SIZE * 8
  ];

  @Input('pager')
  public pager: PageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: FIRST_PAGE_SIZE
  };

  constructor() {
    super();
  }

  ngOnInit(): void {

  }
  public emitEvent(event, {id}) {
    event.emit({ id });
  }

  public emitPageEvent(event) {
    this.pageEvent.emit(event);
  }
}