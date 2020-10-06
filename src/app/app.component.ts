import { Router } from '@angular/router';
import { Component, ElementRef, ViewChild } from '@angular/core';

import { UserService } from './shared/service/user.service';
import { LoginService } from './shared/service/login.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from './shared/modal/login/login.component';

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
    private router: Router,
    private dialog: MatDialog,
    public login: LoginService,
    public userService: UserService,
  ) {
    this.login.autoLogin();
  }

  toggleSideMenu() {
    this.sidenavOpened = !this.sidenavOpened;
    !this.sidenavOpened? this.nav.nativeElement.classList.add('sticky-top') : this.nav.nativeElement.classList.remove('sticky-top');
  }

  goTo(path: string, id?: number) {
    let queryParams: any = {};
    if (id) queryParams.tipo_id = id;
    this.router.navigate([path], { queryParams });
  }

  openModalOrOpenPopover(popover?) {
    if (!this.login.logged_status) {
      this.dialog.open(LoginComponent);
    } else {
      popover.isOpen() ? popover.close() : popover.open();
    }
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

