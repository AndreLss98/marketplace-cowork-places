import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {

  public items = ["Aasdasd", "Basdasdas", "Casdasdasd", "Dasdasdasd", "Basdasdas", "Casdasdasd", "Dasdasdasd", "Basdasdas", "Casdasdasd", "Dasdasdasd", "Basdasdas", "Casdasdasd", "Dasdasdasd", "Basdasdas", "Casdasdasd", "Dasdasdasd"]
  constructor() { }

  ngOnInit(): void {
  }

}
