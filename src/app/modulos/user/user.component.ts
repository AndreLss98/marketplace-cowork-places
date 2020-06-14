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
  public isAdmin: boolean = false;

  constructor(
    private login: LoginService,
    private userService: UserService,
  ) {
    this.userService.checkPermission().subscribe((response: any) => {
      this.isAdmin = true;
    }, (error) => {
      console.log(error);
      this.isAdmin = false;
    });
  }

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
