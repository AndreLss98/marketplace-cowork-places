import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {

  constructor(
    private http: HttpClient
  ) { }

  public getDetailsAluguel(aluguel_id){
    return this.http.get(environment.apiUrl + '/alugueis/' + aluguel_id);
  }

  public getAllOfPlatform(page: number, limit: number, filters: any = {}) {
    const params = new HttpParams()
    .set('page', page.toString())
    .set('limit', limit.toString())
    .set('filters', JSON.stringify(filters));

    return this.http.get<any>(`${environment.apiUrl}/alugueis`, { params });
  }

  public cancelContract(id, form) {
    return this.http.post<any>(`${environment.apiUrl}/alugueis/cancel/${id}`, form);
  }

  public acceptContract(id) {
    return this.http.post<any>(`${environment.apiUrl}/alugueis/accept/${id}`, {});
  }

  public checkin(id) {
    return this.http.put<any>(`${environment.apiUrl}/alugueis/checkin/${id}`, {})
  }
}
