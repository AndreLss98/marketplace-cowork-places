import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MobileService {

  constructor() { }

  public isMobile(){
    return $(window).width() < 426;
  }
}
