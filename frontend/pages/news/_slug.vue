<template>
    <div v-if="article">
        <h1>{{ article.title }}</h1>
        <nuxt-link to="/news">Go to the news page</nuxt-link>
    </div>
</template>

<script>
    import gql from "graphql-tag";

    export const query = gql`query getArticle($slug: String!) {
        article: entry(section: [news], slug: $slug) {
            ... on News {
                title
                uri
                body {
                    totalPages
                    content
                }
            }
        }
    }`;

    export default {
        apollo: {
            article: {
                query,
                variables() {
                    return {slug: this.$route.params.slug}
                }
            }
        },

        async asyncData({app, route}) {
            return {
                metaInfo: await app.meta(route)
            }
        },

        head() {
            return this.metaInfo
        }
    }
</script>
