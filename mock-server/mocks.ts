import * as faker from 'faker';
import { pubsub } from './subscriptions';
import { withFilter } from 'graphql-subscriptions';

export const CHAT_MESSAGE_SUBSCRIPTION_TOPIC = 'CHAT_MESSAGE_ADDED';

const messages = new Map<string, any[]>();
const channels = [];

const createMessage = (channelId) => {
  const message = {
    id: faker.random.uuid(),
    content: faker.lorem.sentence(),
    creationTime: faker.date.past().getTime().toString(),
    author: {
      name: faker.name.firstName() + '.' + faker.name.lastName(),
      avatar: faker.image.avatar(),
    },
    channel: { id: faker.random.arrayElement(channels).id },
  };
  return message;
};

const createChannel = () => {
  return {
    id: faker.random.uuid(),
    name: faker.random.word(),
    direct: faker.random.boolean(),
    unseenMessages: faker.random.boolean() ? faker.random.number(30) : 0
  };
};


for (let i = 0; i < 15; i++) {
  const channel = createChannel();
  channels.push(channel);
  const messagesArray = [];
  messages.set(channel.id, messagesArray);
  for (let j = 0; j < 2000; j++) {
    messagesArray.push(createMessage(channel.id));
  }
}

export const mocks = {
  User: () => ({
    name: () => faker.name.firstName() + ' ' + faker.name.lastName(),
    avatar: () => faker.image.avatar(),
  }),
  Channel: () => ({
    id: () => faker.random.uuid(),
    name: () => faker.random.word(),
    direct: () => faker.random.boolean(),
    unseenMessages: () => faker.random.boolean() ? faker.random.number(30) : 0,
  }),
  Query: () => ({
    channelsByUser: () => channels.slice(0, faker.random.number({ min: 3, max: channels.length })),
    messages: (root, { channelId, cursor, count }, context) => {
      const messagesArray = messages.get(channelId);
      if (!messagesArray) {
        return null;
      }
      let nextMessageIndex = 0;
      if (cursor) {
        nextMessageIndex = messagesArray.findIndex((message) => message.id === cursor);
      }
      if (nextMessageIndex !== -1) {
        let finalMessageIndex = count + nextMessageIndex;
        finalMessageIndex = finalMessageIndex > messagesArray.length ? messagesArray.length : finalMessageIndex;
        const nextCursor = finalMessageIndex === messagesArray.length ? null : messagesArray[finalMessageIndex].id;
        return {
          cursor: nextCursor,
          messagesArray: messagesArray.slice(nextMessageIndex, finalMessageIndex).reverse(),
        };
      }
    },
    channelByName: (root, { name, isDirect }) => {
      return channels.find((element) => element.name === name && element.direct === isDirect) || null;
    },
  }),
  Mutation: () => ({
    sendMessage: (root, { channelId, content }, context) => {
      const messagesArray = messages.get(channelId);
      if (!messagesArray) {
        return null;
      }

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

      messagesArray.unshift(newMessage);
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
