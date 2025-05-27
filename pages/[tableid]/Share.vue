<template>
    <main class="w-full">
        <section>
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex" aria-label="Tabs">
                    <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                    <NuxtLink :href="`/${tableid}/share`" class="w-1/2 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                        Sharing
                    </NuxtLink>

                    <NuxtLink :href="`/${tableid}/host`" class="w-1/2 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                        Hosting
                    </NuxtLink>
                </nav>
            </div>
        </section>

        <div class="my-5 px-3">
            <section class="flex flex-row items-center gap-6">
                <div class="w-full flex justify-center">
                    <h1 class="sm:px-10 text-4xl font-light text-rose-400 text-center italic leading-[55px]">
                        {{user?.displayName || 'Guest'}},
                        Earn <span class="text-5xl font-bold">3%</span> Promoting Table # {{tableid}}
                    </h1>
                </div>

                <img
                    src="@/assets/lottie/earn-rewards.gif"
                    alt="Earn rewards animation"
                    class="size-40"
                />
            </section>

            <button @click="castPromo">
                <span class="text-3xl font-bold tracking-wider">
                    CAST -n- EARN starting TODAY!
                </span>
            </button>

            <section class="mt-5 rounded-md bg-gradient-to-r from-rose-50 to-rose-100 p-4 border-2 border-rose-300">
                <div class="flex">
                    <div class="shrink-0">
                        <svg class="size-10 text-rose-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path
                                fill-rule="evenodd"
                                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </div>

                    <div class="ml-3">
                        <h3 class="text-2xl font-medium text-rose-800 tracking-wider">
                            Attention Needed!
                        </h3>

                        <div class="mt-2 text-lg text-rose-700">
                            <p>
                                We just checked our records and you <span class="font-bold">STILL</span> haven&lsquo;t earned a single penny in <span class="font-bold">FREE</span> referral rewards!

                            </p>
                        </div>

                        <h3 class="my-5 text-center text-xl font-bold text-rose-500 uppercase">
                            What are you waiting for???
                        </h3>

                        <p class="my-2 text-lg text-rose-700">
                            Cast Casino offers the <span class="font-bold">EASIEST</span> referral rewards in all of Farcaster!
                            Simply (re-)cast <span class="font-bold">ANY</span> table game out to your community of followers and you&rsquo;re done!
                        </p>

                        <ol class="my-2 pl-10 list-decimal text-lg text-rose-700 tracking-tight leading-8">
                            <li>
                                Earn <span class="text-xl font-bold text-rose-500">$0.03</span> on <span class="font-bold">EVERY</span> dollar buy-in, WIN or LOSE!
                            </li>

                            <li>
                                Payouts are sent <span class="font-bold">AUTOMATICALLY</span> to your Farcaster wallet
                            </li>

                            <li>
                                Payouts are sent <span class="font-bold">DAILY</span> at 04:20 UTC
                            </li>
                        </ol>
                    </div>
                </div>
            </section>

            <section class="my-5">
                <h3 class="pl-3 text-base font-light text-slate-500 uppercase tracking-widest">
                    Your <span class="font-bold text-lg">Stats</span> From The Last 30 days
                </h3>

                <dl class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                        <dt>
                            <div class="absolute rounded-md bg-indigo-500 p-3">
                                <svg class="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                                    />
                                </svg>
                            </div>

                            <p class="ml-16 truncate text-sm font-medium text-gray-500">
                                Total Referrals
                            </p>
                        </dt>

                        <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
                            <p class="text-2xl font-semibold text-gray-900">
                                0
                            </p>

                            <p class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                <svg class="size-5 shrink-0 self-center text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <span class="sr-only"> Increased by </span>
                                0
                            </p>

                            <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                <div class="text-sm">
                                    <a href="https://cast.casino/manager" target="_blank" class="font-medium text-indigo-600 hover:text-indigo-500">
                                        View in Casino Manager<span class="sr-only"> Total Referrals stats</span>
                                    </a>
                                </div>
                            </div>
                        </dd>
                    </div>

                    <div class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                        <dt>
                            <div class="absolute rounded-md bg-indigo-500 p-3">
                                <svg class="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                                    />
                                </svg>
                            </div>

                            <p class="ml-16 truncate text-sm font-medium text-gray-500">
                                Total Earnings
                            </p>
                        </dt>

                        <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
                            <p class="text-2xl font-semibold text-gray-900">
                                0.0%
                            </p>

                            <p class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                <svg class="size-5 shrink-0 self-center text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <span class="sr-only"> Increased by </span>
                                0.0%
                            </p>

                            <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                <div class="text-sm">
                                    <a href="javascript://" class="font-medium text-indigo-600 hover:text-indigo-500">
                                        View all<span class="sr-only"> Avg. Open Rate stats</span>
                                    </a>
                                </div>
                            </div>
                        </dd>
                    </div>

                    <div class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                        <dt>
                            <div class="absolute rounded-md bg-indigo-500 p-3">
                                <svg class="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
                                    />
                                </svg>
                            </div>

                            <p class="ml-16 truncate text-sm font-medium text-gray-500">
                                Total Payouts
                            </p>
                        </dt>

                        <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
                            <p class="text-2xl font-semibold text-gray-900">
                                0.0%
                            </p>

                            <p class="ml-2 flex items-baseline text-sm font-semibold text-red-600">
                                <svg class="size-5 shrink-0 self-center text-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <span class="sr-only"> Decreased by </span>
                                0.0%
                            </p>

                            <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                <div class="text-sm">
                                    <a href="javascript://" class="font-medium text-indigo-600 hover:text-indigo-500">
                                        View all<span class="sr-only"> Avg. Click Rate stats</span>
                                    </a>
                                </div>
                            </div>
                        </dd>
                    </div>

                    <div class="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6">
                        <dt>
                            <div class="absolute rounded-md bg-indigo-500 p-3">
                                <svg class="size-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
                                    />
                                </svg>
                            </div>

                            <p class="ml-16 truncate text-sm font-medium text-gray-500">
                                Avg Buy-In Rate
                            </p>
                        </dt>

                        <dd class="ml-16 flex items-baseline pb-6 sm:pb-7">
                            <p class="text-2xl font-semibold text-gray-900">
                                0.0%
                            </p>

                            <p class="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                                <svg class="size-5 shrink-0 self-center text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 17a.75.75 0 0 1-.75-.75V5.612L5.29 9.77a.75.75 0 0 1-1.08-1.04l5.25-5.5a.75.75 0 0 1 1.08 0l5.25 5.5a.75.75 0 1 1-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0 1 10 17Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <span class="sr-only"> Increased by </span>
                                0.0%
                            </p>

                            <div class="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                                <div class="text-sm">
                                    <a href="javascript://" class="font-medium text-indigo-600 hover:text-indigo-500">
                                        View all<span class="sr-only"> Avg. Open Rate stats</span>
                                    </a>
                                </div>
                            </div>
                        </dd>
                    </div>

                </dl>
            </section>

            <section class="my-10">
                <h3 class="pl-3 text-base font-light text-slate-500 uppercase tracking-widest">
                    Your <span class="font-bold text-lg">Recent Activity</span>
                    <small class="pl-2 text-xs italic">(updated 5 minutes ago)</small>
                </h3>

                <p class="p-10 text-center font-bold italic text-slate-400 tracking-wider">
                    You DO NOT have any recent activity
                </p>

                <div class="hidden mt-3 px-10 flow-root">
                    <ul role="list" class="-mb-8">
                        <li>
                            <div class="relative pb-8">
                                <span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                <div class="relative flex space-x-3">
                                    <div>
                                        <span class="flex size-8 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white">
                                            <svg class="size-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p class="text-sm text-gray-500">Applied to <a href="javascript://" class="font-medium text-gray-900">Front End Developer</a></p>
                                        </div>
                                        <div class="whitespace-nowrap text-right text-sm text-gray-500">
                                            <time dateTime="2020-09-20">Sep 20</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="relative pb-8">
                                <span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                <div class="relative flex space-x-3">
                                    <div>
                                        <span class="flex size-8 items-center justify-center rounded-full bg-blue-500 ring-8 ring-white">
                                            <svg class="size-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                <path
                                                    d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0 1 14 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 0 1-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 0 1-1.341-.317l-2.734-1.366A3 3 0 0 0 6.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 0 1 2.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388Z"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p class="text-sm text-gray-500">Advanced to phone screening by <a href="javascript://" class="font-medium text-gray-900">Bethany Blake</a></p>
                                        </div>
                                        <div class="whitespace-nowrap text-right text-sm text-gray-500">
                                            <time dateTime="2020-09-22">Sep 22</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="relative pb-8">
                                <span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                <div class="relative flex space-x-3">
                                    <div>
                                        <span class="flex size-8 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
                                            <svg class="size-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p class="text-sm text-gray-500">Completed phone screening with <a href="javascript://" class="font-medium text-gray-900">Martha Gardner</a></p>
                                        </div>
                                        <div class="whitespace-nowrap text-right text-sm text-gray-500">
                                            <time dateTime="2020-09-28">Sep 28</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="relative pb-8">
                                <span class="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                                <div class="relative flex space-x-3">
                                    <div>
                                        <span class="flex size-8 items-center justify-center rounded-full bg-blue-500 ring-8 ring-white">
                                            <svg class="size-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                <path
                                                    d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0 1 14 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 0 1-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 0 1-1.341-.317l-2.734-1.366A3 3 0 0 0 6.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 0 1 2.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388Z"
                                                />
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p class="text-sm text-gray-500">Advanced to interview by <a href="javascript://" class="font-medium text-gray-900">Bethany Blake</a></p>
                                        </div>
                                        <div class="whitespace-nowrap text-right text-sm text-gray-500">
                                            <time dateTime="2020-09-30">Sep 30</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="relative pb-8">
                                <div class="relative flex space-x-3">
                                    <div>
                                        <span class="flex size-8 items-center justify-center rounded-full bg-green-500 ring-8 ring-white">
                                            <svg class="size-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                            </svg>
                                        </span>
                                    </div>
                                    <div class="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                                        <div>
                                            <p class="text-sm text-gray-500">Completed interview with <a href="javascript://" class="font-medium text-gray-900">Katherine Snyder</a></p>
                                        </div>
                                        <div class="whitespace-nowrap text-right text-sm text-gray-500">
                                            <time dateTime="2020-10-04">Oct 4</time>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            <section class="my-10 rounded-md bg-gradient-to-r from-yellow-50 to-yellow-100 p-4 border-2 border-yellow-300">
                <div class="flex">
                    <div class="shrink-0">
                        <svg class="size-10 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                            <path
                                fillRule="evenodd"
                                d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>

                    <div class="ml-3">
                        <h3 class="text-xl font-bold text-yellow-800">
                            You Should Know!
                        </h3>

                        <div class="mt-2 flex flex-col gap-2 text-sm text-yellow-800 leading-5 sm:leading-6">
                            <p>
                                Earnings from the <span class="font-bold">Cast Casino Rewards Program (CCRP)</span> are calculated and paid out based on <span class="font-bold">DIRECT ENGAGEMENT</span> from (re-)casts.
                            </p>

                            <p>
                                When a player creates a NEW session, by clicking on another frame or link, their referral rewards will then be directed towards the latest source of engagement.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

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
        title: `Sharing`,
        action: {
            type: 'launch_frame',
            name: `Share a Game of Poker`,
            url: `https://cast.poker/${tableid.value}/share/`,
            splashImageUrl: `https://cast.poker/splash.gif`,
            splashBackgroundColor: '#cd98f9',
        },
    },
}

/* Set page title + meta tags. */
useHead({
    title: 'Sharing — Cast Poker',
    meta: [
        { name: 'description', content: 'Cast Poker offers a premium blockchain gaming experience for Players over 18+.' },
        { name: 'fc:frame', content: JSON.stringify(frame) },
    ],
})

type User = {
    displayName: string;
}
const user = ref<User>()
</script>
