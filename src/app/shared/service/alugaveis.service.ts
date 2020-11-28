import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlugaveisService {

  private _anuncio;
  get anuncio() {
    return this._anuncio;
  }

  set anuncio(anuncio) {
    this._anuncio = anuncio;
  }

  private _maisAnunciosDoAnunciante = [];
  get maisAnunciosDoAnunciante() {
    return this._maisAnunciosDoAnunciante;
  }

  set maisAnunciosDoAnunciante(anuncios) {
    this._maisAnunciosDoAnunciante = anuncios;
  }

  constructor(private http: HttpClient) {

  }

  public getByStatus(page: number, size: number, filters) {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', size.toString())
    .set('filters', JSON.stringify(filters));

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

  public getCidades(filters: any = {}) {
    filters.used = true;
    const params = new HttpParams()
    .set('filters', JSON.stringify(filters));
    return this.http.get<any>(`${environment.apiUrl}/alugaveis/local/cidades`, { params });
  }
} 
