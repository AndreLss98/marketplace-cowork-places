import { Injectable } from '@angular/core';
import { TiposService } from 'src/app/shared/service/tipos.service';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TiposResolverService implements Resolve<any> {

  constructor(private tiposService: TiposService) {

  }

  resolve() {
    return this.tiposService.getAll();
  }
}
