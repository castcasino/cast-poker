'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import splashIcon from '~/../public/splash.png'

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
        <header className="w-full sm:w-[640px] mx-auto h-[100px] z-10 flex justify-between bg-slate-800 border-b-[3px] border-lime-400">
            <section className="p-2">
                {(context && <Link href={`/${tableid}/mysuite`} className="group block shrink-0">
                    <div className="flex items-center">
                        <Image
                            className="inline-block size-9 rounded-full"
                            src={'https://wsrv.nl/?url=' + context?.user?.pfpUrl || splashIcon}
                            alt={context?.user?.displayName || ''}
                        />

                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                {context.user.displayName}
                            </p>

                            <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700">
                                {context.user.username}
                            </p>
                        </div>
                    </div>
                </Link>)}

                {(!context && <Link href={`/${tableid}/mysuite`} className="group block shrink-0">
                    <div className="flex items-center">
                        <Image
                            className="inline-block size-9 rounded-full"
                            src={splashIcon}
                            alt=""
                        />

                        <div className="ml-1">
                            <p className="text-base font-medium text-lime-100 group-hover:text-lime-200">
                                Guest User
                            </p>

                            <p className="text-xs font-medium text-lime-300 group-hover:text-lime-400">
                                @guest_user
                            </p>
                        </div>
                    </div>
                </Link>)}

            </section>

            <section className="cursor-help px-5 py-2 flex flex-col items-center rounded-l-lg rounded-bl-none border-l-[3px] border-lime-400 bg-lime-200">
                <span className="text-2xl font-medium text-lime-600 uppercase tracking-widest">
                    Total Pot
                </span>

                <span className="-mt-2 flex flex-row text-6xl font-bold text-lime-800">
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
