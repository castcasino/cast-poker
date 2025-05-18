const frame = {
    version: 'next',
    imageUrl: `https://og-table.cast.poker/4`,
    button: {
        title: 'Watch Table #4',
        action: {
            type: 'launch_frame',
            name: 'Table — Cast Poker',
            url: `https://cast.poker/4/`,
            splashImageUrl: `https://cast.poker/splash.gif`,
            splashBackgroundColor: '#35654d',
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
            title: 'Cast Poker with Your Friends',
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
