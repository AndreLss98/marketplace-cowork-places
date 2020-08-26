import { FeedbackModalComponent } from './../../modal/feedback-modal/feedback-modal.component';
import { ModalService } from 'src/app/shared/service/modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-button',
  templateUrl: './feedback-button.component.html',
  styleUrls: ['./feedback-button.component.scss']
})
export class FeedbackButtonComponent implements OnInit {

  constructor(
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  openModal(){
    this.modalService.openModal(FeedbackModalComponent, true);
  }

}
