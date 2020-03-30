import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

import { HEADER_MENU_OPTIONS } from './../../shared/constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menu = HEADER_MENU_OPTIONS;

  constructor(
    public login: LoginService,
  ) { }

  mouse_over(element){
    // console.log(element.target)
    element.target.classList.add("highlight")
  }
  
  mouse_out(element){
    element.target.classList.remove("highlight")
  }
  
  doLogin(){
    if(this.login.logged_status == false){
      this.login.openDialog();

      console.log("Go to login")
    } // else do nothing
  }
  
  ngOnInit(): void {
    // Se a view for menor que 991 o menu sanduiche vai aparecer,
    // Para efeito de collapse
    if(window.innerWidth < 991){
      document.getElementById('contentNav').setAttribute( 'data-toggle' , 'collapse');
      document.getElementById('contentNav').setAttribute( 'data-target' , '#navbar');
    }
  }
}
