import { getApolloClient } from '../../graphql/client/apollo-client';
import { GraphQLClient } from '@accounts/graphql-client';
import { AccountsClient, config } from '@accounts/client';
import { userFieldsFragment } from '../../graphql/queries/user.fragment';

const client = getApolloClient();
const graphQLInterface = new GraphQLClient({
  graphQLClient: client,
  userFieldsFragment,
});

const accountsClient = new AccountsClient({
  tokenStorage: localStorage,
  reduxStoreKey: config.reduxStoreKey,
  onSignedOutHook: () => null,
  onEnrollAccountHook: () => null,
  onResetPasswordHook: () => null,
  onVerifyEmailHook: () => null,
  onSignedInHook: () => null,
}, graphQLInterface);

export function getAccountsClient(){
 return accountsClient;
}

