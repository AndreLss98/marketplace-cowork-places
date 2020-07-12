import { UserService } from './../../service/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/shared/service/login.service';

import { HEADER_MENU_OPTIONS , HEADER_NAV_OPTIONS} from '../../constants/constants';
import { ModalService } from 'src/app/shared/service/modal.service';
import { LoginComponent } from 'src/app/shared/modal/login/login.component';

import * as $ from 'jquery'
import { MenuService } from '../../service/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menu = HEADER_NAV_OPTIONS;
  private mobile_mode = false;
  public options = [];

  constructor(
    public login: LoginService,
    public user: UserService,
    public modalService: ModalService,
    private router: Router,
    private menuService: MenuService
  ) { 
    menuService.getAllHome().subscribe((response: any) => {
      this.options = response.filter(tipo => tipo.disponivel);
    });
  }

  goTo(path: string, id?: number) {
    let queryParams: any = {};
    if (id) queryParams.tipo_id = id;
    this.router.navigate([path], { queryParams });
  }
  
  doLogin(popover?) {
    
    setTimeout(() => {     
      $('#navBottom').addClass('down');
      $('#navBottom').removeClass('up');
    }, 100);

    if(!this.login.logged_status){

      let config: any = {};
      if(this.mobile_mode){
        config = {
          maxWidth: '100vw',
          minWidth: '90vw',
          // minHeight: '90vh'
        }
      }else{
        config = {
          // maxWidth: '100vw',
          minWidth: '30vw',
          // minHeight: '90vh'
        }
      }
      this.modalService.openModal(LoginComponent, false, config);
    }else{
      if(popover.isOpen()){
        popover.close();
      } else {
        popover.open();
      }
    }
  }
  
  ngOnInit(): void {
    if($(window).width() < 426) this.mobile_mode = true;
    if($(window).width() < 860) this.options.length = 3;

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
