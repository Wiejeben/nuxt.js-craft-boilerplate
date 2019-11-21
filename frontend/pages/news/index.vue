<template>
    <section class="container" v-if="entry">
        <h1 class="text-3xl font-bold">{{ entry.title }}</h1>

        <v-articles/>
    </section>
</template>

<script>
    import Articles from "~/components/Articles.vue";
    import meta from "~/plugins/page-meta.mixin.js";
    import gql from 'graphql-tag';

    export const query = gql`{
        entry(section: [newsIndex]) {
            ... on NewsIndex {
                title
            }
        }
    }`;

    export default {
        mixins: [meta],

        components: {
            'v-articles': Articles
        },

        apollo: {
            entry: query
        }
    }
</script>
