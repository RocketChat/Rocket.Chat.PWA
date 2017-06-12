import {ApolloClient, createNetworkInterface} from 'apollo-client';
import { addGraphQLSubscriptions, SubscriptionClient } from 'subscriptions-transport-ws';
import { environment } from '../../../environments/environment';
import { AuthorizationMiddleware } from '../../shared/services/authorization-middleware';

const networkInterface = createNetworkInterface({
    uri: environment.server + '/graphql'
});
networkInterface.use([new AuthorizationMiddleware()]);

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

export function getApolloClient(): ApolloClient {
  return apolloClient;
}
