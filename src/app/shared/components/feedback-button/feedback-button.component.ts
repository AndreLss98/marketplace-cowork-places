import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FeedbackModalComponent } from 'src/app/shared/modal/feedback-modal/feedback-modal.component';

@Component({
  selector: 'app-feedback-button',
  templateUrl: './feedback-button.component.html',
  styleUrls: ['./feedback-button.component.scss']
})
export class FeedbackButtonComponent implements OnInit {

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void { }

  openModal(){
    this.matDialog.open(FeedbackModalComponent);
  }

}
