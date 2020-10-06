import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { HEADER_NAV_OPTIONS } from 'src/app/shared/constants/constants';

import { UserService } from 'src/app/shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';

@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  public options = [];
  public menu = HEADER_NAV_OPTIONS;

  @Input()
  public redesSociaisColumnMode: boolean = false;

  @Output()
  public action = new EventEmitter();

  constructor(
    public router: Router,
    public user: UserService,
    public login: LoginService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void { }

  checkHome() {
    return !(this.router.url.includes('/user') || this.router.url.includes('/search'));
  }

  resendAction() {
    this.action.emit();
  }
}

