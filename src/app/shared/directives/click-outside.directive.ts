import { Directive, ElementRef, EventEmitter, HostListener, Input, OnDestroy, Output } from '@angular/core';

@Directive({
  selector: '[clickOutside]'
})
export class ClickOutsideDirective implements OnDestroy {
  @Input() exclude: ElementRef[];

  constructor(private _elementRef: ElementRef) {
  }

  @Output('clickOutside') clickOutside: EventEmitter<any> = new EventEmitter();

  @HostListener('document:click', ['$event.target']) click(targetElement: HTMLElement) {
    const clickedInside = this._elementRef.nativeElement.contains(targetElement);
    let isExcluded;
    if(this.exclude.length) {
      this.exclude.forEach(el=> {
        if(el.nativeElement === targetElement) {
          isExcluded = true;
          return;
        }
      })
    }
    if (!clickedInside && !isExcluded) {
      this.clickOutside.emit(null);
    }
  }

  ngOnDestroy(): void {
  }

}
