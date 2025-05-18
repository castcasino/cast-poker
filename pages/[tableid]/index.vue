<template>
    <main class="w-full">
        <img
            src="@/assets/banners/fairplay-gaming-mobile.jpg"
            alt="Fairplay Gaming (Mobile) Banner"
            class="sm:hidden w-full h-[80px] object-cover border-b-2 border-stone-500" />
        <img
            src="@/assets/banners/fairplay-gaming-desktop.jpg"
            alt="Fairplay Gaming (Desktop) Banner"
            class="hidden sm:flex w-full h-[80px] object-cover border-b-2 border-stone-500" />

        <section class="hidden p-3">
            <h2 class="text-slate-700 font-bold text-xl tracking-widest">
                Welcome Back
            </h2>

            <h2 class="text-slate-700 font-bold text-3xl tracking-widest">
                <!-- {{context?.user.displayName || 'Guest'}} -->
                Guest
            </h2>
        </section>

        <!-- <section class="w-full">
            <div class="w-full px-2 py-2 sm:px-5 sm:py-5 grid grid-cols-5 bg-gradient-to-b from-green-500 to-green-200 border-2 border-b-0 border-green-600">
                <div class="flex justify-center">
                    <Image
                        src={`https://assets.cast.casino/cards_01/${table?.community.flop1.card || 'covers/' + CARD_COVER}.svg`}
                        width={0}
                        height={0}
                        class="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        alt="Flop card #1"
                    />
                </div>

                <div class="flex justify-center">
                    <Image
                        src={`https://assets.cast.casino/cards_01/${table?.community.flop2.card || 'covers/' + CARD_COVER}.svg`}
                        width={0}
                        height={0}
                        class="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        alt="Flop card #2"
                    />
                </div>

                <div class="flex justify-center">
                    <Image
                        src={`https://assets.cast.casino/cards_01/${table?.community.flop3.card || 'covers/' + CARD_COVER}.svg`}
                        width={0}
                        height={0}
                        class="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        alt="Flop card #3"
                    />
                </div>

                <div class="flex justify-center">
                    <Image
                        src={`https://assets.cast.casino/cards_01/${table?.community.turn.card || 'covers/' + CARD_COVER}.svg`}
                        width={0}
                        height={0}
                        class="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        alt="Turn card"
                    />
                </div>

                <div class="flex justify-center">
                    <Image
                        src={`https://assets.cast.casino/cards_01/${table?.community.river.card || 'covers/' + CARD_COVER}.svg`}
                        width={0}
                        height={0}
                        class="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        alt="River card"
                    />
                </div>
            </div>

            <Link href={`/${tableid}/fairplay`} class="w-full px-2 pb-3 flex flex-col gap-1 bg-gradient-to-b from-green-200 to-green-100 border-2 border-t-0 border-green-600 rounded-b-3xl">
                <span class="text-lg font-bold text-center text-green-800 tracking-widest uppercase">
                    Fairplay Community Cards
                </span>

                <span class="-mt-2 text-base font-medium text-center text-green-600 tracking-wider uppercase">
                    Blocks #{numeral(table?.community.flop1.blockIdx || 0).format('0,0')} - #{numeral(table?.community.river?.blockIdx || 0).format('0,0')}
                </span>

                <span class="flex flex-col items-center text-xs font-medium text-green-800 tracking-wider">
                    <pre class="block truncate">
                        {table?.community?.flop1?.blockHash || BLANK_HASH}
                    </pre>

                    <pre class="block truncate">
                        {table?.community?.flop2?.blockHash || BLANK_HASH}
                    </pre>

                    <pre class="block truncate">
                        {table?.community?.flop3?.blockHash || BLANK_HASH}
                    </pre>

                    <pre class="block truncate">
                        {table?.community?.turn?.blockHash || BLANK_HASH}
                    </pre>

                    <pre class="block truncate">
                        {table?.community?.river?.blockHash || BLANK_HASH}
                    </pre>
                </span>
            </Link>
        </section> -->

<!-- <pre class="font-bold text-xs text-slate-700">TABLE{JSON.stringify(table, null, 2)}</pre> -->

        <section class="flex flex-col items-center px-2 py-5">
            <h2 class="text-2xl font-medium text-slate-700 tracking-widest">
                Players At The Showdown
            </h2>

            <div v-if="table" class="mt-2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">

                <div v-for="seatid of Object.keys(table.seated)" :key="seatid" class="px-3 py-2 flex flex-col gap-2 bg-gradient-to-r from-amber-600 to-amber-800 border-2 border-amber-300 rounded-xl shadow">
                    <div class="flex flex-row items-center gap-2">
                        <img
                            src="https://assets.cast.casino/cards_01/covers/abstract.svg"
                            class="mr-5 w-12 border-2 border-slate-700"
                            alt="Card cover"
                        />

                        <div class="py-2 flex flex-col truncate">
                            <span class="text-xs font-medium tracking-wider uppercase">
                                Player Address
                            </span>

                            <span class="block text-2xl font-bold truncate">
                                {{table.seated[Number(seatid)].address}}
                            </span>
                        </div>
                    </div>

                    <div class="flex flex-row items-center gap-2">
                        <img
                            src="https://assets.cast.casino/cards_01/covers/abstract.svg"
                            class="mr-5 w-12 border-2 border-slate-700"
                            alt="Card cover"
                        />

                        <div class="py-2 flex flex-col truncate">
                            <span class="text-xs font-medium tracking-wider uppercase">
                                Fairplay Block Hash
                            </span>

                            <pre class="block text-xl font-medium italic">
                                pending...
                            </pre>
                        </div>
                    </div>
                </div> <!-- v-for -->
            </div> <!-- v-if -->
        </section>
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
    imageUrl: `https://og-table.cast.poker/${tableid.value}`,
    button: {
        title: `Watch Table #${tableid.value}`,
        action: {
            type: 'launch_frame',
            name: `Table #${tableid.value} — Cast Poker`,
            url: `https://cast.poker/${tableid.value}/`,
            splashImageUrl: `https://cast.poker/splash.gif`,
            splashBackgroundColor: '#cd98f9',
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

type Table = {
    token: `0x${string}`;
    host: `0x${string}`;
    pot: string;
    seats: number;
    seated: Seat[];
}

type Seat = {
    address: string;
}

/* Initialize stores. */
// import { useSystemStore } from '@/stores/system'

/* Initialize System. */
// const System = useSystemStore()

const table = ref<Table>({
    token: '0x',
    host: '0x',
    pot: '',
    seats: 0,
    seated: [],
})
</script>
