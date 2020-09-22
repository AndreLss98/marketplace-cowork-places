import { Component, ElementRef, ViewChild } from '@angular/core';

import { UserService } from './shared/service/user.service';
import { LoginService } from './shared/service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'placeet';

  @ViewChild('nav', { static: false })
  private nav: ElementRef;

  public sidenavOpened = false;

  constructor(
    private login: LoginService,
    public userService: UserService
  ) {
    this.login.autoLogin();
  }

  toggleSideMenu() {
    this.sidenavOpened = !this.sidenavOpened;
    !this.sidenavOpened? this.nav.nativeElement.classList.add('sticky-top') : this.nav.nativeElement.classList.remove('sticky-top');
    console.log(this.nav)
  }
}

