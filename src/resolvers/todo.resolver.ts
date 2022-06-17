import db from '../utils/db';

export const todoResolver = {
    Query: {
        todo: async (
            _source: any,
            { public_id }: any,
            { dataSources }: any,
        ) => {
            const thisOne = await db.todo.findUnique({ where: { public_id } });
            console.log(thisOne);
            return [];
            // return await db.todo.findUnique({ where: { public_id } });
            // return await dataSources.;
        },
    },
};
