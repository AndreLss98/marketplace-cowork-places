import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private http: HttpClient
  ) {

  }

  public getAllHome() {
    const params = new HttpParams()
      .set('filters', JSON.stringify({used: true}));
      
    return this.http.get(`${environment.apiUrl}/tipos`, {params});
  }
}
