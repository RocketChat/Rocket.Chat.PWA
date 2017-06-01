import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import schema from './schema';
import {CHAT_MESSAGE_SUBSCRIPTION_TOPIC} from './schema';
import {pubsub} from './subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { createServer } from 'http';

const port = 3000;
const SubscriptionServerPort = port + 10;
const WS_GQL_PATH = '/subscriptions';

const app = express();
app.use(cors());
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: schema,
  debug: true,
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  subscriptionsEndpoint: `/graphql-sub`,
}));


app.listen(port, () => console.log('Mock server running on: ' + port));
const server = createServer(app);
server.listen(SubscriptionServerPort, () => {
  console.log('Mock subscription server running on: ' + SubscriptionServerPort);
});
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




pubsub.publish(CHAT_MESSAGE_SUBSCRIPTION_TOPIC, {
  chatMessageAdded: {
    id: '1',
    content: 'Hello!',
    author: {
      username: 'tomer',
    },
    creationTime: '1999191919',
    channel: {
      id: '1',
      title: 'kentak',
    }
  }
});
