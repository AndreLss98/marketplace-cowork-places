import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { formatServerDate } from '../constants/functions';

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
    
    let object = {
      dias_reservados: {
        data_entrada: formatServerDate(reserva.interval.entrada),
        data_saida: formatServerDate(reserva.interval.saida)
      },
      valor: reserva.total,
      alugavel_id: reserva.anuncio.id
    };

    return this.http.post<any>(`${environment.apiUrl}/alugueis/checkout`, object);
  }

  public updateReserva(id, reserva) {
    delete reserva.id;
    return this.http.put<any>(`${environment.apiUrl}/alugueis/${id}`, reserva);
  }
}
