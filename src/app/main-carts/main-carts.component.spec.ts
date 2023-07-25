import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCartsComponent } from './main-carts.component';

describe('MainCartsComponent', () => {
  let component: MainCartsComponent;
  let fixture: ComponentFixture<MainCartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainCartsComponent]
    });
    fixture = TestBed.createComponent(MainCartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
