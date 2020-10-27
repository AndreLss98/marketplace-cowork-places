import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { PublicAlvoService } from 'src/app/shared/service/public-alvo.service';

@Injectable({
  providedIn: 'root'
})
export class PublicoAlvoResolverService implements Resolve<any> {

  constructor(
    private publicoAlvoService: PublicAlvoService
  ) { }

  resolve() {
    return this.publicoAlvoService.getAll();
  }

}
