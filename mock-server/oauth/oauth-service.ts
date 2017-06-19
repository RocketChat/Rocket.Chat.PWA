import { OAuthResolver } from './oauth-resolver';
import AccountsServer from '@accounts/server';
import { getMongoClient } from '../db';

const oauthResolver: OAuthResolver = new OAuthResolver();

export const getOAuthResolver = () => {
  return oauthResolver;
};

export const findUserByOAuthId = async (service: string, id) => {
  const mongoClient = await getMongoClient();
  const dbCollection = await mongoClient.collection('users');
  return await dbCollection.findOne({ [`profile.oauth.${service}`]: id });
};

export const addOAuthIdToUserProfile = async (user, service: string, serviceId) => {
  AccountsServer.setProfile(user.id, Object.assign(user.profile,
    {
      oauth: {
        ...user.profile.oauth,
        [service]: serviceId
      }
    }));
};

export const initializeOAuthResolver = () => {
  oauthResolver.setServicesResolver({
    google: {
      url: 'https://www.googleapis.com/plus/v1/people/me?access_token=',
      userResolver: async (userData) => {
        let user = await findUserByOAuthId('google', userData.id);
        if (user) {
          user.id = user._id;
        }
        else {
          user = await AccountsServer.findUserByEmail(userData.emails[0].value);
        }

        if (user) {
          await addOAuthIdToUserProfile(user, 'google', userData.id);
        }
        else {
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
