import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScroll } from 'ionic-angular';
import { chatMessagesSubscription, messagesQuery, sendMessageMutation } from './chat-view-model';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'chat-view',
  templateUrl: './chat-view.component.html',
  styleUrls: ['./chat-view.component.scss'],
})
export class ChatViewComponent implements OnInit, OnDestroy {

  @ViewChild('chatContent') chatContent: any;
  public channel = {};
  private routeParamsSub;
  private messagesObs: ApolloQueryObservable<any>;
  private messagesSub: Subscription;
  public loading: boolean;
  public model = { message: undefined };
  public messages;

  constructor(private route: ActivatedRoute, private apollo: Apollo) {
  }

  ngOnInit() {
    this.routeParamsSub = this.route.params.subscribe(params => this.channel = params['id']);
    this.messagesObs = this.apollo.watchQuery({
      query: messagesQuery,
      variables: {
        channelId: '1' // TODO replace with channel id
      },
    });

    this.messagesSub = this.messagesObs.subscribe(({ data, loading }) => {
      this.messages = data.messages;
      this.loading = loading;
      setTimeout(() => {
        this.chatContent.scrollToBottom(300);
      });
    });

    this.apollo.subscribe({
      query: chatMessagesSubscription,
      variables: {
        channelId: '1', // TODO replace with channel id
      },
    }).subscribe({
      next: (data) => {
        const message = data.chatMessageAdded;
        this.messagesObs.updateQuery((previousResult) => this.pushNewMessage(previousResult, message));
      },
      error: (err) => console.log('error', err),
    });
  }

  ionViewDidEnter() {
    this.chatContent.scrollToBottom(300);
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
          username: 'tomer',  // TODO: replace user with real user
          avatar: 'http://images.clipartpanda.com/animated-question-mark-for-powerpoint-1256186461796715642question-mark-icon.svg.hi.png'
        }
      }
    };
  }

  sendMessage() {
    if (this.model.message) {
      this.apollo.mutate(
        {
          mutation: sendMessageMutation,
          variables: {
            channelId: '1',
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
    if (prev.messages[prev.messages.length - 1].id === newMessage.id) {
      return prev;
    }
    else {
      return Object.assign({}, prev, { messages: [...prev.messages, newMessage] });
    }
  }

  doInfinite(infiniteScroll: InfiniteScroll) {
    console.log('infinite scroll');
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

  ngOnDestroy() {
    this.messagesSub.unsubscribe();
    this.routeParamsSub.unsubscribe();
  }
}
