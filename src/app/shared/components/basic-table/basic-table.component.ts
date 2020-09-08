import {
  Input,
  OnInit,
  ViewChild,
  Component,
  TemplateRef,
} from '@angular/core';

export interface BasicTableColumn {
  columnDef: string;
  columnHeaderName: string;
  objectProperty: string;
}

@Component({
  selector: 'basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss']
})
export class BasicTableComponent implements OnInit {

  @ViewChild('basicTable') basicTable: TemplateRef<any>;

  public dataSource: any[] = [];

  @Input('data')
  public data: any[] = [];

  @Input('tableColumns')
  public tableColumns: BasicTableColumn[] = [];

  @Input('displayedColumns')
  public displayedColumns: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.dataSource = this.data;
  }
}
