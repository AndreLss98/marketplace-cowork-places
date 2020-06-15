import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }


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