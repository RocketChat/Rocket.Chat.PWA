import { Injectable, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class ScrollerService {
  mount(elementRef: ElementRef): Scrolled {
    return new Scrolled(elementRef);
  }
}

export class Scrolled {
  private listeners: Function[] = [];
  private scrollSub: Subscription;
  private PAGE_PERCENT_LOAD_MORE_TRIGGER: number;
  private MAX_PAGE_LOAD_MORE_PIXEL_LEN: number;

  constructor(
    private elementRef: ElementRef
  ) {
    this.init();
  }

  setTrigger(percentage: number): void {
    this.PAGE_PERCENT_LOAD_MORE_TRIGGER = percentage;
  }

  setMaxLoadMore(pixels: number): void {
    this.MAX_PAGE_LOAD_MORE_PIXEL_LEN = pixels;
  }

  onSuccess(listener: Function): void {
    this.listeners.push(listener);
  }

  isBottom(): boolean {
    const element = this.elementRef.nativeElement;
    return element.scrollTop + element.clientHeight >= element.scrollHeight;
  }

  isTop(): boolean {
    return this.elementRef.nativeElement.scrollTop === 0;
  }

  top(px: number) {
    if (px) {
      this.elementRef.nativeElement.scrollTop = px;
    } else {
      return this.elementRef.nativeElement.scrollTop;
    }
  }

  toBottom(): void {
    this.elementRef.nativeElement.scrollTop = this.elementRef.nativeElement.scrollHeight;
  }

  destory(): void {
    if (this.scrollSub) {
      this.scrollSub.unsubscribe();
      this.scrollSub = undefined;
    }
  }

  private init() {
    const currentPageHeight = this.elementRef.nativeElement.scrollHeight;
    const pagePixelLenForLoadMore = Math.min(currentPageHeight * this.PAGE_PERCENT_LOAD_MORE_TRIGGER , this.MAX_PAGE_LOAD_MORE_PIXEL_LEN);

    if (!this.scrollSub) {
      this.scrollSub = Observable.fromEvent(this.elementRef.nativeElement, 'scroll').subscribe(() => {
        this.onChange(pagePixelLenForLoadMore);
      });
    }
  }

  private onChange(pagePixelLenForLoadMore): void {
    if (this.elementRef.nativeElement.scrollTop < pagePixelLenForLoadMore) {
      this.listeners.forEach(listener => {
        listener();
      });
    }
  }
}
