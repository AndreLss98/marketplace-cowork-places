import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

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
    private route: ActivatedRoute,
    private userService: UserService
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
        }, error => {
          this.loading = false;
          this.message = 'Erro ao validar email!';
        });
      }
    });
  }

}
