import gql from 'graphql-tag';

import { messageFragment } from './message.fragment';

export const messagesQuery = gql`
  query messages(
    $channelId: String,
    $channelName: String,
    $directTo: String,
    $cursor: String,
    $count: Int,
    $searchRegex: String,
    $excludeServer: Boolean
  ) {
    messages(
      channelId: $channelId,
      channelName: $channelName,
      directTo: $directTo,
      cursor: $cursor,
      count: $count,
      searchRegex: $searchRegex,
      excludeServer: $excludeServer
    ){
      cursor
      channel{
        id
        name
        direct
      }
      messagesArray{
        ...MessageFragment
      }
    }
  }
  ${messageFragment}
`;
