import gql from 'graphql-tag';

import { messageFragment } from './message.fragment';

export const chatMessageAddedSubscription = gql`
  subscription chatMessageAdded($channelId: String, $directTo: String){
    chatMessageAdded(channelId: $channelId, directTo: $directTo){
      ...MessageFragment
    }
  }
  ${messageFragment}
`;
