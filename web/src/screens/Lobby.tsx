'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import numeral from 'numeral'

// import { truncateAddress } from '~/lib/truncateAddress'
import { truncateHash } from '~/lib/truncateHash'
import splashIcon from '~/../public/splash.png'

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
            <div className="w-full h-[80px] bg-gradient-to-b from-stone-500 to-stone-300 border-b-2 border-stone-500">
                {/* Banner Advertisement */}
            </div>

            <section className="hidden p-3">
                <h2 className="text-slate-700 font-bold text-xl tracking-widest">
                    Welcome Back
                </h2>

                <h2 className="text-slate-700 font-bold text-3xl tracking-widest">
                    {context?.user.displayName || 'Guest'}
                </h2>
            </section>

            <section className="w-full">
                <div className="w-full px-2 py-2 sm:px-5 sm:py-5 grid grid-cols-5 bg-gradient-to-b from-green-500 to-green-200 border-2 border-b-0 border-green-600">
                    <div className="flex justify-center">
                        <img
                            src="https://assets.cast.casino/cards_01/AS.svg"
                            className="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        />
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="https://assets.cast.casino/cards_01/AD.svg"
                            className="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        />
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="https://assets.cast.casino/cards_01/KH.svg"
                            className="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        />
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="https://assets.cast.casino/cards_01/KC.svg"
                            className="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        />
                    </div>

                    <div className="flex justify-center">
                        <img
                            src="https://assets.cast.casino/cards_01/2D.svg"
                            className="w-16 sm:w-24 border sm:border-2 border-slate-700"
                        />
                    </div>
                </div>

                <Link href={`/${tableid}/fairplay`} className="w-full px-2 pb-3 flex flex-col gap-1 bg-gradient-to-b from-green-200 to-green-100 border-2 border-t-0 border-green-600 rounded-b-3xl">
                    <span className="text-lg font-bold text-center text-green-800 tracking-widest uppercase">
                        Fairplay Community Cards
                    </span>

                    <span className="-mt-2 text-base font-medium text-center text-green-600 tracking-wider uppercase">
                        Blocks #{numeral(23443189).format('0,0')} - #{numeral(23443193).format('0,0')}
                    </span>

                    <span className="text-xs font-medium text-green-800 tracking-wider">
                        <pre className="block truncate">
                            0x4ec179a76051ce8add89671ff7ced12e3da773f39d0e700c013941203ed3f7dd
                        </pre>

                        <pre className="block truncate">
                            0x78a8903613d155bb7d9d9fd74fff5e99c0d46031ea9985c1e3230e8e5bf0edd1
                        </pre>

                        <pre className="block truncate">
                            0x7bc240d924d4bdc79ff9b520cec8fc5fdb5e23d693fe8101ff16dcc6d9d8c460
                        </pre>

                        <pre className="block truncate">
                            0x9ea98dde5091bf3c50015639cf27c2550b9b41857d5391fdd8e39520631efef6
                        </pre>

                        <pre className="block truncate">
                            0x13bdbadaeb217c08069c2821f5183d2ada5e4fdb158133ecda0c338f04633f34
                        </pre>
                    </span>
                </Link>
            </section>

            <section className="flex flex-col items-center px-2 py-5">
                <h2 className="text-2xl font-medium text-slate-700 tracking-widest">
                    Players At The Showdown
                </h2>

                <div className="mt-2 w-full bg-rose-500 grid grid-cols-1 sm:grid-cols-2 gap-4">

                    <div className="flex flex-col gap-2">
                        <div>
                            {(context && <Link href={`/${tableid}/mysuite`} className="group block shrink-0">
                                <div className="flex items-center">
                                    <Image
                                        className="inline-block size-12 rounded-full"
                                        src={'https://wsrv.nl/?url=' + context?.user?.pfpUrl || splashIcon}
                                        alt={context?.user?.displayName || ''}
                                    />

                                    <div className="ml-2">
                                        <p className="text-lg font-medium text-lime-600 tracking-wider group-hover:text-lime-500">
                                            {context.user.displayName}
                                        </p>

                                        <p className="text-sm font-medium text-lime-800 tracking-wider group-hover:text-lime-600">
                                            {context.user.username}
                                        </p>
                                    </div>
                                </div>
                            </Link>)}

                            {(!context && <Link href={`/${tableid}/mysuite`} className="group block shrink-0">
                                <div className="flex items-center">
                                    <Image
                                        className="inline-block size-12"
                                        src={splashIcon}
                                        alt=""
                                    />

                                    <div className="ml-2">
                                        <p className="text-lg font-medium text-lime-600 tracking-wider group-hover:text-lime-500">
                                            Guest User
                                        </p>

                                        <p className="text-sm font-medium text-lime-800 tracking-wider group-hover:text-lime-600">
                                            @guest_user
                                        </p>
                                    </div>
                                </div>
                            </Link>)}
                        </div>

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
