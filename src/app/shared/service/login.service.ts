import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

import { USER_SESSION, USER_TOKEN } from '../constants/constants'
import { Router } from '@angular/router';
import { authUser } from '../interface/interface';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _user_data: any;
  private _logged_status: boolean;
  private _user_token: string;
  private _expires_at: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.logged_status = this.checkLogedIn();
  }

  public checkLogedIn(): boolean{
    return this.userToken ? true : false;
  }
  
  public logout(){
    this.user_data = undefined;
    this.logged_status = false;
    this.userToken = undefined,
    this.expires_at = undefined;
    this.router.navigateByUrl('/home')
  }

  public signInAfterSignup(response: authUser){
    this.userToken = response.token;
    this.user_data = response.user;
    this.expires_at = response.expires_at;
    this.logged_status = this.checkLogedIn();
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

  public async signInWithEmail(email: string, senha: string): Promise<boolean> {

    let form = {
      email: email,
      senha: senha
    }

    await this.http.post<authUser>(`${environment.apiUrl}/auth` , form)
      .subscribe( response => {

        this.user_data = response.user;
        this.userToken = response.token;
        this.expires_at = response.expires_at
        this.logged_status = this.checkLogedIn();
        return true
      }, err => {
        return false;
      });

      return false
  }

    /**
     * Getter user_token
     * @return {string}
     */
	public get user_token(): string {
		return this._user_token;
	}

    /**
     * Getter expires_at
     * @return {any}
     */
	public get expires_at(): any {
		return this._expires_at;
	}

    /**
     * Setter user_token
     * @param {string} value
     */
	public set user_token(value: string) {
		this._user_token = value;
	}

    /**
     * Setter expires_at
     * @param {any} value
     */
	public set expires_at(value: any) {
		this._expires_at = value;
	}

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
		return this._user_token;
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
		this._user_token = value;
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

}