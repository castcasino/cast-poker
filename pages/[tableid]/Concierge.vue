<template>
    <main class="w-full">
        <section>
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex" aria-label="Tabs">
                    <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                    <NuxtLink :href="`/${tableid}/lounge`" class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                        Lounge
                    </NuxtLink>

                    <NuxtLink :href="`/${tableid}/mysuite`" class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                        My Suite
                    </NuxtLink>

                    <NuxtLink :href="`/${tableid}/concierge`" class="w-1/3 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                        Concierge
                    </NuxtLink>
                </nav>
            </div>
        </section>

        <div class="px-3 py-5">
            <p class="px-10 text-lg text-slate-600 font-light text-pretty text-center italic">
                Welcome to the Concierge Desk.
                What would you like to do today?
            </p>

            <div class="mb-4">
                <h3 v-if="user" class="text-2xl font-medium text-slate-700">
                    {{user?.displayName}} check out our Tables!
                </h3>
            </div>

            <div class="mb-4">
                <button @click="launchTreasureIsland" class="p-5 bg-sky-200 text-xl font-bold text-sky-800 uppercase border border-sky-400 rounded-md shadow hover:bg-sky-700 hover:text-sky-100">
                    Play Treasure Island
                </button>
            </div>

            <div v-if="tables" class="grid grid-cols-1 gap-4">
                <div v-for="tableid of Object.keys(tables)" :key="tableid" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                    <div class="shrink-0">
                        <!-- <img
                            class="size-10 rounded-full"
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                        /> -->
                    </div>

                    <div class="min-w-0 flex-1">
                        <a href="javascript://" class="focus:outline-none">
                            <span class="absolute inset-0" aria-hidden="true"></span>

                            <p class="text-sm font-medium text-gray-900">
                                {{truncateAddress(tables[Number(tableid)].host)}}
                            </p>

                            <!-- <p class="truncate text-sm text-gray-500">
                                Buy-in : {formatEther(BigInt(table.buyin))} $ETH
                            </p> -->
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
/* Import modules. */
import { truncateAddress } from '../../libs/truncateAddress'

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
        title: `Concierge`,
        action: {
            type: 'launch_frame',
            name: `Visit the Cast Poker Concierge`,
            url: `https://cast.poker/${tableid.value}/concierge/`,
            splashImageUrl: `https://cast.poker/splash.gif`,
            splashBackgroundColor: '#cd98f9',
        },
    },
}

/* Set page title + meta tags. */
useHead({
    title: 'Concierge — Cast Poker',
    meta: [
        { name: 'description', content: 'Cast Poker offers a premium blockchain gaming experience for Players over 18+.' },
        { name: 'fc:frame', content: JSON.stringify(frame) },
    ],
})

type Table = {
    host: string;
    // seated: string[];
}

type User = {
    displayName: string;
}

const user = ref<User>()
const tables = ref<Table[]>()

const launchTreasureIsland = async () => {
    alert(`
Treasure Island
Coming soon...
    `)
}
</script>
