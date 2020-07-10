import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {

  constructor(private http: HttpClient) {

  }

  public getSome(quantity: number, type?: number) {
    let filters: any = {
      limit: quantity
    }

    if (type) filters.tipo_id = type;

    const params = new HttpParams()
      .set('page', '1')
      .set('limit', quantity.toString())
      .set('filters', JSON.stringify(filters));
    return this.http.get<any>(`${environment.apiUrl}/alugaveis`, { params });
  }
}
