import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

  public searchForm: FormGroup;
  public items = [
    "Aasdasd",
    "Basdasdas",
    "Basdasdas",
    "Casdasdasd"
  ];

  constructor(
    private form: FormBuilder
  ) {
    this.searchForm = this.form.group({})
  }

  ngOnInit(): void {

  }

  onSubmit() {

  }
}
