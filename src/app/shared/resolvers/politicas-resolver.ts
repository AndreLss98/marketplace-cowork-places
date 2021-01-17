import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { PoliticasService } from '../service/politicas.service';

@Injectable({
  providedIn: 'root'
})
export class PoliticasResolver implements Resolve<any> {

  constructor(
    private politicasService: PoliticasService
  ) { }

  resolve() {
    return this.politicasService.getAll();
  }
}
