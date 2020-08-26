import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

import { UserService } from 'src/app/shared/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class DetalhesUsuarioResolverService implements Resolve<any> {

  constructor(private userServcice: UserService) {

  }

  resolve(route: ActivatedRouteSnapshot) {
    return this.userServcice.getById(route.paramMap.get('id'));
  }
}
