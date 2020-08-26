import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPoliticasComponent } from './lista-politicas.component';

describe('ListaPoliticasComponent', () => {
  let component: ListaPoliticasComponent;
  let fixture: ComponentFixture<ListaPoliticasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPoliticasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPoliticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
