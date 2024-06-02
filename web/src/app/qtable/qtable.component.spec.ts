import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QtableComponent } from './qtable.component';

describe('QtableComponent', () => {
  let component: QtableComponent;
  let fixture: ComponentFixture<QtableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QtableComponent]
    });
    fixture = TestBed.createComponent(QtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
