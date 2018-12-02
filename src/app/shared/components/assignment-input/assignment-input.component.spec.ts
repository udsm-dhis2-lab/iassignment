import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentInputComponent } from './assignment-input.component';

describe('AssignmentInputComponent', () => {
  let component: AssignmentInputComponent;
  let fixture: ComponentFixture<AssignmentInputComponent>;

  beforeEach(async(() => {
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
