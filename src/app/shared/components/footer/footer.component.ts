import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { UserService } from 'src/app/shared/service/user.service';
import { PoliticasService } from 'src/app/shared/service/politicas.service';

import { FeedbackModalComponent } from 'src/app/shared/modal/feedback-modal/feedback-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public politicas = [];

  constructor(
    private matDialog: MatDialog,
    public userService: UserService,
    private politicasService: PoliticasService,
  ) { }

  ngOnInit(): void {
    this.politicasService.getAll().subscribe((response: any) => {
      this.politicas = response.filter(politica => politica.aprovado);
    });
  }

  openFeedback(){
    this.matDialog.open(FeedbackModalComponent);
  }

}
