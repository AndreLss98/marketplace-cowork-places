import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPerguntasComponent } from './lista-perguntas.component';

describe('ListaPerguntasComponent', () => {
  let component: ListaPerguntasComponent;
  let fixture: ComponentFixture<ListaPerguntasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPerguntasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPerguntasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
