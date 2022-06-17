import { ApolloError } from 'apollo-server-errors';

export default (data: any, schema: any) => {
    try {
        schema.parse(data);
    } catch (err: any) {
        if (err.name === 'ZodError') {
            throw new ApolloError(err.message, 'MY_ERROR_CODE');
        }
        console.log(err.name);
    }
};
