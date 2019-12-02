import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoadingComponent }])
  ]
})
export class LoadingModule { }
