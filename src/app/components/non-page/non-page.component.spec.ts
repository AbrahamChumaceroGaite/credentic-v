import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonPageComponent } from './non-page.component';

describe('NonPageComponent', () => {
  let component: NonPageComponent;
  let fixture: ComponentFixture<NonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NonPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
