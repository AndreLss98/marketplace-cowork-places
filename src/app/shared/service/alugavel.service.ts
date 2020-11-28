import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Alugavel } from '../interface/interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlugavelService {

  constructor(
    private http: HttpClient
  ) { }

  public getAllByUser(anunciante_id?: number): Observable<any> {
    let params = {};
    if (anunciante_id) {
      params = new HttpParams().set('anunciante_id', anunciante_id.toString());
    }

    return this.http.get<any>(`${environment.apiUrl}/alugaveis/usuario`, { params });
  }

  public clearFilesSendNotSaved(imgs, docs) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }), body: { imgs, docs }
    };

    return this.http.delete<any>(`${environment.apiUrl}/alugaveis/clear`, httpOptions);
  }

  public getTaxa(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/alugaveis/taxa');
  }

  public createAlugavel(alugavel: Alugavel): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/alugaveis', alugavel);
  }

  public updateAlugavel(alugavel): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/alugaveis/${alugavel.id}`, alugavel);
  }

  public alterStatus(id, update) {
    return this.http.put<any>(`${environment.apiUrl}/alugaveis/${id}/status`, update);
  }

  public alterAvaible(id, update) {
    return this.http.put<any>(`${environment.apiUrl}/alugaveis/${id}/disponibilidade`, {status: update});
  }

  public removeInfo(idAlugavel, idInfo): Observable<any>{
    return this.http.delete<any>(`${environment.apiUrl}/alugaveis/${idAlugavel}/infos/${idInfo}`);
  }
  
  public removeImage(idAlugavel, idImagem): Observable<any>{
    return this.http.delete<any>(environment.apiUrl + '/alugaveis/' + idAlugavel + '/imagem/' + idImagem);
  }

  public getDiasReservados(id) {
    return this.http.get<any>(`${environment.apiUrl}/alugaveis/${id}/dias-reservados`);
  }
}
