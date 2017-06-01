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

const PORT = 3000;
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

app.listen(PORT, () => console.log('Mock server running on: ' + PORT));


const server = createServer(app);
server.listen(PORT);
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
