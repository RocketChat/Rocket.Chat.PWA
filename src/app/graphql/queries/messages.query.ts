import gql from 'graphql-tag';
import { messageFragment } from './message.fragment';

export const messagesQuery = gql`
  query messages($channelId: String, $channelDetails: ChannelNameAndDirect $cursor: String, $count: Int, $searchRegex: String){
    messages(channelId: $channelId, channelDetails: $channelDetails, cursor: $cursor, count: $count, searchRegex: $searchRegex){
      cursor
      channel{
        id
        name
      }
      messagesArray{
        ...MessageFragment
      }
    }
  }
  ${messageFragment}
`;
