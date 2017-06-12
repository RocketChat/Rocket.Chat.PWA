/* tslint:disable */

export interface Query {
  me: User | null;
  messages: MessagesWithCursor | null;
  channelsByUser: Array<Channel> | null;
  channels: Array<Channel> | null;
  channelByName: Channel | null;
}

export interface MessagesQueryArgs {
  channelId: string | null;
  channelDetails: ChannelNameAndDirect | null;
  channelName: string | null;
  cursor: string | null;
  count: number | null;
  searchRegex: string | null;
}

export interface ChannelsByUserQueryArgs {
  userId: string | null;
}

export interface ChannelsQueryArgs {
  filter: ChannelFilter | null;
}

export interface ChannelByNameQueryArgs {
  name: string;
  isDirect: boolean;
}

export interface User {
  username: string | null;
  email: string | null;
  userPreferences: UserPreferences | null;
  status: UserStatus | null;
  avatar: string | null;
  name: string | null;
  lastLogin: string | null;
  channels: Array<Channel> | null;
  directMessages: Array<Channel> | null;
}

export interface UserPreferences {
  language: string | null;
  notificationDuration: number | null;
  unreadTrayIconAlert: boolean | null;
  useEmojis: boolean | null;
  convertAsciiToEmoji: boolean | null;
  autoLoadImages: boolean | null;
  saveMobileBandwith: boolean | null;
  collapseEmbeddedMeida: boolean | null;
  unreadRoomsMode: boolean | null;
  hideUserName: boolean | null;
  hideRoles: boolean | null;
  hideRightSideBarWithClick: boolean | null;
  hideAvatars: boolean | null;
  mergePrivateGroupsWithChannels: boolean | null;
  enterKeyBehaviour: string | null;
  viewMode: string | null;
  offlineEmailNotifications: string | null;
  highlights: string | null;
  newRoomNotificationSound: string | null;
  newMessageNotificationSound: string | null;
}

export type UserStatus = "ONLINE" | "AWAY" | "BUSY" | "INVISIBLE";

export interface Channel {
  id: string | null;
  name: string | null;
  description: string | null;
  announcement: string | null;
  numberOfMembers: number | null;
  members: Array<User> | null;
  owners: Array<User> | null;
  direct: boolean | null;
  privateChannel: boolean | null;
  readOnly: boolean | null;
  archived: boolean | null;
  favorite: boolean | null;
  unseenMessages: number | null;
}

export interface ChannelNameAndDirect {
  name: string;
  direct: boolean;
}

export interface MessagesWithCursor {
  cursor: string | null;
  channel: Channel | null;
  messagesArray: Array<Message> | null;
}

export interface Message {
  id: string | null;
  author: User | null;
  content: string | null;
  creationTime: string | null;
  channel: Channel | null;
  fromServer: boolean | null;
  tags: Array<string> | null;
  userRef: Array<User> | null;
  channelRef: Array<Channel> | null;
  reactions: Array<Reaction> | null;
}

export interface Reaction {
  username: string | null;
  icon: string | null;
}

export interface ChannelFilter {
  nameFilter: string | null;
  privacy: Privacy | null;
  joinedChannels: boolean | null;
  sortBy: ChannelSort | null;
}

export type Privacy = "PRIVATE" | "PUBLIC" | "ALL";

export type ChannelSort = "NAME" | "NUMBER_OF_MESSAGES";

export interface Mutation {
  leaveChannel: boolean | null;
  hideChannel: boolean | null;
  setStatus: User | null;
  logout: boolean | null;
  createChannel: Channel | null;
  sendMessage: Message | null;
  deleteMessage: boolean | null;
  editMessage: Message | null;
  addReactionToMassage: Message | null;
  updateUserSettings: User | null;
}

export interface LeaveChannelMutationArgs {
  channelId: string;
}

export interface HideChannelMutationArgs {
  channelId: string;
}

export interface SetStatusMutationArgs {
  status: UserStatus;
}

export interface CreateChannelMutationArgs {
  name: string;
  private: boolean | null;
  readOnly: boolean | null;
  membersId: Array<string>;
}

