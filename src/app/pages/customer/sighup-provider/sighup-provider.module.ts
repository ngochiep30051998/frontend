import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SighupProviderComponent } from './sighup-provider.component';
import { RouterModule } from '@angular/router';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { DirectiveModule } from '../../../directive/directive.module';



@NgModule({
  declarations: [SighupProviderComponent],
  imports: [
    CommonModule,
    InputTextareaModule,
    ReactiveFormsModule,
    ToastModule,
    DirectiveModule,
    RouterModule.forChild([{ path: '', component: SighupProviderComponent }])
  ]
})
export class SighupProviderModule { }
