import { Component } from '@angular/core';

import { UserService } from './shared/service/user.service';
import { LoginService } from './shared/service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'placeet';

  public sidenavOpened = false;

  constructor(
    private login: LoginService,
    public userService: UserService
  ) {
    this.login.autoLogin();
  }
}

