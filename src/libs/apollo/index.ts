import { ApolloServer, gql } from 'apollo-server-cloudflare';
import { graphqlCloudflare } from 'apollo-server-cloudflare/dist/cloudflareApollo';
import { PrismaClient } from '@prisma/client/edge';

import resolvers from '../../resolvers';
import schema from '../../schemas/schema';

const db = new PrismaClient();

const dataSources = () => ({
    db: db as PrismaClient,
});
const typeDefs = gql(schema);

const createServer = () =>
    new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        dataSources,
        ...{},
    });

export default async (req: any) => {
    const server = createServer();
    await server.start();
    return graphqlCloudflare(() => server.createGraphQLServerOptions(req))(req);
};
