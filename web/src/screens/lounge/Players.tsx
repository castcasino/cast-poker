'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

export default function Players({ tableid }: { tableid: string}) {
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
                        <Link href={`/${tableid}/players`} className="w-1/3 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                            Players
                        </Link>

                        <Link href={`/${tableid}/tables`} className="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Tables
                        </Link>

                        <Link href={`/${tableid}/mysuite`} className="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            My Suite
                        </Link>
                    </nav>
                </div>
            </section>

            <div className="px-3 py-5">
                <h1 className="text-2xl font-bold text-amber-600 text-center mb-4">
                    Players for Table # {tableid}
                </h1>

                <div className="mb-4">
                    {(context && <h3 className="text-2xl font-medium text-slate-700">
                        {context?.user?.displayName} check out our Players!
                    </h3>)}
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                        <div className="shrink-0">
                            <img
                                className="size-10 rounded-full"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <a href="javascript://" className="focus:outline-none">
                                <span className="absolute inset-0" aria-hidden="true"></span>
                                <p className="text-sm font-medium text-gray-900">Leslie Alexander</p>
                                <p className="truncate text-sm text-gray-500">Co-Founder / CEO</p>
                            </a>
                        </div>
                    </div>

                    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                        <div className="shrink-0">
                            <img
                                className="size-10 rounded-full"
                                src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <a href="javascript://" className="focus:outline-none">
                                <span className="absolute inset-0" aria-hidden="true"></span>
                                <p className="text-sm font-medium text-gray-900">Michael Foster</p>
                                <p className="truncate text-sm text-gray-500">Co-Founder / CTO</p>
                            </a>
                        </div>
                    </div>

                    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                        <div className="shrink-0">
                            <img
                                className="size-10 rounded-full"
                                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <a href="javascript://" className="focus:outline-none">
                                <span className="absolute inset-0" aria-hidden="true"></span>
                                <p className="text-sm font-medium text-gray-900">Dries Vincent</p>
                                <p className="truncate text-sm text-gray-500">Business Relations</p>
                            </a>
                        </div>
                    </div>

                    <div className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                        <div className="shrink-0">
                            <img
                                className="size-10 rounded-full"
                                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <a href="javascript://" className="focus:outline-none">
                                <span className="absolute inset-0" aria-hidden="true"></span>
                                <p className="text-sm font-medium text-gray-900">Lindsay Walton</p>
                                <p className="truncate text-sm text-gray-500">Front-end Developer</p>
                            </a>
                        </div>
                    </div>

                </div>
            </div>

        </main>
    )
}
