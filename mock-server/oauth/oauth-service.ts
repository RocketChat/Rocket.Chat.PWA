import { OAuthResolver } from './oauth-resolver';

const oauthResolver: OAuthResolver = new OAuthResolver();

export const getOAuthResolver = () => {
  return oauthResolver;
};

export const initializeOAuthResolver = () => {
  oauthResolver.setServicesResolver({
    google: {
      url: 'https://www.googleapis.com/plus/v1/people/me?access_token=',
      userResolver: async (userData, accountsServer) => {
        let user = await accountsServer.findUserByEmail(userData.emails[0].value);
        if (!user) {
          const id = await accountsServer.createUser({
            username: userData.emails[0].value,
            email: userData.emails[0].value,
            profile: {
              name: userData.name.givenName + ' ' + userData.name.familyName,
              oauth: {
                google: userData.id,
              }
            }
          });
          user = await accountsServer.findUserById(id);
        }
        return user;
      },
    },
  });
};
