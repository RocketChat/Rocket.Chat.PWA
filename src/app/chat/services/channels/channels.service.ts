import { Injectable } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ChannelByNameQuery, DirectChannelQuery, MyChannelsQuery } from '../../../graphql/types/types';
import { AuthenticationService } from '../../../shared/services/authentication.service';
import { myChannelsQuery } from '../../../graphql/queries/my-channels.query';
import { channelByNameQuery } from '../../../graphql/queries/channel-by-name.query';
import { directChannelQuery } from '../../../graphql/queries/direct-channel.query';

@Injectable()
export class ChannelsService {

  constructor(private apollo: Apollo,
              private authenticationService: AuthenticationService) {
  }

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

  getChannelByName(channelName: string): ApolloQueryObservable<ChannelByNameQuery.Result> {
    return this.apollo.watchQuery<ChannelByNameQuery.Result>({
      query: channelByNameQuery,
      variables: { name: channelName },
      fetchPolicy: 'cache-and-network',
    });
  }

  getDirectChannelByUsername(username: string): ApolloQueryObservable<DirectChannelQuery.Result> {
    return this.apollo.watchQuery<DirectChannelQuery.Result>({
      query: directChannelQuery,
      variables: { username },
      fetchPolicy: 'cache-and-network',
    });

  }

}
