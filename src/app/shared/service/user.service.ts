import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isAdmin: boolean = false;
  private _user_data: any;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Getter user_data
   * @return {any}
   */
  public get user_data(): any {
    return this._user_data;
  }

  /**
   * Setter user_data
   * @param {any} value
   */
  public set user_data(value: any) {
    this._user_data = value;
  }

  /**
 * Getter isAdmin
 * @return {boolean}
 */
  public get isAdmin(): boolean {
    return this._isAdmin;
  }

  /**
   * Setter isAdmin
   * @param {boolean} value
   */
  public set isAdmin(value: boolean) {
    this._isAdmin = value;
  }

  public cadastroValidado() {
    if(
      !this.user_data ||
      !this.user_data.cpf ||
      !this.user_data.email_validado ||
      !this.user_data.data_nascimento ||
      !this.user_data.data_nascimento ||
      !this.user_data.numero_1 ||
      !this.user_data.conta_bancaria 
      )   return false;

      return true;
  }

  public verifyUserEmail(email: string) {
    let params = new HttpParams();
    let headers = new HttpHeaders();
    params = params.append('email', email);
    return this.http.post(environment.apiUrl + '/usuarios/email', { email: email });
  }

  public validateEmail(token: string) {
    return this.http.post(`${environment.apiUrl}/usuarios/validar-email`, { token });
  }

  public checkPermission() {
    return this.http.post(`${environment.apiUrl}/usuarios/check-admin`, {});
  }

  public getAll(page: number, pageSize: number, fitlers = {}) {
    const params =
    new HttpParams()
    .set('page', page.toString())
    .set('limit', pageSize.toString())
    .set('filters', JSON.stringify(fitlers));

    return this.http.get<any>(`${environment.apiUrl}/usuarios`, { params });
  }

  public getById(id) {
    return this.http.get(`${environment.apiUrl}/usuarios/${id}`);
  }

  public validarPerfil(id, update) {
    delete update.id;
    return this.http.put<any>(`${environment.apiUrl}/usuarios/${id}/validar-perfil`, update);
  }

  public atualizarDadosPessoais(usuario) {
    delete usuario.id;
    return this.http.put<any>(`${environment.apiUrl}/usuarios/`, usuario);
  }

  public atualizarDadosJuridico(usuario) {
    delete usuario.local.latitude;
    delete usuario.local.longitude;
    usuario.local.pais = 'Brasil';
    return this.http.put<any>(`${environment.apiUrl}/usuarios/dados-juridicos`, usuario);
  }

  public updatePassword(update) {
    return this.http.put<any>(`${environment.apiUrl}/usuarios/alter-password`, update);
  }

  public recoverPassword(email) {
    return this.http.post<any>(`${environment.apiUrl}/usuarios/recover-password`, email);
  }

  public resendEmail() {
    return this.http.get(`${environment.apiUrl}/usuarios/resend-confirm-email`);
  }

  public getAlugueis(locacoes?): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/usuarios/alugueis' + `${locacoes? '?locacoes=true':''}`);
  }
}
