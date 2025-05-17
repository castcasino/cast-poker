'use client'

import { useEffect, useState, useCallback } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import { signIn, signOut, getCsrfToken } from 'next-auth/react'

import sdk, {
    FrameNotificationDetails,
    type FrameContext,
} from '@farcaster/frame-sdk'

import {
    useAccount,
    // useSendTransaction,
    // useWaitForTransactionReceipt,
    useSwitchChain,
    useChainId,
} from 'wagmi'
import { base, degen } from 'wagmi/chains'
import { BaseError, UserRejectedRequestError } from 'viem'

import { useSession } from "next-auth/react"
import { SignInResult } from '@farcaster/frame-core/dist/actions/signIn'

import { Button } from '../../components/ui/Button'
import splashIcon from '../../../public/splash.png'

import { truncateAddress } from '../../lib/truncateAddress'

const renderError = (error: Error | null) => {
    if (!error) return null

    if (error instanceof BaseError) {
        const isUserRejection = error.walk((e) => e instanceof UserRejectedRequestError)

        if (isUserRejection) {
            return <div class="text-red-500 text-xs mt-1">Rejected by user.</div>
        }
    }

    return <div class="text-red-500 text-xs mt-1">{error.message}</div>
}

export default function MySuite({ tableid }: { tableid: string}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()

    const [addFrameResult, setAddFrameResult] = useState('')
    const [notificationDetails, setNotificationDetails] =
        useState<FrameNotificationDetails | null>(null)
    const [sendNotificationResult, setSendNotificationResult] = useState('')

    const { address, isConnected } = useAccount()
    const chainId = useChainId()

    const {
        switchChain,
        error: switchChainError,
        isError: isSwitchChainError,
        isPending: isSwitchChainPending,
    } = useSwitchChain()

    const handleSwitchChain = useCallback(() => {
        switchChain({ chainId: chainId === base.id ? degen.id : base.id })
    }, [ switchChain, chainId ])


    const addFrame = useCallback(async () => {
        try {
            // setAddFrameResult('')
            setNotificationDetails(null)

            const result = await sdk.actions.addFrame()

            if (result.added) {
                if (result.notificationDetails) {
                    setNotificationDetails(result.notificationDetails)
                }

                setAddFrameResult(
                    result.notificationDetails
                    ? `Added, got notificaton token ${result.notificationDetails.token} and url ${result.notificationDetails.url}`
                    : 'Added, got no notification details'
                )
            } else {
                setAddFrameResult(`Not added: ${result.reason}`)
            }
        } catch (error) {
            setAddFrameResult(`Error: ${error}`)
        }
    }, [])

    const sendNotification = useCallback(async () => {
        setSendNotificationResult('')

        if (!notificationDetails) {
            return
        }

        try {
            const response = await fetch('/api/send-notification', {
                method: 'POST',
                mode: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token: notificationDetails.token,
                    url: notificationDetails.url,
                    targetUrl: window.location.href,
                }),
            })

            if (response.status === 200) {
                setSendNotificationResult('Success')
                return
            }

            const data = await response.text()
            setSendNotificationResult(`Error: ${data}`)
        } catch (error) {
            setSendNotificationResult(`Error: ${error}`)
        }
    }, [ notificationDetails ])

    useEffect(() => {
        const load = async () => {
            setContext(await sdk.context)
            sdk.actions.ready()
console.log('SDK.CONTEXT', await sdk.context)
        }

        if (sdk && !isSDKLoaded) {
            setIsSDKLoaded(true)
            load()
        }
    }, [ isSDKLoaded ])

    if (!isSDKLoaded) {
        return <div>Loading. Please wait...</div>
    }

    /**
     * Create Venue
     *
     * Executes either a new Bench or Table in the CasinoPoker contract.
     */
    // const _handleCreateVenue = async () => {

//         /* Initialize locals. */
//         let response

//         /* Build (data) package. */
//         const pkg = {
//             almost: 'there...',
//         }

//         /* Set method. */
//         const method = 'POST'

//         /* Set headers. */
//         const headers = { 'Content-Type': 'application/json' }

//         /* Serialize body. */
//         const body = JSON.stringify(pkg)

//         /* Build options. */
//         const options = {
//             method,
//             headers,
//             body,
//         }

//         /* Make (remote) data request. */
//         response = await fetch('https://cast.casino/v1', options)
//             .catch(err => console.error(err))
// console.log('API RESPONSE', response)

