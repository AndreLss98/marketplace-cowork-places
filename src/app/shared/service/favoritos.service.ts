import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {

  constructor(private http: HttpClient) {

  }

  public getAll() {
    return this.http.get<any>(`${environment.apiUrl}/usuarios/favoritos`);
  }
}
