<template>
    <section class="container">
        <v-logo/>

        <h1>Welcome!</h1>
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
                metaInfo: await app.meta(route)
            }
        },

        head() {
            return this.metaInfo
        }
    }
</script>

