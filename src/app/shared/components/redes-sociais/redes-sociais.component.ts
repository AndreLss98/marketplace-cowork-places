import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'redes-sociais',
  templateUrl: './redes-sociais.component.html',
  styleUrls: ['./redes-sociais.component.scss']
})
export class RedesSociaisComponent implements OnInit {

  @Input()
  public columnMode: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
