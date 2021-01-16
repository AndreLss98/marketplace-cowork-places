import { Component, OnInit } from '@angular/core';

import { UserService } from './../../shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user:any;
  public isAdmin: boolean = false;
  public currentSelection: string = '';
  
  constructor(
    private login: LoginService,
    public userService: UserService,
  ) {

  }

  updateSelection(path: string){
    this.currentSelection = path;
  }
  
  ngOnInit(): void {
    this.checkAdminPermission();

    this.login.userLoginEvent.subscribe(() => {
      this.checkAdminPermission();
    });
  }

  checkAdminPermission() {
    if (this.userService.user_data) {
      try {
        this.userService.checkPermission().subscribe(() => {
          this.isAdmin = true;
          this.userService.isAdmin = true;
        }, (error) => {
          this.userService.isAdmin = false;
          this.isAdmin = false;
        });
      } catch (error) {
        console.log(error)
      }
    }
  }
}
