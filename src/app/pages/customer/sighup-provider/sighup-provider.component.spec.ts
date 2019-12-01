import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SighupProviderComponent } from './sighup-provider.component';

describe('SighupProviderComponent', () => {
  let component: SighupProviderComponent;
  let fixture: ComponentFixture<SighupProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SighupProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SighupProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
