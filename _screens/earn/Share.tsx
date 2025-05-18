'use client'

import { useEffect, useState, useCallback } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import { Button } from '../../components/ui/Button'
import earnRewardsAni from '../../../public/lottie/earn-rewards.gif'

export default function Share({ tableid }: { tableid: string}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()

    const castPromo = useCallback(() => {
        sdk.actions.openUrl('https://warpcast.com/~/compose')
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

    )
}
