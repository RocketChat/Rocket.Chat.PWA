import gql from 'graphql-tag';

import { userFieldsFragment } from './user.fragment';

export const messageFragment = gql`
  fragment MessageFragment on Message {
    id
    author {
      ...UserFields
    }
    type
    content
    creationTime
    fromServer
  }
  ${userFieldsFragment}
`;
