'use client'

import { useEffect, useState, useCallback } from 'react'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

export const sessionManager = () => {
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

    console.log('SESSION MANAGER HAS BEEN INITIALIZED!!')
}
