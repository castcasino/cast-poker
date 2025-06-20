/* Initialize (default) frame embed. */
const frame = {
    version: 'next',
    imageUrl: 'https://cast.poker/poster.webp',
    button: {
        title: `Watch -n- Play Poker w/ Frens`,
        action: {
            type: 'launch_frame',
            name: `Play Real Money Hold'em w/ Frens`,
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
            title: `Cast Poker – Real Money Texas Hold'em w/ Frens`,
            meta: [
                { name: 'description', content: `Watch -n- Play on-chain hands of Texas Hold'em poker with your Farcaster frens.` },
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

    /* Set compatibility date. */
    compatibilityDate: '2025-05-25',
})
