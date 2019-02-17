<template>
    <section class="container">
        <v-logo/>

        <h1>Welcome!</h1>

        <nuxt-link to="/news">Go to the news page</nuxt-link>
    </section>
</template>

<script>
    import Logo from '~/components/Logo.vue';

    export default {
        components: {
            'v-logo': Logo
        },

        async asyncData({app, route}) {
            return {
                _metaInfo: await app.meta(route)
            }
        },

        head() {
            return this._metaInfo
        }
    }
</script>

