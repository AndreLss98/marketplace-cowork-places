import { LoginService } from 'src/app/shared/service/login.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad {

  constructor(
    private login: LoginService,
    private router: Router
  ){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    console.log(route);

    let status:boolean = this.login.checkLogedIn()

    // Se status == true
    if(status){
      return true;
    }
    this.router.navigate(['/'])
    return false;
  }
}
