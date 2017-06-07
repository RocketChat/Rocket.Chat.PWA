import { pubsub } from './subscriptions';
import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';
import { withFilter } from 'graphql-subscriptions';

export const schema = `

type scheme {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

type Mutation {
    leaveChannel(channelId: String!): Boolean
    hideChannel(channelId: String!): Boolean
    setStatus(status: UserStatus!): User
    logout: Boolean #JSAccount
    createChannel(name: String!, private: Boolean = false, readOnly: Boolean = false, membersId: [String!]): Channel
    sendMessage(channelId: String!, content: String!): Message
    deleteMessage(messageId: MessageIdentifier!): Boolean
    editMessage(messageId: MessageIdentifier!, content: String!): Message
    addReactionToMassage(messageId: MessageIdentifier!, icon: String!): Message
    updateUserSettings(userSettings: UserSettings): User
    #updateUserChannelSettings(channelId: String!,settings: ChannelSettings )
}

type Query {
    me: User
    messages(channelId: String!, cursor: String, count: Int, searchRegex: String): MessagesWithCursor
    channelsByUser(userId: String): [Channel]
    channels(filter: ChannelFilter = {privacy: ALL, joinedChannels: false, sortBy: NAME}): [Channel]
}

type Subscription {
    chatMessageAdded(channelId: String!): Message
}

input ChannelFilter {
    nameFilter: String
    privacy: Privacy
    joinedChannels: Boolean
    sortBy: ChannelSort
}

enum Privacy {
    PRIVATE
    PUBLIC
    ALL
}

enum ChannelSort {
    NAME
    NUMBER_OF_MESSAGES
}

type MessagesWithCursor {
  cursor: String
  messages: [Message]
}

type Message {
    id: String
    author: User
    content: String
    creationTime: String
    channel: Channel
    fromServer: Boolean #when user joins a channel we get a message from server - text is grey
    tags: [String]
    userRef: [User]
    channelRef: [Channel]
    reactions: [Reaction]
}

input MessageIdentifier {
    channelId: String!
    messageId: String!
}

type Reaction {
    username: String
    icon: String
}

type User {
    username: String
    email: String
    userPreferences: UserPreferences
    status: UserStatus
    avatar: String
    name: String
    lastLogin: String
    channels: [Channel]
    directMessages: [Channel]
}

enum UserStatus {
    ONLINE
    AWAY
    BUSY
    INVISIBLE
}

type UserPreferences {
    language: String
    notificationDuration: Float
    unreadTrayIconAlert: Boolean
    useEmojis: Boolean
    convertAsciiToEmoji: Boolean
    autoLoadImages: Boolean
    saveMobileBandwith: Boolean
    collapseEmbeddedMeida: Boolean
    unreadRoomsMode: Boolean
    hideUserName: Boolean
    hideRoles: Boolean
    hideRightSideBarWithClick: Boolean
    hideAvatars: Boolean
    mergePrivateGroupsWithChannels: Boolean
    enterKeyBehaviour: String
    viewMode: String
    offlineEmailNotifications: String
    highlights: String
    newRoomNotificationSound: String
    newMessageNotificationSound: String
}

input UserSettings {
    language: String
    notificationDuration: Float
    unreadTrayIconAlert: Boolean
    useEmojis: Boolean
    convertAsciiToEmoji: Boolean
    autoLoadImages: Boolean
    saveMobileBandwith: Boolean
    collapseEmbeddedMeida: Boolean
    unreadRoomsMode: Boolean
    hideUserName: Boolean
    hideRoles: Boolean
    hideRightSideBarWithClick: Boolean
    hideAvatars: Boolean
    mergePrivateGroupsWithChannels: Boolean
    enterKeyBehaviour: String
    viewMode: String
    offlineEmailNotifications: String
    highlights: String
    newRoomNotificationSound: String
    newMessageNotificationSound: String
    email: String
    avatar: String
    name: String
}

type ChannelSettings {
    disableNotification: Boolean
    audio: String
    desktop: String
    duration: Int
    mobile: String
    mail: String
    hideUnreadRoomStatus : Boolean
    unreadTrayIconAlert: String
}

type Channel {
    id: String
    title: String
    # topic: TODO
    # userNotificationSettings: ChannelSettings
    description: String
    announcement: String
    numberOfMembers: Int
    members: [User]
    owners: [User]
    direct: Boolean
    privateChannel: Boolean
    readOnly: Boolean
    archived: Boolean
    favorite: Boolean
    unseenMessages: Int
}
`;

export const CHAT_MESSAGE_SUBSCRIPTION_TOPIC = 'CHAT_MESSAGE_ADDED';

let counter = 0;
const stubMessages = [
  {
    content: 'kentak is pitushky',
    creationTime: (new Date().getTime() - Math.round((Math.random() * 100000000))).toString(),
    author: { username: 'GushBasar', avatar: 'http://dreamicus.com/data/face/face-01.jpg', },
    channel: { id: '1' },
  },
  {
    content: 'kentak is kentak',
    creationTime: (new Date().getTime() - Math.round((Math.random() * 100000000))).toString(),
    avatar: 'http://dreamicus.com/data/face/face-01.jpg',
    author: { username: 'GushBasar', avatar: 'http://dreamicus.com/data/face/face-01.jpg', },
    channel: { id: '1' },
  },
  {
    content: 'fried chicken is kentak',
    creationTime: (new Date().getTime() - Math.round((Math.random() * 100000000))).toString(),
    avatar: 'http://dreamicus.com/data/face/face-01.jpg',
    author: { username: 'GushBasar', avatar: 'http://dreamicus.com/data/face/face-01.jpg', },
    channel: { id: '1' },
  }
];

const createMessage = (id: number) => {
  const randomIndex = Math.round(Math.random() * (stubMessages.length - 1));
  const randomMessage: any = Object.assign({}, stubMessages[randomIndex]);
  randomMessage.id = id.toString();
  randomMessage.content += `#${id}`;
  return randomMessage;
};

const messages = [];

for (let i = 0; i < 10000; i++) {
  messages.push(createMessage(i));
}

export const rootResolvers = {
  Query: {
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
          messages: messages.slice(nextMessageIndex, finalMessageIndex).reverse(),
        };
      }
    }
  },
  Mutation: {
    sendMessage: (root, { channelId, content }, context) => {
      const newMessage = {
        id: (--counter).toString(),
        content: content + `#${counter}`,
        creationTime: (new Date()).getTime().toString(),
        author: {
          username: 'tomer',
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
  },
  Subscription: {
    chatMessageAdded: {
      subscribe: withFilter(() => pubsub.asyncIterator(CHAT_MESSAGE_SUBSCRIPTION_TOPIC), (payload, args) => {
        return payload.chatMessageAdded.channel.id === args.channelId;
      })
    }
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: rootResolvers,
  logger: { log: (e) => console.log(e) },
});

// addMockFunctionsToSchema({ schema: executableSchema });

export default executableSchema;
