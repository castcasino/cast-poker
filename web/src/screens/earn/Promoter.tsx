'use client'

import { useEffect, useState, useCallback } from 'react'

import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import { Button } from '~/components/ui/Button'

export default function Promote({ tableid }: { tableid: string}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()

    const castPromo = useCallback(() => {
        sdk.actions.openUrl('https://warpcast.com/~/compose')
    }, [])

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
        <main className="w-full">
            <section>
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                        {/* <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
                        <Link href={`/${tableid}/promoter`} className="w-1/2 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                            Promoter
                        </Link>

                        <Link href={`/${tableid}/host`} className="w-1/2 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Host
                        </Link>
                    </nav>
                </div>
            </section>

            <section className="my-5 px-3">
                <h1 className="text-2xl font-bold text-amber-600 text-center mb-4">
                    {context?.user.displayName || 'Guest'} earn 3% promoting Table # {tableid}
                </h1>

                <p className="mb-4 text-slate-700">
                    Cast Casino offers the <span className="font-bold">EASIEST</span> referral rewards in all of Farcaster!
                    Simply recast <span className="font-bold">ANY</span> of our table games and you&rsquo;re done!
                </p>

                <Button onClick={castPromo}>
                    Promote Table # {tableid} NOW!
                </Button>

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

                <div className="my-4 rounded-md bg-yellow-50 p-4 border border-yellow-200">
                    <div className="flex">
                        <div className="shrink-0">
                            <svg className="size-10 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path
                                    fillRule="evenodd"
                                    d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                        </div>

                        <div className="ml-3">
                            <h3 className="text-base font-bold text-yellow-800">
                                You Should Know!
                            </h3>

                            <div className="mt-2 flex flex-col gap-2 text-sm text-yellow-800 leading-5 sm:leading-6">
                                <p>
                                    Earnings from the <span className="font-bold">Cast Casino Rewards Program (CCRP)</span> are calculated and paid out based on <span className="font-bold">DIRECT ENGAGEMENT</span> from (re-)casts.
                                </p>

                                <p>
                                    When a player creates a NEW session, via a different frame or link, referral rewards for the NEW session will be redirected to the NEW source of their latest engagement.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}
