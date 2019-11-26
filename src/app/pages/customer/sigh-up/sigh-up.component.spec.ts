import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SighUpComponent } from './sigh-up.component';

describe('SighUpComponent', () => {
  let component: SighUpComponent;
  let fixture: ComponentFixture<SighUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SighUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SighUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
