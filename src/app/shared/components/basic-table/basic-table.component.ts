import {
  Input,
  OnInit,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';

export interface BasicTableColumn {
  columnDef: string;
  columnHeaderName: string;
  objectProperty: string;
  formatFunction?: any;
}

export interface ActionsButtons {
  editar: boolean;
  excluir: boolean;
  visualizar: boolean;
}

@Component({
  selector: 'basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss']
})
export class BasicTableComponent implements OnInit {
  
  @Input('data')
  public data: any[] = [];

  @Input('tableColumns')
  public tableColumns: BasicTableColumn[] = [];

  @Input('displayedColumns')
  public displayedColumns: string[] = [];

  @Input('actions')
  public actions: ActionsButtons = { editar: true, excluir: true, visualizar: true };

  @Input('attributeId')
  public attributeId: string = 'id';

  @Output('editar')
  public editEvent = new EventEmitter();

  @Output('deletar')
  public deleteEvent = new EventEmitter();

  @Output('visualizar')
  public viewEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public emitEvent(event, id) {
    event.emit({id});
  }
}
