import {ApolloClient, createNetworkInterface} from 'apollo-client';
import { environment } from '../../../environments/environment';

// TODO add subscriptions and consider using batching network interface
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: environment.server + '/graphql',
  }),
});

export function getClient(): ApolloClient {
  return client;
}
