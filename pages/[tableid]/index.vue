<template>
    <main class="bg-white">
        <Table v-if="screenid === 'table'" :tableid="tableid" />

        <!--
        {screenid === 'agent' && <Agent tableid={tableid} />}
        {screenid === 'fairplay' && <Fairplay tableid={tableid} />}
        {screenid === 'faq' && <Faq tableid={tableid} />}
        {screenid === 'host' && <Host tableid={tableid} />}
        {screenid === 'mysuite' && <MySuite tableid={tableid} />}
        {screenid === 'lounge' && <Lounge tableid={tableid} />}
        {screenid === 'share' && <Share tableid={tableid} />}
        {screenid === 'concierge' && <Concierge tableid={tableid} />}
        -->
    </main>
</template>

<script setup lang="ts">
const DEFAULT_TABLE_ID = 1337

const route = useRoute()
console.log(route.params)

const screenid = ref<string>('table')
const tableid = ref<number>(Number(route.params.tableid) || DEFAULT_TABLE_ID)
console.log('TABLE ID', tableid.value)

const frame = {
    version: 'next',
    imageUrl: `https://og-table.cast.poker/${tableid}`,
    button: {
        title: `Watch Table #${tableid}`,
        action: {
            type: 'launch_frame',
            name: `Table #${tableid} — Cast Poker`,
            url: `https://cast.poker/${tableid}/`,
            splashImageUrl: `https://cast.poker/splash.gif`,
            splashBackgroundColor: '#35654d',
        },
    },
}

useHead({
    title: 'Cast Poker — Casual Blockchain Gaming',
    meta: [
        { name: 'description', content: 'Cast Poker offers a premium blockchain gaming experience for Players over 18+.' },
        { name: 'fc:frame', content: JSON.stringify(frame) },
    ],
})
</script>
