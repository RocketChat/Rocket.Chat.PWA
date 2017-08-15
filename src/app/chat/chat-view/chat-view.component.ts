import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../services/chat/chat.service';
import { MessagesQuery } from '../../graphql/types/types';
import { ChangeEvent, VirtualScrollComponent } from 'angular2-virtual-scroll';


@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ChatViewComponent implements OnInit, OnDestroy {

  @ViewChild('chatContent') chatContent: any;
  @ViewChild(VirtualScrollComponent) virtualScroll: VirtualScrollComponent;
  @ViewChild('messageInput') messageInput: any;

  private readonly PAGE_MESSAGE_COUNT = 100;
  private readonly LOAD_ITEMS_NUM_TRIGGER = 40;

  public channel: MessagesQuery.Channel;
  private routeParamsSub;
  private messagesSub;
  public model = {message: undefined};
  private chatContentScrollSubscription;
  public isFirstLoad = true;
  public messages;
  private scrollValue: ChangeEvent;
  public isLoadingMore;
  public keepIndexOnItemsChange = false;
  public scrollItems: any;
  public loadingMessages = false;

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
        this.loadingMessages = loading && !data;
        if (this.loadingMessages) {
          this.cd.markForCheck();
          return;
        }

        if (data.messages === null) {
          this.router.navigate(['channel-not-found']);
          return;
        }

        this.messages = data.messages.messagesArray;

        if (this.isFirstLoad) {
          this.isFirstLoad = false;
          this.channel = data.messages.channel;
          this.chatService.subscribeToMessageAdded(this.channel.id);

          this.scrollToBottom();
        }

        if (!this.isFirstLoad && this.messages && this.isScrolledToBottom()) {
          this.scrollToBottom();
        }

        this.cd.markForCheck();
      });
      this.cd.markForCheck();
    });
  }

  isScrolledToBottom(): boolean {
    if (this.scrollValue) {
      return this.scrollValue.end === this.messages.length - 1;
    }
    return false;
  }

  scrollToBottom() {
    setTimeout(() => this.virtualScroll.scrollInto(this.messages[this.messages.length - 1]), 1);
  }

  sendMessage() {
    if (this.model.message) {
      this.chatService.sendMessage(this.channel.id, this.model.message);
      this.model.message = undefined;
      this.keepIndexOnItemsChange = false;
      this.scrollToBottom();
    }
  }

  isLoadMoreNeeded() {
    const scrollValue = this.scrollValue;
    return !this.isLoadingMore && scrollValue && scrollValue.start < this.LOAD_ITEMS_NUM_TRIGGER;
  }

  loadMoreMessages() {
    return this.chatService.loadMoreMessages(this.channel.id, this.PAGE_MESSAGE_COUNT);
  }

  scrollValueChanged(scrollValue) {
    this.scrollValue = scrollValue;
    if (this.messages && !this.isFirstLoad && this.isLoadMoreNeeded()) {
      this.isLoadingMore = true;
      this.keepIndexOnItemsChange = true;
      this.loadMoreMessages().then(() => {
        this.isLoadingMore = false;
      });
    }
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
