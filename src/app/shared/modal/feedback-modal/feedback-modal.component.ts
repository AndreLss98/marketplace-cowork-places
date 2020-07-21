import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss']
})
export class FeedbackModalComponent implements OnInit {

  public pergunta = "De 0 a 10, o quanto você recomenda o nosso site ?";
  public mode = "range";
  public resposta_range;
  public responsta_text;

  public formFeedback: FormGroup
  range = new FormControl('', []);
  text = new FormControl('', []);

  constructor(
    private form: FormBuilder
  ) {
    this.formFeedback = this.form.group({
      range: this.range,
      text: this.text
    })
  }

  ngOnInit(): void {
  }

}
