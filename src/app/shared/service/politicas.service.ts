import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoliticasService {

  constructor(private http: HttpClient) {

  }

  public getAll() {
    return this.http.get(`${environment.apiUrl}/politicas`);
  }

  public save(politica, file: File) {
    const form = new FormData();
    form.append('file', file, file.name);
    form.append('nome', politica.nome);

    return this.http.post(`${environment.apiUrl}/politicas`, form, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public update(politica, file: File) {
    const form = new FormData();
    if (file) form.append('file', file, file.name);

    form.append('nome', politica.nome);
    form.append('versao', politica.versao);
    form.append('aprovado', politica.aprovado);

    return this.http.put(`${environment.apiUrl}/politicas/${politica.id}`, form, {
      reportProgress: true,
      observe: 'events'
    });
  }

  public delete(id) {
    return this.http.delete(`${environment.apiUrl}/politicas/${id}`);
  }
}
