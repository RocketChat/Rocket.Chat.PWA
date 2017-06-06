import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MyChannelsQuery } from '../../../graphql/types/types';
import { AuthenticationService } from '../../../shared/services/authentication.service';

const getMyChannelsQuery = require('graphql-tag/loader!../../../graphql/queries/my-channels.query.graphql');
@Injectable()
export class ChannelsService {

  constructor(private apollo: Apollo,
              private authenticationService: AuthenticationService) { }

  getMyChannels() {
    const user: any = this.authenticationService.getUser() || {};
    const variables: MyChannelsQuery.Variables = {
      userId: user.username
    };
    return this.apollo.watchQuery<MyChannelsQuery.Result>({query: getMyChannelsQuery, variables});
  }

}
