import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { LoginService } from 'src/app/shared/service/login.service';

import * as $ from 'jquery'

import { HEADER_MENU_OPTIONS , HEADER_NAV_OPTIONS} from '../../constants/constants';

import { MenuService } from '../../service/menu.service';
import { UserService } from './../../service/user.service';
import { ModalService } from 'src/app/shared/service/modal.service';
import { LoginComponent } from 'src/app/shared/modal/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menu = HEADER_NAV_OPTIONS;
  public mobile_mode = false;
  public options = [];
  public position;

  constructor(
    public router: Router,
    public user: UserService,
    public login: LoginService,
    private menuService: MenuService,
    public modalService: ModalService,
    ) {}
    
  ngOnInit(): void {
    if($(window).width() < 426) this.mobile_mode = true;
    
    this.menuService.getAllHome().subscribe((response: any) => {
      this.options = response.filter(tipo => tipo.disponivel);
    });
  
    // if($(window).width() < 860) this.options.length = 3;
    this.position = $(window).scrollTop(); 
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  scrollEvent(event) {
    var scroll = $(window).scrollTop();
    if(scroll > this.position + 30) {
        $('#navBottom').removeClass('up');
        $('#navBottom').addClass('down');
        this.position = scroll;
    } else if (scroll < this.position){
        $('#navBottom').removeClass('down');
        $('#navBottom').addClass('up');
        this.position = scroll;
    }
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

  checkHome(){
    if(this.router.url.includes('/home') || this.router.url == '/'){
      return false;
    }
    return true;
  }

  comoFunciona(){
    var el = document.getElementById('comoFunciona');
    el.scrollIntoView({behavior: 'smooth'});
  }
  
}
