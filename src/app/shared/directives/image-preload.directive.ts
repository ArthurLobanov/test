import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'img[default]',
  host: {
    '(error)': 'updateUrl()',
    '[src]': 'src'
  }
})

export class ImagePreloadDirective {
  @Input() src: string | undefined;
  @Input() default: string = '';
  @HostBinding('class') className: string = '';

  updateUrl() {
    this.src = this.default;
    this.className = 'imageError';
  }
}
