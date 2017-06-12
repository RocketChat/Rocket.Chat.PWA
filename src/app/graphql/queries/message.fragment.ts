import gql from 'graphql-tag';

export const messageFragment = gql`
fragment MessageFragment on Message {
  id
  author {
    name
    avatar
  }
  content
  creationTime
}
`;
