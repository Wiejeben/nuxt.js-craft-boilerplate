export default function ({env}) {
    return {
        httpEndpoint: env.FRONTEND_URL + env.GRAPHQL_PATH,
        getAuth: () => 'Bearer ' + env.GRAPHQL_TOKEN
    };
}
