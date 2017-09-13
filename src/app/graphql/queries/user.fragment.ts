import gql from 'graphql-tag';

export const userFieldsFragment = gql`
  fragment UserFields on User {
    id
    name
    avatar
    username
  }
`;
