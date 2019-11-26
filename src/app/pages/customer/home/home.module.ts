import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';

import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { MegaMenuModule } from 'primeng/megamenu';
import {CarouselModule as PrimengCarosel} from 'primeng/carousel';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CarouselModule,
    MegaMenuModule,
    PrimengCarosel,
    CardModule,
    ButtonModule,
    RouterModule.forChild([{ path: '', component: HomeComponent }])
  ],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false } },
  ]
})
export class HomeModule { }
