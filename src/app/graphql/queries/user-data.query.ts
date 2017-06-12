import gql from 'graphql-tag';

export const userDataQuery = gql`
  query UserData{
    me {
      name
      avatar
    }
  }
`;
