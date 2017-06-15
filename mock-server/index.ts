import 'babel-polyfill';
import * as express from 'express';
import * as session from 'express-session';
import * as Grant from 'grant-express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { createSchemeWithAccounts } from './schema';
import { JSAccountsContext } from '@accounts/graphql-api';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { initAccounts } from './accounts';
import { initializeOAuthResolver } from './oauth/oauth-service';
import { GRANT_PATH, grantConfig } from './oauth/grant-config';
import AccountsServer from '@accounts/server';

const PORT = 3000;
const WS_GQL_PATH = '/subscriptions';
const STATIC_SERVER = 'http://localhost:4200';

async function main() {
  const app = express();
  app.use(cors());

  await initAccounts();

  app.use(session({
    secret: 'grant',
    resave: true,
    saveUninitialized: true,
  }));

  app.use(bodyParser.urlencoded({ extended: true }));

  const grant = new Grant(grantConfig);

  app.use(GRANT_PATH, grant);

  app.get(`${GRANT_PATH}/handle_facebook_callback`, function (req, res) {
    const accessToken = req.query.access_token;
    res.redirect(`${STATIC_SERVER}/login?service=facebook&access_token=${accessToken}`);
  });

  app.get(`${GRANT_PATH}/handle_google_callback`, function (req, res) {
    const accessToken = req.query.access_token;
    res.redirect(`${STATIC_SERVER}/login?service=google&access_token=${accessToken}`);
  });

  initializeOAuthResolver();

  const schema = createSchemeWithAccounts(AccountsServer);

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
