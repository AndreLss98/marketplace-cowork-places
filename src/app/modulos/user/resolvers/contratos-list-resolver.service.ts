import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { ALUGUEL_STATUS } from 'src/app/shared/constants/constants';

import { AluguelService } from 'src/app/shared/service/aluguel.service';

@Injectable({
  providedIn: 'root'
})
export class ContratosListResolverService implements Resolve<any> {

  constructor(private aluguelService: AluguelService) { }

  resolve() {
    return this.aluguelService.getAllOfPlatform(1, 5, { status: ALUGUEL_STATUS.CREATED.value });
  }
}
