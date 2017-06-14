import 'babel-polyfill';
import * as express from 'express';
import * as session from 'express-session';
import * as Grant from 'grant-express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as http from 'http';
import * as request from 'request';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { createSchemeWithAccounts } from './schema';
import { JSAccountsContext } from '@accounts/graphql-api';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';
import { initAccounts } from './accounts';
import { grantConfig } from './grant-config';
import { getUserDataFromService } from './oauth/oauth-user-data';

const PORT = 3000;
const WS_GQL_PATH = '/subscriptions';
export const GRANT_PATH = '/auth';
const STATIC_SERVER = 'http://localhost:4200';

async function main() {
  const app = express();
  app.use(cors());

  const accountsServer = await initAccounts();

  app.use(session({
    secret: 'grant',
    resave: true,
    saveUninitialized: true,
  }));

  app.use(bodyParser.urlencoded({ extended: true }));

  const grant = new Grant({
    server: {
      protocol: 'http',
      host: 'localhost:3000',
      path: '/auth',
      state: true,
    },
    facebook: {
      key: '353692268378789',
      secret: '30fa7be4ee732b4cc28c6d8acab54263',
      callback: `${GRANT_PATH}/handle_facebook_callback`,
      scope: [],
    },
    google: {
      key: '822500959137-ktt8mfq95vlvq8ogcbu4gg3paear7174.apps.googleusercontent.com',
      secret: 'PBMWy2O-739OyqTItjXP3Dzq',
      callback: `${GRANT_PATH}/handle_google_callback`,
      scope: ['openid email'],
    },
  });

  app.use(GRANT_PATH, grant);

  app.get(`${GRANT_PATH}/handle_facebook_callback`, function (req, res) {
    const accessToken = req.query.access_token;
    getUserDataFromService(accessToken, 'https://graph.facebook.com/me?fields=name&access_token==')
      .then((userData) => {
        console.log(userData);
        res.redirect(`${STATIC_SERVER}/login`);
      });
  });

  app.get(`${GRANT_PATH}/handle_google_callback`, function (req, res) {
    const accessToken = req.query.access_token;
    res.redirect(`${STATIC_SERVER}/login?service=google&access_token=${accessToken}`);
    // getUserDataFromService(accessToken, 'https://www.googleapis.com/plus/v1/people/me?access_token=')
    //   .then(async (userData: any) => {
    //     console.log(userData);
    //     let user = await accountsServer.findUserByEmail(userData.emails[0].value);
    //     if (!user) {
    //       user = {};
    //       const id = await accountsServer.createUser({
    //         username: userData.emails[0].value,
    //         email: userData.emails[0].value,
    //         profile: {
    //           name: userData.name.givenName + ' ' + userData.name.familyName,
    //           oauth: {
    //             google: userData.id,
    //           }
    //         }
    //       });
    //       user.id = id;
    //     }
    //
    //     const loginResult = await accountsServer.loginWithUser(user);
    //     console.log(loginResult);
    //     res.redirect(`${STATIC_SERVER}/login`);
    //   });
  });

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
