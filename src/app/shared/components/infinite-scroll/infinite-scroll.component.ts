import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class InfiniteScrollComponent implements AfterViewInit, OnDestroy {
  @Output() scrolled = new EventEmitter<void>();
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;

  private observer!: IntersectionObserver;

  constructor(private host: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          this.scrolled.emit();
        }
      },
      {
        root: this.isHostScrollable() ? this.host.nativeElement : null
      });
    this.observer.observe(this.anchor.nativeElement);
  }

  private isHostScrollable(): boolean {
    const style = window.getComputedStyle(this.host.nativeElement);
    return style.getPropertyValue('overflow') === 'auto' || style.getPropertyValue('overflow-y') === 'scroll';
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
}
