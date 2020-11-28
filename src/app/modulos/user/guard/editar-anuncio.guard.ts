import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';
import { UserService } from 'src/app/shared/service/user.service';
import { AlugavelService } from 'src/app/shared/service/alugavel.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EditarAnuncioGuard implements CanActivate {

  constructor(
    private alugaveis: AlugaveisService,
    private user: UserService
  ){}

  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.alugaveis.getById(next.queryParams.id).pipe(
    map(res => {
      return res.anunciante_id == this.user.user_data.id;
    }));
  }
  
}
