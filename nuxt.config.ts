/* Initialize (default) frame embed. */
const frame = {
    version: 'next',
    imageUrl: 'https://cast.poker/poster.webp',
    button: {
        title: 'Watch -n- Play Poker w/ Frens',
        action: {
            type: 'launch_frame',
            name: 'Cast Poker – Play with Frens',
            url: `https://cast.poker/`,
            splashImageUrl: `https://cast.poker/splash.gif`,
            splashBackgroundColor: '#cd98f9',
        },
    },
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    /* Application Settings */
    app: {
        /* Application Header */
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: 'Cast Poker – Play with Frens',
            meta: [
                { name: 'description', content: `Play Texas Hold'em poker in the ONLY provably fair casino built on Farcaster.` },
                { name: 'fc:frame', content: JSON.stringify(frame) },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ],
        },
    },

    /* Application Modules */
    modules: [
        /* Tailwind CSS */
        '@nuxtjs/tailwindcss',

        /* Pinia */
        '@pinia/nuxt',
    ],

    /* Route Rules */
    routeRules: {
        /* Disable server-side rendering for Admin area. */
        '/manager/**': { ssr: false },

        /* Add CORS headers to API. */
        '/v1/**': { cors: true },
    },

    /* Set compatibility date. */
    compatibilityDate: '2025-03-15',
})
