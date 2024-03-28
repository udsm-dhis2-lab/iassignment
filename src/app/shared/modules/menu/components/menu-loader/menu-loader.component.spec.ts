import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MenuLoaderComponent } from './menu-loader.component';

describe('MenuLoaderComponent', () => {
  let component: MenuLoaderComponent;
  let fixture: ComponentFixture<MenuLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
