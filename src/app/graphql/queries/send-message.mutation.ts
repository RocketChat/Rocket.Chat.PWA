import gql from 'graphql-tag';
import { messageFragment } from './message.fragment';

export const sendMessageMutation = gql`
  mutation sendMessage($channelId: String!, $content: String!){
    sendMessage(channelId: $channelId, content: $content){
      ...MessageFragment
    }
  }
  ${messageFragment}
`;
