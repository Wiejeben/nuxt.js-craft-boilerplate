<template>
    <div class="container">
        <h1 v-if="error.statusCode === 404" class="text-3xl font-bold">Page not found</h1>
        <h1 v-else class="text-3xl font-bold">An error occurred</h1>
        <nuxt-link to="/" class="underline hover:no-underline">Home page</nuxt-link>
    </div>
</template>

<script>
    export default {
        props: {
            error: {
                type: Object,
                required: true,
            }
        }
    }
</script>
