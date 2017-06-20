import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { loginWithServiceAccessTokenMutation } from '../../graphql/queries/login-with-service-access-token';
import { LoginWithServiceAccessTokenMutation } from '../../graphql/types/types';
import { ApolloQueryResult } from 'apollo-client';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginPageService {
  constructor(private apollo: Apollo) {
  }

  // tslint:disable-next-line
  loginWithServiceAccessToken(service: string, accessToken: string): Observable<ApolloQueryResult<LoginWithServiceAccessTokenMutation.Result>> {
    return this.apollo.mutate({
      mutation: loginWithServiceAccessTokenMutation,
      variables: {
        service,
        accessToken,
      },
    });
  }
}
