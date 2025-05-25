<template>
    <main class="bg-white">
        <div class="w-full p-10 flex items-center justify-center">
            <p class="text-2xl tracking-wider text-stone-500">
                Redirecting you to a random table...
            </p>
        </div>

        <pre class="p-10">is this a Mini App? {{isMiniApp}}</pre>
    </main>
</template>

<script setup lang="ts">
useHead({
    title: 'Cast Poker — Casual Blockchain Gaming',
    meta: [
        { name: 'description', content: 'Cast Poker offers a premium blockchain gaming experience for Players over 18+.' }
    ],
})

import { sdk } from '@farcaster/frame-sdk'

const isMiniApp = ref(null)

const init = async () => {
    /* Request Mini App flag. */
    isMiniApp.value = await sdk.isInMiniApp()
console.log('isMiniApp', isMiniApp.value)
}

onMounted(() => {
    console.log('Mounted!')

    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>
