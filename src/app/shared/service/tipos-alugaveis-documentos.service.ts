import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiposAlugaveisDocumentosService {

  private _tiposDocumentos = [];

  get tiposDocumentos() {
    return this._tiposDocumentos;
  }

  set tiposDocumentos(tiposDocumentos) {
    this._tiposDocumentos = tiposDocumentos;
  }

  constructor(private http: HttpClient) {

  }

  public getAll() {
    return this.http.get<any>(`${environment.apiUrl}/tipo-alugavel-documento`);
  }

  public save(tipo_documento) {
    return this.http.post<any>(`${environment.apiUrl}/tipo-alugavel-documento`, tipo_documento);
  }

  public update(id, tipo_documento) {
    delete tipo_documento.id;
    return this.http.put<any>(`${environment.apiUrl}/tipo-alugavel-documento/${id}`, tipo_documento);
  }

  public delete(id) {
    return this.http.delete<any>(`${environment.apiUrl}/tipo-alugavel-documento/${id}`);
  }
}
