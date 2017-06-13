import 'babel-polyfill';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import {createSchemeWithAccounts} from './schema';
import { JSAccountsContext } from '@accounts/graphql-api';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { initAccounts } from './accounts';

const PORT = 3000;
const WS_GQL_PATH = '/subscriptions';

async function main() {
  const app = express();
  app.use(cors());

  const accountsServer = await initAccounts();
  const schema = createSchemeWithAccounts(accountsServer);

  app.use('/graphql', bodyParser.json(), graphqlExpress(request => ({
    schema,
    context: JSAccountsContext(request),
    debug: true,
  })));

  app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  const server = createServer(app);

  new SubscriptionServer(
    {
      schema,
      execute,
      subscribe,
    },
    {
      path: WS_GQL_PATH,
      server,
    }
  );

  server.listen(PORT, () => {
    console.log('Mock server running on: ' + PORT);
  });
}

main().catch((e) => console.log('Failed to start mock server', e));
