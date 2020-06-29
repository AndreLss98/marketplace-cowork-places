import { UserService } from './../../../shared/service/user.service';
import { environment } from 'src/environments/environment';
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
    private router: Router,
    private userService: UserService
  ){}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    console.log(route);

    if(!environment.production){
      this.userService.isAdmin = true;
      return true;
    } 
    let status:boolean = this.login.checkLogedIn()

    // Se status == true
    if(status){
      return true;
    }
    this.router.navigate(['/'])
    return false;
  }
}
