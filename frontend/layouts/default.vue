<template>
    <div>
        <v-navigation/>
        <nuxt/>
        <v-footer/>
    </div>
</template>

<script>
    import Navigation from '~/components/Navigation.vue';
    import Footer from '~/components/Footer.vue';

    export default {
        components: {
            'v-navigation': Navigation,
            'v-footer': Footer,
        }
    }
</script>

<style>
    body {
        @apply font-sans
    }
</style>
