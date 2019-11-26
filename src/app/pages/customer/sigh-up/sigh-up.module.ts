import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SighUpComponent } from './sigh-up.component';
import { RouterModule } from '@angular/router';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [SighUpComponent],
  imports: [
    CommonModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ToastModule,
    RouterModule.forChild([{ path: '', component: SighUpComponent }])
  ]
})
export class SighUpModule { }
