import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxSlideToggleComponent } from './checkbox-slide-toggle.component';

describe('CheckboxSlideToggleComponent', () => {
  let component: CheckboxSlideToggleComponent;
  let fixture: ComponentFixture<CheckboxSlideToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckboxSlideToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxSlideToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
