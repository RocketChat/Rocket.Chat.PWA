import gql from 'graphql-tag';
import { messageFragment } from './message.fragment';

export const chatMessageAddedSubscription = gql`
  subscription chatMessageAdded($channelId: String!){
    chatMessageAdded(channelId: $channelId){
      ...MessageFragment
    }
  }
  ${messageFragment}
`;
