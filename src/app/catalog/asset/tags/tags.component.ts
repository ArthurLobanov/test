import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  Input, OnChanges,
  OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() tags: string[] = [];
  @ViewChild('showedTagsEl') showedTagsElRef: ElementRef<HTMLElement>;
  @ViewChild('hiddenTagsBtn') hiddenTagsBtnElRef: ElementRef<HTMLElement>;

  showedTags: string[] = [];
  hiddenTags: string[] = [];
  openHiddenTagsFlag = false;
  showedTagsNode: HTMLElement;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.showedTags = this.tags.filter(el => el);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.showedTagsNode = this.showedTagsElRef.nativeElement;
    this.balanceTags();
  }

  balanceTags() {
    while (this.isOverflow()) {
      let tags = this.showedTagsNode.querySelectorAll('.trueTag');
      tags[tags.length - 1].remove();
      this.moveTagToHiddenList();
    }
  }

  isOverflow(): boolean {
    let tags = this.showedTagsNode.querySelectorAll('.trueTag');
    return this.showedTagsNode.getBoundingClientRect().right - 22 < tags[tags.length - 1].getBoundingClientRect().right;
  }

  moveTagToHiddenList() {
    this.hiddenTags.push(this.showedTags.pop() as string);
    this.changeDetectorRef.detectChanges();
  }
}


