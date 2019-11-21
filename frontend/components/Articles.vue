<template>
    <div>
        <div v-if="!entries">
            Laden...
        </div>
        <div v-else>
            <article v-for="article in articles">
                <h2 class="text-2xl font-bold">{{ article.title }}</h2>

                <div class="mt-5">
                    <div v-html="article.body.content"></div>

                    <nuxt-link :to="article.uri" class="underline hover:no-underline">Read More!</nuxt-link>
                </div>
            </article>

            <button v-if="this.entries.pageInfo.hasNextPage" @click="next">Next</button>
        </div>
    </div>
</template>

<script>
    import gql from 'graphql-tag';

    export const query = gql`query articles($limit: Int!, $offset: Int) {
        entries: entriesConnection(section: [news], limit: $limit, offset: $offset) {
            pageInfo {
                hasNextPage
                currentPage
            }
            edges {
                node {
                    ... on News {
                        title
                        uri
                        body {
                            content
                        }
                    }
                }
            }
          }
    }`;

    export default {
        data: () => ({
            limit: 2,
        }),

        computed: {
            articles() {
                return this.entries.edges.map(edge => edge.node);
            }
        },

        apollo: {
            entries: {
                query,
                variables() {
                    return {
                        limit: this.limit,
                    }
                }
            }
        },

        methods: {
            /**
             * Load next page
             */
            async next() {
                this.apolloAppend('entries', {
                    limit: this.limit,
                    offset: this.limit * this.entries.pageInfo.currentPage,
                });
            }
        }
    }
</script>
