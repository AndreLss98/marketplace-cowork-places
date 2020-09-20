import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicasService {

  private _caracteristicas = [];

  get caracteristicas() {
    return this._caracteristicas;
  }

  set caracteristicas(caracteristicas) {
    this._caracteristicas = caracteristicas;
  }

  constructor(
    private http: HttpClient
  ) {

  }

  public getAll(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/caracteristicas`);
  }

  public save(caracteristica) {
    return this.http.post(`${environment.apiUrl}/caracteristicas`, caracteristica);
  }

  public update(caracteristica) {
    const {id} = caracteristica;
    delete caracteristica.id;
    return this.http.put(`${environment.apiUrl}/caracteristicas/${id}`, caracteristica);
  }

  public delete(id) {
    return this.http.delete(`${environment.apiUrl}/caracteristicas/${id}`);
  }
}
