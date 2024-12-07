'use client'

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
                                    Simply connect a wallet to your Farcaster/Warpcast account and click the "Buy-in" button to start the transaction.
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
