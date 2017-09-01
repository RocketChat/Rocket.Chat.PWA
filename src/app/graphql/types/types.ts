/* tslint:disable */

export interface Query {
  channels: Array<Channel> | null;
  channelByName: Channel | null;
  directChannel: Channel | null;
  channelsByUser: Array<Channel> | null;
  messages: MessagesWithCursor | null;
  oauthProviders: Array<OauthProvider> | null;
  me: User | null;
}

export interface ChannelsQueryArgs {
  filter: ChannelFilter | null;
}

export interface ChannelByNameQueryArgs {
  name: string;
}

export interface DirectChannelQueryArgs {
  username: string | null;
  channelId: string | null;
}

export interface ChannelsByUserQueryArgs {
  userId: string;
}

export interface MessagesQueryArgs {
  channelId: string | null;
  channelDetails: ChannelNameAndDirect | null;
  channelName: string | null;
  cursor: string | null;
  count: number | null;
  searchRegex: string | null;
  excludeServer: boolean | null;
}

export interface ChannelFilter {
  nameFilter: string | null;
  privacy: Privacy | null;
  joinedChannels: boolean | null;
  sortBy: ChannelSort | null;
}

export type Privacy = "PRIVATE" | "PUBLIC" | "ALL";

export type ChannelSort = "NAME" | "NUMBER_OF_MESSAGES";

export interface Channel {
  id: string;
  name: string | null;
  description: string | null;
  announcement: string | null;
  topic: string | null;
  members: Array<User> | null;
  owners: Array<User> | null;
  numberOfMembers: number | null;
  numberOfMessages: number | null;
  readOnly: boolean | null;
  direct: boolean | null;
  privateChannel: boolean | null;
  favourite: boolean | null;
  unseenMessages: number | null;
}

export interface User {
  id: string;
  email: string | null;
  username: string | null;
  status: UserStatus | null;
  avatar: string | null;
  name: string | null;
  lastLogin: string | null;
  channels: Array<Channel> | null;
  directMessages: Array<Channel> | null;
}

export type UserStatus = "ONLINE" | "AWAY" | "BUSY" | "INVISIBLE" | "OFFLINE";

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
  channel: Channel | null;
  creationTime: number | null;
  fromServer: boolean | null;
  type: string | null;
  userRef: Array<User> | null;
  channelRef: Array<Channel> | null;
  reactions: Array<Reaction> | null;
  tags: Array<string> | null;
}

export interface Reaction {
  username: string | null;
  icon: string | null;
}

export interface OauthProvider {
  name: string;
}

export interface Mutation {
  createChannel: Channel | null;
  leaveChannel: boolean | null;
  hideChannel: boolean | null;
  sendMessage: Message | null;
  editMessage: Message | null;
  deleteMessage: Message | null;
  addReactionToMassage: Message | null;
  setStatus: User | null;
  loginWithPassword: LoginReturn | null;
  refreshTokens: LoginReturn | null;
  logout: boolean | null;
  impersonate: ImpersonateReturn | null;
  createUser: boolean | null;
  verifyEmail: boolean | null;
  resetPassword: boolean | null;
  sendVerificationEmail: boolean | null;
  sendResetPasswordEmail: boolean | null;
}

export interface CreateChannelMutationArgs {
  name: string;
  private: boolean | null;
  readOnly: boolean | null;
  membersId: Array<string>;
}

export interface LeaveChannelMutationArgs {
  channelId: string;
}

export interface HideChannelMutationArgs {
  channelId: string;
}

export interface SendMessageMutationArgs {
  channelId: string;
  content: string;
}

export interface EditMessageMutationArgs {
  id: MessageIdentifier;
  content: string;
}

export interface DeleteMessageMutationArgs {
  id: MessageIdentifier;
}

export interface AddReactionToMassageMutationArgs {
  id: MessageIdentifier;
  icon: string;
}

export interface SetStatusMutationArgs {
  status: UserStatus;
}

export interface LoginWithPasswordMutationArgs {
  user: UserInput;
  password: string;
}

export interface RefreshTokensMutationArgs {
  accessToken: string;
  refreshToken: string;
}

export interface LogoutMutationArgs {
  accessToken: string;
}

export interface ImpersonateMutationArgs {
  accessToken: string;
  username: string;
}

export interface CreateUserMutationArgs {
  user: CreateUserInput;
}

export interface VerifyEmailMutationArgs {
  token: string;
}

export interface ResetPasswordMutationArgs {
  token: string;
  newPassword: PasswordInput;
}

export interface SendVerificationEmailMutationArgs {
  email: string;
}

export interface SendResetPasswordEmailMutationArgs {
  email: string;
}

export interface MessageIdentifier {
  channelId: string;
  messageId: string;
}

export interface UserInput {
  id: string | null;
  email: string | null;
  username: string | null;
}

export interface LoginReturn {
  sessionId: string | null;
  user: User | null;
  tokens: Tokens | null;
}

export interface Tokens {
  refreshToken: string | null;
  accessToken: string | null;
}

export interface ImpersonateReturn {
  authorized: boolean | null;
  tokens: Tokens | null;
  user: User | null;
}

export interface CreateUserInput {
  username: string | null;
  email: string | null;
  password: string | null;
  profile: CreateUserProfileInput | null;
}

export interface CreateUserProfileInput {
  name: string | null;
  firstName: string | null;
  lastName: string | null;
}

export interface PasswordInput {
  digest: string | null;
  algorithm: string | null;
}

export interface Subscription {
  chatMessageAdded: Message | null;
}

export interface ChatMessageAddedSubscriptionArgs {
  channelId: string;
}

export interface PasswordType {
  digest: string | null;
  algorithm: string | null;
}

export namespace ChannelByNameQuery {
  export type Variables = {
      name: string;
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
      directTo: string;
  }

  export type Result = {
    chatMessageAdded: ChatMessageAdded;
  }

  export type ChatMessageAdded = {
  } & MessageFragment.Fragment
}

export namespace DirectChannelQuery {
  export type Variables = {
      username: string | null;
      channelId: string | null;
  }

  export type Result = {
    directChannel: DirectChannel;
  }

  export type DirectChannel = {
    id: string;
    name: string;
    direct: boolean;
    privateChannel: boolean;
  }
}

export namespace GetAllProvidersQuery {
  export type Variables = {
  }

  export type Result = {
    oauthProviders: Array<OauthProviders>;
  }

  export type OauthProviders = {
    name: string;
  }
}

export namespace MessageFragment {
  export type Variables = {
  }

  export type Fragment = {
    id: string;
    author: Author;
    content: string;
    type: string;
    creationTime: number;
    fromServer: boolean;
  }

  export type Author = {
    name: string;
    username: string;
    avatar: string;
  }
}

export namespace MessagesQuery {
  export type Variables = {
      channelId: string | null;
      channelName: string | null;
      directTo: string | null;
      cursor: string | null;
      count: number | null;
      searchRegex: string | null;
      excludeServer: boolean | null;
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
    privateChannel: boolean;
  }
}

export namespace SendMessageMutation {
  export type Variables = {
      channelId: string;
      directTo: string;
      content: string;
  }

  export type Result = {
    sendMessage: SendMessage;
  }

  export type SendMessage = {
  } & MessageFragment.Fragment
}

export namespace UserFields {
  export type Variables = {
  }

  export type Fragment = {
    id: string;
    name: string;
    avatar: string;
    username: string;
  }
}
