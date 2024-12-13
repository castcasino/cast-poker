'use client'

import { useEffect, useState, useCallback } from 'react'
// import { useEffect, useState } from 'react'

import Link from 'next/link'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import {
    useAccount,
    useSendTransaction,
    useWaitForTransactionReceipt,
    // useSwitchChain,
    // useChainId,
} from 'wagmi'
import { BaseError, UserRejectedRequestError } from 'viem'

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

// function SendEth() {
//     const { isConnected, chainId } = useAccount()

//     const {
//         sendTransaction,
//         data,
//         error: sendTxError,
//         isError: isSendTxError,
//         isPending: isSendTxPending,
//     } = useSendTransaction()

//     const { isLoading: isConfirming, isSuccess: isConfirmed } =
//         useWaitForTransactionReceipt({
//             hash: data,
//         })

//     const toAddr = useMemo(() => {
//         // Protocol guild address
//         return chainId === base.id
//             ? "0x32e3C7fD24e175701A35c224f2238d18439C7dBC"
//             : "0xB3d8d7887693a9852734b4D25e9C0Bb35Ba8a830"
//     }, [ chainId ])

//     const handleSend = useCallback(() => {
//         sendTransaction({
//             to: toAddr,
//             value: 1n,
//         })
//     }, [ toAddr, sendTransaction ])

//     return (
//         <>
//             <Button
//                 onClick={handleSend}
//                 disabled={!isConnected || isSendTxPending}
//                 isLoading={isSendTxPending}
//             >
//                 Send Transaction (eth)
//             </Button>

//             {isSendTxError && renderError(sendTxError)}

//             {data && (
//                 <div className="mt-2 text-xs">
//                     <div>Hash: {truncateAddress(data)}</div>

//                     <div>
//                         Status:{" "}
//                         {isConfirming
//                             ? "Confirming..."
//                             : isConfirmed
//                             ? "Confirmed!"
//                             : "Pending"}
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

export default function Host({ tableid }: { tableid: string}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()

    const [txHash, setTxHash] = useState<string | null>(null)

    const [asset, setAsset] = useState('eth')
    const [buyIn, setBuyIn] = useState('100000000000000')
    const [deckType, setDeckType] = useState('single')
    const [gameType, setGameType] = useState('community')
    const [network, setNetwork] = useState('base')
    const [seating, setSeating] = useState('86400')
    // const [tableName, setTableName] = useState('')

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
        setSeating(event.target.value)
    }, [ seating ])


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

    /**
     * Create Venue
     *
     * Executes either a new Bench or Table in the CasinoPoker contract.
     */
    const _handleCreateVenue = async () => {

        const pkg = {
            gameType,
            deckType,
            network,
            asset,
            buyIn,
            seating
        }

        return alert(JSON.stringify(pkg, null, 2))

        sendTransaction(
            {
                // call yoink() on Yoink contract
                to: '0x4bBFD120d9f352A0BEd7a014bd67913a2007a878',
                data: '0x9846cd9efc000023c0',
            },
            {
                onSuccess: (hash) => {
                    setTxHash(hash);
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
                    value={seating}
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
                            Status:{' '}
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
