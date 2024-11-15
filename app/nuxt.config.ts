// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    /* Application Settings */
    app: {
        /* Application Header */
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: `Cast Poker`,
            meta: [
                { name: 'description', content: `Start your next JavaScript project using Cast Poker boilerplate templates.` },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            ],
            // script: [
            //     { src: '/js/matomo.js' },
            // ],
        },
    },

    server: {
        port: process.env.PORT || 6000,
    },

    devServer: {
        port: process.env.PORT || 6000,
    },

    /* Progressive Web Application Settings */
    pwa: {
        manifest: {
            name: 'Cast Poker',
            short_name: 'Nexa Studio',
            description: `Start your next JavaScript project using Cast Poker boilerplate templates.`,
            lang: 'en',
            theme_color: '#518c96',
            background_color: '#518c96',
            // useWebmanifestExtension: false,
        },
        meta: {
            name: 'Cast Poker',
            description: `Start your next JavaScript project using Cast Poker boilerplate templates.`,
            author: `Nexa contributors`,
        },
        // icon: false, // disables the icon module
        workbox: {
            // workboxURL: 'TBD',
            // enabled: true, // FOR DEV PURPOSES ONLY
        },
    },

    /* Application Modules */
    modules: [
        /* Tailwind CSS */
        '@nuxtjs/tailwindcss',

        /* Pinia */
        '@pinia/nuxt',

        /* Internationalization for Nuxt */
        '@nuxtjs/i18n',

        /* Progressive Web Application */
        // '@kevinmarrec/nuxt-pwa',
    ],

    /* Route Rules */
    routeRules: {
        /* Add CORS headers to root. */
        // NOTE: We need this to make <token>.json available to web apps.
        '/**': { cors: true },
    },

    /* Set compatibility date. */
    compatibilityDate: '2024-11-15',
})
