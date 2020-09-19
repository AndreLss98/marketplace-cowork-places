import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';

@Injectable({
  providedIn: 'root'
})
export class AnuncioResolverService implements Resolve<any>{

  constructor(
    private alugaveis: AlugaveisService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.alugaveis.getById(route.paramMap.get('id'));
  }
}
