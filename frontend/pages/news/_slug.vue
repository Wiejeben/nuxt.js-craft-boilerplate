<template>
    <div v-if="article">
        <h1>{{ article.title }}</h1>
        <nuxt-link to="/news">Go to the news page</nuxt-link>
    </div>
</template>

<script>
    import meta from "~/plugins/page-meta.mixin.js";
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
        mixins: [meta],

        apollo: {
            article: {
                query,
                variables() {
                    return {slug: this.$route.params.slug}
                }
            }
        },
    }
</script>
