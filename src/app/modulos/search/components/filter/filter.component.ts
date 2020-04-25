import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

  public searchForm: FormGroup;
  public items = ["Aasdasd", "Basdasdas", "Casdasdasd", "Dasdasdasd", "Basdasdas", "Casdasdasd", "Dasdasdasd", "Basdasdas", "Casdasdasd", "Dasdasdasd", "Basdasdas", "Casdasdasd", "Dasdasdasd", "Basdasdas", "Casdasdasd", "Dasdasdasd"]

  constructor(
    private form: FormBuilder
  ) {
    this.searchForm = this.form.group({})
  }

  ngOnInit(): void {
  }

  onSubmit(){}

}
