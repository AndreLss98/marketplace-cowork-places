import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { TiposAlugaveisDocumentosService } from 'src/app/shared/service/tipos-alugaveis-documentos.service';

@Injectable({
  providedIn: 'root'
})
export class TiposAlugavelDocumentosResolverService implements Resolve<any> {

  constructor(private tipoAlugavelDocumentosService: TiposAlugaveisDocumentosService) { }

  resolve() {
    return this.tipoAlugavelDocumentosService.getAll();
  }
}
