import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';

@Injectable({
  providedIn: 'root'
})
export class DetalhesAlugavelResolverService implements Resolve<any> {

  constructor(private alugaveisService: AlugaveisService) { }

  resolve(route: ActivatedRouteSnapshot) {
    return this.alugaveisService.getById(route.paramMap.get('id'));
  }
}
