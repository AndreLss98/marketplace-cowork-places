import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { HEADER_NAV_OPTIONS } from 'src/app/shared/constants/constants';

import { UserService } from 'src/app/shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';
import { ModalService } from 'src/app/shared/service/modal.service';

import { LoginComponent } from 'src/app/shared/modal/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public menu = HEADER_NAV_OPTIONS;
  public options = [];

  constructor(
    public router: Router,
    public user: UserService,
    public login: LoginService,
    public modalService: ModalService,
  ) { }

  ngOnInit(): void {

  }

  goTo(path: string, id?: number) {
    let queryParams: any = {};
    if (id) queryParams.tipo_id = id;
    this.router.navigate([path], { queryParams });
  }

  doLogin(popover?) {
    if (!this.login.logged_status) {
      this.modalService.openModal(LoginComponent, false);
    } else {
      if (popover.isOpen()) {
        popover.close();
      } else {
        popover.open();
      }
    }
  }

  checkHome() {
    return !(this.router.url.includes('/user') || this.router.url.includes('/search'));
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

