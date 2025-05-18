'use client'

import { useEffect, useState, useCallback } from 'react'

import Link from 'next/link'

import { usePlausible } from 'next-plausible'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import {
    useAccount,
    useWriteContract,
    useWaitForTransactionReceipt,
    // useSwitchChain,
    // useChainId,
} from 'wagmi'
import { BaseError, UserRejectedRequestError } from 'viem'

import castPokerAbi from '../../abi/CastPoker'

import { Asset } from '../../components/ui/host/Asset'
import { Button } from '../../components/ui/Button'
import { BuyIn } from '../../components/ui/host/BuyIn'
import { DeckType } from '../../components/ui/host/DeckType'
import { GameType } from '../../components/ui/host/GameType'
import { Network } from '../../components/ui/host/Network'
// import { Optional } from '../../components/ui/host/Optional'
import { Seating } from '../../components/ui/host/Seating'

import { truncateAddress } from '../../lib/truncateAddress'

const renderError = (error: Error | null) => {
    if (!error) return null

    if (error instanceof BaseError) {
        const isUserRejection = error.walk((e) => e instanceof UserRejectedRequestError)

        if (isUserRejection) {
            return <div class="text-red-500 text-xs mt-1">Rejected by user.</div>
        }
    }

    return <div class="text-red-500 text-xs mt-1">{error.message}</div>
}

/* Set constants. */
const CAST_POKER_ADDRESS = '0x3Dabb4d559C176ee7A149222404Af0deB7f8e889'

export default function Host({ tableid }: { tableid: string}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()
    const [txHash, setTxHash] = useState<string | null>(null)

    const [asset, setAsset] = useState('eth')
    const [buyIn, setBuyIn] = useState('100000000000000')
    const [deckType, setDeckType] = useState('single')
    const [gameType, setGameType] = useState('community')
    const [network, setNetwork] = useState('base')
    const [token, setToken] = useState<`0x${string}`>('0x0000000000000000000000000000000000000000')
    const [timeToSit, setTimeToSit] = useState('86400')
    // const [tableName, setTableName] = useState('')

    const plausible = usePlausible()
    const { address, isConnected } = useAccount()
    // const chainId = useChainId()

//     const handleTableName = useCallback((event) => {
// console.log('HANDLE TABLE NAME', event.target.value)
//         setTableName(event.target.value)
//     }, [ tableName ])

    const handleBuyIn = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setBuyIn(event.target.value)
    }, [])

    const handleAsset = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('ASSET IS CURRENTLY RESTRICTED!')
        setAsset(event.target.value)
    }, [])

    const handleDeckType = useCallback((event: string) => {
        return console.log('DECK TYPE IS CURRENTLY RESTRICTED!')
        setDeckType(event)
    }, [])

    const handleGameType = useCallback((event: string) => {
        return console.log('GAME TYPE IS CURRENTLY RESTRICTED!')
        setGameType(event)
    }, [])

    const handleNetwork = useCallback((event: string) => {
        return console.log('NETWORK IS CURRENTLY RESTRICTED!')
        setNetwork(event)
    }, [])

    const handleSeating = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeToSit(event.target.value)
    }, [])

    const {
        writeContract,
        error: sendTxError,
        isError: isSendTxError,
        isPending: isSendTxPending,
    } = useWriteContract()

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash: txHash as `0x${string}`,
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

    /* Handle asset. */
    useEffect(() => {
        if (asset === 'eth') {
            setToken('0x0000000000000000000000000000000000000000')
        }

        if (asset === 'degen') {
            setToken('0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed')
        }
    }, [ asset ])

    if (!isSDKLoaded) {
        return <div>Loading. Please wait...</div>
    }

    /**
     * Create Venue
     *
     * Executes either a new Bench or Table in the CasinoPoker contract.
     */
    const _handleCreateVenue = async () => {
        /* Build package. */
        const pkg = {
            gameType,
            deckType,
            network,
            asset,
            buyIn,
            timeToSit,
        }

        /* Track new venues. */
        plausible('createVenue', {
            props: {
                user: context?.user,
                tableid,
                ...pkg,
            },
        })

// return alert(JSON.stringify(pkg, null, 2))

        /* Set function name. */
        const functionName = gameType === 'community' ? 'setTable' : 'setBench'

// TODO Allow host to set their own seed.
        const seed = 0n
// TODO Allow host to set max seating.
        const numSeats = 23
// FIXME Change fomo to a boolean.
        const fomo = deckType === 'single' ? 0 : 1
// TODO Allow host to set their own theme.
        const theme = 0

        /* Make on-chain execution request. */
        writeContract(
            {
                abi: castPokerAbi,
                address: CAST_POKER_ADDRESS,
                functionName,
                args: [
                    token,              // token
                    seed,               // seed
                    BigInt(buyIn),      // buy-in
                    BigInt(timeToSit),  // tts
                    numSeats,           // seats
                    fomo,               // fomo
                    theme,              // theme
                ],
            },
            {
                onSuccess: (hash) => {
console.log('TRANSACTION SUCCESSFUL', hash)
                    setTxHash(hash)
                },
            }
        )
    }

    return (

    )
}
