import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-box-mobile',
  templateUrl: './search-box-mobile.component.html',
  styleUrls: ['./search-box-mobile.component.scss'],
})
export class SearchBoxMobileComponent implements OnInit {

  public options = []
  public rangeValues: number[]
  val1: number;
  public searchForm: FormGroup;
  location = new FormControl('');

  public foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];
  constructor(
    private form: FormBuilder,
  ) { 
    this.rangeValues = [20, 80];
    this.searchForm = this.form.group({
      location: this.location
    })
  }

  ngOnInit(): void {

  }

  onSubmit(){}

}
