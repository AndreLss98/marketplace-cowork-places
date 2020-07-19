import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private _reserva: any;
  
  constructor(
    private http: HttpClient
  ) {

  }
  
  get reserva() {
    return this._reserva;
  }

  set reserva(reserva) {
    this._reserva = reserva;
  }

  public checkout(reserva) {
    return this.http.post<any>(`${environment.apiUrl}/alugueis/checkout`, reserva);
  }

  public updateReserva(id, reserva) {
    return this.http.put<any>(`${environment.apiUrl}/alugueis/${id}`, reserva);
  }
}
