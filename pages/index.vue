<template>
    <main class="bg-white">
        <div class="w-full p-10 flex items-center justify-center">
            <p class="text-2xl tracking-wider text-stone-500">
                Redirecting you to a random table...
            </p>
        </div>

        <pre class="p-10">is this a Mini App? {{isMiniApp}}</pre>

        <pre v-if="user" class="p-10">{{JSON.stringify(user, null, 2)}}</pre>

        <pre v-if="location" class="p-10">{{JSON.stringify(location, null, 2)}}</pre>

        <pre v-if="client" class="p-10">{{JSON.stringify(client, null, 2)}}</pre>

        <pre v-if="jwt" class="text-xs">{{jwt}}</pre>
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
const jwt = ref(null)
const user = ref(null)
const location = ref(null)
const client = ref(null)

const isMiniApp = ref(null)

const init = async () => {
    /* Request Mini App flag. */
    isMiniApp.value = await sdk.isInMiniApp()

    /* Validate Mini App. */
    if (isMiniApp) {
        /* Request app context. */
        const context = await sdk.context

// FIXME FOR DEBUGGING ONLY
ctx.value = context

        /* Assign user. */
        user.value = context.user

        /* Assign location. */
        location.value = context.location

        /* Assign client. */
        client.value = context.client

        /* Auto-authorize user. */
        await auth()
    }
}

const auth = async () => {
    /* Make (quick) authorization request. */
    const { token } = await sdk.experimental.quickAuth()

    // TODO SAVE TO SESSION

// FIXME FOR DEBUGGING ONLY
    jwt.value = token
}

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>
