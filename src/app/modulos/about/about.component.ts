import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  public url = "";
  public politicas = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(queryParams => {
      this.url = queryParams.url;
    });

    this.route.data.subscribe((res: any) => {
      console.log(res.politicas)
      this.politicas = res.politicas
    });
  }

  navigateInside(politica: string) {
    window.location.replace(`/about?url=${politica}`)
  }
}
