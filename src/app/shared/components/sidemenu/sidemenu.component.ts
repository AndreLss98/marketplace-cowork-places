import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { HEADER_NAV_OPTIONS } from 'src/app/shared/constants/constants';

import { UserService } from 'src/app/shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';

import { LoginComponent } from 'src/app/shared/modal/login/login.component';

@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  public options = [];
  public menu = HEADER_NAV_OPTIONS;

  @Output()
  public action = new EventEmitter();

  constructor(
    public router: Router,
    public user: UserService,
    public login: LoginService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  goTo(path: string, id?: number) {
    this.action.emit();
    let queryParams: any = {};
    if (id) queryParams.tipo_id = id;
    this.router.navigate([path], { queryParams });
  }

  openModalOrOpenPopover(popover?) {
    this.action.emit();
    if (!this.login.logged_status) {
      this.dialog.open(LoginComponent);
    } else {
      popover.isOpen() ? popover.close() : popover.open();
    }
  }

  checkHome() {
    return !(this.router.url.includes('/user') || this.router.url.includes('/search'));
  }

  comoFunciona() {
    this.action.emit();
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

