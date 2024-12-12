'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

export default function Help({ tableid }: { tableid: string}) {
console.log('FAQ (tableid)', tableid)
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()

    /* Question handlers. */
    const [isShowingQ1, setIsShowingQ1] = useState(false)
    const [isShowingQ2, setIsShowingQ2] = useState(false)

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
                        Frequently Asked Questions
                    </h2>

                    <Link href="https://docs.cast.poker" target="_blank" className="block w-full sm:w-fit my-5 px-5 py-3 text-xl font-medium text-amber-200 text-center bg-blue-700 hover:bg-blue-500 border-2 border-blue-700 rounded-xl shadow">
                        Click here for Full Documentation
                    </Link>

                    {(context?.user?.displayName && <p>
                        {context.user.displayName},
                        feel free to ask any questions by DM to our Farcaster account @CastCasino.
                    </p>)}

                    <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                        <div className="pt-6">
                            <dt>
                                <button onClick={() => setIsShowingQ1(!isShowingQ1)} type="button" className="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" aria-expanded="false">
                                    <span className="text-xl font-semibold tracking-wider">
                                        How do I buy-in to a table?
                                    </span>

                                    <span className="ml-6 flex h-7 items-center">
                                        <svg className={`size-6 ${isShowingQ1 && 'hidden'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                        </svg>

                                        <svg className={`size-6 ${!isShowingQ1 && 'hidden'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                        </svg>
                                    </span>
                                </button>
                            </dt>

                            {isShowingQ1 && <dd className="mt-2 pr-12" id="faq-0">
                                <p className="text-base/7 text-gray-600 tracking-wide">
                                    Simply connect a wallet <em>(like Coinbase or Rainbow)</em> to your Farcaster/Warpcast account and click the <span className="font-bold">&ldquo;BUY-IN&rdquo;</span> button shown at the bottom of the window.
                                </p>
                            </dd>}
                        </div>

                        <div className="pt-6">
                            <dt>
                                <button onClick={() => setIsShowingQ2(!isShowingQ2)} type="button" className="flex w-full items-start justify-between text-left text-gray-900" aria-controls="faq-0" aria-expanded="false">
                                    <span className="text-xl font-semibold tracking-wider">
                                        How do I cashout from a table?
                                    </span>

                                    <span className="ml-6 flex h-7 items-center">
                                        <svg className={`size-6 ${isShowingQ2 && 'hidden'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                                        </svg>

                                        <svg className={`size-6 ${!isShowingQ2 && 'hidden'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                                        </svg>
                                    </span>
                                </button>
                            </dt>

                            {isShowingQ2 && <dd className="mt-2 pr-12" id="faq-0">
                                <p className="text-base/7 text-gray-600 tracking-wide">
                                    Payouts will be sent directly to your Farcaster/Warpcast connected account <span className="font-bold">IMMEDIATELY</span> following the Showdown.
                                </p>
                            </dd>}
                        </div>

                        {/* <!-- More questions... --> */}
                    </dl>
                </div>
            </div>
        </main>
    )
}
