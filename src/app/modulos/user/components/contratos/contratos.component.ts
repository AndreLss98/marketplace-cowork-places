import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.scss']
})
export class ContratosComponent implements OnInit {


  public filter: FormGroup;
  public status: any = [];

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.filter = formBuilder.group({
      status: ["", []]
    })
  }

  ngOnInit(): void {

  }

}
