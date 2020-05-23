import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { USER_TOKEN } from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = localStorage.getItem(USER_TOKEN)

    if(authToken) {
      const cloned =  req.clone({
        headers: req.headers.set("Authorization", "Bearer " + authToken)
      });

      return next.handle(cloned)
    } else {
      return next.handle(req);
    }
  }

}
