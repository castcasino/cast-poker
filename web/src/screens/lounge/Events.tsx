'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

export default function Events({ tableid }: { tableid: string}) {
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
        <main className="w-full">
            <section>
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                        {/* <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
                        <Link href={`/${tableid}/leaderboard`} className="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Leaderboard
                        </Link>

                        <Link href={`/${tableid}/events`} className="w-1/3 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                            Events
                        </Link>

                        <Link href={`/${tableid}/mysuite`} className="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            My Suite
                        </Link>
                    </nav>
                </div>
            </section>

            <h1 className="text-2xl font-bold text-amber-600 text-center mb-4">
                Events
            </h1>

            <div className="mb-4">
                <h2 className="text-4xl font-bold text-rose-400 italic tracking-widest">
                    Table # {tableid}
                </h2>

                {(context && <p className="text-slate-700">
                    { JSON.stringify(context) }
                </p>)}

                {(!context && <p className="text-slate-700">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero velit at sequi consequuntur. Sed suscipit possimus veritatis temporibus vero beatae quam, assumenda eaque commodi repellat alias quod molestias, voluptas impedit.
                </p>)}
            </div>
        </main>
    )
}
