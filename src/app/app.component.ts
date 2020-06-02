import { LoginService } from './shared/service/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'place-et';

  constructor(
    private login: LoginService
  ){
    this.login.verifySession();
  }

}

