import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './product-management.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ProductManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ProductManagementComponent }])
  ]
})
export class ProductManagementModule { }
