import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { chatMessagesSubscription, messagesQuery, sendMessageMutation } from './graphql/chat-view.model';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';

@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
})
export class ChatViewComponent implements OnInit, OnDestroy {

  @ViewChild('chatContent') chatContent: any;
  public channel = { id: '1', name: '' };
  private routeParamsSub;
  private messagesObs: ApolloQueryObservable<any>;
  private messagesSub;
  public loading: boolean;
  public model = { message: undefined };
  private paginationCursor: string;
  private messagesCount = 100;
  private noMoreToLoad = false;
  private loadingMoreMessages = false;
  private isFirstLoad = true;
  public messages;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => this.channel.name = params['id']); // TODO: remove

    this.messagesObs = this.apollo.watchQuery({
      query: messagesQuery,
      variables: {
        channelId: this.channel.id,
        cursor: null,
        count: this.messagesCount,
      },
    });

    this.messagesSub = this.messagesObs.subscribe(({ data, loading }) => {
      this.messages = data.messages.messages;
      this.paginationCursor = data.messages.cursor;
      if (this.paginationCursor === null) {
        this.noMoreToLoad = true;
      }
      this.loading = loading;
      const chatContentNativeElement = this.chatContent.nativeElement;
      if (this.isFirstLoad || (!this.loadingMoreMessages &&
        chatContentNativeElement.scrollTop + chatContentNativeElement.clientHeight >= chatContentNativeElement.scrollHeight)) {
        setTimeout(() => {
          this.isFirstLoad = false;
          this.chatContent.nativeElement.scrollTop = this.chatContent.nativeElement.scrollHeight;
        }, 0);
      }
      else {
        this.loadingMoreMessages = false;
      }
    });

    this.apollo.subscribe({
      query: chatMessagesSubscription,
      variables: {
        channelId: this.channel.id
      },
    }).subscribe({
      next: (data) => {
        const message = data.chatMessageAdded;
        this.messagesObs.updateQuery((previousResult) => this.pushNewMessage(previousResult, message));
      },
      error: (err) => console.log('error', err),
    });
  }

  private optimisticSendMessage(content) {
    return {
      __typename: 'Mutation',
      sendMessage: {
        __typename: 'Message',
        id: Math.round(Math.random() * 10000000000).toString(),
        content: content,
        creationTime: +new Date().toString(),
        author: {
          __typename: 'User',
          name: 'tomer',  // TODO: replace user with real user
          avatar: 'http://images.clipartpanda.com/animated-question-mark-for-powerpoint-1256186461796715642question-mark-icon.svg.hi.png'
        }
      }
    };
  }

  loadMore(doneFn?: Function) {
    if (this.noMoreToLoad === null) {
      return;
    }
    this.loadingMoreMessages = true;
    this.messagesObs.fetchMore({
      variables: {
        channelId: this.channel.id,
        cursor: this.paginationCursor,
        count: this.messagesCount,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        this.paginationCursor = fetchMoreResult.messages.cursor;
        if (doneFn) {
          doneFn();
        }
        return Object.assign({}, prev, {
          messages: {
            cursor: this.paginationCursor,
            messages: [...fetchMoreResult.messages.messages, ...prev.messages.messages],
            __typename: prev.messages.__typename
          }
        });
      }
    });
  }

  sendMessage() {
    if (this.model.message) {
      this.apollo.mutate(
        {
          mutation: sendMessageMutation,
          variables: {
            channelId: this.channel.id,
            content: this.model.message,
          },
          optimisticResponse: this.optimisticSendMessage(this.model.message),
          updateQueries: {
            messages: (previousResult: any, { mutationResult }: any) => {
              const message = mutationResult.data.sendMessage;
              return this.pushNewMessage(previousResult, message);
            }
          }
        });
      this.model.message = undefined;
    }
  }

  private pushNewMessage(prev, newMessage) {
    if (prev.messages.messages[prev.messages.messages.length - 1].id === newMessage.id) {
      return prev;
    }
    else {
      return Object.assign({}, prev, {
        messages: {
          cursor: prev.cursor || null,
          messages: [...prev.messages.messages, newMessage],
          __typename: prev.messages.__typename
        }
      });
    }
  }

  onScrolledUp() {
    if (!this.loadingMoreMessages) {
      this.loadMore();
    }
  }

  ngOnDestroy() {
    this.messagesSub.unsubscribe();
    this.routeParamsSub.unsubscribe();
  }
}
