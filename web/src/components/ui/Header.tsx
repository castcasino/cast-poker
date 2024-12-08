'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
// import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import splashIcon from '~/../public/splash.png'

export function Header({ tableid }: { tableid: string }) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    // const [context, setContext] = useState<FrameContext>()

    useEffect(() => {
        const load = async () => {
            // setContext(await sdk.context)
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
        <header className="w-full sm:w-[640px] mx-auto h-[100px] z-10 flex justify-between bg-slate-800 border-b-[3px] border-lime-400">
            <section className="p-2">
                <div className="group block shrink-0">
                    <div className="flex items-center">
                        <Image
                            className="hidden sm:inline-block size-8 sm:size-16"
                            src={splashIcon}
                            alt=""
                        />

                        <div className="ml-2 grid grid-cols-2 gap-x-4 gap-y-1">
                            <p className="col-span-2 text-sm sm:text-base font-medium text-lime-500 tracking-widest uppercase group-hover:text-lime-400">
                                Table # {tableid}
                            </p>

                            <p className="text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                                Host : @shomari
                            </p>

                            <p className="text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                                # Players : 51
                            </p>

                            <p className="text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                                # Buy-ins : 72
                            </p>

                            <p className="text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                                # Decks : 3
                            </p>
                        </div>
                    </div>
                </div>

            </section>

            <section className="cursor-help px-5 py-2 flex flex-col items-center rounded-l-lg rounded-bl-none border-l-[3px] border-lime-400 bg-lime-200">
                <span className="text-2xl font-medium text-lime-600 uppercase tracking-widest whitespace-nowrap">
                    Table Pot
                </span>

                <span className="-mt-1.5 flex flex-row text-6xl font-bold text-lime-800">
                    $88
                    <sup className="mt-4 pl-1 flex flex-col items-start text-2xl">
                        .77
                        <span className="-mt-2 font-bold text-sm text-lime-600 tracking-widest">
                            USD
                        </span>
                    </sup>
                </span>
            </section>

        </header>
    )
}
