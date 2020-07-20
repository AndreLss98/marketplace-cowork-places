import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-modal',
  templateUrl: './feedback-modal.component.html',
  styleUrls: ['./feedback-modal.component.scss']
})
export class FeedbackModalComponent implements OnInit {

  public pergunta = "De 0 a 10, o quanto você recomenda o nosso site ?";
  public resposta_range;
  public responsta_text;

  constructor() { }

  ngOnInit(): void {
  }

}
