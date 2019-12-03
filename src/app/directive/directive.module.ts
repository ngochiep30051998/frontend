import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDirective } from './number.directive';
import { UppercaseInputDirective } from './uppercase-input.directive';



@NgModule({
  declarations: [
    NumberDirective,
    UppercaseInputDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumberDirective,
    UppercaseInputDirective
  ]
})
export class DirectiveModule { }
