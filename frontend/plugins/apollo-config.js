const {IntrospectionFragmentMatcher, InMemoryCache} = require('apollo-cache-inmemory');
const introspectionQueryResultData = require('./../fragmentTypes.json');

export default function ({env}) {

    // Add support for matrix
    const fragmentMatcher = new IntrospectionFragmentMatcher({
        introspectionQueryResultData
    });

    return {
        httpEndpoint: env.FRONTEND_URL + env.GRAPHQL_PATH,
        getAuth: () => (env.GRAPHQL_TOKEN) ? 'Bearer ' + env.GRAPHQL_TOKEN : null,
        cache: new InMemoryCache({fragmentMatcher})
    };
}
