<template>
    <footer>
        <!-- (Hidden) Status Bar -->
        <section v-if="(txHash || isSendTxError)" class="px-5 w-full sm:w-[640px] mx-auto h-[35px] z-10 flex justify-between items-center bg-stone-800 border-t-[3px] border-amber-400">
            <span class="text-xs font-medium text-amber-100 tracking-wider">
                {{isSendTxError && renderError(sendTxError)}}
            </span>

            <span v-if="txHash" class="text-sm font-medium text-amber-100 tracking-wider">
                Hash: {{truncateAddress(txHash)}}
            </span>

            <span class="text-xs font-medium text-amber-100 tracking-wider">
                [
                    Status :&nbsp;
                    {{isConfirming
                        ? 'Confirming...'
                        : isConfirmed
                            ? 'Confirmed!'
                            : 'Pending'}}
                ]
            </span>
        </section>

        <section class="w-full sm:w-[640px] mx-auto h-[100px] z-10 flex justify-between bg-stone-200 border-t-[3px] border-amber-400">

            <!-- Game Status Window -->
            <section class="cursor-help px-3 flex flex-col items-center justify-center border-r-[3px] rounded-r-lg rounded-tr-none border-amber-400 bg-stone-900">
                <span class="text-xs sm:text-sm font-medium text-amber-100 tracking-tight uppercase">
                    Showdown By
                </span>

                <div v-if="table" class="flex flex-col gap-0 items-center">
                    <span class="text-base sm:text-lg font-bold text-amber-300 tracking-wider">
                        {{moment.unix(Number(table.tts) + Number(table.createdAt)).format('MMM Do')}}
                    </span>

                    <span class="text-base sm:text-lg font-bold text-amber-300 tracking-wider">
                        @ {{moment.unix(Number(table.tts) + Number(table.createdAt)).format('H:mm A')}}
                    </span>
                </div>
            </section>

            <div class="pb-2 flex">
                <!-- Buy-in Button -->
                <button
                    @click="buyIn"
                    class="group px-3 flex flex-col items-center justify-center border-2 border-t-0 border-lime-500 bg-lime-200 rounded-lg rounded-t-none shadow hover:bg-lime-900"
                    :disabled="isSendTxPending"
                >
                    <span class="text-xs sm:text-lg font-bold text-lime-700 tracking-widest group-hover:text-lime-100">
                        ☆ Buy-In Is Only ☆
                    </span>

                    <span class="animate-bounce flex flex-row mt-1 text-3xl sm:text-4xl font-bold text-lime-900 tracking-wider group-hover:text-lime-100">
                        <sup class="mt-4 pr-0.5 flex flex-col items-start text-2xl">
                            $
                        </sup>
                        {{buyInValueDollars}}
                        <sup class="mt-4 pl-0.5 flex flex-col items-start text-2xl">
                            {{buyInValueCents}}
                        </sup>
                    </span>

                    <span class="-mt-4 text-xs font-bold text-lime-600 tracking-wider group-hover:text-lime-100 uppercase">
                        ❭❭❭ click here ❬❬❬
                    </span>
                </button>
            </div>

            <!-- Next Table Button -->
            <button onClick={handleNextTable} class="group flex flex-row items-center gap-1 border-l-[3px] rounded-l-lg rounded-tl-none border-amber-400 bg-stone-900 hover:bg-stone-700">
                <div class="pl-3 flex flex-col items-center justify-center">
                    <span class="text-xs sm:text-xl font-bold text-amber-100 tracking-tight">
                        Next Table
                    </span>

                    <!-- <small class="-mt-1 text-[0.6em] font-medium italic text-amber-400 tracking-widest">
                        # {{nextTableId}}
                    </small> -->

                    <span class="text-xl sm:text-2xl font-bold text-amber-300 tracking-widest">
                        $ETH
                        <span class="-mt-1.5 block text-sm sm:text-base tracking-wider">
                            on Base
                        </span>
                    </span>
                </div>

                <div class="flex pr-1">
                    <svg class="size-6 text-amber-500 group-hover:text-yellow-500 group-hover:animate-pulse" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"></path>
                    </svg>
                </div>
            </button>
        </section>
    </footer>
</template>

<script setup lang="ts">
/* Import modules. */
import moment from 'moment'

type Table = {
    token: `0x${string}`;
    buyin: string;
    tts: string;
    pot: string;
    createdAt: number;
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

/* Set constants. */
const CAST_POKER_ADDRESS = '0x3Dabb4d559C176ee7A149222404Af0deB7f8e889'
// const PERMIT2_ADDRESS = '0x000000000022D473030F116dDEE9F6B43aC78BA3'
// const MAX_ALLOWANCE = BigInt(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff) // 2^256-1
const MAX_ALLOWANCE = BigInt('115792089237316195423570985008687907853269984665640564039457584007913129639935') // 2^256-1

const init = () => {
    //
}

onMounted(() => {
    // init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>
