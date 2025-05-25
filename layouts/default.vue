<template>
    <main class="w-screen h-screen overflow-hidden flex flex-col justify-between bg-gradient-to-l from-slate-600 to-slate-800">
        <Header :tableid="tableid" />

        <section class="main-window w-full sm:w-[640px] mx-auto bg-gradient-to-r from-slate-50 to-slate-200 flex-1 overflow-y-scroll">
            <slot />
        </section>

        <section>
            <Navbar :tableid="tableid" />
            <Footer :tableid="tableid" />
        </section>
    </main>
</template>

<script setup lang="ts">
/* Import modules. */
import { sdk } from '@farcaster/frame-sdk'

/* Set constants. */
const SPLASH_PAGE_DELAY = 1500

/* Initialize table ID. */
const tableid = ref<number>(4)

const init = async () => {
    /* Initialize Mini App. */
    setTimeout(sdk.actions.ready, SPLASH_PAGE_DELAY)
}

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<style lang="css">
.main-window {
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */
}
.main-window::-webkit-scrollbar {
    display: none;  /* Safari and Chrome */
}
</style>
