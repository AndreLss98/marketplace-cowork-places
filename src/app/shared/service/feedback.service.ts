import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(
    private http: HttpClient
  ) {

  }

  public getAll() {
    return this.http.get<any>(`${environment.apiUrl}/feedbacks`);
  }

  public getAllByUser() {
    return this.http.get<any>(`${environment.apiUrl}/usuarios/feedbacks`);
  }

  public getAllByUsers() {
    return this.http.get<any>(`${environment.apiUrl}/feedbacks/users`);
  }

  public save(feedback) {
    return this.http.post<any>(`${environment.apiUrl}/feedbacks`, feedback);
  }

  public reply(feedback) {
    return this.http.post<any>(`${environment.apiUrl}/usuarios/feedbacks`, feedback);
  }

  public delete(id) {
    return this.http.delete<any>(`${environment.apiUrl}/feedbacks/${id}`);
  }

}
