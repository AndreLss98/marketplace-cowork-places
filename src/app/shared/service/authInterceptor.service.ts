import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { RefreshTokenService } from './refresh-token.service';
import { LoginService } from 'src/app/shared/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(
    private login: LoginService,
    private refresh: RefreshTokenService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(req, this.login.userToken)).pipe(catchError((error: HttpErrorResponse) => {
      if(error.status == 401) return this.handle401Error(req, next);
      return throwError(error);
    }));
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if(req.url.includes('/auth') || req.url.includes('/usuarios/create')) {
      return req.clone({ withCredentials: true });
    }else if(req.url.includes('viacep') || req.url.includes('maps.googleapis.com')) {
      return req;
    }else {
      return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }});
    }
  }

  logoutUser() {
    this.login.logoutServer();
    return throwError("Usuario deslogado");
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    return this.logoutUser()
  }
}
