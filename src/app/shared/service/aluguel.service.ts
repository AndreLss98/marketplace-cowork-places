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

  public cancelContract(id, comentario) {
    return this.http.post(`${environment.apiUrl}/alugueis/cancel/${id}`, comentario);
  }

  public acceptContract(id) {
    return this.http.post(`${environment.apiUrl}/alugueis/accept/${id}`, {});
  }
}
