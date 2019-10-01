import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { RouterModule } from '@angular/router';
import { MegaMenuModule } from 'primeng/megamenu';
import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [ProductCategoryComponent],
  imports: [
    CommonModule,
    MegaMenuModule,
    CardModule,
    RouterModule.forChild([{ path: '', component: ProductCategoryComponent }])
  ]
})
export class ProductCategoryModule { }
