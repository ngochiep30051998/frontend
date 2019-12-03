import { Directive, Renderer, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercaseInput]'
})
export class UppercaseInputDirective {

  constructor(
    private renderer: Renderer,
    private el: ElementRef
  ) { }

  @HostListener('keyup') onKeyUp() {
    this.el.nativeElement.value = this.el.nativeElement.value.toUpperCase();

  }
}
