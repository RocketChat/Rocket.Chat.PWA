import { MockList } from 'graphql-tools';
import * as faker from 'faker';
import { pubsub } from './subscriptions';
import { withFilter } from 'graphql-subscriptions';

export const CHAT_MESSAGE_SUBSCRIPTION_TOPIC = 'CHAT_MESSAGE_ADDED';

const createMessage = (id: number) => {
  const message = {
    id: faker.random.uuid(),
    content: faker.lorem.sentence(),
    creationTime: faker.date.past().getTime().toString(),
    author: {
      name: faker.name.firstName() + '.' + faker.name.lastName(),
      avatar: faker.image.avatar(),
    },
    channel: { id: '1' },
  };
  return message;
};

const messages = [];

for (let i = 0; i < 10000; i++) {
  messages.push(createMessage(i));
}

export const mocks = {
  User: () => ({
    name: () => faker.name.firstName() + ' ' + faker.name.lastName(),
    avatar: () => faker.image.avatar(),
  }),
  Channel: () => ({
    id: () => faker.random.uuid(),
    title: () => faker.random.word(),
    direct: () => faker.random.boolean(),
    unseenMessages: () => faker.random.boolean() ? faker.random.number(30) : 0,
  }),
  Query: () => ({
    channelsByUser: () => new MockList([3, 15]),
    messages: (root, { cursor, count }, context) => {
      let nextMessageIndex = 0;
      if (cursor) {
        nextMessageIndex = messages.findIndex((message) => message.id === cursor);
      }
      if (nextMessageIndex !== -1) {
        let finalMessageIndex = count + nextMessageIndex;
        finalMessageIndex = finalMessageIndex > messages.length ? messages.length : finalMessageIndex;
        const nextCursor = finalMessageIndex === messages.length ? null : messages[finalMessageIndex].id;
        return {
          cursor: nextCursor,
          messagesArray: messages.slice(nextMessageIndex, finalMessageIndex).reverse(),
        };
      }
    },
  }),
  Mutation: () => ({
    sendMessage: (root, { channelId, content }, context) => {
      const newMessage = {
        id: faker.random.uuid(),
        content,
        creationTime: (new Date()).getTime().toString(),
        author: {
          name: 'tomer',
          avatar: 'http://dreamicus.com/data/face/face-01.jpg'
        },
        channel: {
          id: channelId,
        }
      };
      messages.unshift(newMessage);
      pubsub.publish(CHAT_MESSAGE_SUBSCRIPTION_TOPIC, { chatMessageAdded: newMessage });
      return newMessage;
    }
  }),
};

export const subscriptionResolver = {
  Subscription: {
    chatMessageAdded: {
      subscribe: withFilter(() => pubsub.asyncIterator(CHAT_MESSAGE_SUBSCRIPTION_TOPIC), (payload, args) => {
        return payload.chatMessageAdded.channel.id === args.channelId;
      })
    }
  }
};
