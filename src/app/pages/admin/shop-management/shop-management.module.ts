import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopManagementComponent } from './shop-management.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ShopManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ShopManagementComponent }])
  ]
})
export class ShopManagementModule { }
