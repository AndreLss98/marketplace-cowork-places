import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { UserService } from 'src/app/shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';

import { LoginComponent } from 'src/app/shared/modal/login/login.component';

@Component({
  selector: 'account-btn',
  templateUrl: './account-btn.component.html',
  styleUrls: ['./account-btn.component.scss']
})
export class AccountBtnComponent implements OnInit {

  @Output()
  public action = new EventEmitter();

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public login: LoginService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
  
  }

  goTo(path: string, id?: number) {
    let queryParams: any = {};
    if (id) queryParams.tipo_id = id;
    this.action.emit();
    this.router.navigate([path], { queryParams });
  }

  openModalOrOpenPopover(popover?) {
    if (!this.login.logged_status) {
      this.dialog.open(LoginComponent);
    } else {
      popover.isOpen() ? popover.close() : popover.open();
    }
  }

}
