import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { FeedbackService } from 'src/app/shared/service/feedback.service';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss']
})
export class FeedbackModalComponent implements OnInit {
  public form: any = {};
  public formFeedback: FormGroup;

  public questions = [];
  
  constructor(
    private feedbackSevice: FeedbackService
  ) {
    
  }

  ngOnInit(): void {
    this.fetchQuestions();
  }

  private fetchQuestions() {
    this.feedbackSevice.getAllByUser().subscribe(response => {
      this.questions = response.filter(question => !question.resposta);
      this.configForm();
    });
  }

  private configForm() {
    this.questions.forEach(question => {
      this.form[question.nome_campo] = new FormControl(question.campo.propriedades.standard || '');
    });
    this.formFeedback = new FormGroup(this.form);
  }
}
