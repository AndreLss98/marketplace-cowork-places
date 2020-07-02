import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesAlugaveisComponent } from './detalhes-alugaveis.component';

describe('DetalhesAlugaveisComponent', () => {
  let component: DetalhesAlugaveisComponent;
  let fixture: ComponentFixture<DetalhesAlugaveisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalhesAlugaveisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesAlugaveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
