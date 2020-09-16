import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

  constructor(
    private http: HttpClient
  ) {
  
  }

  public getAll() {
    return this.http.get(`${environment.apiUrl}/tipos`);
  }

  public getOne(id: number) {
    return this.http.get(`${environment.apiUrl}/tipos/${id}`);
  }

  public update(id: number, tipo) {
    return this.http.put(`${environment.apiUrl}/tipos/${id}`, tipo);
  }

  public create(tipo) {
    return this.http.post(`${environment.apiUrl}/tipos`, tipo);
  }

  public delete(id) {
    return this.http.delete(`${environment.apiUrl}/tipos/${id}`);
  }

  public getAllCaracteristicasByTipo(id) {
    return this.http.get<any>(`${environment.apiUrl}/tipos/${id}/caracteristicas`);
  }
}
