import { UserService } from 'src/app/shared/service/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlugueisMeusalugueisResolverService implements Resolve<any> {

  constructor(
    private userService: UserService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.userService.getAlugueis();
  }
}
