'use client'

import { useEffect, useCallback, useState, useMemo } from 'react'

import sdk, {
    FrameNotificationDetails,
    type FrameContext,
} from '@farcaster/frame-sdk'

import {
    useAccount,
    useSendTransaction,
    useSignMessage,
    useSignTypedData,
    useWaitForTransactionReceipt,
    useDisconnect,
    useConnect,
    useSwitchChain,
    useChainId,
} from 'wagmi'
import { base, optimism } from 'wagmi/chains'

import { BaseError, UserRejectedRequestError } from 'viem'

import { config } from '~/components/providers/WagmiProvider'
import { Button } from '~/components/ui/Button'
import { Footer } from '~/components/ui/Footer'
import { Header } from '~/components/ui/Header'

import { truncateAddress } from '~/lib/truncateAddress'

const renderError = (error: Error | null) => {
    if (!error) return null

    if (error instanceof BaseError) {
        const isUserRejection = error.walk((e) => e instanceof UserRejectedRequestError)

        if (isUserRejection) {
            return <div className="text-red-500 text-xs mt-1">Rejected by user.</div>
        }
    }

    return <div className="text-red-500 text-xs mt-1">{error.message}</div>
}


export default function Blank(
    { title }: { title?: string } = { title: 'Blank — Cast Poker' }
) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()
    const [isContextOpen, setIsContextOpen] = useState(false)
    const [txHash, setTxHash] = useState<string | null>(null)
    const [addFrameResult, setAddFrameResult] = useState("")
    const [notificationDetails, setNotificationDetails] =
        useState<FrameNotificationDetails | null>(null)
    const [sendNotificationResult, setSendNotificationResult] = useState("")

    const { address, isConnected } = useAccount()
    const chainId = useChainId()

    const {
        sendTransaction,
        error: sendTxError,
        isError: isSendTxError,
        isPending: isSendTxPending,
    } = useSendTransaction()

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash: txHash as `0x${string}`,
        })

    const {
        signTypedData,
        error: signTypedError,
        isError: isSignTypedError,
        isPending: isSignTypedPending,
    } = useSignTypedData()

    const { disconnect } = useDisconnect()
    const { connect } = useConnect()

    const {
        switchChain,
        error: switchChainError,
        isError: isSwitchChainError,
        isPending: isSwitchChainPending,
    } = useSwitchChain()

    const handleSwitchChain = useCallback(() => {
        switchChain({ chainId: chainId === base.id ? optimism.id : base.id })
    }, [ switchChain, chainId ])

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

    const openUrl = useCallback(() => {
        sdk.actions.openUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
    }, [])

    const openWarpcastUrl = useCallback(() => {
        sdk.actions.openUrl("https://warpcast.com/~/compose")
    }, [])

    const close = useCallback(() => {
        sdk.actions.close()
    }, [])

    const toggleContext = useCallback(() => {
        setIsContextOpen((prev) => !prev)
    }, [])

    if (!isSDKLoaded) {
        return <div>Loading. Please wait...</div>
    }

    return (
        <div className="h-screen flex flex-col justify-between">
            <Header />

            <main className="w-full sm:w-[640px] mx-auto py-4 px-2 flex-1 overflow-y-scroll">
                <h1 className="text-2xl font-bold text-center mb-4">
                    [ {title} ]
                </h1>

                <div className="mb-4">
                    <h2 className="text-4xl font-bold text-rose-400 italic tracking-widest">
                        Casino Context
                    </h2>

                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et obcaecati illum numquam totam voluptate quis quae quasi fugit tempore facere, soluta debitis dolore labore natus magni aliquid corrupti quos iste.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    )
}
