<template>
    <main class="bg-white">
        <div class="w-full p-10 flex items-center justify-center">
            <p class="text-2xl tracking-wider text-stone-500">
                Redirecting you to a random table...
            </p>
        </div>

        <pre class="p-10">is this a Mini App? {{isMiniApp}}</pre>

        <section class="p-10">
            <h2>App Context</h2>
            <pre class="p-5 bg-amber-100 border border-amber-300">{{JSON.stringify(ctx, null, 2)}}</pre>
        </section>
    </main>
</template>

<script setup lang="ts">
/* Import modules. */
import { sdk } from '@farcaster/frame-sdk'

useHead({
    title: 'Cast Poker — Casual Blockchain Gaming',
    meta: [
        { name: 'description', content: 'Cast Poker offers a premium blockchain gaming experience for Players over 18+.' }
    ],
})

/* Initialize local handlers. */
const ctx = ref(null)
const isMiniApp = ref(null)

const init = async () => {
    /* Request Mini App flag. */
    isMiniApp.value = await sdk.isInMiniApp()
console.log('isMiniApp', isMiniApp.value)

    /* Set app context. */
    ctx.value = sdk.context
console.log('MINI APP CONTEXT', ctx.value)
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
