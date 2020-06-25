import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlugavelService {

  constructor(
    private http: HttpClient,
  ) { }

  getTaxa(): Observable<any>{
    return this.http.get<any>(environment.apiUrl+'/alugaveis/taxa');
  }
}
