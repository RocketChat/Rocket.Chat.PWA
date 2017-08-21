import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MyChannelsQuery } from '../../../graphql/types/types';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { myChannelsQuery } from '../../../graphql/queries/my-channels.query';

@Injectable()
export class ChannelsService {

  constructor(private apollo: Apollo,
              private authenticationService: AuthenticationService) { }

  getMyChannels() {
    const user: any = this.authenticationService.getUser() || {};
    const variables: MyChannelsQuery.Variables = {
      userId: user.id
    };

    return this.apollo.watchQuery<MyChannelsQuery.Result>({
      query: myChannelsQuery,
      variables,
      fetchPolicy: 'cache-and-network',
    });
  }

}
