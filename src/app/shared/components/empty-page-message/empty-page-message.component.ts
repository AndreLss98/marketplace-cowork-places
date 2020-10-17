import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'empty-page-message',
  templateUrl: './empty-page-message.component.html',
  styleUrls: ['./empty-page-message.component.scss']
})
export class EmptyPageMessageComponent implements OnInit {

  @Input()
  public message: string;

  @Input()
  public classIcone: string = "fa-file-o";

  constructor() {

  }

  ngOnInit(): void {

  }
}
