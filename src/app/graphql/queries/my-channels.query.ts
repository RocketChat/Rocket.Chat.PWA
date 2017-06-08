import gql from 'graphql-tag';

export const myChannelsQuery = gql`
  query MyChannels($userId : String!){
    channelsByUser(userId: $userId){
      direct
      title
      unseenMessages
      privateChannel
    }
  }
`;
