import 'babel-polyfill';
import * as express from 'express';
import * as session from 'express-session';
import * as Grant from 'grant-express';
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
  app.use(session({
    secret: 'grant',
    resave: true,
    saveUninitialized: true,
  }));

  const grant = new Grant({

    server: {
      protocol: 'http',
      host: 'localhost:3000',
      path: '/auth',
    },
    facebook: { // https://graph.facebook.com/me?fields=name&access_token=
      key: '353692268378789',
      secret: '30fa7be4ee732b4cc28c6d8acab54263',
      callback: '/auth/handle_facebook_callback',
      scope: [],
    },
    google: { // https://www.googleapis.com/plus/v1/people/me?access_token=
      key: '822500959137-ktt8mfq95vlvq8ogcbu4gg3paear7174.apps.googleusercontent.com',
      secret: 'PBMWy2O-739OyqTItjXP3Dzq',
      callback: '/auth/handle_google_callback',
      scope: ['openid email profile'],
    },
  });

  app.get('/auth/handle_facebook_callback', function (req, res) {
    console.log(req.query);
    const accessToken = req.query.access_token;
    res.end(JSON.stringify(req.query, null, 2));
  });

  app.get('/auth/handle_google_callback', function (req, res) {
    console.log(req.query);
    const accessToken = req.query.access_token;
    res.end(JSON.stringify(req.query, null, 2));
  });

  app.use('/auth', grant);

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
