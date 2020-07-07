import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private _data_entrada;
  private _data_saida;
  private _espaco;
  
  constructor(
    private http: HttpClient
  ) {

  }
  
  public get espaco() {
    return this._espaco;
  }
  public set espaco(value) {
    this._espaco = value;
  }
  public get data_saida() {
    return this._data_saida;
  }
  public set data_saida(value) {
    this._data_saida = value;
  }
  public get data_entrada() {
    return this._data_entrada;
  }
  public set data_entrada(value) {
    this._data_entrada = value;
  }

  public checkout(aluguel) {
    console.log("Aluguel: ", aluguel);
    return this.http.post<any>(`${environment.apiUrl}/alugueis/checkout`, aluguel);
  }
}
