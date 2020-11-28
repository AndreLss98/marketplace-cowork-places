import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPublicAlvoComponent } from './lista-public-alvo.component';

describe('ListaPublicAlvoComponent', () => {
  let component: ListaPublicAlvoComponent;
  let fixture: ComponentFixture<ListaPublicAlvoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaPublicAlvoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPublicAlvoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
