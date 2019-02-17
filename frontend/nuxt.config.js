const pkg = require('./package');
import axios from 'axios';

require('dotenv').config()

module.exports = {
    mode: 'universal',

    /**
     * Headers of the page
     */
    head: {
        title: pkg.name,
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    /**
     * Customize the progress-bar color
     */
    loading: {color: '#000'},

    /**
     * TODO: Global CSS
     */
    css: [
        // '~/assets/css/tailwind.css'
    ],

    /**
     * Plugins to load before mounting the App
     */
    plugins: [
        '~/plugins/vue-inject.js',
        '~/plugins/axios.js'
    ],

    /**
     * Nuxt.js modules
     */
    modules: [
        '@nuxtjs/apollo',
        '@nuxtjs/axios',
        '@nuxtjs/dotenv',
        '@nuxtjs/proxy',
        '@nuxtjs/redirect-module'
    ],

    /**
     * Axios module configuration
     */
    axios: {
        proxy: true
    },

    /**
     * Proxy module configuration
     */
    proxy: {
        '/graphql': process.env.BACKEND_URL,
        '/actions': process.env.BACKEND_URL,
    },

    /**
     * Redirect module configuration
     */
    redirect: async () => {
        const {data} = await axios.get(process.env.BACKEND_URL + '/actions/module/redirect');
        return data;
    },

    /**
     * Apollo module configuration
     */
    apollo: {
        errorHandler(error) {
            console.error('Apollo -', error.message)
        },
        clientConfigs: {
            default: '~/plugins/apollo-config.js',
        }
    },

    /**
     * Nuxt.js generate configuration
     */
    generate: {
        routes: async () => {
            const {data} = await axios.post(
                process.env.BACKEND_URL + process.env.GRAPHQL_PATH,
                {query: '{entries(section: []) {uri}}'},
                {headers: {'Authorization': 'Bearer ' + process.env.GRAPHQL_TOKEN}},
            );
            return data.data.entries.map(entry => '/' + entry.uri);
        }
    },

    /**
     * TODO: Build configuration
     */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {

        }
    }
};
