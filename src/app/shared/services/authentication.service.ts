import { Injectable } from '@angular/core';
import { getAccountsClient } from './accounts-client';
import { AuthorizationMiddleware } from './authorization-middleware';
import { UserFields } from '../../graphql/types/types';




@Injectable()
export class AuthenticationService {

  private accountsClient;

  constructor(){
    this.accountsClient = getAccountsClient();
  }

  async resumeSession() {
    try {
      await this.accountsClient.loadTokensFromStorage();
      await this.accountsClient.loadOriginalTokensFromStorage();
      await this.accountsClient.resumeSession();
      await this.setAuthMiddlewareToken();
    }catch (e) {
      console.log('Failed to resume session, user isn\'t connected');
    }
  }

  private async setAuthMiddlewareToken(){
    const tokens = await this.accountsClient.tokens();

    if (tokens.accessToken) {
      const accessToken = tokens.accessToken;
      AuthorizationMiddleware.setToken(accessToken);
    }
  }

  async login(username: string, password: string): Promise<any> {
    return this.accountsClient.loginWithPassword(username, password);
  }

  async logout() {
    return this.accountsClient.logout();
  }


  getUser(): UserFields.Fragment {
    return this.accountsClient.user();
  }

  isUserConnected(){
    return !!this.getUser();
  }
}
