import * as request from 'request';

const serviceToUrl = {
  google: 'https://www.googleapis.com/plus/v1/people/me?access_token=',
  facebook: 'https://graph.facebook.com/me?fields=name&access_token=',
};

export const getUserDataFromService = (accessToken: string, service: string) => {
  return new Promise((resolve, reject) => {
    let userData = null;
    const requestUrl = serviceToUrl[service];
    if (!requestUrl) {
      reject('service in not defined');
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
