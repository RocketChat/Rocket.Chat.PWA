import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../services/chat/chat.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatViewComponent implements OnInit, OnDestroy {

  @ViewChild('chatContent') chatContent: any;
  public channel = { id: '1', name: '' };
  private routeParamsSub;
  private messagesSub;
  public model = { message: undefined };
  private pageMessagesCount = 100;
  private readonly pagePercentLoadMoreTrigger = 0.45;
  private isFirstLoad = true;
  public messages;
  private pagePixelLength: number;

  constructor(private route: ActivatedRoute, public chatService: ChatService, private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    Observable.fromEvent(this.chatContent.nativeElement, 'scroll').subscribe(() => {
      if (this.chatContent.nativeElement.scrollTop < this.pagePixelLength * this.pagePercentLoadMoreTrigger) {
        if (!this.chatService.isLoadingMoreMessages()) {
          this.chatService.loadMoreMessages(this.channel.id, this.pageMessagesCount);
        }
      }
    });

    this.routeParamsSub = this.route.params.subscribe(params => this.channel.name = params['id']); // TODO: remove

    const messagesObs = this.chatService.getMessages(this.channel.id, this.pageMessagesCount);

    this.messagesSub = messagesObs.subscribe(({ data }) => {
      const oldScrollHeight = this.chatContent.nativeElement.scrollHeight;
      this.messages = data.messages.messagesArray;
      if (this.isFirstLoad || (!this.chatService.isLoadingMoreMessages() && this.isScrolledToBottom())) {
        setTimeout(() => {
          this.pagePixelLength = this.chatContent.nativeElement.scrollHeight;
          this.isFirstLoad = false;
          this.scrollToBottom();
        }, 0);
      }
      if (this.isScrolledToTop()) {
        setTimeout(() => {
          this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight - oldScrollHeight;
        }, 0);
      }
      this.cd.markForCheck();
    });

    this.chatService.subscribeToMessageAdded(this.channel.id);
  }

  isScrolledToBottom(): boolean {
    const chatElement = this.chatContent.nativeElement;
    return chatElement.scrollTop + chatElement.clientHeight >= chatElement.scrollHeight;
  }

  isScrolledToTop(): boolean {
    return this.chatContent.nativeElement.scrollTop === 0;
  }

  scrollToBottom() {
    this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
  }

  sendMessage() {
    if (this.model.message) {
      this.chatService.sendMessage(this.channel.id, this.model.message);
      this.model.message = undefined;
      this.scrollToBottom();
    }
  }

  ngOnDestroy() {
    this.messagesSub.unsubscribe();
    this.routeParamsSub.unsubscribe();
  }
}
