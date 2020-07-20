import { MatSnackBar } from '@angular/material/snack-bar';
import { ALUGAVEL_STATUS } from 'src/app/shared/constants/constants';
import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpacesGuard implements CanActivate {

  constructor(
    private AlugaveisService: AlugaveisService,
    private router: Router,
    private snack: MatSnackBar
  ){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let id = next.params.id;
      // console.log('Id: ', id, " next: ", next);
      return this.AlugaveisService.getById(id).pipe(
        map(res => {
          console.log(res);
          if(res.status == ALUGAVEL_STATUS.APPROVED.value){
            return true
          }else{
            this.snack.open("Esse espaço não pode ser exibido", "OK", {duration: 5000});
            this.router.navigate(['/home']);
            return false;
          }; 
        }));
      // console.log("Id: ", id);
    // return true;
  }
  
}
