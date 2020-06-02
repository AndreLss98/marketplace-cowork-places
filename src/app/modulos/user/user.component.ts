import { LoginService } from 'src/app/shared/service/login.service';
import { UserService } from './../../shared/service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public user:any;

  constructor(
    private userService: UserService,
    private login: LoginService,
  ) { }

  ngOnInit(): void {
    this.userService.getUserById(1).subscribe(result => {
      console.log(result);
    })
  }

  logout(){
    this.login.logout();
  }




}
