import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAlugaveisComponent } from './lista-alugaveis.component';

describe('ListaAlugaveisComponent', () => {
  let component: ListaAlugaveisComponent;
  let fixture: ComponentFixture<ListaAlugaveisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAlugaveisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAlugaveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
