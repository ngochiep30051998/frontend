import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerFooterComponent } from './customer-footer/customer-footer.component';
import {ButtonModule} from 'primeng/button';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [
    CustomerHeaderComponent,
    CustomerFooterComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MegaMenuModule,
    MenuModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
  ],
  exports: [
    CustomerHeaderComponent,
    CustomerFooterComponent
  ]
})
export class SharedModule { }
