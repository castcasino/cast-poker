'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

export function Header({ tableid }: { tableid: string }) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()

    useEffect(() => {
        console.log('HEADER (tableid)', tableid)
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
        <header className="w-full sm:w-[640px] mx-auto h-[100px] z-10 flex justify-between bg-sky-500">
            <section className="w-2/3">
                {(context && <a href="javascript://" className="group block shrink-0">
                    <div className="flex items-center">
                        <Image
                            className="inline-block size-9 rounded-full"
                            src={'https://imagedelivery.net/BXluQx4ige9GuW0Ia56BHw/57f8600f-2e51-4549-8cc4-f80e4c681800/rectcrop3'}
                            alt={context?.user?.displayName || ''}
                            width={50}
                            height={50}
                        />

                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                {context.user.displayName}
                            </p>

                            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                                {context.user.username}
                            </p>

                            <small className="text-xs">
                                {context?.user?.pfpUrl}
                            </small>
                        </div>
                    </div>
                </a>)}

                {/* {(context && <p className="text-slate-700">
                    { JSON.stringify(context) }
                </p>)} */}

                {(!context && <p className="text-slate-700 text-xs">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Vero velit at sequi consequuntur.
                </p>)}

            </section>

            <section className="m-3 px-5 py-2 flex flex-col items-center rounded-lg border-2 border-lime-500 bg-lime-200">
                <span className="text-2xl font-medium text-lime-600">
                    Total Pot
                </span>

                <span className="-mt-2 flex flex-row text-4xl font-bold text-lime-800">
                    $88
                    <sup className="mt-2 flex flex-col items-end text-sm">
                        .1337
                        <span className="-mt-1 font-bold text-xs text-lime-600 tracking-widest">
                            USD
                        </span>
                    </sup>
                </span>
            </section>

        </header>
    )
}
