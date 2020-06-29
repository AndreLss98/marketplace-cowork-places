import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor(private http: HttpClient) {

  }

  public getAll() {
    return this.http.get<any>(`${environment.apiUrl}/documentos`);
  }

  public getAllSended() {
    return this.http.get<any>(`${environment.apiUrl}/usuarios/doc`);
  }

  public save(documento) {
    return this.http.post<any>(`${environment.apiUrl}/documentos`, documento);
  }


  public update(id, documento) {
    delete documento.id;
    return this.http.put<any>(`${environment.apiUrl}/documentos/${id}`, documento);
  }

  public deletar(id) {
    return this.http.delete<any>(`${environment.apiUrl}/documentos/${id}`);
  }
}
