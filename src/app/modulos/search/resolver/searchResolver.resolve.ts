import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { of } from 'rxjs';
import { HighlightService } from '../../../shared/service/highlight.service';

@Injectable({
  providedIn: 'root'
})

export class SearchResolver implements Resolve<any> {
  constructor(private highlight: HighlightService) {}

  resolve() {
    return of(this.highlight.getSomeSpaces(20))
  }
}