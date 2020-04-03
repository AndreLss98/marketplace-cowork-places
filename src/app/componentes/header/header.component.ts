import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

import { HEADER_MENU_OPTIONS } from './../../shared/constants/constants';
import { ModalService } from 'src/app/service/modal.service';
import { LoginComponent } from 'src/app/modal/login/login.component';
import * as $ from 'jquery';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menu = HEADER_MENU_OPTIONS;

  constructor(
    public login: LoginService,
    public modalService: ModalService
  ) { }

  mouse_over(element){
    // console.log(element.target)
    element.target.classList.add("highlight")
  }
  
  mouse_out(element){
    element.target.classList.remove("highlight")
  }
  
  doLogin(){
    if(!this.login.logged_status){
      this.modalService.openModal(LoginComponent);

      console.log("Go to login")
    } // else do nothing
  }
  
  ngOnInit(): void {
    $(document).ready(function () {
      $(document).click(function (event) {
          var clickover = $(event.target);
          console.log("algo");
          var _opened = $(".navbar-collapse").hasClass("show");
          if (_opened === true && !clickover.hasClass("navbar-toggler")) {
              $("button.navbar-toggler").click();
          }
      });
  });
  }
}
