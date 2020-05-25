import { LoginService } from './shared/service/login.service';
import { Component } from '@angular/core';
import { USER_SESSION } from './shared/constants/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'place-et';

  constructor(
    private login: LoginService
  ){}

  ngOnInit(){
    // this.login.getUserSession();
  }

}

