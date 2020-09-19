import { CheckoutService } from './../../../shared/service/checkout.service';
import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuardGuard implements CanLoad {

  constructor(
    private checkoutService: CheckoutService
  ){ }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    // return true;
    if(this.checkoutService.reserva) return true;

    return false;
  }
}
