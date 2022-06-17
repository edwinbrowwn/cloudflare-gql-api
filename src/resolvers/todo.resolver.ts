import { PrismaClient } from '@prisma/client';

export const todoResolver = {
    Query: {
        pokemon: async (
            _source: any,
            { public_id }: any,
            { dataSources }: PrismaClient,
        ) => {
            console.log(public_id);
            return [];
            // return await dataSources.;
        },
    },
};
