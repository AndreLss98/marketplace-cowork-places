import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

import { HEADER_MENU_OPTIONS } from './../../shared/constants/constants';
import { ModalService } from 'src/app/service/modal.service';
import { LoginComponent } from 'src/app/modal/login/login.component';

import * as $ from 'jquery'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menu = HEADER_MENU_OPTIONS;
  private mobile_mode = false;

  constructor(
    public login: LoginService,
    public modalService: ModalService
  ) { }

  mouse_over(element){
    // console.log(element.target)
    // element.target.classList.add("highlight")
  }
  
  mouse_out(element){
    // element.target.classList.remove("highlight")
  }
  
  doLogin(){
    
    setTimeout(() => {     
      $('#navBottom').addClass('down');
      $('#navBottom').removeClass('up');
    }, 100);

    if(!this.login.logged_status){

      let config: any = {};
      if(this.mobile_mode){
        config = {
          maxWidth: '100vw',
          minHeight: '100vh'
        }
      }
      this.modalService.openModal(LoginComponent, false, config);

      console.log("Go to login")
    } // else do nothing
  }
  
  ngOnInit(): void {
    if($(window).width() < 426) this.mobile_mode = true;

    $(document).ready(function () {

      if($(window).width() < 426){
        $('#navTop').hide();
        $('#navBottom').show();
      }

      $(document).click(function (event) {
          var clickover = $(event.target);
          console.log("algo");
          var _opened = $(".navbar-collapse").hasClass("show");
          if (_opened === true && !clickover.hasClass("navbar-toggler")) {
              $("button.navbar-toggler").click();
          }
      });

      var position = $(window).scrollTop(); 

      $(window).scroll(function() {
          var scroll = $(window).scrollTop();
          if(scroll > position + 30) {
              console.log('scrollDown', scroll, position);
              $('#navBottom').removeClass('up');
              $('#navBottom').addClass('down');
              position = scroll;
          } else if (scroll < position){
              console.log('scrollUp', scroll, position);
              $('#navBottom').removeClass('down');
              $('#navBottom').addClass('up');
              position = scroll;
          }
      });
    });
  }
}
