'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import axios from 'axios'
import { formatEther } from 'viem'

import { truncateAddress } from '../../lib/truncateAddress'

type Table = {
    buyin: string;
    seated: string[];
}

export default function Lounge({ tableid }: { tableid: string}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()
    const [table, setTable] = useState<Table>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://cast.casino/v1/poker/table/' + tableid)
console.log('RESPONSE (lounge)', response)
            setTable(response.data)
        }
        fetchData()
    })

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
        <main class="w-full">
            <section>
                <div class="border-b border-gray-200">
                    <nav class="-mb-px flex" aria-label="Tabs">
                        {/* <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
                        <Link href={`/${tableid}/lounge`} class="w-1/3 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                            Lounge
                        </Link>

                        <Link href={`/${tableid}/mysuite`} class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            My Suite
                        </Link>

                        <Link href={`/${tableid}/concierge`} class="w-1/3 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Concierge
                        </Link>
                    </nav>
                </div>
            </section>

            <div class="px-3 py-5">
                <h1 class="text-2xl font-bold text-amber-600 text-center mb-4">
                    Lounge for Table # {tableid}
                </h1>

                <div class="mb-4">
                    {(context && <h3 class="text-2xl font-medium text-slate-700">
                        {context?.user?.displayName} check out our Lounge!
                    </h3>)}
                </div>

                {table && <div class="grid grid-cols-1 gap-4">
                    {Object.keys(table.seated).map((_seatid) => (
                        <div key="_seatid" class="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400">
                            <div class="shrink-0">
                                {/* <img
                                    class="size-10 rounded-full"
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                /> */}
                            </div>

                            <div class="min-w-0 flex-1">
                                <a href="javascript://" class="focus:outline-none">
                                    <span class="absolute inset-0" aria-hidden="true"></span>

                                    <p class="text-sm font-medium text-gray-900">
                                        {truncateAddress(table.seated[Number(_seatid)])}
                                    </p>

                                    <p class="truncate text-sm text-gray-500">
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
