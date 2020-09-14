import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { AlugavelService } from 'src/app/shared/service/alugavel.service';

@Injectable({
  providedIn: 'root'
})
export class TaxaResolverService implements Resolve<any>{

  constructor(
    private alugavelService: AlugavelService
  ) { }

  resolve() {
    return this.alugavelService.getTaxa();
  }
}
