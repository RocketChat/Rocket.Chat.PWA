import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import schema from './schema';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';

const PORT = 3000;
const WS_GQL_PATH = '/subscriptions';

const app = express();
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema,
  debug: true,
}));

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
