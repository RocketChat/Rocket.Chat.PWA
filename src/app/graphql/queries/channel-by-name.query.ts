import gql from 'graphql-tag';

export const channelByNameQuery = gql`
  query channelByName($name: String!, $isDirect: Boolean!){
    channelByName(name: $name, isDirect: $isDirect){
      id
      name
      direct
      privateChannel
    }
  }
`;
