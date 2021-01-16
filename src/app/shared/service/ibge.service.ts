import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  private baseUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/'

  constructor(
    private http:HttpClient
  ) { }

  getEstados() {
    return this.http.get(this.baseUrl + 'estados?orderBy=nome');
  }

  getCidadesPorEstado(uf:number) {
    return this.http.get(this.baseUrl + 'estados/' + uf + '/distritos?orderBy=nome');
  }

  getMunicipioPorId(id):Observable<any> {
    return this.http.get<any>(this.baseUrl + 'municipios/' + id);
  }

  getCidadePorId(id):Observable<any> {
    return this.http.get<any>(this.baseUrl + 'distritos/' + id);
  }

  getEstadoPorId(id):Observable<any> {
    return this.http.get<any>(this.baseUrl + 'estados/' + id);
  }
}
