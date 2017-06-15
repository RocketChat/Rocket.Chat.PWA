import { OAuthResolver } from './oauth-resolver';
import AccountsServer from '@accounts/server';

const oauthResolver: OAuthResolver = new OAuthResolver();

export const getOAuthResolver = () => {
  return oauthResolver;
};

export const initializeOAuthResolver = () => {
  oauthResolver.setServicesResolver({
    google: {
      url: 'https://www.googleapis.com/plus/v1/people/me?access_token=',
      userResolver: async (userData) => {
        let user = await AccountsServer.findUserByEmail(userData.emails[0].value);
        if (!user) {
          const id = await AccountsServer.createUser({
            username: userData.emails[0].value,
            email: userData.emails[0].value,
            profile: {
              name: userData.name.givenName + ' ' + userData.name.familyName,
              avatar: userData.image.url,
              oauth: {
                google: userData.id,
              }
            }
          });
          user = await AccountsServer.findUserById(id);
        }
        return user;
      },
    },
  });
};
