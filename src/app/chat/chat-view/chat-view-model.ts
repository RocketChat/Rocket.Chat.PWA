import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const messageFragment: DocumentNode = gql` 
  fragment MessageFragment on Message {
    id
    author {
      username
      avatar
    }
    content
    creationTime
  }
`; // TODO: move to different file

export const messagesQuery: DocumentNode = gql`
  query messages($channelId: String!, $paginationId: String, $count: Int, $searchRegex: String){
    messages(channelId: $channelId, paginationId: $paginationId, count: $count, searchRegex: $searchRegex){
      ...MessageFragment
    }
  }
  ${messageFragment}
`;

export const chatMessagesSubscription: DocumentNode = gql`
  subscription chatMessageAdded($channelId: String!){
    chatMessageAdded(channelId: $channelId){
      ...MessageFragment
    }
  }
  ${messageFragment}
`;

export const sendMessageMutation: DocumentNode = gql`
  mutation sendMessage($channelId: String!, $content: String!){
    sendMessage(channelId: $channelId, content: $content){
      ...MessageFragment
    }
  }
  ${messageFragment}
`;


