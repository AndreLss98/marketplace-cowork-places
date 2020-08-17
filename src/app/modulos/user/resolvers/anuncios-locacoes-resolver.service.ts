import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { UserService } from 'src/app/shared/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AnunciosLocacoesResolverService implements Resolve<any> {

  constructor(
    private userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.getAlugueis(true);
  }
}
