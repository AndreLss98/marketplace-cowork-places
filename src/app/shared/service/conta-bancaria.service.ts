import { Injectable } from '@angular/core';
import { LoginService } from './login.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContaBancariaService {

  constructor(private http: HttpClient, private loginService: LoginService) { }

  public updateOrSaveAccount(account) {
    if (!this.loginService.user_data.conta_bancaria) {
      return this.http.post(`${environment.apiUrl}/usuarios/conta-bancaria`, account);
    }
    return this.http.put(`${environment.apiUrl}/usuarios/conta-bancaria`, account);
  }
}
