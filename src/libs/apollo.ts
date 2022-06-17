import { ApolloServer, gql } from 'apollo-server-cloudflare';
import { graphqlCloudflare } from 'apollo-server-cloudflare/dist/cloudflareApollo';
import schema from '../schemas/schema';

// Resolvers
import { todoResolver } from '../resolvers/todo.resolver';

const typeDefs = gql(schema);
const resolvers = { ...todoResolver };

const createServer = (graphQLOptions: any) =>
    new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        ...{},
    });

export default async (req: any, graphQLOptions: any) => {
    const server = createServer(graphQLOptions);
    await server.start();
    return graphqlCloudflare(() => server.createGraphQLServerOptions(req))(req);
};
