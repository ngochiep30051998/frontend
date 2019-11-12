import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule } from '@angular/router';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {EditorModule} from 'primeng/editor';

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    EditorModule,
    RouterModule.forChild([{ path: '', component: ProductComponent }])
  ]
})
export class ProductModule { }
