import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private _perfil = [];

  get perfil() {
    return this._perfil;
  }

  set perfil(perfil) {
    this._perfil = perfil;
  }

  constructor(
    private http: HttpClient
  ) {

  }

  public getAll() {
    return this.http.get<any>(`${environment.apiUrl}/perfil`);
  }

  public save(perfil) {
    return this.http.post<any>(`${environment.apiUrl}/perfil`, perfil);
  }

  public delete(id) {
    return this.http.delete<any>(`${environment.apiUrl}/perfil/${id}`);
  }

  public update(id, perfil) {
    delete perfil.id;
    return this.http.put<any>(`${environment.apiUrl}/perfil/${id}`, perfil);
  }
}
