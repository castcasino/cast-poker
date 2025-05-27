<template>
    <main class="w-full">
        <section>
            <div class="border-b border-gray-200">
                <nav class="-mb-px flex" aria-label="Tabs">
                    <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" -->
                    <NuxtLink :href="`/${tableid}/lounge`" class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                        Lounge
                    </NuxtLink>

                    <NuxtLink :href="`/${tableid}/mysuite`" class="w-1/3 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                        My Suite
                    </NuxtLink>

                    <NuxtLink :href="`/${tableid}/concierge`" class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                        Concierge
                    </NuxtLink>
                </nav>
            </div>
        </section>

        <section class="p-3 flex flex-row">
            <NuxtLink v-if="user" :href="`/${tableid}/mysuite`" class="group block shrink-0">
                <div class="flex items-center">
                    <img
                        class="inline-block size-12 rounded-full"
                        :src="'https://wsrv.nl/?url=' + user?.pfpUrl || '@/assets/icon.png'"
                        :alt="user?.displayName || ''"
                    />

                    <div class="ml-2">
                        <p class="text-lg font-medium text-lime-600 tracking-wider group-hover:text-lime-500">
                            {context.user.displayName}
                        </p>

                        <p class="text-sm font-medium text-lime-800 tracking-wider group-hover:text-lime-600">
                            {context.user.username}
                        </p>
                    </div>
                </div>
            </NuxtLink>

            <NuxtLink v-if="user" :href="`/${tableid}/mysuite`" class="group block shrink-0">
                <div class="flex items-center">
                    <img
                        class="inline-block size-12"
                        src="@/assets/icon.png"
                        alt="Cast Poker icon"
                    />

                    <div class="ml-2">
                        <p class="text-lg font-medium text-lime-600 tracking-wider group-hover:text-lime-500">
                            Guest User
                        </p>

                        <p class="text-sm font-medium text-lime-800 tracking-wider group-hover:text-lime-600">
                            @guest_user
                        </p>
                    </div>
                </div>
            </NuxtLink>
        </section>

        <section class="px-3 py-2 bg-slate-200 border-y-2 border-rose-300">
            <h2 class="text-lg text-rose-500 font-medium tracking-widest uppercase">
                Session Info
            </h2>

            <div>
                <h3 class="text-slate-500 font-medium tracking-widest uppercase">
                    Session ID
                </h3>

                <h2 class="text-sky-500 font-medium tracking-tighter">
                    {{Profile.sessionid}}
                </h2>
            </div>

            <div v-if="Profile.session.createdAt">
                <h3 class="text-slate-500 font-medium tracking-widest uppercase">
                    Created
                </h3>

                <h2 class="text-sky-500 font-medium tracking-tighter">
                    {{moment.unix(Profile.session.createdAt).format('llll')}}
                </h2>
            </div>

            <div v-if="typeof Profile.session.hasAuth !== 'undefined'">
                <h3 class="text-slate-500 font-medium tracking-widest uppercase">
                    Is Authorized?
                </h3>

                <h2 class="text-sky-500 font-medium tracking-tighter">
                    {{Profile.session.hashAuth ? 'YES' : 'NO'}}
                </h2>
            </div>

            <!-- <pre>{{JSON.stringify(Profile.session, null, 2)}}</pre> -->
        </section>

        <div class="mt-5">
            <button @click="addFrame">
                <span class="font-bold text-xl">
                    Add Cast Poker to Warpcast
                </span>
            </button>

            <div v-if="addFrameResult" class="mb-2 text-slate-700 text-xs text-center">
                Add frame result:
                {addFrameResult}
            </div>

            <div v-if="notificationDetails">
                <h2 class="font-2xl font-bold">Notify</h2>

                <div v-if="sendNotificationResult" class="mb-2">
                    Send notification result: {sendNotificationResult}
                </div>

                <div class="mb-4">
                    <button @click="sendNotification">Send notification</button>
                </div>
            </div>
        </div>

        <!-- <section class="py-10">
            <SignIn />
        </section> -->

        <section class="mt-3">
            <div v-if="isConnected" class="my-2 text-xs">
                IS CONNECTED!
            </div>

            <div v-if="address" class="my-2 text-xs">
                Address: <pre class="inline">{truncateAddress(address)}</pre>
            </div>

            <div v-if="chainId" class="my-2 text-xs">
                Chain ID: <pre class="inline">{chainId}</pre>
            </div>
        </section>

        <form class="px-3">
            <div class="space-y-12">
                <div class="border-b border-gray-900/10 pb-12">

                    <p class="mt-1 text-xl text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p>

                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div class="sm:col-span-4">
                            <label htmlFor="username" class="block text-xl font-medium text-gray-900">
                                Username
                            </label>

                            <div class="mt-2">
                                <div class="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                                    <div class="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                                        cast.poker/
                                    </div>

                                    <input
                                        type="text"
                                        class="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                                        :placeholder="user?.username || 'guest_user'"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="sm:col-span-4">
                            <label htmlFor="first-name" class="block text-xl font-medium text-gray-900">
                                Nickname
                            </label>

                            <div class="mt-2">
                                <input
                                    type="text"
                                    autoComplete="given-name"
                                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    :placeholder="user?.displayName || 'Guest User'"
                                    disabled
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label htmlFor="postal-code" class="block text-xl font-medium text-gray-900">
                                Farcaster ID
                            </label>

                            <div class="mt-2">
                                <input
                                    type="text"
                                    autoComplete="postal-code"
                                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    :placeholder="user?.fid.toString() || 'n/a'"
                                />
                            </div>
                        </div>

                        <div class="col-span-full">
                            <label htmlFor="about" class="block text-xl font-medium text-gray-900">
                                Player Bio
                            </label>

                            <div class="mt-2">
                                <textarea
                                    rows={3}
                                    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                ></textarea>
                            </div>

                            <p class="mt-3 text-xl text-gray-600">
                                Write a few sentences about yourself.
                            </p>
                        </div>

                        <div class="col-span-full">
                            <label htmlFor="cover-photo" class="block text-xl font-medium text-gray-900">Cover photo</label>

                            <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div class="text-center">
                                    <svg class="mx-auto size-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path
                                            fillRule="evenodd"
                                            d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <div class="mt-4 flex text-xl text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                                        </label>
                                        <p class="pl-1">or drag and drop</p>
                                    </div>
                                    <p class="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border-b border-gray-900/10 pb-12">
                    <h2 class="text-base/7 font-semibold text-gray-900">
                        Notifications
                    </h2>

                    <p class="mt-1 text-xl text-gray-600">
                        We&rsquo;ll always let you know about important changes, but you pick what else you want to hear about.
                    </p>

                    <div class="mb-4">
                        <button
                            @click="handleSwitchChain"
                            :disabled="isSwitchChainPending"
                            :isLoading="isSwitchChainPending"
                        >
                            Switch to {{chainId === base.id ? 'Degen' : 'Base'}}
                        </button>

                        {{isSwitchChainError && renderError(switchChainError)}}
                    </div>

                    <div class="mt-10 space-y-10">
                        <fieldset>
                            <legend class="text-sm/6 font-semibold text-gray-900">
                                By email
                            </legend>

                            <div class="mt-6 space-y-6">9
                                <div class="flex gap-3">
                                    <div class="flex h-6 shrink-0 items-center">
                                        <div class="group grid size-4 grid-cols-1">
                                            <input
                                                id="comments"
                                                aria-describedby="comments-description"
                                                name="comments"
                                                type="checkbox"
                                                checked
                                                class="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                            />

                                            <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
                                                <path class="opacity-0 group-has-[:checked]:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path class="opacity-0 group-has-[:indeterminate]:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div class="text-sm/6">
                                        <label htmlFor="comments" class="font-medium text-gray-900">Comments</label>
                                        <p id="comments-description" class="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                    </div>
                                </div>

                                <div class="flex gap-3">
                                    <div class="flex h-6 shrink-0 items-center">
                                        <div class="group grid size-4 grid-cols-1">
                                            <input
                                                id="candidates"
                                                aria-describedby="candidates-description"
                                                name="candidates"
                                                type="checkbox"
                                                class="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                            />

                                            <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
                                                <path class="opacity-0 group-has-[:checked]:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path class="opacity-0 group-has-[:indeterminate]:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div class="text-sm/6">
                                        <label htmlFor="candidates" class="font-medium text-gray-900">Candidates</label>
                                        <p id="candidates-description" class="text-gray-500">Get notified when a candidate applies for a job.</p>
                                    </div>
                                </div>

                                <div class="flex gap-3">
                                    <div class="flex h-6 shrink-0 items-center">
                                        <div class="group grid size-4 grid-cols-1">
                                            <input
                                                id="offers"
                                                aria-describedby="offers-description"
                                                name="offers"
                                                type="checkbox"
                                                class="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                            />

                                            <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
                                                <path class="opacity-0 group-has-[:checked]:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path class="opacity-0 group-has-[:indeterminate]:opacity-100" d="M3 7H11" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div class="text-sm/6">
                                        <label htmlFor="offers" class="font-medium text-gray-900">Offers</label>
                                        <p id="offers-description" class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend class="text-sm/6 font-semibold text-gray-900">
                                Push notifications
                            </legend>

                            <p class="mt-1 text-xl text-gray-600">
                                These are delivered via SMS to your mobile phone.
                            </p>

                            <div class="mt-6 space-y-6">
                                <div class="flex items-center gap-x-3">
                                    <input
                                        id="push-everything"
                                        name="push-notifications"
                                        type="radio"
                                        checked
                                        class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                    />

                                    <label htmlFor="push-everything" class="block text-xl font-medium text-gray-900">
                                        Everything
                                    </label>
                                </div>

                                <div class="flex items-center gap-x-3">
                                    <input
                                        id="push-email"
                                        name="push-notifications"
                                        type="radio"
                                        class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                    />
                                    <label htmlFor="push-email" class="block text-xl font-medium text-gray-900">
                                        Same as email
                                    </label>
                                </div>

                                <div class="flex items-center gap-x-3">
                                    <input
                                        id="push-nothing"
                                        name="push-notifications"
                                        type="radio"
                                        class="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden [&:not(:checked)]:before:hidden"
                                    />

                                    <label htmlFor="push-nothing" class="block text-xl font-medium text-gray-900">
                                        No push notifications
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" class="text-sm/6 font-semibold text-gray-900">
                    Cancel
                </button>

                <button
                    type="submit"
                    class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save
                </button>
            </div>
        </form>
    </main>
</template>

<script setup lang="ts">
/* Import modules. */
import moment from 'moment'

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useSystemStore } from '@/stores/system'
const Profile = useProfileStore()
const System = useSystemStore()

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
        title: `My Suite`,
        action: {
            type: 'launch_frame',
            name: `View My Suite`,
            url: `https://cast.poker/${tableid.value}/mysuite/`,
            splashImageUrl: `https://cast.poker/splash.gif`,
            splashBackgroundColor: '#cd98f9',
        },
    },
}

/* Set page title + meta tags. */
useHead({
    title: 'My Suite — Cast Poker',
    meta: [
        { name: 'description', content: 'Cast Poker offers a premium blockchain gaming experience for Players over 18+.' },
        { name: 'fc:frame', content: JSON.stringify(frame) },
    ],
})

type User = {
    fid: number;
    displayName: string;
    username: string;
    pfpUrl: string;
}

const user = ref<User>()
</script>
