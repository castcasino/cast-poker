'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
// import Link from 'next/link'

// import sdk, { type FrameContext } from '@farcaster/frame-sdk'
import sdk from '@farcaster/frame-sdk'

import { formatEther } from 'viem'
import axios from 'axios'
import numeral from 'numeral'

import { truncateAddress } from '../lib/truncateAddress'

import splashIcon from '../../public/splash.png'

type Table = {
    token: `0x${string}`;
    host: `0x${string}`;
    pot: string;
    seats: number;
    seated: Seat[];
}

type Seat = {
    address: string;
}

type Quotes = {
    ETH: Quote;
    DEGEN: Quote;
}

type Quote = {
    USD: Currency;
}

type Currency = {
    price: number;
}

export function Header({ tableid }: { tableid: string }) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    // const [context, setContext] = useState<FrameContext>()
    const [table, setTable] = useState<Table>()
    const [quotes, setQuotes] = useState<Quotes>()
    const [potValueDollars, setPotValueDollars] = useState<string>('0')
    const [potValueCents, setPotValueCents] = useState<string>('00')

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://cast.casino/v1/quotes')
            setQuotes(response.data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://cast.casino/v1/poker/table/' + tableid)
            setTable(response.data)
        }
        fetchData()
    }, [ tableid ])

    useEffect(() => {
        /* Validate quotes. */
        if (typeof quotes === 'undefined') {
            return
        }

        /* Validate table. */
        if (typeof table === 'undefined') {
            return
        }

        /* Initialize locals. */
        let usdValue

        /* Handle fiat value. */
// TODO Allow multiple tokens.
        if (table.token === '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed') {
            usdValue = quotes?.DEGEN?.USD?.price || 0
        } else {
            usdValue = quotes?.ETH?.USD?.price || 0
        }

        const potValue = formatEther(BigInt(table.pot))
        const potUsdValue = Number(potValue) * usdValue

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

                            {table && <p className="-mt-2 text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                                hosted by {truncateAddress(table.host) || 'Guest'}
                            </p>}

                            {table && <p className="-mt-1 text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                                # Seats : {table.seated.length} of {table.seats}
                            </p>}

                            {quotes && <div className="-mt-1 grid grid-cols-2">
                                <p className="text-center text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                                    $ETH {numeral(quotes.ETH.USD.price).format('0,0.0000')}
                                </p>

                                <p className="text-center text-xs sm:text-sm font-medium text-lime-300 group-hover:text-lime-400">
                                    $DEGEN {numeral(quotes.DEGEN.USD.price).format('0,0.0000')}
                                </p>
                            </div>}
                        </div>
                    </div>
                </div>

            </section>

            <section className="cursor-help px-3 sm:px-5 py-2 flex flex-col items-center rounded-l-lg rounded-bl-none border-l-[3px] border-lime-400 bg-lime-200">
                <span className="text-2xl font-medium text-lime-600 uppercase tracking-widest whitespace-nowrap">
                    Table Pot
                </span>

                <span className="-mt-1.5 flex flex-row text-6xl font-bold text-lime-800">
                    <sup className="mt-5 pr-0.5 flex flex-col items-start text-4xl">
                        $
                    </sup>
                    {potValueDollars}
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
