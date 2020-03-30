import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { LoginComponent } from '../modal/login/login.component';

import { SocialUser } from 'angularx-social-login/lib/entities/user'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private _logged_status: boolean = false;
  private _user_data: SocialUser;

  constructor(
    public dialog: MatDialog,
  ) { }

  get logged_status(): boolean {
    return this._logged_status;
  }

  set logged_status(status: boolean) {
    this._logged_status = status;
  }

  get user_data(): SocialUser{
    return this._user_data;
  }

  set user_data(user){
    this._user_data = user;
  }

  public openDialog(){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80vh";

    const dialogRef = this.dialog.open(LoginComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( response => {
      this.logged_status = response.status;
      this.user_data = response.data
    })
  }
}
