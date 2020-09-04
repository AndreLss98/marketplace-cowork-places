import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'question-answered',
  templateUrl: './question-answered.component.html',
  styleUrls: ['./question-answered.component.scss']
})
export class QuestionAnsweredComponent implements OnInit {

  @Input() questionAnswered: any;

  constructor() { }

  ngOnInit(): void {

  }

}
