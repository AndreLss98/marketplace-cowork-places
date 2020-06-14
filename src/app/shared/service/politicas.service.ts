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
}
