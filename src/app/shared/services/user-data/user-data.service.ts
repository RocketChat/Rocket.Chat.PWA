import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { UserDataQuery } from '../../../graphql/types/types';

const getUserDataQuery = require('graphql-tag/loader!../../../graphql/queries/user-data.query.graphql');
@Injectable()
export class UserDataService {

  constructor(private apollo: Apollo) {}

  // TODO change to get the data from js accounts
  getUserData() {
    return this.apollo.watchQuery<UserDataQuery.Result>({query: getUserDataQuery});
  }
}
