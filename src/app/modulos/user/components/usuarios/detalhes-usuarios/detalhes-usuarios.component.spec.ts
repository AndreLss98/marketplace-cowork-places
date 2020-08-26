import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesUsuariosComponent } from './detalhes-usuarios.component';

describe('DetalhesUsuariosComponent', () => {
  let component: DetalhesUsuariosComponent;
  let fixture: ComponentFixture<DetalhesUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
