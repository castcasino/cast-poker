'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import axios from 'axios'
import { formatEther } from 'viem'

import { truncateAddress } from '~/lib/truncateAddress'

type Table = {
    buyin: string;
    seated: string[];
}

export default function Players({ tableid }: { tableid: string}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()
    const [table, setTable] = useState<Table>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://cast.casino/v1/poker/table/' + tableid)
            setTable(response.data)
        }
        fetchData()
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

                {table && <div className="grid grid-cols-1 gap-4">
                    {Object.keys(table.seated).map((_seatid) => (
                        <div key="_seatid" className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                            <div className="shrink-0">
                                {/* <img
                                    className="size-10 rounded-full"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                /> */}
                            </div>

                            <div className="min-w-0 flex-1">
                                <a href="javascript://" className="focus:outline-none">
                                    <span className="absolute inset-0" aria-hidden="true"></span>

                                    <p className="text-sm font-medium text-gray-900">
                                        {truncateAddress(table.seated[Number(_seatid)])}
                                    </p>

                                    <p className="truncate text-sm text-gray-500">
                                        Buy-in : {formatEther(BigInt(table.buyin))} $ETH
                                    </p>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>}
            </div>

        </main>
    )
}
