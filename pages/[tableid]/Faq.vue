<template>
    <main class="w-full bg-white">
        <section>
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex" aria-label="Tabs">
                    <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                    <NuxtLink :href="`/${tableid}/faq`" class="w-1/3 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                        FAQ
                    </NuxtLink>

                    <NuxtLink :href="`/${tableid}/fairplay`" class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                        Fairplay
                    </NuxtLink>

                    <NuxtLink :href="`/${tableid}/agent`" class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                        Agent
                    </NuxtLink>
                </nav>
            </div>
        </section>

        <div class="mx-auto max-w-7xl px-3 py-6 sm:py-8">
            <div class="mx-auto max-w-4xl divide-y divide-gray-900/10">
                <h2 class="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    Frequently Asked Questions
                </h2>

                <NuxtLink href="https://docs.cast.poker" target="_blank" class="block w-full sm:w-fit my-5 px-5 py-3 text-xl font-medium text-amber-200 text-center bg-blue-700 hover:bg-blue-500 border-2 border-blue-700 rounded-xl shadow">
                    Click here for Full Documentation
                </NuxtLink>

                <!-- {(context?.user?.displayName && <p>
                    {context.user.displayName},
                    feel free to ask any questions by DM to our Farcaster account @CastCasino.
                </p>)} -->

                <dl class="mt-10 space-y-6 divide-y divide-gray-900/10">
                    <div class="pt-6">
                        <dt>
                            <button @click="() => isShowingQ1 = !isShowingQ1" type="button" class="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" aria-expanded="false">
                                <span class="text-xl font-semibold tracking-wider">
                                    How do I buy-in to a table?
                                </span>

                                <span class="ml-6 flex h-7 items-center">
                                    <svg :class="`size-6 ${isShowingQ1 && 'hidden'}`" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                    </svg>

                                    <svg :class="`size-6 ${!isShowingQ1 && 'hidden'}`" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                    </svg>
                                </span>
                            </button>
                        </dt>

                        <dd v-if="isShowingQ1" class="mt-2 pr-12" id="faq-0">
                            <p class="text-base/7 text-gray-600 tracking-wide">
                                Simply connect a wallet <em>(like Coinbase or Rainbow)</em> to your Farcaster/Warpcast account and click the <span class="font-bold">&ldquo;BUY-IN&rdquo;</span> button shown at the bottom of the window.
                            </p>
                        </dd>
                    </div>

                    <div class="pt-6">
                        <dt>
                            <button @click="() => isShowingQ2 = !isShowingQ2" type="button" class="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" aria-expanded="false">
                                <span class="text-xl font-semibold tracking-wider">
                                    How do I cashout from a table?
                                </span>

                                <span class="ml-6 flex h-7 items-center">
                                    <svg :class="`size-6 ${isShowingQ2 && 'hidden'}`" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                    </svg>

                                    <svg :class="`size-6 ${!isShowingQ2 && 'hidden'}`" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                    </svg>
                                </span>
                            </button>
                        </dt>

                        <dd v-if="isShowingQ2" class="mt-2 pr-12" id="faq-0">
                            <p class="text-base/7 text-gray-600 tracking-wide">
                                Payouts will be sent directly to your Farcaster/Warpcast connected account <span class="font-bold">IMMEDIATELY</span> following the Showdown.
                            </p>
                        </dd>
                    </div>

                    <!-- More questions... -->
                </dl>
            </div>
        </div>
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
        title: `FAQ`,
        action: {
            type: 'launch_frame',
            name: `Open Cast Poker FAQ`,
            url: `https://cast.poker/${tableid.value}/faq/`,
            splashImageUrl: `https://cast.poker/splash.gif`,
            splashBackgroundColor: '#cd98f9',
        },
    },
}

/* Set page title + meta tags. */
useHead({
    title: 'FAQ — Cast Poker',
    meta: [
        { name: 'description', content: 'Cast Poker offers a premium blockchain gaming experience for Players over 18+.' },
        { name: 'fc:frame', content: JSON.stringify(frame) },
    ],
})

const isShowingQ1 = ref<boolean>(false)
const isShowingQ2 = ref<boolean>(false)
</script>
