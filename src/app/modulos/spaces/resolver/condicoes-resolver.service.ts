import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { CondicoesService } from 'src/app/shared/service/condicoes.service';

@Injectable({
  providedIn: 'root'
})
export class CondicoesResolverService implements Resolve<any> {

  constructor(
    private condicoesService: CondicoesService
  ) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.condicoesService.getAll();
  }
}
