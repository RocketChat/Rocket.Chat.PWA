/* tslint:disable */

export interface Query {
  channels: Channel[] | null; 
  channelByName: Channel | null; 
  directChannel: Channel | null; 
  channelsByUser: Channel[] | null; 
  messages: MessagesWithCursor | null; 
  oauthProviders: OauthProvider[] | null; 
  me: User | null; 
}

export interface Channel {
  id: string; 
  name: string | null; 
  description: string | null; 
  announcement: string | null; 
  topic: string | null; 
  members: User[] | null; 
  owners: User[] | null; 
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
  channels: Channel[] | null; 
  directMessages: Channel[] | null; 
}

export interface MessagesWithCursor {
  cursor: string | null; 
  channel: Channel | null; 
  messagesArray: Message[] | null; 
}

export interface Message {
  id: string | null; 
  author: User | null; 
  content: string | null; 
  channel: Channel | null; 
  creationTime: number | null; 
  fromServer: boolean | null; 
  type: string | null; 
  userRef: User[] | null; 
  channelRef: Channel[] | null; 
  reactions: Reaction[] | null; 
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

export interface Subscription {
  chatMessageAdded: Message | null; 
}

export interface PasswordType {
  digest: string | null; 
  algorithm: string | null; 
}

export interface ChannelFilter {
  nameFilter: string | null; 
  privacy: Privacy | null; 
  joinedChannels: boolean | null; 
  sortBy: ChannelSort | null; 
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

export interface ChannelNameAndDirect {
  name: string; 
  direct: boolean; 
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
  channelName: string | null; 
  directTo: string | null; 
  cursor: string | null; 
  count: number | null; 
  searchRegex: string | null; 
  excludeServer: boolean | null; 
}
export interface CreateChannelMutationArgs {
  name: string; 
  private: boolean | null; 
  readOnly: boolean | null; 
  membersId: string[]; 
}
export interface LeaveChannelMutationArgs {
  channelId: string; 
}
export interface HideChannelMutationArgs {
  channelId: string; 
}
export interface SendMessageMutationArgs {
  channelId: string | null; 
  directTo: string | null; 
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
export interface ChatMessageAddedSubscriptionArgs {
  channelId: string | null; 
  directTo: string | null; 
}

export type Privacy = "PRIVATE" | "PUBLIC" | "ALL";


export type ChannelSort = "NAME" | "NUMBER_OF_MESSAGES";


export type UserStatus = "ONLINE" | "AWAY" | "BUSY" | "INVISIBLE" | "OFFLINE";

export namespace ChannelByName {
  export type Variables = {
    name: string;
  }

  export type Query = {
    channelByName: ChannelByName | null; 
  }

  export type ChannelByName = {
    id: string; 
    name: string | null; 
    direct: boolean | null; 
    privateChannel: boolean | null; 
  }
}
export namespace ChatMessageAdded {
  export type Variables = {
    channelId: string | null;
    directTo: string | null;
  }

  export type Subscription = {
    chatMessageAdded: ChatMessageAdded | null; 
  }

  export type ChatMessageAdded = {
  } & MessageFragment.Fragment
}
export namespace DirectChannel {
  export type Variables = {
    username: string | null;
    channelId: string | null;
  }

  export type Query = {
    directChannel: DirectChannel | null; 
  }

  export type DirectChannel = {
    id: string; 
    name: string | null; 
    direct: boolean | null; 
    privateChannel: boolean | null; 
  }
}
export namespace GetAllProviders {
  export type Variables = {
  }

  export type Query = {
    oauthProviders: OauthProviders[] | null; 
  }

  export type OauthProviders = {
    name: string; 
  }
}
export namespace Messages {
  export type Variables = {
    channelId: string | null;
    channelName: string | null;
    directTo: string | null;
    cursor: string | null;
    count: number | null;
    searchRegex: string | null;
    excludeServer: boolean | null;
  }

  export type Query = {
    messages: Messages | null; 
  }

  export type Messages = {
    cursor: string | null; 
    channel: Channel | null; 
    messagesArray: MessagesArray[] | null; 
  }

  export type Channel = {
    id: string; 
    name: string | null; 
    direct: boolean | null; 
  }

  export type MessagesArray = {
  } & MessageFragment.Fragment
}
export namespace MyChannels {
  export type Variables = {
    userId: string;
  }

  export type Query = {
    channelsByUser: ChannelsByUser[] | null; 
  }

  export type ChannelsByUser = {
    id: string; 
    direct: boolean | null; 
    name: string | null; 
    privateChannel: boolean | null; 
  }
}
export namespace SendMessage {
  export type Variables = {
    channelId: string | null;
    directTo: string | null;
    content: string;
  }

  export type Mutation = {
    sendMessage: SendMessage | null; 
  }

  export type SendMessage = {
  } & MessageFragment.Fragment
}

export namespace MessageFragment {
  export type Fragment = {
    id: string | null; 
    author: Author | null; 
    type: string | null; 
    content: string | null; 
    creationTime: number | null; 
    fromServer: boolean | null; 
  }

  export type Author = {
  } & UserFields.Fragment
}

export namespace UserFields {
  export type Fragment = {
    id: string; 
    name: string | null; 
    avatar: string | null; 
    username: string | null; 
  }
}