//         /* Handle response. */
//         response = await response
//             .json()
//             .catch(err => console.error(err))
//     console.log('API RESPONSE', response)
// alert(JSON.stringify(response))
    // }

    return (
        <main class="w-full">
            <section>
                <div class="border-b border-gray-200">
                    <nav class="-mb-px flex" aria-label="Tabs">
                        {/* <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
                        <Link href={`/${tableid}/lounge`} class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Lounge
                        </Link>

                        <Link href={`/${tableid}/mysuite`} class="w-1/3 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                            My Suite
                        </Link>

                        <Link href={`/${tableid}/concierge`} class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Concierge
                        </Link>
                    </nav>
                </div>
            </section>

            <section class="p-3 flex flex-row">
                {(context && <Link href={`/${tableid}/mysuite`} class="group block shrink-0">
                    <div class="flex items-center">
                        <Image
                            class="inline-block size-12 rounded-full"
                            src={'https://wsrv.nl/?url=' + context?.user?.pfpUrl || splashIcon}
                            alt={context?.user?.displayName || ''}
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
                </Link>)}

                {(!context && <Link href={`/${tableid}/mysuite`} class="group block shrink-0">
                    <div class="flex items-center">
                        <Image
                            class="inline-block size-12"
                            src={splashIcon}
                            alt=""
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
                </Link>)}
            </section>

            <div class="mt-5">
                <Button onClick={addFrame}>
                    <span class="font-bold text-xl">
                        Add Cast Poker to Warpcast
                    </span>
                </Button>

                {addFrameResult && (
                    <div class="mb-2 text-slate-700 text-xs text-center">
                        Add frame result:
                        {addFrameResult}
                    </div>
                )}

                {notificationDetails && (
                    <div>
                        <h2 class="font-2xl font-bold">Notify</h2>

                        {sendNotificationResult && (
                            <div class="mb-2">
                                Send notification result: {sendNotificationResult}
                            </div>
                        )}

                        <div class="mb-4">
                            <Button onClick={sendNotification}>Send notification</Button>
                        </div>
                    </div>
                )}
            </div>

            <section class="py-10">
                <SignIn />
            </section>

            <section class="mt-3">
                {isConnected && (
                    <div class="my-2 text-xs">
                        IS CONNECTED!
                    </div>
                )}

                {address && (
                    <div class="my-2 text-xs">
                        Address: <pre class="inline">{truncateAddress(address)}</pre>
                    </div>
                )}

                {chainId && (
                    <div class="my-2 text-xs">
                        Chain ID: <pre class="inline">{chainId}</pre>
                    </div>
                )}

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
                                            placeholder={context?.user.username || 'guest_user'}
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
                                        placeholder={context?.user.displayName || 'Guest User'}
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
                                        placeholder={context?.user.fid.toString() || 'n/a'}
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
                            <Button
                                onClick={handleSwitchChain}
                                disabled={isSwitchChainPending}
                                isLoading={isSwitchChainPending}
                            >
                                Switch to {chainId === base.id ? 'Degen' : 'Base'}
                            </Button>

                            {isSwitchChainError && renderError(switchChainError)}
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
    )
}

function SignIn() {
    const [signingIn, setSigningIn] = useState(false);
    const [signingOut, setSigningOut] = useState(false);
    const [signInResult, setSignInResult] = useState<SignInResult>();
    const { data: session, status } = useSession()

    const getNonce = useCallback(async () => {
      const nonce = await getCsrfToken();
      if (!nonce) throw new Error("Unable to generate nonce");
      return nonce;
    }, []);

    const handleSignIn = useCallback(async () => {
      try {
        setSigningIn(true);
        const nonce = await getNonce();
console.log('SDK', sdk)
console.log('CONTEXT', await sdk.context)
        const result = await sdk.actions.signIn({ nonce });
        setSignInResult(result);

        await signIn("credentials", {
          message: result.message,
          signature: result.signature,
          redirect: false,
        });
      } finally {
        setSigningIn(false);
      }
    }, [getNonce]);

    const handleSignOut = useCallback(async () => {
      try {
        setSigningOut(true);
        await signOut({ redirect: false })
        setSignInResult(undefined);
      } finally {
        setSigningOut(false);
      }
    }, []);

    return (
      <>
        {status !== "authenticated" &&
          <Button
            onClick={handleSignIn}
            disabled={signingIn}
          >
            Sign In with Farcaster
          </Button>
        }
        {status === "authenticated" &&
          <Button
            onClick={handleSignOut}
            disabled={signingOut}
          >
            Sign out
          </Button>
        }
        {session &&
          <div class="my-2 p-2 text-xs overflow-x-scroll bg-gray-100 rounded-lg font-mono">
            <div class="font-semibold text-gray-500 mb-1">Session</div>
            <div class="whitespace-pre">{JSON.stringify(session, null, 2)}</div>
          </div>
        }
        {signInResult && !signingIn && (
          <div class="my-2 p-2 text-xs overflow-x-scroll bg-gray-100 rounded-lg font-mono">
            <div class="font-semibold text-gray-500 mb-1">SIWF Result</div>
            <div class="whitespace-pre">{JSON.stringify(signInResult, null, 2)}</div>
          </div>
        )}
      </>
    );
  }
