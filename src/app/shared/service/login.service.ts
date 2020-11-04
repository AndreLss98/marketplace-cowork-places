import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

import * as moment from 'moment';

import { environment } from 'src/environments/environment';

import { authUser } from 'src/app/shared/interface/interface';
import { EXPIRE_AT } from 'src/app/shared/constants/constants';

import { UserService } from './user.service';
import { RefreshTokenService } from './refresh-token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  @Output()
  public userLoginEvent = new EventEmitter();

  private silent_refresh;
  private _user_token: string;
  private _logged_status: boolean;
  private _expires_at: any = undefined;

  constructor(
    private router: Router,
    private http: HttpClient,
    private user: UserService,
    private refresh: RefreshTokenService
  ) { 
    this.logged_status = this.checkLogedIn();
  }

  public checkLogedIn(): boolean{
    return this.userToken ? true : false;
  }

  public login(response: authUser) {
    this.userToken = response.token;
    this.user.user_data = response.user
    this.expires_at = response.expires_at;

    localStorage.setItem(EXPIRE_AT, this.expires_at);

    this.logged_status = this.checkLogedIn();

    this.silent_refresh = setTimeout(() => {
      this.autoLogin();
    }, (this.expires_at - moment().unix() - 5) * 1000);
    addEventListener('storage', this.logoutLocal)
    this.userLoginEvent.emit();
  }

  public logoutLocal(event?) {
    if (event && event.key === 'logout') { }
  }

  public logoutServer() {
    this.http.delete(`${environment.apiUrl}/auth/logout`).subscribe(
    (response) => {
      
    }, (error) => {
      
    }, () => {
      this.logged_status = null;
      this.userToken = null;
      this.expires_at = null;
      this.user.user_data = null;
      clearTimeout(this.silent_refresh);
      localStorage.removeItem(EXPIRE_AT);
      this.router.navigateByUrl('/home');
      localStorage.setItem('logout', Date.now().toString());
    });
  }

  autoLogin() {
    this.refresh.refreshToken().subscribe(response => {
      this.login(response);
    }, (error) => {});
  }

  public verifySession() {
    const expires_at = localStorage.getItem(EXPIRE_AT);
    return expires_at && this.user.user_data? true : false;
  }

  public signInWithEmail(email: string, senha: string): Observable<authUser>{
    return this.http.post<authUser>(`${environment.apiUrl}/auth` , { email, senha }).pipe(timeout(10000));
  }

  public signInWithGoogle() {
    window.location.href = environment.apiUrl + '/auth/google';
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