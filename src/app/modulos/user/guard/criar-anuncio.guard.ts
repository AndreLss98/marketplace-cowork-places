import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/shared/service/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CriarAnuncioGuard implements CanActivate {

  constructor(
    private userService: UserService,
    private snack: MatSnackBar,
    private route: Router
  ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    if(!this.userService.user_data.cadastro_validado){

      this.snack.open("Para criar um anúncio, termine o seu cadastro", "Ok", {duration: 5000});
      this.route.navigate(['/user/conta/info'])
      return false;
    }

    return true;
  }
  
}
