import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';
import { createJSAccountsGraphQL } from '@accounts/graphql-api';
import { mocks, subscriptionResolver } from './mocks';

/* tslint:disable */
export const schema = `
type schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

type Mutation {
    leaveChannel(channelId: String!): Boolean
    hideChannel(channelId: String!): Boolean
    setStatus(status: UserStatus!): User
    createChannel(name: String!, private: Boolean = false, readOnly: Boolean = false, membersId: [String!]): Channel
    sendMessage(channelId: String!, content: String!): Message
    deleteMessage(messageId: MessageIdentifier!): Boolean
    editMessage(messageId: MessageIdentifier!, content: String!): Message
    addReactionToMassage(messageId: MessageIdentifier!, icon: String!): Message
    updateUserSettings(userSettings: UserSettings): User
    loginWithServiceAccessToken(service: String!, accessToken: String!): LoginResult
    #updateUserChannelSettings(channelId: String!,settings: ChannelSettings )
}

type Query {
    messages(channelId: String, channelDetails: ChannelNameAndDirect, channelName: String, cursor: String, count: Int, searchRegex: String): MessagesWithCursor
    channelsByUser(userId: String): [Channel]
    channels(filter: ChannelFilter = {privacy: ALL, joinedChannels: false, sortBy: NAME}): [Channel]
    channelByName(name: String!, isDirect: Boolean!): Channel
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

input ChannelNameAndDirect {
  name: String!
  direct: Boolean!
  
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
  channel: Channel
  messagesArray: [Message]
}

type LoginResult {
  accessToken: String
  refreshToken: String
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

extend type User {
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
    name: String
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
/* tslint:enable */

export function createSchemeWithAccounts(accountsServer) {
  const accountsGraphQL = createJSAccountsGraphQL(accountsServer);

  // TODO after accounts pr remove dummy object
  const mockResolvers = {
    Query: {},
    Mutation: {},
    ...subscriptionResolver
  };
  const resolversWithAccounts = accountsGraphQL.extendWithResolvers(mockResolvers);

  const executableSchema = makeExecutableSchema({
    typeDefs: [schema, accountsGraphQL.schema],
    resolvers: resolversWithAccounts,
    logger: { log: (e) => console.log(e) },
  });

  addMockFunctionsToSchema({ schema: executableSchema, mocks,  preserveResolvers: true});

  return executableSchema;
}