export interface SendMessageMutationArgs {
  channelId: string;
  content: string;
}

export interface DeleteMessageMutationArgs {
  messageId: MessageIdentifier;
}

export interface EditMessageMutationArgs {
  messageId: MessageIdentifier;
  content: string;
}

export interface AddReactionToMassageMutationArgs {
  messageId: MessageIdentifier;
  icon: string;
}

export interface UpdateUserSettingsMutationArgs {
  userSettings: UserSettings | null;
}

export interface MessageIdentifier {
  channelId: string;
  messageId: string;
}

export interface UserSettings {
  language: string | null;
  notificationDuration: number | null;
  unreadTrayIconAlert: boolean | null;
  useEmojis: boolean | null;
  convertAsciiToEmoji: boolean | null;
  autoLoadImages: boolean | null;
  saveMobileBandwith: boolean | null;
  collapseEmbeddedMeida: boolean | null;
  unreadRoomsMode: boolean | null;
  hideUserName: boolean | null;
  hideRoles: boolean | null;
  hideRightSideBarWithClick: boolean | null;
  hideAvatars: boolean | null;
  mergePrivateGroupsWithChannels: boolean | null;
  enterKeyBehaviour: string | null;
  viewMode: string | null;
  offlineEmailNotifications: string | null;
  highlights: string | null;
  newRoomNotificationSound: string | null;
  newMessageNotificationSound: string | null;
  email: string | null;
  avatar: string | null;
  name: string | null;
}

export interface Subscription {
  chatMessageAdded: Message | null;
}

export interface ChatMessageAddedSubscriptionArgs {
  channelId: string;
}

export interface scheme {
  query: Query | null;
  mutation: Mutation | null;
  subscription: Subscription | null;
}

export interface ChannelSettings {
  disableNotification: boolean | null;
  audio: string | null;
  desktop: string | null;
  duration: number | null;
  mobile: string | null;
  mail: string | null;
  hideUnreadRoomStatus: boolean | null;
  unreadTrayIconAlert: string | null;
}

export namespace ChannelByNameQuery {
  export type Variables = {
      name: string;
      isDirect: boolean;
  }

  export type Result = {
    channelByName: ChannelByName;
  } 

  export type ChannelByName = {
    id: string;
    name: string;
    direct: boolean;
    privateChannel: boolean;
  } 
}

export namespace ChatMessageAddedSubscription {
  export type Variables = {
      channelId: string;
  }

  export type Result = {
    chatMessageAdded: ChatMessageAdded;
  } 

  export type ChatMessageAdded = {
  } & MessageFragment.Fragment 
}

export namespace MessageFragment {
  export type Variables = {
  }

  export type Fragment = {
    id: string;
    author: Author;
    content: string;
    creationTime: string;
  } 

  export type Author = {
    name: string;
    avatar: string;
  } 
}

export namespace MessagesQuery {
  export type Variables = {
      channelId: string | null;
      channelDetails: ChannelNameAndDirect | null;
      cursor: string | null;
      count: number | null;
      searchRegex: string | null;
  }

  export type Result = {
    messages: Messages;
  } 

  export type Messages = {
    cursor: string;
    channel: Channel;
    messagesArray: Array<MessagesArray>;
  } 

  export type Channel = {
    id: string;
    name: string;
  } 

  export type MessagesArray = {
  } & MessageFragment.Fragment 
}

export namespace MyChannelsQuery {
  export type Variables = {
      userId: string;
  }

  export type Result = {
    channelsByUser: Array<ChannelsByUser>;
  } 

  export type ChannelsByUser = {
    id: string;
    direct: boolean;
    name: string;
    unseenMessages: number;
    privateChannel: boolean;
  } 
}

export namespace SendMessageMutation {
  export type Variables = {
      channelId: string;
      content: string;
  }

  export type Result = {
    sendMessage: SendMessage;
  } 

  export type SendMessage = {
  } & MessageFragment.Fragment 
}

export namespace UserDataQuery {
  export type Variables = {
  }

  export type Result = {
    me: Me;
  } 

  export type Me = {
    name: string;
    avatar: string;
  } 
}
