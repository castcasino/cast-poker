'use client'

import { useEffect, useState } from 'react'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

export default function Help() {
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
        <main className="w-full sm:w-[640px] mx-auto py-4 px-2 flex-1 overflow-y-scroll">
            <main className="w-full sm:w-[640px] mx-auto py-4 px-2 flex-1 overflow-y-scroll">
                <h1 className="text-2xl font-bold text-center mb-4">
                    Help
                </h1>

                <div className="mb-4">
                    <h2 className="text-4xl font-bold text-rose-400 italic tracking-widest">
                        Casino Context
                    </h2>

                    {(context && <p>
                        { JSON.stringify(context) }
                    </p>)}

                    {(!context && <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero velit at sequi consequuntur. Sed suscipit possimus veritatis temporibus vero beatae quam, assumenda eaque commodi repellat alias quod molestias, voluptas impedit.
                    </p>)}
                </div>
            </main>
        </main>
    )
}
