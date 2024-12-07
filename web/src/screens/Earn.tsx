'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

export default function Earn({ tableid }: { tableid: string}) {
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
            <h1 className="text-2xl font-bold text-amber-600 text-center mb-4">
                Earn @ Table # {tableid}
            </h1>

            <div className="mb-4">
                <h2 className="text-4xl font-bold text-rose-400 italic tracking-widest">
                    Promote by Cast (Earn 5%)
                </h2>

                <Link href={`/${tableid}/promote`} className={'px-5 py-2 text-2xl font-medium text-slate-800 bg-blue-200 border border-amber-400 rounded-md'}>
                    Promote a Table/Game
                </Link>

                {(context && <p className="text-slate-700">
                    { JSON.stringify(context) }
                </p>)}

                {(!context && <p className="text-slate-700">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vero velit at sequi consequuntur.
                    Sed suscipit possimus veritatis temporibus vero beatae quam, assumenda eaque commodi repellat alias quod molestias, voluptas impedit.
                </p>)}

                <h2 className="text-4xl font-bold text-rose-400 italic tracking-widest">
                    Host a Table (Earn 5%)
                </h2>

                <Link href={`/${tableid}/host`} className={'px-5 py-2 text-2xl font-medium text-slate-800 bg-blue-200 border border-amber-400 rounded-md'}>
                    Host a Table/Game
                </Link>
            </div>

            <ol className="text-slate-700">
                <li>Link Your Twitter Account</li>
            </ol>
        </main>
    )
}
