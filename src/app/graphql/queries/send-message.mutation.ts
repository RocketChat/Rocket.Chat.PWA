import gql from 'graphql-tag';

import { messageFragment } from './message.fragment';

export const sendMessageMutation = gql`
  mutation sendMessage($channelId: String, $directTo: String, $content: String!){
    sendMessage(channelId: $channelId, directTo: $directTo, content: $content){
      ...MessageFragment
    }
  }
  ${messageFragment}
`;
