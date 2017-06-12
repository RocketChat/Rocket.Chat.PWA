import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../services/chat/chat.service';
import { Observable } from 'rxjs/Observable';
import { MessagesQuery } from '../../graphql/types/types';

@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatViewComponent implements OnInit, OnDestroy {

  @ViewChild('chatContent') chatContent: any;
  public channel: MessagesQuery.Channel;
  private routeParamsSub;
  private messagesSub;
  public model = { message: undefined };
  private chatContentScrollSubscription;
  private pageMessagesCount = 100;
  private readonly pagePercentLoadMoreTrigger = 0.45;
  private isFirstLoad = true;
  public messages;
  private pagePixelLength: number;
  private readonly maxPagePixelLength = 10000;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public chatService: ChatService,
              private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => {
      if (this.messagesSub) {
        this.messagesSub.unsubscribe();
      }

      this.isFirstLoad = true;

      const url: any = this.route.url;
      const isDirect = url.value[0].path === 'direct';
      const channelName = params['id'];

      const messagesQueryObservable = this.chatService.getMessages({
          channelId: null,
          channelDetails: { name: channelName, direct: isDirect },
          count: this.pageMessagesCount,
          cursor: null,
          searchRegex: null
        }
      );

      this.messagesSub = messagesQueryObservable.subscribe(({ data }) => {
        if (data.messages === null) {
          this.router.navigate(['channel-not-found']);
          return;
        }
        const oldScrollHeight = this.chatContent.nativeElement.scrollHeight;
        this.messages = data.messages.messagesArray;

        if (this.isFirstLoad) {
          this.isFirstLoad = false;
          this.channel = data.messages.channel;
          this.chatService.subscribeToMessageAdded(this.channel.id);

          setTimeout(() => {
            this.pagePixelLength = this.chatContent.nativeElement.scrollHeight;
            if (this.pagePixelLength > this.maxPagePixelLength) {
              this.pagePixelLength = this.maxPagePixelLength;
            }

            if (!this.chatContentScrollSubscription) {
              this.chatContentScrollSubscription = Observable.fromEvent(this.chatContent.nativeElement, 'scroll').subscribe(() => {
                if (this.chatContent.nativeElement.scrollTop < this.pagePixelLength * this.pagePercentLoadMoreTrigger) {
                  if (!this.chatService.isLoadingMoreMessages()) {
                    this.loadMoreMessages();
                    this.cd.markForCheck();
                  }
                }
              });
            }

            this.scrollToBottom();
          }, 0);
        }

        if (!this.chatService.isLoadingMoreMessages() && this.isScrolledToBottom()) {
          setTimeout(() => {
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
      this.scrollToBottom();
      this.cd.markForCheck();
    });
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
    }
  }

  loadMoreMessages() {
    this.chatService.loadMoreMessages(this.channel.id, this.pageMessagesCount);
  }

  ngOnDestroy() {
    if (this.chatContentScrollSubscription) {
      this.chatContentScrollSubscription.unsubscribe();
    }
    if (this.messagesSub) {
      this.messagesSub.unsubscribe();
    }
    if (this.routeParamsSub) {
      this.routeParamsSub.unsubscribe();
    }
  }
}
