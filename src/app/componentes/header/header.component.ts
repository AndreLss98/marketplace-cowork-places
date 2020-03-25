import { Component, OnInit } from '@angular/core';
import { HEADER_MENU_OPTIONS } from './../../shared/constants/constants';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menu = HEADER_MENU_OPTIONS;
  constructor(
    public login: LoginService
  ) { }

  ngOnInit(): void {
  }

}
