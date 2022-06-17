import { ApolloServer, gql } from 'apollo-server-cloudflare';
import { graphqlCloudflare } from 'apollo-server-cloudflare/dist/cloudflareApollo';

import resolvers from '../../resolvers';
import schema from '../../schemas/schema';

import { PrismaClient } from '@prisma/client/edge';
import { DataSource } from 'apollo-datasource';

const typeDefs = gql(schema);

const createServer = (graphQLOptions: any) =>
    new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        // dataSources: () => ({
        //     store: new Store(db),
        // }),
        ...{},
    });

export default async (req: any, graphQLOptions: any) => {
    const server = createServer(graphQLOptions);
    await server.start();
    return graphqlCloudflare(() => server.createGraphQLServerOptions(req))(req);
};
