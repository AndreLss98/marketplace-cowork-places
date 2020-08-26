import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(private http: HttpClient) {}


  public favoritar(alugavel_id) {
    return this.http.post(environment.apiUrl + '/usuarios/favoritos', {alugavel_id: alugavel_id});
  }

  public desfavoritar(alugavel_id) {
    return this.http.delete(environment.apiUrl + '/usuarios/favoritos/' + alugavel_id);
  }

  public getAll() {
    return this.http.get<any>(`${environment.apiUrl}/usuarios/favoritos`);
  }
}
