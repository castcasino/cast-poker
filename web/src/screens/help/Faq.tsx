'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

export default function Help({ tableid }: { tableid: string}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()

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

    return (
        <main className="w-full bg-white">
            <section>
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                        {/* <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
                        <Link href={`/${tableid}/faq`} className="w-1/3 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                            FAQ
                        </Link>

                        <Link href={`/${tableid}/fairplay`} className="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Fairplay
                        </Link>

                        <Link href={`/${tableid}/agent`} className="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Agent
                        </Link>
                    </nav>
                </div>
            </section>

            <div className="mx-auto max-w-7xl px-3 py-6 sm:py-8">
                <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
                    <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                        Frequently asked questions for {tableid}
                    </h2>

                    {(context?.user?.displayName && <p>
                        {context.user.displayName},
                        feel free to ask any questions by DM to our Farcaster account @CastCasino.
                    </p>)}

                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        <div className="pt-6">
                            <dt>
                                {/* <!-- Expand/collapse question button --> */}
                                <button type="button" className="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" aria-expanded="false">
                                    <span className="text-base/7 font-semibold">
                                        How do I Buy-In to a table?
                                    </span>

                                    <span className="ml-6 flex h-7 items-center">
                                        {/* <!--
                        Icon when question is collapsed.

                        Item expanded: "hidden", Item collapsed: ""
                        --> */}
                                        <svg className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                        </svg>
                                        {/* <!--
                        Icon when question is expanded.

                        Item expanded: "", Item collapsed: "hidden"
                        --> */}
                                        <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                        </svg>
                                    </span>
                                </button>
                            </dt>

                            <dd className="mt-2 pr-12" id="faq-0">
                                <p className="text-base/7 text-gray-600">
                                    Simply connect a wallet to your Farcaster/Warpcast account and click the &ldquo;Buy-in&rdquo; button to start the transaction.
                                </p>
                            </dd>
                        </div>

                        {/* <!-- More questions... --> */}
                    </dl>
                </div>
            </div>
        </main>
    )
}
