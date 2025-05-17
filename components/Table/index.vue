<template>
    <main className="w-full">
        <Image
            priority
            src={mobileBanner}
            width={0}
            height={0}
            alt="Fairplay Gaming (Mobile) Banner"
            className="sm:hidden w-full h-[80px] object-cover border-b-2 border-stone-500" />
        <Image
            priority
            src={desktopBanner}
            width={0}
            height={0}
            alt="Fairplay Gaming (Desktop) Banner"
            className="hidden sm:flex w-full h-[80px] object-cover border-b-2 border-stone-500" />

        <section className="hidden p-3">
            <h2 className="text-slate-700 font-bold text-xl tracking-widest">
                Welcome Back
            </h2>

            <h2 className="text-slate-700 font-bold text-3xl tracking-widest">
                <!-- {{context?.user.displayName || 'Guest'}} -->
                Guest
            </h2>
        </section>

        <!-- <section className="w-full">
            <div className="w-full px-2 py-2 sm:px-5 sm:py-5 grid grid-cols-5 bg-gradient-to-b from-green-500 to-green-200 border-2 border-b-0 border-green-600">
                <div className="flex justify-center">
                    <Image
                        src={`https://assets.cast.casino/cards_01/${table?.community.flop1.card || 'covers/' + CARD_COVER}.svg`}
                        width={0}
                        height={0}
                        className="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        alt="Flop card #1"
                    />
                </div>

                <div className="flex justify-center">
                    <Image
                        src={`https://assets.cast.casino/cards_01/${table?.community.flop2.card || 'covers/' + CARD_COVER}.svg`}
                        width={0}
                        height={0}
                        className="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        alt="Flop card #2"
                    />
                </div>

                <div className="flex justify-center">
                    <Image
                        src={`https://assets.cast.casino/cards_01/${table?.community.flop3.card || 'covers/' + CARD_COVER}.svg`}
                        width={0}
                        height={0}
                        className="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        alt="Flop card #3"
                    />
                </div>

                <div className="flex justify-center">
                    <Image
                        src={`https://assets.cast.casino/cards_01/${table?.community.turn.card || 'covers/' + CARD_COVER}.svg`}
                        width={0}
                        height={0}
                        className="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        alt="Turn card"
                    />
                </div>

                <div className="flex justify-center">
                    <Image
                        src={`https://assets.cast.casino/cards_01/${table?.community.river.card || 'covers/' + CARD_COVER}.svg`}
                        width={0}
                        height={0}
                        className="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        alt="River card"
                    />
                </div>
            </div>

            <Link href={`/${tableid}/fairplay`} className="w-full px-2 pb-3 flex flex-col gap-1 bg-gradient-to-b from-green-200 to-green-100 border-2 border-t-0 border-green-600 rounded-b-3xl">
                <span className="text-lg font-bold text-center text-green-800 tracking-widest uppercase">
                    Fairplay Community Cards
                </span>

                <span className="-mt-2 text-base font-medium text-center text-green-600 tracking-wider uppercase">
                    Blocks #{numeral(table?.community.flop1.blockIdx || 0).format('0,0')} - #{numeral(table?.community.river?.blockIdx || 0).format('0,0')}
                </span>

                <span className="flex flex-col items-center text-xs font-medium text-green-800 tracking-wider">
                    <pre className="block truncate">
                        {table?.community?.flop1?.blockHash || BLANK_HASH}
                    </pre>

                    <pre className="block truncate">
                        {table?.community?.flop2?.blockHash || BLANK_HASH}
                    </pre>

                    <pre className="block truncate">
                        {table?.community?.flop3?.blockHash || BLANK_HASH}
                    </pre>

                    <pre className="block truncate">
                        {table?.community?.turn?.blockHash || BLANK_HASH}
                    </pre>

                    <pre className="block truncate">
                        {table?.community?.river?.blockHash || BLANK_HASH}
                    </pre>
                </span>
            </Link>
        </section> -->

<!-- <pre className="font-bold text-xs text-slate-700">TABLE{JSON.stringify(table, null, 2)}</pre> -->

        <section className="flex flex-col items-center px-2 py-5">
            <h2 className="text-2xl font-medium text-slate-700 tracking-widest">
                Players At The Showdown
            </h2>

            <div v-if="table" className="mt-2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">

                {Object.keys(table.seated).map((_seatid) => (
                    <div key="_seatid" className="px-3 py-2 flex flex-col gap-2 bg-gradient-to-r from-amber-600 to-amber-800 border-2 border-amber-300 rounded-xl shadow">
                        <div className="flex flex-row items-center gap-2">
                            <Image
                                src="https://assets.cast.casino/cards_01/covers/abstract.svg"
                                className="mr-5 w-12 border-2 border-slate-700"
                                alt="Card cover"
                                width={0}
                                height={0}
                            />

                            <div className="py-2 flex flex-col truncate">
                                <span className="text-xs font-medium tracking-wider uppercase">
                                    Player Address
                                </span>

                                <span className="block text-2xl font-bold truncate">
                                    {{table.seated[Number(_seatid)].address}}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <Image
                                src="https://assets.cast.casino/cards_01/covers/abstract.svg"
                                className="mr-5 w-12 border-2 border-slate-700"
                                alt="Card cover"
                                width={0}
                                height={0}
                            />

                            <div className="py-2 flex flex-col truncate">
                                <span className="text-xs font-medium tracking-wider uppercase">
                                    Fairplay Block Hash
                                </span>

                                <pre className="block text-xl font-medium italic">
                                    pending...
                                </pre>
                            </div>
                        </div>

                    </div>
                ))}

            </div>
        </section>

    </main>
</template>

<script setup lang="ts">
useHead({
    title: 'Blank — Cast Poker',
    meta: [
        { name: 'description', content: 'Cast Poker offers a revolutionary blockchain experience.' }
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
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

const table = ref<Table>({
    token: '0x',
    host: '0x',
    pot: '',
    seats: 0,
    seated: [],
})

// onMounted(() => {
//     console.log('Mounted!')
//     // Now it's safe to perform setup operations.
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>
