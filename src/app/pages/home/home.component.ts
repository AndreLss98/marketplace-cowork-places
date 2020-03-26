import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public items = [{
    name: 'Pedro'
  },{
    name: 'Daniel'
  }];

  constructor() { }

  ngOnInit(): void {
  }

  addName(){
    this.items.push({name: 'joao'})
    console.log(window.innerWidth);
  }

}
