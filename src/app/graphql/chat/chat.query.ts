import gql from 'graphql-tag';


export const chatQuery = gql`
  query {
    me{
      username
    }
    messages(channelId: "sdd", SearchRegex: ""){
      content
      user{
        username
      }
    }
  }
`;

