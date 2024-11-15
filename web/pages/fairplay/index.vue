<script setup lang="ts">
/* Import modules. */
import { binToHex } from '@nexajs/utils'
// import { decodeAddress } from '@nexajs/address'

useHead({
    title: 'Fairplay — Cast Poker',
    meta: [
        { name: 'description', content: 'Nexa Gaming offers a revolutionary blockchain experience.' }
    ],
})

const router = useRouter()

const playid = ref(null)

const load = async () => {
    let play

    play = await $fetch(`/api/plays/${playid.value}`)
        .catch(err => console.error(err))

    if (typeof play === 'undefined') {
        const decoded = decodeAddress(playid.value)
        const hash = binToHex(decoded.hash)
        const pubKeyHash = hash.slice(8)

        play = await $fetch(`/api/plays/${pubKeyHash}`)
            .catch(err => console.error(err))
        console.log('(re-)PLAY', play)
    }
    console.log('PLAY', play)

    if (play?.id) {
        router.push(`/fairplay/${play.id}`)
    } else {
        alert('Your Play ID is inavlid!')
    }
}


</script>

<template>
    <main class="max-w-5xl mx-auto my-10 px-3">
        <h1 class="text-7xl text-slate-600 font-light tracking-wider">
            Fairplay
        </h1>

        <h3 class="mt-10 text-2xl lg:text-3xl lg:w-3/4 font-medium text-sky-600 lg:leading-[50px] italic">
            <span class="text-3xl lg:text-4xl font-bold uppercase">Every</span> card is dealt using the <span class="text-3xl lg:text-4xl font-bold uppercase">next</span> block hash as a randomizer — making it <span class="text-3xl lg:text-4xl font-bold uppercase">impossible</span> for anyone (including the House) to cheat.
        </h3>

        <div class="flex flex-col lg:flex-row items-start gap-4">
            <section class="order-2 lg:order-none text-slate-700 text-lg leading-9">
                <p class="my-5">
                    We all want to play at fair, trustworthy online gaming sites.
                </p>

                <p class="my-5">
                    The Crypto gaming community has come up with its own way of proving that games are fair.
                    As you might expect, with this being specific to Crypto, it doesn’t require you to trust a third party, it makes games totally transparent, and it makes use of advanced cryptography to ensure game outcomes haven’t been tampered with.
                    Using the provably fair method, you can verify the results for yourself in real time.

                </p>

                <p class="my-5">
                    But what exactly is provably fair gaming? How does it work? Why does it make Crypto gaming so transparent? We’re going to explore all of that here.
                    As you’ll see, the ramifications of provably fair gaming are revolutionary.

                </p>

                <p class="my-5">
                    Much like Crypto itself, provably fair solutions work on the problem of trust.
                    You no longer need a middleman or third party to verify that a casino’s algorithm is fair.
                    Since you have intervened in the process of a game outcome by providing a seed which changes something, the casino is no longer fully in control.

                </p>

                <p class="my-5">
                    You should never trust any online entity at face value.
                    Luckily for casino players, there are third parties set up with the sole purpose of verifying the published payout figures through testing.

                    eCOGRA is an example of one such third party.
                    This organization tests many casino games and published reports on whether or not the claims of the software providers match up with the facts.

                </p>

                <p class="my-5">
                    We all want to play at fair, trustworthy online gaming sites.

                </p>
            </section>

            <section class="w-full order-1 lg:w-96 py-5 flex flex-col justify-center gap-4">
                <input
                    type="text"
                    v-model="playid"
                    placeholder="Type or copy/paste your Play ID here"
                    class="w-full lg:w-96 py-2 px-5 bg-yellow-100 border-2 border-yellow-300 text-lg text-yellow-900 placeholder-yellow-900 rounded-lg"
                />

                <button @click="load" class="py-2 bg-blue-200 border-2 border-blue-400 text-2xl font-medium rounded-lg shadow hover:bg-blue-300">
                    Load Play
                </button>
            </section>
        </div>
    </main>
</template>
