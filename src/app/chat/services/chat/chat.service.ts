import { Injectable } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { Subscription } from 'apollo-client';
import { sendMessageMutation } from '../../../graphql/queries/send-message.mutation';
import { messagesQuery } from '../../../graphql/queries/messages.query';
import { chatMessageAddedSubscription } from '../../../graphql/queries/chat-message-added.subscription';
import { ChannelByNameQuery, MessagesQuery } from '../../../graphql/types/types';
import { channelByNameQuery } from '../../../graphql/queries/channel-by-name.query';

@Injectable()
export class ChatService {
  private messagesObservable: ApolloQueryObservable<MessagesQuery.Result>;
  private channelId: String;
  private cursor: any;
  private messagesSubscription: Subscription;
  private noMoreToLoad = false;
  private loadingMoreMessages = false;
  private user;

  constructor(private apollo: Apollo,
              private authenticationService: AuthenticationService) {
    this.user = authenticationService.getUser();
  }

  private optimisticSendMessage(content) {
    const user = this.user || { name: '', avatar: undefined };
    return {
      __typename: 'Mutation',
      sendMessage: {
        __typename: 'Message',
        id: 'tempId',
        content: content,
        creationTime: +new Date().toString(),
        author: {
          __typename: 'User',
          name: user.name || user.username,
          avatar: user.avatar,
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

  getMessages(channelId: string, count: number = 50, cursor: string = null): ApolloQueryObservable<MessagesQuery.Result> {
    if (!this.messagesObservable || !this.channelId || this.channelId !== channelId) {
      if (this.messagesSubscription) {
        this.messagesSubscription.unsubscribe();
      }

      this.channelId = channelId;
      this.messagesObservable = this.apollo.watchQuery<MessagesQuery.Result>({
        query: messagesQuery,
        variables: {
          channelId,
          count,
          cursor
        },
      });

      this.messagesSubscription = this.messagesObservable.subscribe(({ data }) => {
        this.cursor = data.messages.cursor;
        if (this.cursor === null) {
          this.noMoreToLoad = true;
        }
      });
    }

    return this.messagesObservable;
  }

  subscribeToMessageAdded(channelId: string) {
    if (!this.messagesObservable) {
      return;
    }
    this.apollo.subscribe({
      query: chatMessageAddedSubscription,
      variables: {
        channelId,
      },
    }).subscribe({
      next: (data) => {
        const message = data.chatMessageAdded;
        this.messagesObservable.updateQuery((previousResult) => this.pushNewMessage(previousResult, message));
      },
      error: (err) => console.log('error', err),
    });
  }

  loadMoreMessages(channelId: string, count: number) {
    if (!this.messagesObservable || this.noMoreToLoad) {
      return;
    }
    this.loadingMoreMessages = true;
    this.messagesObservable.fetchMore({
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
      }
    });
  }

  private pushNewMessage(prev, newMessage) {
    if (prev.messages.messagesArray[prev.messages.messagesArray.length - 1].id === newMessage.id) {
      return prev;
    }
    else {
      return Object.assign({}, prev, {
        messages: {
          cursor: prev.messages.cursor || null,
          messagesArray: [...prev.messages.messagesArray, newMessage],
          __typename: prev.messages.__typename,
        }
      });
    }
  }
}
