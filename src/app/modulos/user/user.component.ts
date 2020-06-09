import { LoginService } from 'src/app/shared/service/login.service';
import { UserService } from './../../shared/service/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {

  public user:any;
  public opened: boolean = true;
  public currentSelection: string = '';

  constructor(
    private userService: UserService,
    private login: LoginService,
  ) { }

  updateSelection(path: string){
    this.currentSelection = path;
  }
  
  ngOnInit(): void {
    $('#menuHeader').hide();
  }

  ngOnDestroy(): void {
    $('#menuHeader').show();
    console.log("Sai daqui pai")
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

  logout(){
    this.login.logout();
  }




}
