import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ItemCardLoaderComponent } from './item-card-loader.component';

describe('ItemCardLoaderComponent', () => {
  let component: ItemCardLoaderComponent;
  let fixture: ComponentFixture<ItemCardLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCardLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCardLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
