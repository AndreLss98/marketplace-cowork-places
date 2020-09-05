import { MobileService } from './../../shared/service/mobile.service';
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
  public opened: boolean = true && !this.mobileService.isMobile();
  public currentSelection: string = '';
  public isAdmin: boolean = false;
  
  constructor(
    private login: LoginService,
    public userService: UserService,
    public mobileService: MobileService
  ) {

  }

  updateSelection(path: string){
    this.currentSelection = path;
  }
  
  ngOnInit(): void {
    $('#menuHeader').hide();

    if (this.userService.user_data) {
      this.userService.checkPermission().subscribe(() => {
        this.isAdmin = true;
        this.userService.isAdmin = true;
      }, (error) => {
        //console.log(error);
        this.userService.isAdmin = false;
        this.isAdmin = false;
      });
    }
  }

  ngOnDestroy(): void {
    $('#menuHeader').show();
  }
}
