import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { AluguelService } from 'src/app/shared/service/aluguel.service';

@Injectable({
  providedIn: 'root'
})
export class ContratosListResolverService implements Resolve<any> {

  constructor(private aluguelService: AluguelService) { }

  resolve() {
    return this.aluguelService.getAllOfPlatform();
  }
}
