import { Injectable } from '@angular/core';
import { SocialUser } from 'angularx-social-login/lib/entities/user'

import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

import { USER_SESSION } from '../shared/constants/constants'


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _user_data: SocialUser = null;
  private _logged_status: boolean = JSON.parse(localStorage.getItem(USER_SESSION)) || false;

  constructor(
    private authService: AuthService,
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

  
  /**
   * Login com o google
   * @returns void
   */
  public signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then( response => {
      
      this._user_data = response;
      this.setLoggedIn()

    }, err => {
      console.log("Login canceled google", err);
    });

    return null;
  }

  public signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then( response => {
      
      this._user_data = response;
      this.setLoggedIn()

    }, err => {
      console.log("Login canceled facebook", err);
    });

    return null;
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

  public signInWithEmail(): any {
    return null;
  }

  public signOut(): void {
    this.authService.signOut();
  }

}