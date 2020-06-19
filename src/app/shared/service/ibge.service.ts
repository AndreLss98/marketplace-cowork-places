import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IbgeService {

  private baseUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades/'

  constructor(
    private http:HttpClient
  ) { }

  getEstados(){
    return this.http.get(this.baseUrl + 'estados?orderBy=nome');
  }

  getCidadesPorEstado(uf:number){
    return this.http.get(this.baseUrl + 'estados/' + uf + '/distritos?orderBy=nome');
  }

  getCidadePorId(id){
    return this.http.get(this.baseUrl + 'municipios/' + id);
  }
}
