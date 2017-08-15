import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatService} from '../services/chat/chat.service';
import {MessagesQuery} from '../../graphql/types/types';
import {Observable} from 'rxjs/Observable';


@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ChatViewComponent implements OnInit, OnDestroy {

  @ViewChild('chatContent') chatContent: any;
  @ViewChild('messageInput') messageInput: any;

  private readonly PAGE_MESSAGE_COUNT = 80;
  private readonly PAGE_PERCENT_LOAD_MORE_TRIGGER = 0.3;
  private readonly MAX_PAGE_LOAD_MORE_PIXEL_LEN = 3500;


  public channel: MessagesQuery.Channel;
  public model = {message: undefined};
  public isFirstLoad = true;
  public messages;
  public keepIndexOnItemsChange = false;
  public initialLoading = false;
  private routeParamsSub;
  private messagesSub;
  private chatContentScrollSubscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              public chatService: ChatService,
              private cd: ChangeDetectorRef) {
  }

  sendMessageButtonFocus(event) {
    this.messageInput.getElementRef().nativeElement.children[0].focus();
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => {
      this.unsubscribeChannel();
      this.isFirstLoad = true;
      this.messages = undefined;

      const url: any = this.route.url;
      const isDirect = url.value[0].path === 'direct';
      const channelName = params['id'];

      const messagesQueryObservable = this.chatService.getMessages({
          channelId: null,
          channelDetails: {name: channelName, direct: isDirect},
          count: this.PAGE_MESSAGE_COUNT,
          cursor: null,
          searchRegex: null,
          excludeServer: true
        }
      );

      this.messagesSub = messagesQueryObservable.subscribe(({data, loading}) => {
        this.initialLoading = loading && !data;
        if (this.initialLoading) {
          this.cd.markForCheck();
          return;
        }

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
            this.addScrollListener();
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

        if (!this.isFirstLoad && this.messages && this.isScrolledToBottom()) {
          this.scrollToBottom();
        }
        this.cd.markForCheck();
      });

      this.scrollToBottom();
      this.cd.markForCheck();
    });
  }

  addScrollListener() {
    const currentPageHeight = this.chatContent.nativeElement.scrollHeight;
    const pagePixelLenForLoadMore = Math.min(currentPageHeight * this.PAGE_PERCENT_LOAD_MORE_TRIGGER , this.MAX_PAGE_LOAD_MORE_PIXEL_LEN);

    if (!this.chatContentScrollSubscription) {
      this.chatContentScrollSubscription = Observable.fromEvent(this.chatContent.nativeElement, 'scroll').subscribe(() => {
        this.onScrollChange(pagePixelLenForLoadMore);
      });
    }
  }

  onScrollChange(pagePixelLenForLoadMore) {
    if (this.chatContent.nativeElement.scrollTop < pagePixelLenForLoadMore) {
      if (!this.chatService.isLoadingMoreMessages()) {
        this.loadMoreMessages();
        this.cd.markForCheck();
      }
    }
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
      this.keepIndexOnItemsChange = false;
      this.scrollToBottom();
    }
  }

  loadMoreMessages() {
    return this.chatService.loadMoreMessages(this.channel.id, this.PAGE_MESSAGE_COUNT);
  }

  unsubscribeChannel() {
    this.chatService.unsubscribeMessagesSubscription();
    if (this.messagesSub) {
      this.messagesSub.unsubscribe();
    }
  }

  ngOnDestroy() {
    if (this.chatContentScrollSubscription) {
      this.chatContentScrollSubscription.unsubscribe();
    }
    this.unsubscribeChannel();
    if (this.routeParamsSub) {
      this.routeParamsSub.unsubscribe();
    }
  }
}
