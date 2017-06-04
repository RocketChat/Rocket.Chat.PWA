import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const messageFragment: DocumentNode = gql`
  fragment MessageFragment on Message {
    id
    author {
      username
      avatar
    }
    content
    creationTime
  }
`;
