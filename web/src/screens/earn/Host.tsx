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

import { abi } from '~/abi/CastPoker'

import { Asset } from '~/components/ui/host/Asset'
import { Button } from '~/components/ui/Button'
import { BuyIn } from '~/components/ui/host/BuyIn'
import { DeckType } from '~/components/ui/host/DeckType'
import { GameType } from '~/components/ui/host/GameType'
import { Network } from '~/components/ui/host/Network'
// import { Optional } from '~/components/ui/host/Optional'
import { Seating } from '~/components/ui/host/Seating'

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

/* Set constants. */
const CAST_POKER_CONTRACT_ADDR = '0xD54f3183bB58fAe987F2D1752FFc37BaB4DBaA95'

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
    }, [ buyIn ])

    const handleAsset = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        return console.log('ASSET IS CURRENTLY RESTRICTED!')
        setAsset(event.target.value)
    }, [ asset ])

    const handleDeckType = useCallback((event: string) => {
        return console.log('DECK TYPE IS CURRENTLY RESTRICTED!')
        setDeckType(event)
    }, [ deckType ])

    const handleGameType = useCallback((event: string) => {
        return console.log('GAME TYPE IS CURRENTLY RESTRICTED!')
        setGameType(event)
    }, [ gameType ])

    const handleNetwork = useCallback((event: string) => {
        return console.log('NETWORK IS CURRENTLY RESTRICTED!')
        setNetwork(event)
    }, [ network ])

    const handleSeating = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
        setTimeToSit(event.target.value)
    }, [ timeToSit ])

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
                abi,
                address: CAST_POKER_CONTRACT_ADDR,
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
        <main className="w-full">
            <section>
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex" aria-label="Tabs">
                        {/* <!-- Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" --> */}
                        <Link href={`/${tableid}/promote`} className="w-1/2 border-b-2 border-transparent px-1 py-4 text-center text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
                            Promotion
                        </Link>

                        <Link href={`/${tableid}/host`} className="w-1/2 border-b-2 border-indigo-500 px-1 py-4 text-center text-lg font-medium text-indigo-600" aria-current="page">
                            Hosting
                        </Link>
                    </nav>
                </div>
            </section>

            <section className="my-5 px-3">
                <div className="w-full flex justify-center">
                    <h1 className="sm:px-10 text-4xl font-light text-rose-400 text-center italic leading-[55px]">
                        {context?.user.displayName || 'Guest'}, Earn <span className="text-5xl font-bold">5%</span> Of ALL Table Buy-ins By Hosting
                    </h1>
                </div>

                <p className="my-4 text-slate-700">
                    Cast Casino offers the <span className="font-bold">EASIEST</span> referral rewards in all of Farcaster!
                    Simply recast <span className="font-bold">ANY</span> of our table games and you&rsquo;re done!
                </p>

                <ol className="pl-10 list-decimal text-slate-700">
                    <li>
                        Earn <span className="text-xl font-bold text-rose-500">5%</span> on <span className="font-bold">EVERY</span> dollar wagered on your table .. <span className="font-bold">WIN or LOSE!</span>
                    </li>

                    <li>
                        Payouts are sent <span className="font-bold">DIRECTLY</span> to your Farcaster wallet
                    </li>

                    <li>
                        Payouts are sent <span className="font-bold">IMMEDIATELY</span> after play ends
                    </li>
                </ol>
            </section>

            <div className="flex flex-col gap-2">
                <GameType
                    value={gameType}
                    onClick={handleGameType}
                />

                <DeckType
                    value={deckType}
                    onClick={handleDeckType} />

                <Network
                    value={network}
                    onClick={handleNetwork} />

                <Asset
                    value={asset}
                    onChange={handleAsset} />

                <BuyIn
                    value={buyIn}
                    onChange={handleBuyIn} />

                <Seating
                    value={timeToSit}
                    onChange={handleSeating} />
            </div>

            {/* <div className="my-10 mx-10 border-t border-slate-300" /> */}

            {/* <Optional
                tableName={tableName}
                handleTableName={handleTableName}
            /> */}

            <section className="mt-5 mb-10 text-center">
                <Button
                    onClick={_handleCreateVenue}
                    // disabled={!isConnected || isSendTxPending}
                    disabled={isSendTxPending}
                    isLoading={isSendTxPending}
                    className="text-2xl font-bold tracking-wider"
                >
                    Create My Table
                </Button>

                {isConnected && <div>
                    My address is {address}
                </div>}

                {isSendTxError && renderError(sendTxError)}

                {txHash && (
                    <div className="mt-2 text-xs">
                        <div className="">
                            Hash: {truncateAddress(txHash)}
                        </div>

                        <div className="">
                            Status :&nbsp;
                            {isConfirming
                                ? 'Confirming...'
                                : isConfirmed
                                    ? 'Confirmed!'
                                    : 'Pending'}
                        </div>
                    </div>
                )}
            </section>
        </main>
    )
}
