import { Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { UserService } from './shared/service/user.service';
import { LoginService } from './shared/service/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  readonly SUPPORT_PHONE = environment.supportPhone;
  title = 'placeet';

  @ViewChild('nav', { static: false })
  private nav: ElementRef;

  public sidenavOpened = false;

  constructor(
    public router: Router,
    public login: LoginService,
    public userService: UserService,
  ) {
    this.login.autoLogin();
  }

  toggleSideMenu() {
    this.sidenavOpened = !this.sidenavOpened;
    !this.sidenavOpened? this.nav.nativeElement.classList.add('sticky-top') : this.nav.nativeElement.classList.remove('sticky-top');
  }

  comoFunciona() {
    if (!this.router.url.includes('/home')) {
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          var el = document.getElementById('comoFunciona');
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      })
    } else {
      var el = document.getElementById('comoFunciona');
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

