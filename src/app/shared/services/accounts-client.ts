import { GraphQLClient } from '@accounts/graphql-client';
import { AccountsClient, config } from '@accounts/client';
import { userFieldsFragment } from '../../graphql/queries/user.fragment';
import { getApolloClient } from '../../graphql/client/apollo-client';
import { store } from '../common/store';

const client = getApolloClient();
const graphQLInterface = new GraphQLClient({
  graphQLClient: client,
  userFieldsFragment,
});

const accountsClient = new AccountsClient({
  tokenStorage: localStorage,
  reduxStoreKey: 'accounts',
  store,
  onSignedOutHook: () => null,
  onEnrollAccountHook: () => null,
  onResetPasswordHook: () => null,
  onVerifyEmailHook: () => null,
  onSignedInHook: () => null,
}, graphQLInterface);

export function getAccountsClient() {
  return accountsClient;
}

