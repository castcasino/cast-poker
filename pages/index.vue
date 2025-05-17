<template>
    <main class="bg-white">
        <Table v-if="screenid === 'table'" :tableid="tableid" />

        <!-- {screenid === 'agent' && <Agent tableid={tableid} />}
        {screenid === 'fairplay' && <Fairplay tableid={tableid} />}
        {screenid === 'faq' && <Faq tableid={tableid} />}
        {screenid === 'host' && <Host tableid={tableid} />}
        { && <Table tableid={tableid} />}
        {screenid === 'mysuite' && <MySuite tableid={tableid} />}
        {screenid === 'lounge' && <Lounge tableid={tableid} />}
        {screenid === 'share' && <Share tableid={tableid} />}
        {screenid === 'concierge' && <Concierge tableid={tableid} />} -->

    </main>
</template>

<script setup lang="ts">
useHead({
    title: 'Cast Poker — Casual Blockchain Gaming',
    meta: [
        { name: 'description', content: 'Cast Poker offers a premium blockchain gaming experience for Players over 18+.' }
    ],
})

const screenid = ref<string>('table')
const tableid = ref<number>(4)
</script>
