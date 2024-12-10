'use client'

import { useEffect, useState, useCallback } from 'react'

import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import {
    useAccount,
    useSendTransaction,
    useWaitForTransactionReceipt,
    // useSwitchChain,
    // useChainId,
} from 'wagmi'
import { BaseError, UserRejectedRequestError } from 'viem'

import { Button } from '~/components/ui/Button'

import { truncateAddress } from '~/lib/truncateAddress'

const renderError = (error: Error | null) => {
    if (!error) return null

    if (error instanceof BaseError) {
        const isUserRejection = error.walk((e) => e instanceof UserRejectedRequestError)

        if (isUserRejection) {
            return <div className="text-red-500 text-xs mt-1">Rejected by user.</div>
        }
    }

    return <div className="text-red-500 text-xs mt-1">{error.message}</div>
}

// function SendEth() {
//     const { isConnected, chainId } = useAccount()

//     const {
//         sendTransaction,
//         data,
//         error: sendTxError,
//         isError: isSendTxError,
//         isPending: isSendTxPending,
//     } = useSendTransaction()

//     const { isLoading: isConfirming, isSuccess: isConfirmed } =
//         useWaitForTransactionReceipt({
//             hash: data,
//         })

//     const toAddr = useMemo(() => {
//         // Protocol guild address
//         return chainId === base.id
//             ? "0x32e3C7fD24e175701A35c224f2238d18439C7dBC"
//             : "0xB3d8d7887693a9852734b4D25e9C0Bb35Ba8a830"
//     }, [ chainId ])

//     const handleSend = useCallback(() => {
//         sendTransaction({
//             to: toAddr,
//             value: 1n,
//         })
//     }, [ toAddr, sendTransaction ])

//     return (
//         <>
//             <Button
//                 onClick={handleSend}
//                 disabled={!isConnected || isSendTxPending}
//                 isLoading={isSendTxPending}
//             >
//                 Send Transaction (eth)
//             </Button>

//             {isSendTxError && renderError(sendTxError)}

//             {data && (
//                 <div className="mt-2 text-xs">
//                     <div>Hash: {truncateAddress(data)}</div>

//                     <div>
//                         Status:{" "}
//                         {isConfirming
//                             ? "Confirming..."
//                             : isConfirmed
//                             ? "Confirmed!"
//                             : "Pending"}
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

