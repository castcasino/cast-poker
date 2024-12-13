import { useEffect, useState, useCallback } from 'react'
import { redirect } from 'next/navigation'

import { usePlausible } from 'next-plausible'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import {
    // useAccount,
    useWriteContract,
    useWaitForTransactionReceipt,
    // useSwitchChain,
    // useChainId,
} from 'wagmi'
import { BaseError, UserRejectedRequestError } from 'viem'

import { abi } from '~/abi/CastPoker'

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

export function Footer({ tableid }: { tableid: string }) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()
    const [txHash, setTxHash] = useState<string | null>(null)

    const [nextTableId, setNextTableId] = useState('1337')

    const plausible = usePlausible()
    // const { address, isConnected } = useAccount()
    // const chainId = useChainId()

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

    const handleNextTable = () => {
        redirect('/0')
        return
        setNextTableId('')
    }

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

    const buyIn = useCallback(() => {
// alert('buy-in')
        /* Set function name. */
        // const functionName = gameType === 'community' ? 'setTable' : 'setBench'
        const functionName = 'buyIn'

        /* Set seed. */
// TODO Allow host to set their own seed.
        const seed = '0'

        /* Track buy-ins. */
        plausible('buyIn', {
            props: {
                user: context?.user,
                tableid,
                seed,
            },
        })

        /* Make on-chain execution request. */
        writeContract(
            {
                abi,
                address: CAST_POKER_CONTRACT_ADDR,
                functionName,
                args: [
                    BigInt(tableid),    // table id
                    BigInt(seed),       // seed
                ],
            },
            {
                onSuccess: (hash) => {
console.log('TRANSACTION SUCCESSFUL', hash)
                    setTxHash(hash)
                },
            }
        )
    }, [ writeContract ])

    return (
        <>


{txHash && (
    <div className="mt-2 text-xs">
        <div className="">

        </div>

        <div className="">

        </div>
    </div>
)}
            {/* (Hidden) Status Bar */}
            {(txHash || isSendTxError) && <section className="px-5 w-full sm:w-[640px] mx-auto h-[35px] z-10 flex justify-between items-center bg-stone-800 border-t-[3px] border-amber-400">
                <span className="text-sm font-medium text-amber-100 tracking-wider">
                    {isSendTxError && renderError(sendTxError)}
                </span>

                {txHash && <span className="text-sm font-medium text-amber-100 tracking-wider">
                    Hash: {truncateAddress(txHash)}
                </span>}

                <span className="text-sm font-medium text-amber-100 tracking-wider">
                    [
                        Status :&nbsp;
                        {isConfirming
                            ? 'Confirming...'
                            : isConfirmed
                                ? 'Confirmed!'
                                : 'Pending'}
                    ]
                </span>
            </section>}

            <footer className="w-full sm:w-[640px] mx-auto h-[100px] z-10 flex justify-between bg-stone-200 border-t-[3px] border-amber-400">

                {/* Game Status Window */}
                <section className="cursor-help px-3 flex flex-col items-center justify-center border-r-[3px] rounded-r-lg rounded-tr-none border-amber-400 bg-stone-400">
                    <span className="text-xs sm:text-lg font-medium text-amber-200 tracking-widest">
                        Showdown In
                    </span>

                    <span className="text-lg sm:text-2xl font-bold text-amber-200 tracking-wider">
                        ~ 11h:11m
                    </span>
                </section>

                <div className="py-2 flex flex-row gap-3">
                    {/* Buy-in Button */}
                    <button
                        onClick={buyIn}
                        className="group px-3 flex flex-col items-center justify-center border-2 border-lime-500 bg-lime-200 rounded-xl shadow hover:bg-lime-800"
                        disabled={isSendTxPending}
                    >
                        <span className="text-xs sm:text-lg font-bold text-lime-700 tracking-widest group-hover:text-lime-100">
                            ☆ Buy-In Is Only ☆
                        </span>

                        <span className="animate-bounce mt-1 text-3xl sm:text-4xl font-bold text-lime-900 tracking-wider group-hover:text-lime-100">
                            $8.88
                        </span>

                        <span className="-mt-2 text-xs font-bold text-lime-600 tracking-wider group-hover:text-lime-100 uppercase">
                            ❭ ❭ ❭ click here ❬ ❬ ❬
                        </span>
                    </button>

                    {/* Next Table Button */}
                    <button onClick={handleNextTable} className="px-3 py-2 flex flex-col items-center justify-center border-2 border-r-0 border-amber-500 bg-stone-900 rounded-l-xl hover:bg-stone-700">
                        <span className="text-xs sm:text-xl font-bold text-amber-200 tracking-widest">
                            Next Table
                        </span>

                        <small className="-mt-1 text-[0.6em] font-medium italic text-amber-400 tracking-widest">
                            # {nextTableId}
                        </small>

                        <span className="text-sm sm:text-lg font-bold text-amber-400 tracking-wider">
                            $DEGEN
                            <span className="-mt-1.5 block text-xs sm:text-sm">
                                on Base
                            </span>
                        </span>
                    </button>

                </div>
            </footer>
        </>
    )
}
