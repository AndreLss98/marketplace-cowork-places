import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AlugaveisService } from 'src/app/shared/service/alugaveis.service';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  myControl = new FormControl();
  options: any = [];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
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
