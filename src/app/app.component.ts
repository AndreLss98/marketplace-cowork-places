import { UserService } from './shared/service/user.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from './shared/service/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'place-et';

  public hideHeader = false;
  public hideFooter = false;

  constructor(
    private login: LoginService,
    private route: ActivatedRoute,
    private userService: UserService
  ){
    this.login.verifySession();

    this.userService.checkPermission().subscribe(response => this.userService.isAdmin = true);

    this.route.queryParams.subscribe( params => {
      console.log("meus params: ",params);
      this.hideFooter = params["hideFooter"] || false;
      this.hideHeader = params["hideHeader"] || false;
    })
  }
}

