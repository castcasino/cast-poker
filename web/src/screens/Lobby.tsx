'use client'

import { useEffect, useState } from 'react'
import sdk, { type FrameContext } from '@farcaster/frame-sdk'

export default function Lobby({ tableid }: { tableid: string}) {
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
            <section className="p-3">
                <h1 className="text-4xl font-bold text-rose-400 italic tracking-widest">
                    Table # {tableid}
                </h1>

                <div>
                    <h2 className="text-slate-700 font-bold text-2xl">
                        {context?.user.displayName || 'Guest'} Wallet
                    </h2>
                </div>

            </section>

            <section className="mt-10 px-5 w-full grid grid-cols-5">
                <div className="flex justify-center">
                    <img
                        src="https://assets.cast.casino/cards_01/AS.svg"
                        className="w-12 sm:w-16 border sm:border-2 border-slate-700"
                    />
                </div>

                <div className="flex justify-center">
                    <img
                        src="https://assets.cast.casino/cards_01/AD.svg"
                        className="w-12 sm:w-16 border sm:border-2 border-slate-700"
                    />
                </div>

                <div className="flex justify-center">
                    <img
                        src="https://assets.cast.casino/cards_01/KH.svg"
                        className="w-12 sm:w-16 border sm:border-2 border-slate-700"
                    />
                </div>

                <div className="flex justify-center">
                    <img
                        src="https://assets.cast.casino/cards_01/KC.svg"
                        className="w-12 sm:w-16 border sm:border-2 border-slate-700"
                    />
                </div>

                <div className="flex justify-center">
                    <img
                        src="https://assets.cast.casino/cards_01/2D.svg"
                        className="w-12 sm:w-16 border sm:border-2 border-slate-700"
                    />
                </div>
            </section>

            <section className="mt-10 w-full flex flex-row justify-center">
                <img
                    src="https://assets.cast.casino/cards_01/covers/abstract.svg"
                    className="mx-5 w-16 border-2 border-slate-700"
                />

                <img
                    src="https://assets.cast.casino/cards_01/covers/astronaut.svg"
                    className="mx-5 w-16 border-2 border-slate-700"
                />

                <img
                    src="https://assets.cast.casino/cards_01/covers/blue.svg"
                    className="mx-5 w-16 border-2 border-slate-700"
                />

                <img
                    src="https://assets.cast.casino/cards_01/covers/frog.svg"
                    className="mx-5 w-16 border-2 border-slate-700"
                />

                <img
                    src="https://assets.cast.casino/cards_01/covers/fish.svg"
                    className="mx-5 w-16 border-2 border-slate-700"
                />
            </section>
        </main>
    )
}
