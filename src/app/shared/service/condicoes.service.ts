import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CondicoesService {

  constructor(private http: HttpClient) {

  }

  public getAll() {
    return this.http.get<any>(`${environment.apiUrl}/condicoes`);
  }

  public save(condicao) {
    return this.http.post<any>(`${environment.apiUrl}/condicoes`, condicao);
  }

  public update(condicao) {
    const id = condicao.id;
    delete condicao.id;
    return this.http.put<any>(`${environment.apiUrl}/condicoes/${id}`, condicao);
  }
}
