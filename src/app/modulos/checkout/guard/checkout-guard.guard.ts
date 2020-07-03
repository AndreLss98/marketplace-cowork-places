import { CheckoutService } from './../../../shared/service/checkout.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuardGuard implements CanLoad {

  constructor(
    private checkoutService: CheckoutService
  ){}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    if(this.checkoutService.data_entrada && this.checkoutService.data_saida && this.checkoutService.espaco) return true;

    return false;
  }
}
