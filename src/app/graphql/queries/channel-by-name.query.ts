import gql from 'graphql-tag';

export const channelByNameQuery = gql`
  query channelByName($name: String!){
    channelByName(name: $name){
      id
      name
      direct
      privateChannel
    }
  }
`;
