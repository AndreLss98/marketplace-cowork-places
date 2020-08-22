import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
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

  public getAllOfPlatform() {
    return this.http.get<any>(`${environment.apiUrl}/alugueis`);
  }
}
