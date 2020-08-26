import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { AluguelService } from 'src/app/shared/service/aluguel.service';

@Injectable({
  providedIn: 'root'
})
export class DetalhesContratoResolverService implements Resolve<any> {

  constructor(private aluguelService: AluguelService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.aluguelService.getDetailsAluguel(route.paramMap.get('id'));
  }
}
