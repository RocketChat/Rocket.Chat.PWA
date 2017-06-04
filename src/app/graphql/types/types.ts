/* tslint:disable */

export interface Query {
  me: User | null;
  messages: Array<Message> | null;
  channelsByUser: Array<Channel> | null;
  channels: Array<Channel> | null;
}

export interface MessagesQueryArgs {
  channelId: string;
  paginationId: string | null;
  count: number | null;
  SearchRegex: string | null;
}

export interface ChannelsByUserQueryArgs {
  userId: string | null;
}

export interface ChannelsQueryArgs {
  filter: ChannelFilter | null;
}

export interface User {
  username: string;
  status: UserStatus | null;
  email: string;
  avatar: string | null;
  name: string | null;
  lastLogin: string | null;
  userPreferences: UserPreferences;
  channels: Array<Channel> | null;
  directMessages: Array<Channel> | null;
}

export type UserStatus = "ONLINE" | "AWAY" | "BUSY" | "INVISIBLE";

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

export interface Channel {
  id: string;
  title: string;
  description: string;
  announcement: string;
  numberOfMembers: number;
  members: Array<User> | null;
  owners: Array<User> | null;
  direct: boolean | null;
  private: boolean | null;
  readOnly: boolean | null;
  archived: boolean | null;
  favorite: boolean | null;
  unseenMessages: number | null;
}

export interface Message {
  id: string;
  user: User;
  content: string;
  creationTime: string;
  fromServer: boolean | null;
  tags: Array<string> | null;
  userRef: Array<User> | null;
  channelRef: Array<Channel> | null;
  reactions: Array<Reaction> | null;
}

export interface Reaction {
  username: string;
  icon: string;
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
  messageInput: MessageInput;
}

export interface DeleteMessageMutationArgs {
  messageId: MessageIdentifier;
}

export interface EditMessageMutationArgs {
  messageId: MessageIdentifier;
  messageInput: MessageInput;
}

export interface AddReactionToMassageMutationArgs {
  messageId: MessageIdentifier;
  icon: string;
}

export interface UpdateUserSettingsMutationArgs {
  userSettings: UserSettings | null;
}

export interface MessageInput {
  content: string;
  userRef: Array<string> | null;
  channelRef: Array<string> | null;
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

export interface scheme {
  query: Query | null;
  mutation: Mutation | null;
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

export namespace GetChatQuery {
  export type Variables = {
  }

  export type Result = {
    me: Me;
    messages: Array<Messages>;
  } 

  export type Me = {
    username: string;
    email: string;
  } 

  export type Messages = {
    content: string;
    user: User;
  } 

  export type User = {
    username: string;
  } 
}

export namespace MyChannelsQuery {
  export type Variables = {
      userId: string;
  }

  export type Result = {
    channelsByUser: Array<ChannelsByUser>;
  } 

  export type ChannelsByUser = {
    direct: boolean;
    title: string;
    unseenMessages: number;
  } 
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
