import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { UserDataQuery } from '../../../graphql/types/types';
import { userDataQuery } from '../../../graphql/queries/user-data.query';

@Injectable()
export class UserDataService {

  constructor(private apollo: Apollo) {}

  // TODO change to get the data from js accounts
  getUserData() {
    return this.apollo.watchQuery<UserDataQuery.Result>({query: userDataQuery});
  }
}
