<script setup lang="ts">
/* Import modules. */
import moment from 'moment'

const curYear = ref(null)

const init = () => {
    curYear.value = moment().format('YYYY')
}

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })

</script>

<template>
    <footer class="bg-gray-50" aria-labelledby="footer-heading">
        <h2 id="footer-heading" class="sr-only">Footer</h2>

        <div class="mx-auto max-w-7xl px-4 pt-16 pb-8 sm:px-6 lg:px-8 lg:pt-24">
            <div class="xl:grid xl:grid-cols-3 xl:gap-8">
                <div class="grid grid-cols-2 gap-8 xl:col-span-2">
                    <div class="md:grid md:grid-cols-2 md:gap-8">

                        <div>
                            <h3 class="text-base font-medium text-gray-900">
                                For Players
                            </h3>

                            <ul role="list" class="mt-4 space-y-4">
                                <li>
                                    <NuxtLink to="/manager" class="text-base text-gray-500 hover:text-gray-900">
                                        Profile Manager
                                    </NuxtLink>
                                </li>

                                <li>
                                    <NuxtLink to="/fairplay" class="text-base text-gray-500 hover:text-gray-900">
                                        Fairplay 101
                                    </NuxtLink>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base text-gray-500 hover:text-gray-900">
                                        Promotions
                                    </a>
                                </li>

                                <li>
                                    <NuxtLink to="https://docs.cast.casino/backup" target="_blank" class="text-base text-gray-500 hover:text-gray-900">
                                        Wallet Backup
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>

                        <div class="mt-12 md:mt-0">
                            <h3 class="text-base font-medium text-gray-900">
                                For Bankers
                            </h3>

                            <ul role="list" class="mt-4 space-y-4">
                                <li>
                                    <NuxtLink to="/manager" class="text-base text-gray-500 hover:text-gray-900">
                                        Banking Manager
                                    </NuxtLink>
                                </li>

                                <li>
                                    <NuxtLink to="/profit" class="text-base text-gray-500 hover:text-gray-900">
                                        Profit Calculators
                                    </NuxtLink>
                                </li>

                                <li>
                                    <NuxtLink to="/market" class="text-base text-gray-500 hover:text-gray-900">
                                        Marketplace
                                    </NuxtLink>
                                </li>

                                <li>
                                    <NuxtLink to="https://docs.cast.casino" target="_blank" class="text-base text-gray-500 hover:text-gray-900">
                                        Documentation
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="md:grid md:grid-cols-2 md:gap-8">
                        <div>
                            <h3 class="text-base font-medium text-gray-900">
                                For Gamemakers
                            </h3>

                            <ul role="list" class="mt-4 space-y-4">
                                <li>
                                    <a href="javascript://" class="text-base text-gray-500 hover:text-gray-900">
                                        Build a Game
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base text-gray-500 hover:text-gray-900">
                                        Monetize Your Game
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base text-gray-500 hover:text-gray-900">
                                        Financing 101
                                    </a>
                                </li>

                                <li>
                                    <NuxtLink to="https://repo.hos.im/nyusternie" target="_blank" class="text-base text-gray-500 hover:text-gray-900">
                                        View the source
                                    </NuxtLink>
                                </li>
                            </ul>
                        </div>

                        <div class="mt-12 md:mt-0">
                            <h3 class="text-base font-medium text-gray-900">
                                Legal
                            </h3>

                            <ul role="list" class="mt-4 space-y-4">
                                <li>
                                    <NuxtLink to="/license" class="text-base text-gray-500 hover:text-gray-900">
                                        License
                                    </NuxtLink>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base text-gray-500 hover:text-gray-900">
                                        Cookies
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base text-gray-500 hover:text-gray-900">
                                        Privacy
                                    </a>
                                </li>

                                <li>
                                    <a href="javascript://" class="text-base text-gray-500 hover:text-gray-900">
                                        Terms
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>

                <div class="mt-12 xl:mt-0">
                    <h3 class="text-base font-medium text-gray-900">
                        Subscribe to our newsletter
                    </h3>

                    <p class="mt-4 text-base text-gray-500">
                        The latest news, articles, and resources, sent to your inbox weekly.
                    </p>

                    <form class="mt-4 sm:flex sm:max-w-md">
                        <label for="email-address" class="sr-only">Email address</label>

<NuxtLink to="https://twitter.com/0xShomari" target="_blank" class="flex">
                        <input
                            type="email"
                            name="email-address"
                            id="email-address"
                            autocomplete="email"
                            required
                            class="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white py-2 px-4 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-indigo-500"
                            placeholder="Enter your email"
                            disabled
                        />
</NuxtLink>
                        <div class="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                            <NuxtLink to="https://twitter.com/0xShomari" target="_blank"
                                class="flex w-full items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-purple-600 to-indigo-600 bg-origin-border px-4 py-3 text-base font-medium text-white shadow-sm hover:from-purple-700 hover:to-indigo-700"
                                disabled
                            >
                                Subscribe
                            </NuxtLink>
                        </div>
                    </form>
                </div>
            </div>

            <div class="mt-12 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between lg:mt-16">
                <div class="flex space-x-6 md:order-2 justify-center">
                    <a href="https://twitter.com/0xShomari" target="_blank" class="text-gray-400 hover:text-gray-500">
                        <span class="sr-only">Twitter</span>
                        <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
                            />
                        </svg>
                    </a>

                </div>

                <p class="mt-8 text-sm text-center sm:text-base sm:text-left text-gray-400 md:order-1 md:mt-0">
                    &copy; {{curYear}} Cast Casino DAO. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
</template>
