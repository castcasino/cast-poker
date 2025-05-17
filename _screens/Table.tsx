'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import axios from 'axios'
import numeral from 'numeral'

// import { truncateAddress } from '../lib/truncateAddress'
// import { truncateHash } from '../lib/truncateHash'

import desktopBanner from '../../public/banners/fairplay-gaming-desktop.jpg'
import mobileBanner from '../../public/banners/fairplay-gaming-mobile.jpg'

type Table = {
    community: Community;
    seated: Player[];
}

type Player = {
    address: string;
}

type Community = {
    flop1: Deal;
    flop2: Deal;
    flop3: Deal;
    turn: Deal;
    river: Deal;
}

type Deal = {
    card: string;
    carIdx: number;
    blockIdx: number;
    blockHash: string;
}

const BLANK_HASH = '0x0000000000000000000000000000000000000000000000000000000000000000'

export default function Table({ tableid }: { tableid: string}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()
    const [table, setTable] = useState<Table>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://cast.casino/v1/poker/table/' + tableid)
            setTable(response.data)
        }
        fetchData()
    }, [ tableid ])

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

const CARD_COVER = 'abstract'

    return (

    )
}
