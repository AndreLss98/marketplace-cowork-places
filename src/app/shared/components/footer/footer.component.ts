import { ModalService } from 'src/app/shared/service/modal.service';
import { Component, OnInit } from '@angular/core';

import { UserService } from '../../service/user.service';
import { PoliticasService } from '../../service/politicas.service';

import { FeedbackModalComponent } from '../../modal/feedback-modal/feedback-modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  public politicas = [];

  constructor(
    private politicasService: PoliticasService,
    private modalService: ModalService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.politicasService.getAll().subscribe((response: any) => {
      this.politicas = response.filter(politica => politica.aprovado);
    });
  }

  openFeedback(){
    this.modalService.openModal(FeedbackModalComponent, true);
  }

}