export default function Host({ tableid }: { tableid: string}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()

    const [txHash, setTxHash] = useState<string | null>(null)

    const { address, isConnected } = useAccount()
    // const chainId = useChainId()

    const {
        sendTransaction,
        error: sendTxError,
        isError: isSendTxError,
        isPending: isSendTxPending,
    } = useSendTransaction()

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash: txHash as `0x${string}`,
        })

    const sendTx = useCallback(() => {
        sendTransaction(
            {
                // call yoink() on Yoink contract
                to: "0x4bBFD120d9f352A0BEd7a014bd67913a2007a878",
                data: "0x9846cd9efc000023c0",
            },
            {
                onSuccess: (hash) => {
                    setTxHash(hash);
                },
            }
        )
    }, [ sendTransaction ])

    useEffect(() => {
        const load = async () => {
            setContext(await sdk.context)
            sdk.actions.ready()
        }

        if (sdk && !isSDKLoaded) {
            setIsSDKLoaded(true)
            load()
        }
    }, [ isSDKLoaded ])

    if (!isSDKLoaded) {
        return <div>Loading. Please wait...</div>
    }

    const _handleCreateTable = async () => {
        /* Initialize locals. */
        let response

        /* Build (data) package. */
        const pkg = {
            almost: 'there...',
        }

        /* Set method. */
        const method = 'POST'

        /* Set headers. */
        const headers = { 'Content-Type': 'application/json' }

        /* Serialize body. */
        const body = JSON.stringify(pkg)

        /* Build options. */
        const options = {
            method,
            headers,
            body,
        }

        /* Make (remote) data request. */
        response = await fetch('https://cast.casino/v1', options)
            .catch(err => console.error(err))
    console.log('API RESPONSE', response)

        /* Handle response. */
        response = await response
            .json()
            .catch(err => console.error(err))
    console.log('API RESPONSE', response)
    alert(JSON.stringify(response))

        // sendTx()
    }

    return (
        <main className="w-full">
            <section>
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                        {/* <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
                        <Link href={`/${tableid}/promote`} className="w-1/2 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Promotion
                        </Link>

                        <Link href={`/${tableid}/host`} className="w-1/2 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                            Hosting
                        </Link>
                    </nav>
                </div>
            </section>

            <section className="my-5 px-3">
                <div className="w-full flex justify-center">
                    <h1 className="sm:px-10 text-4xl font-light text-rose-400 text-center italic leading-[55px]">
                        {context?.user.displayName || 'Guest'}, Earn <span className="text-5xl font-bold">5%</span> Of ALL Table Buy-ins By Hosting
                    </h1>
                </div>

                <p className="my-4 text-slate-700">
                    Cast Casino offers the <span className="font-bold">EASIEST</span> referral rewards in all of Farcaster!
                    Simply recast <span className="font-bold">ANY</span> of our table games and you&rsquo;re done!
                </p>

                <ol className="pl-10 list-decimal text-slate-700">
                    <li>
                        Earn <span className="text-xl font-bold text-rose-500">3%</span> on <span className="font-bold">EVERY</span> dollar wagered from your promo
                    </li>

                    <li>
                        Payouts are sent <span className="font-bold">DIRECTLY</span> to your Farcaster wallet
                    </li>

                    <li>
                        Payouts are sent <span className="font-bold">IMMEDIATELY</span> after play ends
                    </li>
                </ol>
            </section>

            <section className="my-5 px-3 flex flex-col gap-4">
                <fieldset>
                    <legend className="text-base font-medium text-slate-700 tracking-widest uppercase">
                        Choose a network
                    </legend>

                    <div className="mt-2 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        {/* <!--
            Checked: "border-transparent", Not Checked: "border-gray-300"
            Active: "ring-2 ring-indigo-500"
        --> */}
                        <label aria-label="Standard" aria-description="4–10 business days for $5.00" className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                            <input type="radio" name="delivery-method" value="Standard" className="sr-only" />

                            <span className="flex flex-1">
                                <span className="flex flex-col">
                                    <span className="block text-xl font-medium text-gray-900">
                                        Base
                                    </span>

                                    <span className="mt-1 flex items-center text-sm text-gray-500">
                                        4–10 business days
                                    </span>

                                    <span className="mt-6 text-sm font-medium text-gray-900">
                                        $5.00
                                    </span>
                                </span>
                            </span>

                            {/* <!-- Not Checked: "hidden" --> */}
                            <svg className="size-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            {/* <!--
            Active: "border", Not Active: "border-2"
            Checked: "border-indigo-500", Not Checked: "border-transparent"
            --> */}
                            <span className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
                        </label>

                        {/* <!--
            Checked: "border-transparent", Not Checked: "border-gray-300"
            Active: "ring-2 ring-indigo-500"
        --> */}
                        <label aria-label="Express" aria-description="2–5 business days for $16.00" className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                            <input type="radio" name="delivery-method" value="Express" className="sr-only" />

                            <span className="flex flex-1">
                                <span className="flex flex-col">
                                    <span className="block text-xl font-medium text-gray-900">
                                        Degen
                                    </span>

                                    <span className="mt-1 flex items-center text-sm text-gray-500">
                                        2–5 business days
                                    </span>

                                    <span className="mt-6 text-sm font-medium text-gray-900">
                                        $16.00
                                    </span>
                                </span>
                            </span>
                            {/* <!-- Not Checked: "hidden" --> */}
                            <svg className="size-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {/* <!--
            Active: "border", Not Active: "border-2"
            Checked: "border-indigo-500", Not Checked: "border-transparent"
            --> */}
                            <span className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
                        </label>
                    </div>
                </fieldset>
            </section>

            <section className="my-5 px-3 flex flex-col gap-4">
                <div className="w-full sm:w-2/5">
                    <label htmlFor="asset" className="text-base font-medium text-slate-700 tracking-widest uppercase">
                        Choose a buy-in asset
                    </label>

                    <div className="mt-2">
                        <select
                            id="asset"
                            name="asset"
                            className="w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-lg tracking-wider text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        >
                            <option>$DEGEN</option>
                            <option>$ETH</option>
                        </select>
                    </div>
                </div>
            </section>

            <section className="my-5 px-3 flex flex-col gap-4">
                <fieldset>
                    <legend className="text-base font-medium text-slate-700 tracking-widest uppercase">
                        Choose a game type
                    </legend>

                    <div className="mt-2 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        {/* <!--
            Checked: "border-transparent", Not Checked: "border-gray-300"
            Active: "ring-2 ring-indigo-500"
        --> */}
                        <label aria-label="Standard" aria-description="4–10 business days for $5.00" className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                            <input type="radio" name="delivery-method" value="Standard" className="sr-only" />

                            <span className="flex flex-1">
                                <span className="flex flex-col">
                                    <span className="block text-sm font-medium text-gray-900">
                                        Heads Up
                                    </span>

                                    <span className="mt-1 flex items-center text-sm text-gray-500">
                                        No additinal rewards
                                    </span>

                                    <span className="mt-6 text-sm font-medium text-gray-900">
                                        FREE
                                    </span>
                                </span>
                            </span>

                            {/* <!-- Not Checked: "hidden" --> */}
                            <svg className="size-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            {/* <!--
            Active: "border", Not Active: "border-2"
            Checked: "border-indigo-500", Not Checked: "border-transparent"
            --> */}
                            <span className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
                        </label>

                        {/* <!--
            Checked: "border-transparent", Not Checked: "border-gray-300"
            Active: "ring-2 ring-indigo-500"
        --> */}
                        <label aria-label="Express" aria-description="2–5 business days for $16.00" className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                            <input type="radio" name="delivery-method" value="Express" className="sr-only" />

                            <span className="flex flex-1">
                                <span className="flex flex-col">
                                    <span className="block text-sm font-medium text-gray-900">
                                        Table
                                    </span>

                                    <span className="mt-1 flex items-center text-sm text-gray-500">
                                        Earn 5% on ALL buy-ins
                                    </span>

                                    <span className="mt-6 text-sm font-medium text-gray-900">
                                        FREE
                                    </span>
                                </span>
                            </span>
                            {/* <!-- Not Checked: "hidden" --> */}
                            <svg className="size-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {/* <!--
            Active: "border", Not Active: "border-2"
            Checked: "border-indigo-500", Not Checked: "border-transparent"
            --> */}
                            <span className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
                        </label>
                    </div>
                </fieldset>
            </section>

            <section className="my-5 px-3 flex flex-col gap-4">
                <fieldset>
                    <legend className="text-base font-medium text-slate-700 tracking-widest uppercase">
                        Choose a deck type
                    </legend>

                    <div className="mt-2 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        {/* <!--
            Checked: "border-transparent", Not Checked: "border-gray-300"
            Active: "ring-2 ring-indigo-500"
        --> */}
                        <label aria-label="Standard" aria-description="4–10 business days for $5.00" className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                            <input type="radio" name="delivery-method" value="Standard" className="sr-only" />

                            <span className="flex flex-1">
                                <span className="flex flex-col">
                                    <span className="block text-sm font-medium text-gray-900">
                                        Single Deck
                                    </span>

                                    <span className="mt-1 flex items-center text-sm text-gray-500">
                                        4–10 business days
                                    </span>

                                    <span className="mt-6 text-sm font-medium text-gray-900">
                                        $5.00
                                    </span>
                                </span>
                            </span>

                            {/* <!-- Not Checked: "hidden" --> */}
                            <svg className="size-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            {/* <!--
            Active: "border", Not Active: "border-2"
            Checked: "border-indigo-500", Not Checked: "border-transparent"
            --> */}
                            <span className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
                        </label>

                        {/* <!--
            Checked: "border-transparent", Not Checked: "border-gray-300"
            Active: "ring-2 ring-indigo-500"
        --> */}
                        <label aria-label="Express" aria-description="2–5 business days for $16.00" className="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none">
                            <input type="radio" name="delivery-method" value="Express" className="sr-only" />

                            <span className="flex flex-1">
                                <span className="flex flex-col">
                                    <span className="block text-sm font-medium text-gray-900">
                                        WAGMI
                                    </span>

                                    <span className="mt-1 flex items-center text-sm text-gray-500">
                                        2–5 business days
                                    </span>

                                    <span className="mt-6 text-sm font-medium text-gray-900">
                                        $16.00
                                    </span>
                                </span>
                            </span>
                            {/* <!-- Not Checked: "hidden" --> */}
                            <svg className="size-5 text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {/* <!--
            Active: "border", Not Active: "border-2"
            Checked: "border-indigo-500", Not Checked: "border-transparent"
            --> */}
                            <span className="pointer-events-none absolute -inset-px rounded-lg border-2" aria-hidden="true"></span>
                        </label>
                    </div>
                </fieldset>
            </section>

            <section className="my-5 px-3 flex flex-col gap-4">
                <div className="w-full sm:w-2/5">
                    <label htmlFor="asset" className="text-base font-medium text-slate-700 tracking-widest uppercase">
                        Choose a seating time
                    </label>

                    <div className="mt-2">
                        <select
                            id="asset"
                            name="asset"
                            className="w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-lg tracking-wider text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                        >
                            <option value="900" disabled>15 Minutes</option>
                            <option value="1800" disabled>30 Minutes</option>
                            <option value="3600" disabled>60 Minutes</option>
                            <option value="5400" disabled>2 Hours</option>
                            <option value="10800" disabled>3 Hours</option>
                            <option value="21600" disabled>6 Hours</option>
                            <option value="43200" disabled>12 Hours</option>
                            <option value="86400" selected>24 Hours</option>
                        </select>
                    </div>
                </div>
            </section>

            <div className="my-10 mx-10 border-t border-slate-300" />

            <section className="my-5 px-3 flex flex-col gap-4">
                <div className="w-full sm:w-2/3">
                    <label htmlFor="table-name" className="text-base font-medium text-slate-700 tracking-widest uppercase">
                        Table Name (optional)
                    </label>

                    <div className="mt-2">
                        <input
                            type="text"
                            id="table-name"
                            name="table-name"
                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            placeholder="Saturday Night Hold-em"
                        />
                    </div>
                </div>

                <div className="w-full sm:w-2/3">
                    <label htmlFor="table-banner" className="text-base font-medium text-slate-700 tracking-widest uppercase">
                        Table Banner (optional)
                    </label>

                    <div className="mt-2">
                        <input
                            type="text"
                            id="table-banner"
                            name="table-banner"
                            className="block w-full rounded-md bg-white px-3 py-2 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            placeholder="https://location-of-banner-image"
                        />
                    </div>
                </div>
            </section>

            <section className="mt-10 mb-5 text-center">
                <Button
                    onClick={_handleCreateTable}
                    // disabled={!isConnected || isSendTxPending}
                    isLoading={isSendTxPending}
                    className="text-2xl font-bold tracking-wider"
                >
                    Create My Table
                </Button>

                {isSendTxError && renderError(sendTxError)}

                {txHash && (
                    <div className="mt-2 text-xs">
                        <div>Hash: {truncateAddress(txHash)}</div>

                        <div>
                            Status:{" "}
                            {isConfirming
                                ? "Confirming..."
                                : isConfirmed
                                ? "Confirmed!"
                                : "Pending"}
                        </div>
                    </div>
                )}
            </section>

        </main>
    )
}
