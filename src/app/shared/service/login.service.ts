import { LoginComponent } from 'src/app/shared/modal/login/login.component';
import { ModalService } from 'src/app/shared/service/modal.service';
import { UserService } from './user.service';
import { RefreshTokenService } from './refresh-token.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';

import { USER_SESSION, EXPIRE_AT } from '../constants/constants'
import { Router } from '@angular/router';
import { authUser } from '../interface/interface';
import * as moment from 'moment';
import { timeout, map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _logged_status: boolean;
  private _user_token: string;
  private _expires_at: any = undefined;

  constructor(
    private http: HttpClient,
    private router: Router,
    private refresh: RefreshTokenService,
    private user: UserService,
    private modal: ModalService
  ) { 
    this.logged_status = this.checkLogedIn();
  }

  public checkLogedIn(): boolean{
    return this.userToken ? true : false;
  }
  
  public logout(){
    this.user.user_data = undefined
    this.logged_status = false;
    this.userToken = undefined,
    this.expires_at = undefined;
    localStorage.removeItem(EXPIRE_AT);
    this.http.delete(`${environment.apiUrl}/auth/logout`).subscribe(response => {
      this.router.navigateByUrl('/home');
    }, (error) => {
      this.router.navigateByUrl('/home');
    })
  }

  public login(response: authUser){
    this.userToken = response.token;
    this.user.user_data = response.user
    this.expires_at = response.expires_at;
    localStorage.setItem(EXPIRE_AT, this.expires_at);
    this.logged_status = this.checkLogedIn();
    if(this.user.user_data){
      this.user.user_data.data_nascimento = this.user.user_data.data_nascimento.split('T')[0];
    }
    
    setTimeout(() => {
      this.autoLogin();
    }, (this.expires_at - moment().unix() - 5) * 1000);
  }

  autoLogin() {
    this.refresh.refreshToken().subscribe(response => {
      this.login(response);
    }, (error) => {})
  }

  public verifySession() {
    let expire: number = + localStorage.getItem(EXPIRE_AT);
    if(expire > moment().unix()){
      return this.refresh.refreshToken().pipe(
        map(res=>{
          this.login(res);
        }),
        catchError( err =>{
          this.logout();
          throw err;
        })
      )
    }
  }

  public getUserSession(){
    if(localStorage.getItem(USER_SESSION)){
      console.log("Sessão encontrada")
      this.user.user_data = JSON.parse(localStorage.getItem(USER_SESSION));
    }
  }

  public clearUserSession(){
    localStorage.removeItem(USER_SESSION);
    // localStorage.removeItem(USER_TOKEN)
    this.userToken = undefined;
    this.user.user_data = undefined;
    this.logged_status = false;
  }

  public signInWithEmail(email: string, senha: string): Observable<authUser>{
    let form = {
      email: email,
      senha: senha
    }
    return this.http.post<authUser>(`${environment.apiUrl}/auth` , form).pipe(timeout(10000));
      // return false
  }

  public signInWithGoogle(){
    window.location.href = environment.apiUrl + '/auth/google';
    // this.http.post(environment.apiUrl + '/auth/google', {}).subscribe(response =>{
    //   console.log(response);
    // })
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
     * Getter userToken
     * @return {string}
     */
	public get userToken(): string {
		return this._user_token;
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