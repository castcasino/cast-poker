<script setup lang="ts">
/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

/* Initialize System. */
const System = useSystemStore()

useHead({
    title: 'Strategy — Cast Poker',
    meta: [
        { name: 'description', content: 'Cast Poker offers a revolutionary blockchain experience.' }
    ],
})
</script>

<template>
    <main class="max-w-5xl mx-auto my-10">
        <h1 class="text-5xl font-medium">
            Strategy
        </h1>

        <div>
            <ul>
                <li>Martingale</li>
                <li>Delayed Martingale</li>
                <li>Paroli</li>
                <li>D 'Alembert</li>
            </ul>
        </div>
    </main>
</template>
