import { User } from './../interface/interface';
import { LoginService } from 'src/app/shared/service/login.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, switchMap, finalize, filter, take } from 'rxjs/operators';
import { RefreshTokenService } from './refresh-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  private isRefreshingToken: boolean = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);


  constructor(
    private login: LoginService,
    private refresh: RefreshTokenService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(this.addToken(req, this.login.userToken), ).pipe(
      catchError( (err: HttpErrorResponse) => {
        if(err.status == 401){
          return this.handle401Error(req, next);
        }

        return throwError(err);
      }),
    )
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if(req.url.includes('/auth') || req.url.includes('/usuarios/create')){
      return req.clone(
        {  
          withCredentials: true
        })
    }else if(req.url.includes('viacep')){
      return req;
    }else{

      return req.clone(
      { 
        setHeaders: { Authorization: 'Bearer ' + token }, 
        // withCredentials: true
      })
    }
  }

  logoutUser() {
    // Route to the login page (implementation up to you)
    this.login.logout()
    return throwError("Usuario deslogado")
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
        this.isRefreshingToken = true;
        // Reset here so that the following requests wait until the token
        // comes back from the refreshToken call.
        this.tokenSubject.next(null);

        return this.refresh.refreshToken().pipe(
            switchMap((user: any) => {
                if (user.token) {
                    this.tokenSubject.next(user.token);
                    this.login.login(user);
                    return next.handle(this.addToken(req, user.token));
                }
                // If we don't get a new token, we are in trouble so logout.
                return this.logoutUser();
            }),
            catchError(error => {
                // If there is an exception calling 'refreshToken', bad news so logout.
                return this.logoutUser();
            }),
            finalize(() => {
                this.isRefreshingToken = false;
            }));
    } else {
        return this.tokenSubject.pipe(
            filter(token => token != null),
            take(1),
            switchMap(token => {
                return next.handle(this.addToken(req, token));
            }));
    }
}


  

}
