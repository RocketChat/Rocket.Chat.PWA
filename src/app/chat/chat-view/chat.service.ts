import 'rxjs/add/operator/do';

import { Injectable } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs/Observable';

import { sendMessageMutation } from '../../graphql/queries/send-message.mutation';
import { messagesQuery } from '../../graphql/queries/messages.query';
import { chatMessageAddedSubscription } from '../../graphql/queries/chat-message-added.subscription';
import { MessagesQuery, UserFields, SendMessageMutation } from '../../graphql/types/types';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Injectable()
export class ChatService {
  private cursor: any;
  private noMoreToLoad = false;
  private loadingMoreMessages = false;
  private messagesQueryObservable: ApolloQueryObservable<MessagesQuery.Result>;
  private messagesSubscriptionObservable;
  private user: UserFields.Fragment;

  constructor(
    private apollo: Apollo,
    authenticationService: AuthenticationService
  ) {
    this.user = authenticationService.getUser();
  }

  private optimisticSendMessage(content) {
    return {
      __typename: 'Mutation',
      sendMessage: {
        __typename: 'Message',
        id: 'tempId',
        content: content,
        type: null,
        creationTime: new Date().getTime().toString(),
        fromServer: false,
        author: {
          __typename: 'User',
          id: this.user.id,
          name: this.user.name,
          username: this.user.username,
          avatar: this.user.avatar,
        }
      }
    };
  }

  isLoadingMoreMessages(): boolean {
    return this.loadingMoreMessages;
  }

  sendMessage(channelId: string, directTo: string, content: string) {
    this.apollo.mutate<SendMessageMutation.Result>(
      {
        mutation: sendMessageMutation,
        variables: {
          channelId,
          directTo,
          content,
        },
        optimisticResponse: this.optimisticSendMessage(content),
        updateQueries: {
          messages: (previousResult, {mutationResult}) => {
            const message = mutationResult.data.sendMessage;
            return this.pushNewMessage(previousResult, message);
          }
        }
      }).subscribe();
  }

  getMessages(messagesQueryVariables: MessagesQuery.Variables): Observable<ApolloQueryResult<MessagesQuery.Result>> {
    this.noMoreToLoad = false;
    this.cursor = null;

    this.messagesQueryObservable = this.apollo.watchQuery<MessagesQuery.Result>({
      query: messagesQuery,
      variables: messagesQueryVariables,
      fetchPolicy: 'cache-and-network',
    });

    return this.messagesQueryObservable.do(({ data, loading }) => {
      if (!loading && data && data.messages) {
        this.cursor = data.messages.cursor;
        if (this.cursor === null) {
          this.noMoreToLoad = true;
        }
      }
    });
  }

  subscribeToMessageAdded(channelId: string, directTo: string) {
    if (!this.messagesQueryObservable) {
      throw new Error('call getMessages() first');
    }

    let variables = {};

    if (channelId) {
      variables = { channelId };
    } else {
      variables = { directTo };
    }

    this.messagesSubscriptionObservable = this.apollo.subscribe({
      query: chatMessageAddedSubscription,
      variables,
    }).subscribe({
      next: (data) => {
        const message = data.chatMessageAdded;
        this.messagesQueryObservable.updateQuery((previousResult) => this.pushNewMessage(previousResult, message));
      },
      error: (err) => console.log('error', err),
    });
  }

  unsubscribeMessagesSubscription() {
    if ( this.messagesSubscriptionObservable) {
      this.messagesSubscriptionObservable.unsubscribe();
    }
  }

  loadMoreMessages(channelId: string, directTo: string, count: number): Promise<ApolloQueryResult<MessagesQuery.Result>> {
    if (!this.messagesQueryObservable) {
      return Promise.reject('call getMessages() first');
    }

    if (!this.cursor || this.noMoreToLoad) {
      return Promise.resolve(null);
    }

    this.loadingMoreMessages = true;
    return this.messagesQueryObservable.fetchMore({
      variables: {
        channelId,
        directTo,
        cursor: this.cursor,
        count,
      },
      updateQuery: (prev, {fetchMoreResult}) => {
        this.cursor = fetchMoreResult.messages.cursor;
        this.loadingMoreMessages = false;

        return Object.assign({}, prev, {
          messages: {
            cursor: this.cursor,
            channel: fetchMoreResult.messages.channel,
            messagesArray: [...fetchMoreResult.messages.messagesArray, ...prev.messages.messagesArray],
            __typename: prev.messages.__typename
          }
        });
      }
    });
  }

  private pushNewMessage(prev, newMessage) {
    let result;

    const prevMessagesLen = prev.messages.messagesArray.length;
    if (prevMessagesLen && prev.messages.messagesArray[0].id === newMessage.id) {
      result = prev;
    }
    else {
      result = Object.assign({}, prev, {
        messages: {
          cursor: prev.messages.cursor || null,
          channel: prev.messages.channel,
          messagesArray: [newMessage, ...prev.messages.messagesArray],
          __typename: prev.messages.__typename,
        }
      });
    }

    return result;
  }
}
