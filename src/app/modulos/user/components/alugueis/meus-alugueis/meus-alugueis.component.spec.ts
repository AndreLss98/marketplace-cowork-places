import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusAlugueisComponent } from './meus-alugueis.component';

describe('MeusAlugueisComponent', () => {
  let component: MeusAlugueisComponent;
  let fixture: ComponentFixture<MeusAlugueisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusAlugueisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusAlugueisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
