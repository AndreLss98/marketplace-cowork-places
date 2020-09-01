import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgCircularComponent } from './img-circular.component';

describe('ImgCircularComponent', () => {
  let component: ImgCircularComponent;
  let fixture: ComponentFixture<ImgCircularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgCircularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
