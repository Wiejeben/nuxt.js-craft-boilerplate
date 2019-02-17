import axios from 'axios';

const pkg = require('./package');
require('dotenv').config();
const consola = require('consola');


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
     * Global CSS
     */
    css: ['~/assets/css/tailwind.css'],

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
        '@nuxtjs/redirect-module',
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
        '/robots.txt': process.env.BACKEND_URL,
        '/humans.txt': process.env.BACKEND_URL,
        '/sitemaps_*.xml': process.env.BACKEND_URL,
    },

    /**
     * Redirect module configuration
     */
    redirect: async () => {
        consola.info('Fetching redirects');
        const {data} = await axios.get(process.env.BACKEND_URL + '/actions/module/redirect');
        return [
            ...data,
            {from: '/admin', to: process.env.BACKEND_URL + '/admin'},
        ];
    },

    /**
     * Apollo module configuration
     */
    apollo: {
        errorHandler(error) {
            consola.error(error);
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
     * Build configuration
     */
    build: {
        extractCSS: true,

        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {

        }
    }
};
