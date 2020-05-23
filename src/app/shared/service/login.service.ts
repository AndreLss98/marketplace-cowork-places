import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

import { USER_SESSION, USER_TOKEN } from '../constants/constants'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _user_data: any;
  private _login_data: any;
  private _logged_status: boolean = JSON.parse(localStorage.getItem(USER_SESSION)) || false;
  private _userToken: string;

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
     * Getter userToken
     * @return {string}
     */
	public get userToken(): string {
		return this._userToken;
	}

    /**
     * Setter user_data
     * @param {any} value
     */
	public set user_data(value: any) {
		this._user_data = value;
	}

    /**
     * Setter userToken
     * @param {string} value
     */
	public set userToken(value: string) {
		this._userToken = value;
	}

    /**
     * Getter logged_status
     * @return {boolean }
     */
	public get logged_status(): boolean  {
		return this._logged_status;
	}

    /**
     * Setter logged_status
     * @param {boolean } value
     */
	public set logged_status(value: boolean ) {
		this._logged_status = value;
	}

  private setLoggedIn(){
    this.logged_status = true;
    localStorage.setItem(USER_SESSION, JSON.stringify(this.user_data));
    // localStorage.setItem(USER_TOKEN, this.userToken);
  }

  public getUserSession(){
    if(localStorage.getItem(USER_SESSION)){
      console.log("Sessão encontrada")
      this._user_data = JSON.parse(localStorage.getItem(USER_SESSION));
    }
  }

  public clearUserSession(){
    localStorage.removeItem(USER_SESSION);
    // localStorage.removeItem(USER_TOKEN)
    this.userToken = undefined;
    this.user_data = undefined;
    this.logged_status = false;
  }

  public signInWithEmail(email: string, senha: string): any {

    let form = {
      email: email,
      senha: senha
    }

    this.http.post(`${environment.apiUrl}/auth` , form)
      .subscribe( response => {

        this.user_data = response['user'];
        this.userToken = response['token'];
        console.log("Dados de usuario: ",this.user_data, this.userToken);
        this.setLoggedIn();
      }, err => {
        return false;
      });
  }
}