import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicAlvoService {

  private _publicoAlvo = [];

  get publicoAlvo() {
    return this._publicoAlvo;
  }

  set publicoAlvo(publicoAlvo) {
    this._publicoAlvo = publicoAlvo;
  }

  constructor(
    private http: HttpClient
  ) {

  }

  public getAll() {
    return this.http.get<any>(`${environment.apiUrl}/publico-alvo`);
  }

  public save(publico_alvo) {
    return this.http.post<any>(`${environment.apiUrl}/publico-alvo`, publico_alvo);
  }

  public delete(id) {
    return this.http.delete<any>(`${environment.apiUrl}/publico-alvo/${id}`);
  }

  public update(id, publico_alvo) {
    delete publico_alvo.id;
    return this.http.put<any>(`${environment.apiUrl}/publico-alvo/${id}`, publico_alvo);
  }
}
