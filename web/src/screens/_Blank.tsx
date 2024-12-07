'use client'

import { useEffect, useState } from 'react'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

export default function Blank({ tableid }) {
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
                Blank
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
