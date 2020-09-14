import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { FeedbackService } from 'src/app/shared/service/feedback.service';
import { MatDialog } from '@angular/material/dialog';

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
    private matDialog: MatDialog,
    private feedbackSevice: FeedbackService,
  ) {
    
  }

  ngOnInit(): void {
    this.fetchQuestions();
  }

  private fetchQuestions() {
    this.feedbackSevice.getAllByUser().subscribe(response => {
      this.questions = response.filter(question => !question.resposta);
      if(this.questions.length > 0) this.configForm();
    });
  }

  private configForm() {
    this.questions.forEach(question => {
      this.form[question.nome_campo] = new FormControl(question.campo.propriedades.standard || '');
    });
    this.formFeedback = new FormGroup(this.form);
  }

  public sendFeedback() {
    let answers: any = [];
    Object.keys(this.formFeedback.value).forEach(field_name => {
      const feedback_id = this.questions.find(question => question.nome_campo === field_name).id;
      answers.push({ feedback_id, resposta: this.formFeedback.value[field_name] });
    });
    //console.log(answers);
    this.feedbackSevice.reply(answers).subscribe(response => {
      this.matDialog.closeAll();
    });
  }
}
