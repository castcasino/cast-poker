'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
// import Link from 'next/link'

// import sdk, { type FrameContext } from '@farcaster/frame-sdk'
import sdk from '@farcaster/frame-sdk'

import { formatEther } from 'viem'
import axios from 'axios'
import numeral from 'numeral'

import { truncateAddress } from '../../lib/truncateAddress'

import splashIcon from '../../../public/splash.png'

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
    // const [table, setTable] = useState<Table>()
    // const [quotes, setQuotes] = useState<Quotes>()
    // const [potValueDollars, setPotValueDollars] = useState<string>('0')
    // const [potValueCents, setPotValueCents] = useState<string>('00')

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
}
