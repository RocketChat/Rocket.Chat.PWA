import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { ApolloQueryResult } from 'apollo-client';
import { sendMessageMutation } from '../../../graphql/queries/send-message.mutation';
import { messagesQuery } from '../../../graphql/queries/messages.query';
import { chatMessageAddedSubscription } from '../../../graphql/queries/chat-message-added.subscription';
import { ChannelByNameQuery, MessagesQuery } from '../../../graphql/types/types';
import { channelByNameQuery } from '../../../graphql/queries/channel-by-name.query';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ChatService {
  private cursor: any;
  private noMoreToLoad = false;
  private loadingMoreMessages = false;
  private messagesQueryObservable: ApolloQueryObservable<MessagesQuery.Result>;
  private user;

  constructor(private apollo: Apollo,
              private authenticationService: AuthenticationService) {
    this.user = authenticationService.getUser();
  }

  private optimisticSendMessage(content) {
    return {
      __typename: 'Mutation',
      sendMessage: {
        __typename: 'Message',
        id: 'tempId',
        content: content,
        creationTime: new Date().getTime().toString(),
        fromServer: false,
        author: {
          __typename: 'User',
          name: this.user.name || this.user.username,
          avatar: this.user.avatar,
        }
      }
    };
  }

  isLoadingMoreMessages(): boolean {
    return this.loadingMoreMessages;
  }

  sendMessage(channelId: string, content: string) {
    this.apollo.mutate(
      {
        mutation: sendMessageMutation,
        variables: {
          channelId,
          content,
        },
        optimisticResponse: this.optimisticSendMessage(content),
        updateQueries: {
          messages: (previousResult: any, { mutationResult }: any) => {
            const message = mutationResult.data.sendMessage;
            return this.pushNewMessage(previousResult, message);
          }
        }
      });
  }

  getMessages(messagesQueryVariables: MessagesQuery.Variables): Observable<ApolloQueryResult<MessagesQuery.Result>> {
    this.noMoreToLoad = false;
    this.cursor = null;

    this.messagesQueryObservable = this.apollo.watchQuery<MessagesQuery.Result>({
      query: messagesQuery,
      variables: messagesQueryVariables,
      fetchPolicy: 'cache-and-network',
    });

    return this.messagesQueryObservable.do(({ data, loading}) => {
      if (!loading && data && data.messages) {
        this.cursor = data.messages.cursor;
        if (this.cursor === null) {
          this.noMoreToLoad = true;
        }
      }
    });
  }

  subscribeToMessageAdded(channelId: string) {
    if (!this.messagesQueryObservable) {
      throw new Error('call getMessages() first');
    }

    this.apollo.subscribe({
      query: chatMessageAddedSubscription,
      variables: {
        channelId,
      },
    }).subscribe({
      next: (data) => {
        const message = data.chatMessageAdded;
        this.messagesQueryObservable.updateQuery((previousResult) => this.pushNewMessage(previousResult, message));
      },
      error: (err) => console.log('error', err),
    });
  }

  loadMoreMessages(channelId: string, count: number): Promise<ApolloQueryResult<MessagesQuery.Result>> {
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
        cursor: this.cursor,
        count,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
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

  getChannelByName(name: string, isDirect: boolean) {
    return this.apollo.watchQuery<ChannelByNameQuery.Result>({
      query: channelByNameQuery,
      variables: {
        name,
        isDirect
      },
      fetchPolicy: 'cache-and-network',
    });
  }

  private pushNewMessage(prev, newMessage) {
    let result;

    if (prev.messages.messagesArray[prev.messages.messagesArray.length - 1].id === newMessage.id) {
      result = prev;
    }
    else {
      result = Object.assign({}, prev, {
        messages: {
          cursor: prev.messages.cursor || null,
          channel: prev.messages.channel,
          messagesArray: [...prev.messages.messagesArray, newMessage],
          __typename: prev.messages.__typename,
        }
      });
    }

    return result;
  }
}
