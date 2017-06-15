import * as faker from 'faker';
import { pubsub } from './subscriptions';
import { withFilter } from 'graphql-subscriptions';
import { getAccountServer } from './accounts';
import { getOAuthResolver } from './oauth/oauth-service';

export const CHAT_MESSAGE_SUBSCRIPTION_TOPIC = 'CHAT_MESSAGE_ADDED';
const messages = new Map<string, any[]>();
const oauthResolver = getOAuthResolver();
const channels = [];
const me = {
  name: faker.name.firstName() + ' ' + faker.name.lastName(),
  avatar: faker.image.avatar(),
};

const createMessage = (channelId) => {
  return {
    id: faker.random.uuid(),
    content: faker.lorem.sentence(),
    creationTime: faker.date.past().getTime().toString(),
    author: {
      name: faker.name.firstName() + '.' + faker.name.lastName(),
      avatar: faker.image.avatar(),
    },
    channel: { id: channelId },
  };
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
    messages: (root, { channelId, channelDetails, cursor, count }, context) => {
      if (!channelId && !channelDetails) {
        console.error(`messages query must be called with channelId or channelDetails`);
        return null;
      }

      let channel;
      if (channelId) {
        channel = channels.find((element) => element.id === channelId);
      }
      else {
        channel = channels
          .find((element) => element.name === channelDetails.name && element.direct === channelDetails.direct);

      }

      if (!channel) {
        console.error('channel not found');
        return null;
      }

      const messagesArray = messages.get(channel.id);
      if (!messagesArray) {
        console.error('messagesArray was not defined for channel');
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
          channel,
          messagesArray: messagesArray.slice(nextMessageIndex, finalMessageIndex).reverse(),
        };
      }
      else {
        console.error('cursor is invalid');
        return null;
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
        console.log('channel not found');
        return null;
      }
      const newMessage = {
        id: faker.random.uuid(),
        content,
        creationTime: (new Date()).getTime().toString(),
        author: {
          name: me.name,
          avatar: me.avatar
        },
        channel: {
          id: channelId,
        }
      };

      messagesArray.unshift(newMessage);
      pubsub.publish(CHAT_MESSAGE_SUBSCRIPTION_TOPIC, { chatMessageAdded: newMessage });
      return newMessage;
    },
    loginWithServiceAccessToken: async (root, { service, accessToken }, context) => {
      try {
        const userData = await oauthResolver.getUserDataFromService(accessToken, service);
        const accountsServer = await getAccountServer();
        const user = await oauthResolver.getUserFromServiceUserData(service, userData, accountsServer);
        if (!user) {
          return null;
        }
        const loginResult = await accountsServer.loginWithUser(user);
        return {
          refreshToken: loginResult.tokens.refreshToken,
          accessToken: loginResult.tokens.accessToken,
        };
      }
      catch (e) {
        console.log('Failed to login with service', e);
      }
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
