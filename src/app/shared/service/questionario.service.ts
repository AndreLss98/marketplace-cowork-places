import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionarioService {

  constructor(
    private http: HttpClient
  ) {

  }

  public getAll() {
    return this.http.get<any>(`${environment.apiUrl}/questionario`);
  }

  public save(pergunta) {
    return this.http.post<any>(`${environment.apiUrl}/questionario`, pergunta);
  }

  public update(id, pergunta) {
    return this.http.put<any>(`${environment.apiUrl}/questionario/${id}`, pergunta);
  }

  public delete(id) {
    return this.http.delete<any>(`${environment.apiUrl}/questionario/${id}`);
  }
}
