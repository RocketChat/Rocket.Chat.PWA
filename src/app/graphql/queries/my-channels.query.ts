import gql from 'graphql-tag';

export const myChannelsQuery = gql`
  query MyChannels($userId : String!){
    channelsByUser(userId: $userId){
      id
      direct
      name
      privateChannel
    }
  }
`;
