import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContaBancariaService {

  constructor(private http: HttpClient, private user: UserService) { }

  public updateOrSaveAccount(account, bancos) {
    account.codigo_banco = bancos.find(banco => banco.nome === account.banco).codigo;
    delete account.banco;

    if (!this.user.user_data.conta_bancaria) {
      return this.http.post(`${environment.apiUrl}/usuarios/conta-bancaria`, account);
    }
    return this.http.put(`${environment.apiUrl}/usuarios/conta-bancaria`, account);
  }
}
