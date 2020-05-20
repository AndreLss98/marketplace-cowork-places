import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login/lib/entities/user'

import { USER_SESSION } from '../constants/constants'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _user_data = null;
  private _logged_status: boolean = JSON.parse(localStorage.getItem(USER_SESSION)) || false;

  constructor(
    private http: HttpClient
  ) { }

    /**
     * Getter user_data
     * @return {SocialUser }
     */
	public get user_data(): SocialUser  {
		return this._user_data;
	}

    /**
     * Getter logged_status
     * @return {boolean }
     */
	public get logged_status(): boolean  {
		return this._logged_status;
	}

    /**
     * Setter user_data
     * @param {SocialUser } value
     */
	public set user_data(value: SocialUser ) {
		this._user_data = value;
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
    localStorage.setItem(USER_SESSION, JSON.stringify(this.user_data))
  }

  public getUserSession(){
    if(sessionStorage.getItem(USER_SESSION)){
      this._user_data = JSON.parse(sessionStorage.getItem(USER_SESSION));
    }
  }

  public clearUserSession(){
    sessionStorage.removeItem(USER_SESSION);
  }

  public signInWithEmail(form): any {
    console.log(form);
    this.http.post(`${environment.apiUrl}/auth` , form)
      .subscribe( response => {

        this.user_data = response['user'];
        console.log(this.user_data);
        this.setLoggedIn();
      }, err => {
        console.log(err)
      });
  }
}