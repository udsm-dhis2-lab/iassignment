import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssignmentInputComponent } from './assignment-input.component';

describe('AssignmentInputComponent', () => {
  let component: AssignmentInputComponent;
  let fixture: ComponentFixture<AssignmentInputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
