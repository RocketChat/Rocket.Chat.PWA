import * as express from 'express';
import * as bodyParser from 'body-parser';
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';
import Schema from './schema';

const PORT = 3000;

const executableSchema = makeExecutableSchema({
  typeDefs: Schema,
  logger: { log: (e) => console.log(e) },
});
// Add mocks, modifies schema in place
addMockFunctionsToSchema({ schema: executableSchema });

const app = express();
app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema : executableSchema,
  debug : true,
}));
app.use('/graphiql', graphiqlExpress({
  endpointURL : '/graphql',
}));

app.listen(PORT, () => console.log('Mock server running on: ' + PORT));
