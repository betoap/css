import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardSelectboxComponent } from './standard-selectbox.component';

describe('StandardSelectboxComponent', () => {
  let component: StandardSelectboxComponent;
  let fixture: ComponentFixture<StandardSelectboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardSelectboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardSelectboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
