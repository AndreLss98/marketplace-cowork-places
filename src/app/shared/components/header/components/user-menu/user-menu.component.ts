import { LoginService } from './../../../../service/login.service';
import { UserService } from './../../../../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  constructor(
    public userService: UserService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {
  }

}
