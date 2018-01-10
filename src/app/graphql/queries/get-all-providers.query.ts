import gql from 'graphql-tag';

export const getAllProvidersQuery = gql`
  query getAllProviders {
    oauthProviders {
      name
    }
  }
`;
