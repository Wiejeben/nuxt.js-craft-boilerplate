<template>
    <ul>
        <li v-for="link in navigation" :key="link.id"><nuxt-link :to="link.href" class="underline hover:no-underline">{{ link.title }}</nuxt-link></li>
    </ul>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState(['navigation'])
        }
    }
</script>
