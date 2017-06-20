import * as request from 'request';
import { ServicesResolver } from '../types/types';

export class OAuthResolver {
  private servicesResolver: ServicesResolver = {};

  setServicesResolver(resolver: ServicesResolver) {
    Object.assign(this.servicesResolver, resolver);
  }

  getServiceUrl(service: string): string {
    if (this.servicesResolver[service]) {
      return this.servicesResolver[service].url;
    }

    return null;
  };

  async getUserFromServiceUserData(service: string, userData) {
    if (this.servicesResolver[service]) {
      return await this.servicesResolver[service].userResolver(userData);
    }

    return null;
  };

  getUserDataFromService(accessToken: string, service: string) {
    return new Promise((resolve, reject) => {
      let userData = null;
      const requestUrl = this.getServiceUrl(service);
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
}
