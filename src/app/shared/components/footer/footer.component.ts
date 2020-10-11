import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from 'src/app/shared/service/user.service';
import { PoliticasService } from 'src/app/shared/service/politicas.service';

import { FeedbackModalComponent } from 'src/app/shared/modal/feedback-modal/feedback-modal.component';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  readonly SUPPORT_PHONE = environment.supportPhone;

  public politicas = [];

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    public userService: UserService,
    public politicasService: PoliticasService,
  ) { }

  ngOnInit(): void {
    this.politicasService.getAll().subscribe((response: any) => {
      this.politicasService.politicas = response;
    });
  }

  viewPolitica(url) {
    console.log('Essa é a url do arquivo: ', url);
    this.router.navigateByUrl(`about?url=${url}`);
  }

  openFeedback(){
    this.matDialog.open(FeedbackModalComponent);
  }
}
