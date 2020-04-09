import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-highlight-items',
  templateUrl: './highlight-items.component.html',
  styleUrls: ['./highlight-items.component.scss']
})
export class HighlightItemsComponent implements OnInit {

  @Input('local') local: string;
  @Input('description') description: string;
  @Input('image') image: string;
  @Input('cost') cost: number;
  @Input('tax') tax: number;
  @Input('rank') rank: number;

  constructor() { }

  ngOnInit(): void {
  }

}
