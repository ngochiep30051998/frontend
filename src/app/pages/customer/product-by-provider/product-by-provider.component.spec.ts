import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductByProviderComponent } from './product-by-provider.component';

describe('ProductByProviderComponent', () => {
  let component: ProductByProviderComponent;
  let fixture: ComponentFixture<ProductByProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductByProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductByProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
