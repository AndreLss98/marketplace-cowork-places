import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlugaveisService {

  constructor(private http: HttpClient) {

  }

  public getAllAvailable(page: number, size: number) {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', size.toString())
    .set('filters', JSON.stringify({disponivel: true}));

    return this.http.get<any>(`${environment.apiUrl}/alugaveis`, { params });
  }

  public getAllNotAvailable(page: number, size: number) {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', size.toString())
    .set('filters', JSON.stringify({disponivel: false}));

    return this.http.get<any>(`${environment.apiUrl}/alugaveis`, { params });
  }

  public getById(id) {
    return this.http.get<any>(`${environment.apiUrl}/alugaveis/${id}`);
  }
}
