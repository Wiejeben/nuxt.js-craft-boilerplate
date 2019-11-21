<template>
    <section class="container">
        <v-logo/>

        <h1 class="text-3xl font-bold">Welcome!</h1>
    </section>
</template>

<script>
    import meta from "~/plugins/page-meta.mixin.js";
    import Logo from '~/components/Logo.vue';


    export default {
        mixins: [meta],

        components: {
            'v-logo': Logo
        }
    }
</script>

