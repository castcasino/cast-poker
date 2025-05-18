<template>
    <main class="w-full bg-white">
        <!-- Insert here -->
    </main>
</template>

<script setup lang="ts">
/* Initialize route. */
const route = useRoute()

// FIXME Validate table ID -- redirect if needed

/* Initialize table ID. */
const tableid = ref<number>(Number(route.params.tableid))

/* Build frame embed. */
const frame = {
    version: 'next',
    imageUrl: `https://og-table.cast.poker/${tableid.value}`,
    button: {
        title: `PAGE_TITLE`,
        action: {
            type: 'launch_frame',
            name: `PAGE_NAME`,
            url: `https://cast.poker/${tableid.value}/PAGE_STUB/`,
            splashImageUrl: `https://cast.poker/splash.gif`,
            splashBackgroundColor: '#cd98f9',
        },
    },
}

/* Set page title + meta tags. */
useHead({
    title: 'PAGE_TITLE — Cast Poker',
    meta: [
        { name: 'description', content: 'Cast Poker offers a premium blockchain gaming experience for Players over 18+.' },
        { name: 'fc:frame', content: JSON.stringify(frame) },
    ],
})

const isShowingQ1 = ref<boolean>(false)
const isShowingQ2 = ref<boolean>(false)
</script>
