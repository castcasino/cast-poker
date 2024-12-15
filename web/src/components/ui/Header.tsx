'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
// import Link from 'next/link'

// import sdk, { type FrameContext } from '@farcaster/frame-sdk'
import sdk from '@farcaster/frame-sdk'

import { formatEther } from 'viem'
import numeral from 'numeral'

import { truncateAddress } from '~/lib/truncateAddress'

import splashIcon from '~/../public/splash.png'

export function Header({ tableid }: { tableid: string }) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    // const [context, setContext] = useState<FrameContext>()
    const [table, setTable] = useState<string>('')
    const [quotes, setQuotes] = useState<string>('')
    const [potValueDollars, setPotValueDollars] = useState<string>('0')
    const [potValueCents, setPotValueCents] = useState<string>('00')

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://cast.casino/v1/poker/table/' + tableid, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).catch(err => console.error(err))
console.log('RESPONSE (tableid)', response)

            const data = await response
                .json()
                .catch(err => console.error(err))

            if (data) {
                setTable(data)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://cast.casino/v1/quotes', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }).catch(err => console.error(err))
console.log('RESPONSE (quotes)', response)

            const data = await response
                .json()
                .catch(err => console.error(err))

            if (data) {
                setQuotes(data)
console.log('DATA (quotes)', data)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        /* Validate quotes. */
        if (quotes === '') {
            return
        }

        /* Validate table. */
        if (table === '') {
            return
        }

        const potValue = formatEther(table.pot)
        const usdValue = quotes?.ETH?.USD || 0
        const potUsdValue = Number(potValue) * usdValue

        // const dollars = potUsdValue.toString().split('.')[0]
        // const cents = potUsdValue.toString().split('.')[1]

        const dollars = numeral(potUsdValue).format('0,0')
        const cents = numeral(potUsdValue).format('.00[00]')

        setPotValueDollars(dollars)
        setPotValueCents(cents)
    }, [ quotes, table ])

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

                        <div className="sm:ml-2 grid gap-x-4 gap-y-1">
                            <p className="text-sm sm:text-base font-medium text-lime-500 tracking-widest uppercase group-hover:text-lime-400">
                                Table # {tableid}
                            </p>

                            <p className="-mt-2 text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                                hosted by {truncateAddress(table?.host) || 'Guest'}
                            </p>

                            <p className="text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                                # Seats : {table?.seated?.length} of {table?.seats}
                            </p>

                            <div className="grid grid-cols-2">
                                <p className="text-center text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                                    $ETH {JSON.stringify(quotes?.ETH?.USD)}
                                </p>

                                <p className="text-center text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                                    $DEGEN {JSON.stringify(quotes?.DEGEN?.USD)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

            <section className="cursor-help px-3 sm:px-5 py-2 flex flex-col items-center rounded-l-lg rounded-bl-none border-l-[3px] border-lime-400 bg-lime-200">
                <span className="text-2xl font-medium text-lime-600 uppercase tracking-widest whitespace-nowrap">
                    Table Pot
                </span>

                <span className="-mt-1.5 flex flex-row text-6xl font-bold text-lime-800">
                    ${potValueDollars}
                    <sup className="mt-4 pl-1 flex flex-col items-start text-2xl">
                        {potValueCents}
                        <span className="-mt-2 font-bold text-sm text-lime-600 tracking-widest">
                            USD
                        </span>
                    </sup>
                </span>
            </section>

        </header>
    )
}
