/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import apollo from './libs/apollo';
import playground from './libs/playground';
import setCors from './utils/setCors';

const graphQLOptions: any = {
    // Set the path for the GraphQL server
    baseEndpoint: '/',

    // Set the path for the GraphQL playground
    // This option can be removed to disable the playground route
    playgroundEndpoint: '/___graphql',

    // When a request's path isn't matched, forward it to the origin
    forwardUnmatchedRequestsToOrigin: false,

    // Enable debug mode to return script errors directly in browser
    debug: true,

    // Enable CORS headers on GraphQL requests
    // Set to `true` for defaults (see `utils/setCors`),
    // or pass an object to configure each header
    cors: true,
    // cors: {
    //   allowCredentials: 'true',
    //   allowHeaders: 'Content-type',
    //   allowOrigin: '*',
    //   allowMethods: 'GET, POST, PUT',
    // },

    // Enable KV caching for external REST data source requests
    // Note that you'll need to add a KV namespace called
    // WORKERS_GRAPHQL_CACHE in your wrangler.toml file for this to
    // work! See the project README for more information.
    kvCache: false,
};

export interface Env {
    // Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
    // MY_KV_NAMESPACE: KVNamespace;
    //
    // Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
    // MY_DURABLE_OBJECT: DurableObjectNamespace;
    //
    // Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
    // MY_BUCKET: R2Bucket;
}

export default {
    async fetch(
        request: Request,
        env: Env,
        ctx: ExecutionContext,
    ): Promise<Response> {
        const url = new URL(request.url);
        try {
            if (url.pathname === graphQLOptions.baseEndpoint) {
                const response: any =
                    request.method === 'OPTIONS'
                        ? new Response('', { status: 204 })
                        : await apollo(request);
                if (graphQLOptions.cors) {
                    setCors(response, graphQLOptions.cors);
                }
                return response;
            } else if (
                graphQLOptions.playgroundEndpoint &&
                url.pathname === graphQLOptions.playgroundEndpoint
            ) {
                return playground(request, graphQLOptions);
            } else if (graphQLOptions.forwardUnmatchedRequestsToOrigin) {
                return fetch(request);
            } else {
                return new Response('Not found', { status: 404 });
            }
        } catch (err) {
            // @ts-ignore
            return new Response(
                // @ts-ignore
                graphQLOptions.debug ? err : 'Something went wrong',
                {
                    status: 500,
                },
            );
        }
        // return new Response("Hello World!");
    },
};
