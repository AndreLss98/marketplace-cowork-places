import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { UserService } from 'src/app/shared/service/user.service';
import { LoginService } from 'src/app/shared/service/login.service';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  @Output()
  public action = new EventEmitter();

  constructor(
    public userService: UserService,
    public loginService: LoginService
  ) { }

  ngOnInit(): void {

  }

  public onAction() {
    this.action.emit();
  }

}
