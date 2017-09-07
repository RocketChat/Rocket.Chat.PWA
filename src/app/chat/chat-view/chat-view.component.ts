import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ChatService } from './chat.service';
import { MessagesQuery, Message } from '../../graphql/types/types';
import { ChannelsService } from './channels.service';
import { ScrollerService, Scrolled } from '../../shared/services/scroller.service';


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
  private routeParamsSub;
  private messagesSub: Subscription;
  private channelSub: Subscription;
  private scrolledList: Scrolled;
  public isFirstLoad = true;
  public messages;
  public keepIndexOnItemsChange = false;
  public initialLoading = false;
  public directTo: string;
  public isDirect = false;
  public messageForm = new FormGroup({
    message: new FormControl('', Validators.required)
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public chatService: ChatService,
    private channelsService: ChannelsService,
    private scrollerService: ScrollerService,
    private cd: ChangeDetectorRef
  ) {}

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
      this.isDirect = url.value[0].path === 'direct';
      const channelName = params['id'];

      let channelObservable;
      if (this.isDirect) {
        this.directTo = channelName;
        channelObservable = this.channelsService.getDirectChannelByUsername(this.directTo);
      }
      else {
        channelObservable = this.channelsService.getChannelByName(channelName);
      }

      this.channelSub = channelObservable.subscribe((result) => {
        const channelData = result.data;
        const channelLoading = result.loading;

        this.initialLoading = channelLoading && !channelData;

        if (this.initialLoading) {
          this.cd.markForCheck();
          return;
        }

        this.channel = this.isDirect ? channelData.directChannel : channelData.channelByName;
        this.cd.markForCheck();

        const messagesQueryObservable = this.chatService.getMessages({
            channelId: this.channel.id ,
            directTo: this.directTo,
            channelName: null,
            count: this.PAGE_MESSAGE_COUNT ,
            cursor: null ,
            searchRegex: null ,
            excludeServer: false
          }
        );

        this.scrolledList = this.scrollerService.mount(this.chatContent);
        this.scrolledList.setTrigger(this.PAGE_PERCENT_LOAD_MORE_TRIGGER);
        this.scrolledList.setMaxLoadMore(this.MAX_PAGE_LOAD_MORE_PIXEL_LEN);

        this.scrolledList.onSuccess(() => {
          if (!this.chatService.isLoadingMoreMessages()) {
            this.loadMoreMessages();
            this.cd.markForCheck();
          }
        });

        this.messagesSub = messagesQueryObservable.subscribe(({data , loading}) => {
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
          this.messages = data.messages.messagesArray.slice().reverse();

          if (this.isFirstLoad) {
            this.isFirstLoad = false;
            this.channel = data.messages.channel;
            this.chatService.subscribeToMessageAdded(this.channel.id, this.directTo);

            setTimeout(() => {
              this.scrolledList.toBottom();
            }, 0);
          }

          if (!this.chatService.isLoadingMoreMessages() && this.scrolledList.isBottom()) {
            setTimeout(() => {
              this.scrolledList.toBottom();
            }, 0);
          }

          if (this.scrolledList.isTop()) {
            setTimeout(() => {
              this.scrolledList.top(this.chatContent.nativeElement.scrollHeight - oldScrollHeight);
            }, 0);
          }

          if (!this.isFirstLoad && this.messages && this.scrolledList.isBottom()) {
            this.scrolledList.toBottom();
          }
          this.cd.markForCheck();
        });

        this.scrolledList.toBottom();
        this.cd.markForCheck();
      });
    });
  }

  sendMessage() {
    if (this.messageForm.valid) {
      this.chatService.sendMessage(this.channel.id, this.directTo, this.messageForm.get('message').value);
      this.messageForm.reset();
      this.keepIndexOnItemsChange = false;
      this.scrolledList.toBottom();
    }
  }

  loadMoreMessages() {
    return this.chatService.loadMoreMessages(this.channel.id, this.directTo, this.PAGE_MESSAGE_COUNT);
  }

  trackMessage(index: number, message: Message): string {
    return message ? message.id : undefined;
  }

  unsubscribeChannel() {
    this.chatService.unsubscribeMessagesSubscription();
    if (this.messagesSub) {
      this.messagesSub.unsubscribe();
    }
    if (this.channelSub) {
      this.channelSub.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.scrolledList.destory();
    this.unsubscribeChannel();
    if (this.routeParamsSub) {
      this.routeParamsSub.unsubscribe();
    }
  }
}
