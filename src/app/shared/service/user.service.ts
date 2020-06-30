import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  public verifyUserEmail(email: string) {
    let params = new HttpParams();
    let headers = new HttpHeaders();
    params = params.append('email', email);
    return this.http.post(environment.apiUrl + '/usuarios/email', { email: email });
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
}
