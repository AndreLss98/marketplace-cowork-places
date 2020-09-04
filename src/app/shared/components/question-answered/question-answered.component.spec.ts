import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAnsweredComponent } from './question-answered.component';

describe('QuestionAnsweredComponent', () => {
  let component: QuestionAnsweredComponent;
  let fixture: ComponentFixture<QuestionAnsweredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAnsweredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAnsweredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
