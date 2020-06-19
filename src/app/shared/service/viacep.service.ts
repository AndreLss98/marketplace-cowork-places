import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ViacepService {

  private base_url = 'https://viacep.com.br/ws/'

  constructor(
    private http: HttpClient
  ) { }

  validaCep(cep: string){
    return this.http.get(this.base_url + cep + '/json');
  }
}
