'use client'

import { useEffect, useState } from 'react'
import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import numeral from 'numeral'

import { truncateAddress } from '~/lib/truncateAddress'
import { truncateHash } from '~/lib/truncateHash'

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

            <section className="mt-10 px-5 w-full">
                <div className="w-full px-3 sm:px-5 py-5 grid grid-cols-5 bg-amber-100 border-2 border-amber-300 rounded-2xl rounded-b-none">
                    <div className="flex justify-center">
                        <img
                            src="https://assets.cast.casino/cards_01/AS.svg"
                            className="w-14 sm:w-24 border sm:border-2 border-slate-700"
                        />
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="https://assets.cast.casino/cards_01/AD.svg"
                            className="w-14 sm:w-24 border sm:border-2 border-slate-700"
                        />
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="https://assets.cast.casino/cards_01/KH.svg"
                            className="w-14 sm:w-24 border sm:border-2 border-slate-700"
                        />
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="https://assets.cast.casino/cards_01/KC.svg"
                            className="w-14 sm:w-24 border sm:border-2 border-slate-700"
                        />
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="https://assets.cast.casino/cards_01/2D.svg"
                            className="w-14 sm:w-24 border sm:border-2 border-slate-700"
                        />
                    </div>
                </div>

                <div className="w-full px-5 py-3 flex flex-col gap-2 bg-amber-200 border-2 border-t-0 border-amber-300 rounded-b-2xl">
                    <span className="text-base font-medium text-amber-800 tracking-wider">
                        Fairplay Block #

                        <span className="block text-lg text-amber-600">
                            {numeral(23443189).format('0,0')}
                        </span>
                    </span>

                    <span className="text-base font-medium text-amber-800 tracking-wider">
                        Fairplay Block Hash

                        <pre className="block text-xs text-amber-600 truncate">
                            0x4ec179a76051ce8add89671ff7ced12e3da773f39d0e700c013941203ed3f7dd
                        </pre>
                    </span>
                </div>
            </section>

            <section className="flex flex-col items-center px-5 py-5">
                <h2 className="text-2xl font-medium text-slate-700 tracking-widest">
                    Players At The Showdown
                </h2>

                <div className="w-full bg-rose-500 grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="flex flex-col gap-2">
                        <div className="flex flex-row items-center gap-2">
                            <img
                                src="https://assets.cast.casino/cards_01/covers/abstract.svg"
                                className="mx-5 w-12 border-2 border-slate-700"
                            />

                            <div className="py-2 flex flex-col">
                                <span className="text-xs tracking-wider">
                                    Fairplay Block #

                                    <span className="block text-sm">
                                        {numeral(23443189).format('0,0')}
                                    </span>
                                </span>

                                <span className="text-xs tracking-wider">
                                    Fairplay Block Hash

                                    <pre className="block text-sm">
                                        {truncateHash('0x4ec179a76051ce8add89671ff7ced12e3da773f39d0e700c013941203ed3f7dd')}
                                    </pre>
                                </span>
                            </div>
                        </div>


                        <img
                            src="https://assets.cast.casino/cards_01/covers/abstract.svg"
                            className="mx-5 w-12 border-2 border-slate-700"
                        />
                    </div>

                    <div className="flex flex-col gap-2 bg-green-500">
                        <img
                            src="https://assets.cast.casino/cards_01/covers/astronaut.svg"
                            className="mx-5 w-12 border-2 border-slate-700"
                        />

                        <img
                            src="https://assets.cast.casino/cards_01/covers/astronaut.svg"
                            className="mx-5 w-12 border-2 border-slate-700"
                        />
                    </div>

                    <div className="flex flex-col gap-2 bg-green-500">
                        <img
                            src="https://assets.cast.casino/cards_01/covers/blue.svg"
                            className="mx-5 w-12 border-2 border-slate-700"
                        />

                        <img
                            src="https://assets.cast.casino/cards_01/covers/blue.svg"
                            className="mx-5 w-12 border-2 border-slate-700"
                        />
                    </div>

                    <div className="flex flex-col gap-2 bg-green-500">
                        <img
                            src="https://assets.cast.casino/cards_01/covers/frog.svg"
                            className="mx-5 w-12 border-2 border-slate-700"
                        />

                        <img
                            src="https://assets.cast.casino/cards_01/covers/frog.svg"
                            className="mx-5 w-12 border-2 border-slate-700"
                        />
                    </div>

                    <div className="flex flex-col gap-2 bg-green-500">
                        <img
                            src="https://assets.cast.casino/cards_01/covers/fish.svg"
                            className="mx-5 w-12 border-2 border-slate-700"
                        />

                        <img
                            src="https://assets.cast.casino/cards_01/covers/fish.svg"
                            className="mx-5 w-12 border-2 border-slate-700"
                        />
                    </div>

                </div>
            </section>

        </main>
    )
}
