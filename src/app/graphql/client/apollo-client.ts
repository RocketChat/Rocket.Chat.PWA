import {ApolloClient, createNetworkInterface} from 'apollo-client';
import { addGraphQLSubscriptions, SubscriptionClient } from 'subscriptions-transport-ws';
import { environment } from '../../../environments/environment';

const networkInterface = createNetworkInterface({
    uri: environment.server + '/graphql'
});

const wsClient = new SubscriptionClient(environment.subscriptionServer + '/subscriptions', {
  reconnect: true,
  connectionParams: {
  }
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});

export function getClient(): ApolloClient {
  return apolloClient;
}
