import { Injectable } from '@angular/core';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';

import { ChannelByName, DirectChannel, MyChannels } from '../../graphql/types/types';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { myChannelsQuery } from '../../graphql/queries/my-channels.query';
import { channelByNameQuery } from '../../graphql/queries/channel-by-name.query';
import { directChannelQuery } from '../../graphql/queries/direct-channel.query';

@Injectable()
export class ChannelsService {

  constructor(private apollo: Apollo,
              private authenticationService: AuthenticationService) {
  }

  getMyChannels() {
    const user: any = this.authenticationService.getUser() || {};
    const variables: MyChannels.Variables = {
      userId: user.id
    };

    return this.apollo.watchQuery<MyChannels.Query>({
      query: myChannelsQuery,
      variables,
      fetchPolicy: 'cache-and-network',
    });
  }

  getChannelByName(channelName: string): ApolloQueryObservable<ChannelByName.Query> {
    return this.apollo.watchQuery<ChannelByName.Query>({
      query: channelByNameQuery,
      variables: { name: channelName },
      fetchPolicy: 'cache-and-network',
    });
  }

  getDirectChannelByUsername(username: string): ApolloQueryObservable<DirectChannel.Query> {
    return this.apollo.watchQuery<DirectChannel.Query>({
      query: directChannelQuery,
      variables: { username },
      fetchPolicy: 'cache-and-network',
    });

  }

}
