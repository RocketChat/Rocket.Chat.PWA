import gql from 'graphql-tag';

export const loginWithServiceAccessTokenMutation = gql`
  mutation loginWithServiceAccessToken($service: String! $accessToken: String!){
    loginWithServiceAccessToken(service: $service, accessToken: $accessToken){
      accessToken,
      refreshToken
    }
  }
`;
