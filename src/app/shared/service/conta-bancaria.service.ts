import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ContaBancariaService {

  constructor(private http: HttpClient, private user: UserService) { }

  public updateOrSaveAccount(account, bancos, pessoaJuridica: boolean = false) {
    account.codigo_banco = bancos.find(banco => banco.nome === account.banco).codigo;
    delete account.banco;
    console.log('Essa é a conta que irá ser enviada: ', account);
    
    if (!account.id) {
      let params = new HttpParams()
        .append("pessoajuridica", `${pessoaJuridica}`);
      return this.http.post(`${environment.apiUrl}/usuarios/conta-bancaria`, account, { params });
    }

    return this.http.put(`${environment.apiUrl}/usuarios/conta-bancaria/${account.id}`, account);
  }
}
