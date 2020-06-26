import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isAdmin:boolean = false;

  constructor(
    private http: HttpClient
  ) { }

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


  public verifyUserEmail(email: string){
    let params = new HttpParams();
    let headers = new HttpHeaders();
    params = params.append('email', email);
    return this.http.post(environment.apiUrl + '/usuarios/email', {email: email});
  }

  public checkPermission() {
    return this.http.post(`${environment.apiUrl}/usuarios/check-admin`, {});
  }
}
