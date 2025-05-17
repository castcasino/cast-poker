<template>
    <header class="w-full sm:w-[640px] mx-auto h-[100px] z-10 flex justify-between bg-slate-800 border-b-[3px] border-lime-400">
        <section class="p-2">
            <div class="group block shrink-0">
                <div class="flex items-center">
                    <img
                        class="hidden sm:inline-block size-8 sm:size-16"
                        src="@/assets/icon.png"
                        alt=""
                    />

                    <div class="sm:ml-2 grid gap-x-4 gap-y-1">
                        <p class="text-sm sm:text-base font-medium text-lime-500 tracking-widest uppercase group-hover:text-lime-400">
                            Table # {{props.tableid}}
                        </p>

                        <p v-if="table" class="-mt-2 text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                            hosted by {{truncateAddress(table.host) || 'Guest'}}
                        </p>

                        <p v-if="table" class="-mt-1 text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                            # Seats : {{table.seated.length}} of {{table.seats}}
                        </p>

                        <div v-if="quotes" class="-mt-1 grid grid-cols-2">
                            <p class="text-center text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                                $ETH {{numeral(quotes.ETH.USD.price).format('0,0.0000')}}
                            </p>

                            <p class="text-center text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                                $DEGEN {{numeral(quotes.DEGEN.USD.price).format('0,0.0000')}}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>

        <section class="cursor-help px-3 sm:px-5 py-2 flex flex-col items-center rounded-l-lg rounded-bl-none border-l-[3px] border-lime-400 bg-lime-200">
            <span class="text-2xl font-medium text-lime-600 uppercase tracking-widest whitespace-nowrap">
                Table Pot
            </span>

            <span class="-mt-1.5 flex flex-row text-6xl font-bold text-lime-800">
                <sup class="mt-5 pr-0.5 flex flex-col items-start text-4xl">
                    $
                </sup>
                {{potValueDollars}}
                <sup class="mt-4 pl-1 flex flex-col items-start text-2xl">
                    {{potValueCents}}
                    <span class="-mt-2 font-bold text-sm text-lime-600 tracking-widest">
                        USD
                    </span>
                </sup>
            </span>
        </section>
    </header>
</template>

<script setup lang="ts">
// import sdk, { type FrameContext } from '@farcaster/frame-sdk'
// import sdk from '@farcaster/frame-sdk'

// import { formatEther } from 'viem'
// import axios from 'axios'
import numeral from 'numeral'

import { truncateAddress } from '../libs/truncateAddress'

import splashIcon from '../public/splash.png'

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

type Quotes = {
    ETH: Quote;
    DEGEN: Quote;
}

type Quote = {
    USD: Currency;
}

type Currency = {
    price: number;
}

const props = defineProps({
    tableid: Number,
})

// const quotes = ref<Quotes>()
const quotes = ref<Quotes>({
    ETH: { USD: { price: 0 }},
    DEGEN: { USD: { price: 0 }},
})
// const table = ref<Table>()
const table = ref<Table>({
    token: '0x',
    host: '0x',
    pot: '',
    seats: 0,
    seated: [],
})
const potValueDollars = ref<string>('0')
const potValueCents = ref<string>('.00')

// onMounted(() => {
//     console.log('Mounted!')
// })

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>
