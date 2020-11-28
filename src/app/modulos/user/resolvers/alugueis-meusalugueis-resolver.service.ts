import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { UserService } from 'src/app/shared/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AlugueisMeusalugueisResolverService implements Resolve<any> {

  constructor(
    private userService: UserService
  ) { }

  resolve() {
    return this.userService.getAlugueis();
  }
}
