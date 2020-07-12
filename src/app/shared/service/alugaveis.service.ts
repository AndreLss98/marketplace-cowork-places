import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

import { ALUGAVEL_STATUS } from './../constants/constants';

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
    .set('filters', JSON.stringify({status: ALUGAVEL_STATUS.APPROVED.value}));

    return this.http.get<any>(`${environment.apiUrl}/alugaveis`, { params });
  }

  public getAllNotAvailable(page: number, size: number) {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', size.toString())
    .set('filters', JSON.stringify({status: ALUGAVEL_STATUS.WAITING.value}));

    return this.http.get<any>(`${environment.apiUrl}/alugaveis`, { params });
  }

  public getById(id) {
    return this.http.get<any>(`${environment.apiUrl}/alugaveis/${id}`);
  }

  public getBairros(filters: any = {}) {
    filters.used = true;
    const params = new HttpParams()
    .set('filters', JSON.stringify(filters));
    return this.http.get<any>(`${environment.apiUrl}/alugaveis/local/bairros`, { params });
  }
}
