import { pubsub } from './subscriptions';
import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';

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
    sendMessage(channelId: String!, messageInput: MessageInput!): Message
    deleteMessage(messageId: MessageIdentifier!): Boolean
    editMessage(messageId: MessageIdentifier!, messageInput: MessageInput!): Message
    addReactionToMassage(messageId: MessageIdentifier!, icon: String!): Message
    updateUserSettings(userSettings: UserSettings): User
    #updateUserChannelSettings(channelId: String!,settings: ChannelSettings )
}

type Query {
    me: User
    messages(channelId: String!, paginationId: String, count: Int, SearchRegex: String): [Message]
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

input MessageInput {
    content: String!
    userRef: [String] #userId
    channelRef: [String] #channelId
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

export const rootResolvers = {
  Query: () => {
  },
  Mutation: () => {
  },
  Subscription: {
    chatMessageAdded: {
      subscribe: () => pubsub.asyncIterator(CHAT_MESSAGE_SUBSCRIPTION_TOPIC)
    }
  },
};

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: rootResolvers,
  logger: { log: (e) => console.log(e) },
});

addMockFunctionsToSchema({ schema: executableSchema });

export default executableSchema;
