import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicoesComponent } from './condicoes.component';

describe('CondicoesComponent', () => {
  let component: CondicoesComponent;
  let fixture: ComponentFixture<CondicoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
