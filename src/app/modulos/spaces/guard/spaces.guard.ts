import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { ALUGAVEL_STATUS } from 'src/app/shared/constants/constants';

import { UserService } from 'src/app/shared/service/user.service';
import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';

@Injectable({
  providedIn: 'root'
})
export class SpacesGuard implements CanActivate {

  constructor(
    private router: Router,
    private snack: MatSnackBar,
    private userService: UserService,
    private AlugaveisService: AlugaveisService,
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let id = next.params.id;
      return this.AlugaveisService.getById(id).pipe(
        map(res => {
          if(res.status === ALUGAVEL_STATUS.APPROVED.value || res.anunciante_id === this.userService.user_data.id) {
            return true
          }else{
            this.snack.open("Esse espaço não pode ser exibido", "OK", {duration: 5000});
            this.router.navigate(['/home']);
            return false;
          }; 
        }));
  }
  
}
