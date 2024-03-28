import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MetaDataAssignComponent } from './meta-data-assign.component';

describe('MetaDataAssignComponent', () => {
  let component: MetaDataAssignComponent;
  let fixture: ComponentFixture<MetaDataAssignComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MetaDataAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaDataAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
