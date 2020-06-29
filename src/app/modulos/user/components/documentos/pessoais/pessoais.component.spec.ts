import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PessoaisComponent } from './pessoais.component';

describe('PessoaisComponent', () => {
  let component: PessoaisComponent;
  let fixture: ComponentFixture<PessoaisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PessoaisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PessoaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
