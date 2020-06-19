import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicasService {

  constructor(
    private http: HttpClient
  ) {

  }

  public getAll() {
    return this.http.get(`${environment.apiUrl}/caracteristicas`);
  }

  public save(politica) {
    return this.http.post(`${environment.apiUrl}/caracteristicas`, politica);
  }

  public update(politica) {
    const id = politica.id;
    delete politica.id;
    return this.http.put(`${environment.apiUrl}/caracteristicas/${id}`, politica);
  }
}
