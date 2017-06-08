import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryObservable } from 'apollo-angular';
import { ChatService } from '../services/chat/chat.service';
import { MessagesQuery } from '../../graphql/types/types';

@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
})
export class ChatViewComponent implements OnInit, OnDestroy {

  @ViewChild('chatContent') chatContent: any;
  public channel = { id: '1', name: '' };
  private routeParamsSub;
  private messagesSub;
  public loading: boolean;
  public model = { message: undefined };
  private messagesCount = 100;
  private isFirstLoad = true;
  public messages;

  constructor(private route: ActivatedRoute, public chatService: ChatService) {
  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => this.channel.name = params['id']); // TODO: remove

    const messagesObs = this.chatService.getMessages(this.channel.id, this.messagesCount);

    this.messagesSub = messagesObs.subscribe(({ data, loading }) => {
      this.messages = data.messages.messagesArray;
      this.loading = loading;
      const chatContentNativeElement = this.chatContent.nativeElement;
      if (!loading && (this.isFirstLoad || (!this.chatService.isLoadingMoreMessages() &&
        chatContentNativeElement.scrollTop + chatContentNativeElement.clientHeight >= chatContentNativeElement.scrollHeight))) {
        setTimeout(() => {
          this.isFirstLoad = false;
          this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
        }, 0);
      }
    });

    this.chatService.subscribeToMessageAdded(this.channel.id);
  }

  sendMessage() {
    if (this.model.message) {
      this.chatService.sendMessage(this.channel.id, this.model.message);
      this.model.message = undefined;
    }
  }

  onScrolledUp() {
    if (!this.chatService.isLoadingMoreMessages()) {
      this.chatService.loadMoreMessages(this.channel.id, this.messagesCount);
    }
  }

  ngOnDestroy() {
    this.messagesSub.unsubscribe();
    this.routeParamsSub.unsubscribe();
  }
}
