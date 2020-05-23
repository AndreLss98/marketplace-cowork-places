import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient
  ) { }

  public cadastrar(form: any): Observable<any>{
    return this.http.post<any>(environment.apiUrl + '/usuarios/create', form);
  }
}
