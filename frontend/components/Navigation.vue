<template>
    <ul>
        <li v-for="link in navigation" :key="link.id"><nuxt-link :to="link.href">{{ link.title }}</nuxt-link></li>
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
