<template>
    <section class="container" v-if="entry">
        <h1>{{ entry.title }}</h1>

        <v-articles/>
    </section>
</template>

<script>
    import Articles from '~/components/Articles.vue';
    import gql from 'graphql-tag';

    export const query = gql`{
        entry(section: [newsIndex]) {
            ... on NewsIndex {
                title
            }
        }
    }`;

    export default {
        components: {
            'v-articles': Articles
        },

        apollo: {
            entry: query
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
