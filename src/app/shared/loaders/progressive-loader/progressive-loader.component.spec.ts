import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProgressiveLoaderComponent } from './progressive-loader.component';

describe('ProgressiveLoaderComponent', () => {
  let component: ProgressiveLoaderComponent;
  let fixture: ComponentFixture<ProgressiveLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressiveLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressiveLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
