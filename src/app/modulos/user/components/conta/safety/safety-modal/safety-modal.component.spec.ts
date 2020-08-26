import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyModalComponent } from './safety-modal.component';

describe('SafetyModalComponent', () => {
  let component: SafetyModalComponent;
  let fixture: ComponentFixture<SafetyModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SafetyModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SafetyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
