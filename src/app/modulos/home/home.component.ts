import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';

import { HOME_TEXT, HOME_COMO_FUNCIONA, HOME_INFO_MIDDLE } from '../../shared/constants/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public infoTopTitle = HOME_TEXT.infoTopTitle
  public searchTitle = HOME_TEXT.searchTitle;
  public searchContent = HOME_TEXT.searchContent;
  public comoFunciona = HOME_COMO_FUNCIONA;
  public infoMiddle = HOME_INFO_MIDDLE;

  myControl = new FormControl();
  options: any = [];
  

  constructor(
    private router: Router,
    private alugaveisService: AlugaveisService
  ) { }

  ngOnInit(): void {
    this.alugaveisService.getCidades().subscribe(response => {
      this.options = response.map(resp => resp.cidade);
    });
  }

  search(cidade = '') {
    let queryParams: any = {};
    if (cidade !== '') queryParams.cidade = cidade;
    this.router.navigate(['/search'], { queryParams });
  }

}
