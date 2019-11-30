import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductByProviderComponent } from './product-by-provider.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductByProviderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProductByProviderComponent }])
  ]
})
export class ProductByProviderModule { }
