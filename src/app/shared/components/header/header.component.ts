import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

import { HEADER_MENU_OPTIONS , HEADER_NAV_OPTIONS} from '../../constants/constants';
import { ModalService } from 'src/app/service/modal.service';
import { LoginComponent } from 'src/app/shared/modal/login/login.component';

import * as $ from 'jquery'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menu = HEADER_NAV_OPTIONS;
  private mobile_mode = false;
  public options = HEADER_MENU_OPTIONS;

  constructor(
    public login: LoginService,
    public modalService: ModalService,
    private router: Router
  ) { }

  goTo(path: string){
    this.router.navigateByUrl(path);
    console.log(path)
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
          minHeight: '90vh'
        }
      }
      this.modalService.openModal(LoginComponent, false, config);
    } // else do nothing
  }
  
  ngOnInit(): void {
    if($(window).width() < 426) this.mobile_mode = true;

    $(document).ready(function () {

      if($(window).width() < 426){
        $('#navTop').hide();
        $('#navBottom').show();
        $("#menuHeader").hide();
      }

      $(document).click(function (event) {
          var clickover = $(event.target);
          var _opened = $(".navbar-collapse").hasClass("show");
          if (_opened === true && !clickover.hasClass("navbar-toggler")) {
              $("button.navbar-toggler").click();
          }
      });

      var position = $(window).scrollTop(); 

      $(window).scroll(function() {
          var scroll = $(window).scrollTop();
          if(scroll > position + 30) {
              $('#navBottom').removeClass('up');
              $('#navBottom').addClass('down');
              position = scroll;
          } else if (scroll < position){
              $('#navBottom').removeClass('down');
              $('#navBottom').addClass('up');
              position = scroll;
          }
      });
    });
  }
}
