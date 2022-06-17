import db from '../utils/db';
import valid from '../utils/schemaValidation';

import { todoQueryArgs, todoQuerySchema } from '../schemas/todo.schema';

export const todoResolver = {
    Query: {
        todo: async (_: any, input: todoQueryArgs) => {
            valid(input, todoQuerySchema);

            return await db.todo.findUnique({ where: { id: input.id } });
        },
    },
};
