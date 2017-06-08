import gql from 'graphql-tag';
import { messageFragment } from './message.fragment';

export const messagesQuery = gql`
  query messages($channelId: String!, $cursor: String, $count: Int, $searchRegex: String){
    messages(channelId: $channelId, cursor: $cursor, count: $count, searchRegex: $searchRegex){
      cursor
      messagesArray{
        ...MessageFragment
      }
    }
  }
  ${messageFragment}
`;
