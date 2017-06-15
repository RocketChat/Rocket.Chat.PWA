import * as request from 'request';

const servicesResolver = {
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
  // facebook: {
  //   url: 'https://graph.facebook.com/me?fields=id,name,email&access_token=',
  //   userResolver: (userData) => {
  //   },
  // },
};

export const setServicesResolver = (resolver) => {
  Object.assign(servicesResolver, resolver);
};

export const getServiceUrl = (service: string): string => {
  if (servicesResolver[service]) {
    return servicesResolver[service].url;
  }

  return null;
};

export const getUserFromServiceUserData = async (service: string, userData, accountsServer) => {
  if (servicesResolver[service]) {
    return await servicesResolver[service].userResolver(userData, accountsServer);
  }

  return null;
};

export const getUserDataFromService = (accessToken: string, service: string) => {
  return new Promise((resolve, reject) => {
    let userData = null;
    const requestUrl = getServiceUrl(service);
    if (!requestUrl) {
      reject('service is not defined');
    }
    request(`${requestUrl}${accessToken}`, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        userData = JSON.parse(body);
        resolve(userData);
      }
      else {
        reject(error);
      }
    });
  });
};
