import Vue from 'vue';
import _ from 'lodash';

export default ({app, $axios}) => {
    /**
     * Adds global meta method to context.app to get metadata on the current URI
     */
    app.meta = async (route) => {
        const seo = await $axios.$get('/actions/seomatic/meta-container/all-meta-containers?asArray=true&uri=' + route.fullPath);

        return {
            title: seo.MetaTitleContainer.title.title,
            meta: _.flatten(_.values(seo.MetaTagContainer)),
            link: _.flatten(_.values(seo.MetaLinkContainer)),
            script: _.map(seo.MetaJsonLdContainer, (value) => {
                return {type: 'application/ld+json', innerHTML: JSON.stringify(value)}
            }),
            __dangerouslyDisableSanitizers: ['script'],
        }
    };
}

Vue.mixin({
    methods: {
        /**
         * Adds global Vue method to fetch more elements via Apollo
         */
        apolloAppend(query, variables) {
            this.$apollo.queries[query].fetchMore({
                variables,

                updateQuery(previousResult, {fetchMoreResult}) {
                    return {
                        entries: {
                            ...fetchMoreResult[query],

                            // Merge new result with previous result
                            edges: [
                                ...previousResult[query].edges,
                                ...fetchMoreResult[query].edges
                            ],
                        },
                    }
                }
            });
        }
    }
});
