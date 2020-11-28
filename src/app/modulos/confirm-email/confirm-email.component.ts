import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  public loading: boolean = true;
  public validate: boolean = false;
  public message: string = 'Email sendo verificado!';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
  ) {
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const { token } = params;
      if (token) {
        this.userService.validateEmail(token).subscribe(response => {
          this.loading = false;
          this.validate = true;
          this.message = 'Email validado!';
          setTimeout(() => {
            this.router.navigateByUrl('/home', { replaceUrl: true });
          }, 3000);
        }, error => {
          this.loading = false;
          this.message = 'Erro ao validar email!';
          console.log(error);
        });
      }
    });
  }

}
