import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightItemsComponent } from './highlight-items.component';

describe('HighlightItemsComponent', () => {
  let component: HighlightItemsComponent;
  let fixture: ComponentFixture<HighlightItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HighlightItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HighlightItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
