import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckOutComponent } from './check-out.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CheckOutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CheckOutComponent }])
  ]
})
export class CheckOutModule { }
