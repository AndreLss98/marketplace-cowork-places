import { User } from './../interface/interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RefreshTokenService {

  constructor(
    private http: HttpClient
  ) { }

  public refreshToken():Observable<any>{
    return this.http.post<any>(environment.apiUrl + '/auth/refresh-token', {});
  }

}
