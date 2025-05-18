<template>
    <main class="w-full">
        <section>
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex" aria-label="Tabs">
                    <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                    <NuxtLink :href="`/${tableid}/share`" class="w-1/2 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                        Promotion
                    </NuxtLink>

                    <NuxtLink :href="`/${tableid}/host`" class="w-1/2 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                        Hosting
                    </NuxtLink>
                </nav>
            </div>
        </section>

        <section class="my-5 px-3">
            <div class="w-full flex justify-center">
                <h1 class="sm:px-10 text-4xl font-light text-rose-400 text-center italic leading-[55px]">
                    {{context?.user.displayName || 'Guest'}}, Earn <span class="text-5xl font-bold">5%</span> Of ALL Table Buy-ins By Hosting
                </h1>
            </div>

            <p class="my-4 text-slate-700">
                Cast Casino offers the <span class="font-bold">EASIEST</span> referral rewards in all of Farcaster!
                Simply recast <span class="font-bold">ANY</span> of our table games and you&rsquo;re done!
            </p>

            <ol class="pl-10 list-decimal text-slate-700">
                <li>
                    Earn <span class="text-xl font-bold text-rose-500">5%</span> on <span class="font-bold">EVERY</span> dollar wagered on your table .. <span class="font-bold">WIN or LOSE!</span>
                </li>

                <li>
                    Payouts are sent <span class="font-bold">DIRECTLY</span> to your Farcaster wallet
                </li>

                <li>
                    Payouts are sent <span class="font-bold">IMMEDIATELY</span> after play ends
                </li>
            </ol>
        </section>

        <div class="flex flex-col gap-2">
            <GameType
                value={gameType}
                onClick={handleGameType}
            />

            <DeckType
                value={deckType}
                onClick={handleDeckType} />

            <Network
                value={network}
                onClick={handleNetwork} />

            <Asset
                value={asset}
                onChange={handleAsset} />

            <BuyIn
                token={token}
                value={buyIn}
                onChange={handleBuyIn} />

            <Seating
                value={timeToSit}
                onChange={handleSeating} />
        </div>

        <!-- <div class="my-10 mx-10 border-t border-slate-300" /> -->

        <!-- <Optional
            tableName={tableName}
            handleTableName={handleTableName}
        /> -->

        <section class="mt-5 mb-10 text-center">
            <Button
                onClick={_handleCreateVenue}
                disabled={isSendTxPending}
                isLoading={isSendTxPending}
                class="text-2xl font-bold tracking-wider"
            >
                Create My Table
            </Button>

            {isConnected && <div>
                My address is {address}
            </div>}

            {isSendTxError && renderError(sendTxError)}

            {txHash && (
                <div class="mt-2 text-xs">
                    <div class="">
                        Hash: {truncateAddress(txHash)}
                    </div>

                    <div class="">
                        Status :&nbsp;
                        {isConfirming
                            ? 'Confirming...'
                            : isConfirmed
                                ? 'Confirmed!'
                                : 'Pending'}
                    </div>
                </div>
            )}
        </section>
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
        title: `Hosting`,
        action: {
            type: 'launch_frame',
            name: `Host a Game of Poker`,
            url: `https://cast.poker/${tableid.value}/host/`,
            splashImageUrl: `https://cast.poker/splash.gif`,
            splashBackgroundColor: '#cd98f9',
        },
    },
}

/* Set page title + meta tags. */
useHead({
    title: 'Hosting — Cast Poker',
    meta: [
        { name: 'description', content: 'Cast Poker offers a premium blockchain gaming experience for Players over 18+.' },
        { name: 'fc:frame', content: JSON.stringify(frame) },
    ],
})
</script>
