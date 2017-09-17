import gql from 'graphql-tag';

export const directChannelQuery = gql`
  query directChannel($username: String, $channelId: String){
    directChannel(username: $username, channelId: $channelId){
      id
      name
      direct
      privateChannel
    }
  }
`;
