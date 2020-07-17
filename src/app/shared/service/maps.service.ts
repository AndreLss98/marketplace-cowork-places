import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  readonly baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address';

  constructor(private http: HttpClient) {

  }

  public getLatitudeLongitude(cep: string) {
    return this.http.get<any>(`${this.baseUrl}=${cep}&region=br&key=${environment.google_api_key}`);
  }
}
