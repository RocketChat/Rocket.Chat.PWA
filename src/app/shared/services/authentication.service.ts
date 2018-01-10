import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';

import { getAccountsClient } from './accounts-client';
import { AuthorizationMiddleware } from './authorization-middleware';
import { UserFields, GetAllProviders, OauthProvider } from '../../graphql/types/types';
import { getAllProvidersQuery } from '../../graphql/queries/get-all-providers.query';
import { getPersistor } from '../common/store';
import { getApolloClient } from '../../graphql/client/apollo-client';

@Injectable()
export class AuthenticationService {

  private apollo: Apollo;
  private accountsClient;
  private triedToResumeSession = false;

  constructor(apollo: Apollo) {
    this.apollo = apollo;
    this.accountsClient = getAccountsClient();
    Offline.on('up', () => {
      if (!this.triedToResumeSession) {
        this.triedToResumeSession = true;
        this.resumeSession();
      }
    });
  }

  private cleanCache(): void {
    getPersistor().purge();
    getApolloClient().resetStore();
  }

  async resumeSession(): Promise<void> {
    if (Offline.state === 'up') {
      this.cleanCache();
      this.triedToResumeSession = true;
      try {
        await this.accountsClient.loadTokensFromStorage();
        await this.accountsClient.loadOriginalTokensFromStorage();
        await this.accountsClient.resumeSession();
        await this.setAuthMiddlewareToken();
      } catch (e) {
        console.log('Failed to resume session, user isn\'t connected');
      }
    }
  }

  async refreshWithNewTokens(accessToken, refreshToken): Promise<Boolean> {
    try {
      this.cleanCache();
      await this.accountsClient.storeTokens({ accessToken, refreshToken });
      await this.accountsClient.loadTokensFromStorage();
      await this.accountsClient.refreshSession();
      await this.setAuthMiddlewareToken();
      return true;
    } catch (e) {
      console.log('Failed to refresh tokens', e);
      return false;
    }
  }

  private async setAuthMiddlewareToken(): Promise<void> {
    const tokens = await this.accountsClient.tokens();
    if (tokens.accessToken) {
      const accessToken = tokens.accessToken;
      AuthorizationMiddleware.setToken(accessToken);
    }
  }

  async login(username: string, password: string): Promise<void> {
    this.cleanCache();
    await this.accountsClient.loginWithPassword({ username }, password);
    await this.setAuthMiddlewareToken();
    return;
  }

  async logout(): Promise<any> {
    this.cleanCache();
    AuthorizationMiddleware.removeToken();
    return this.accountsClient.logout();
  }

  availableProviders(): Observable<OauthProvider[]> {
    return this.apollo.query<GetAllProviders.Query>({
      query: getAllProvidersQuery
    }).
      map(res => res.data.oauthProviders);
  }


  getUser(): UserFields.Fragment {
    return this.accountsClient.user();
  }

  isUserConnected(): Boolean {
    return !!this.getUser();
  }
}
