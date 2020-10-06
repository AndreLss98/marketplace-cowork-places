import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from '../../modal/login/login.component';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'account-btn',
  templateUrl: './account-btn.component.html',
  styleUrls: ['./account-btn.component.scss']
})
export class AccountBtnComponent implements OnInit {

  constructor(
    private router: Router,
    private dialog: MatDialog,
    public login: LoginService,
  ) { }

  ngOnInit(): void {
  
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

}
