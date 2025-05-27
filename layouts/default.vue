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

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useSystemStore } from '@/stores/system'
const Profile = useProfileStore()
const System = useSystemStore()

onBeforeMount(() => {
    // TODO Move this block to @nexajs/app
    try {
        Profile.$state = JSON.parse(localStorage.getItem('profile'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })

        System.$state = JSON.parse(localStorage.getItem('system'), (key, value) => {
            if (typeof value === 'string' && /^\d+n$/.test(value)) {
                return BigInt(value.slice(0, value.length - 1))
            }
            return value
        })

        // add additional states here...
    } catch (err) {
        console.error(err)
    }
})

// TODO Move this block to @nexajs/app
watch([Profile.$state, System.$state], (_state) => {
    localStorage.setItem('profile',
        JSON.stringify(_state[0], (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )

    localStorage.setItem('system',
        JSON.stringify(_state[1], (key, value) =>
            typeof value === 'bigint' ? value.toString() + 'n' : value
        )
    )

    // watch additional states here...
})

/* Set constants. */
const SPLASH_PAGE_DELAY = 1500

/* Initialize table ID. */
const tableid = ref<number>(4)

const init = async () => {
    /* Initailize system. */
    System.init()

    /* Initialize profile. */
    Profile.init()

    /* Initialize Mini App. */
// FIXME FOR DEV PURPOSES ONLY
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
