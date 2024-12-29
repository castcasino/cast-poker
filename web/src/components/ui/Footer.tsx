import { useEffect, useState, useCallback } from 'react'
import { redirect } from 'next/navigation'

import { usePlausible } from 'next-plausible'

import sdk, { type FrameContext } from '@farcaster/frame-sdk'

import {
    useAccount,
    useReadContract,
    useWriteContract,
    useWaitForTransactionReceipt,
    // useSwitchChain,
    // useChainId,
} from 'wagmi'
import { BaseError, formatEther, UserRejectedRequestError } from 'viem'

import axios from 'axios'
import moment from 'moment'
import numeral from 'numeral'

import castPokerAbi from '~/abi/CastPoker'
import erc20Abi from '~/abi/ERC20'

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

type Table = {
    token: `0x${string}`;
    buyin: string;
    tts: string;
    pot: string;
    createdAt: number;
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

/* Set constants. */
const CAST_POKER_ADDRESS = '0x3Dabb4d559C176ee7A149222404Af0deB7f8e889'

export function Footer({ tableid }: { tableid: string }) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()
    const [txHash, setTxHash] = useState<string | null>(null)

    const [table, setTable] = useState<Table>()
    const [nextTableId, setNextTableId] = useState('4')

    const [quotes, setQuotes] = useState<Quotes>()
    const [buyInValueDollars, setBuyInValueDollars] = useState<string>('0')
    const [buyInValueCents, setBuyInValueCents] = useState<string>('.00')

    const plausible = usePlausible()
    const { address, isConnected } = useAccount()
    // const chainId = useChainId()

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
        const fetchData = async () => {
            const response = await axios.get('https://cast.casino/v1/poker/table/next/' + context?.user?.fid || '0')
            setNextTableId(response.data.tableid)
        }
        fetchData()
    }, [])

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

        const buyinValue = formatEther(BigInt(table.buyin))
        const buyinUsdValue = Number(buyinValue) * usdValue

        const dollars = numeral(buyinUsdValue).format('0,0')
        const cents = numeral(buyinUsdValue).format('.00[00]')

        setBuyInValueDollars(dollars)
        setBuyInValueCents(cents)
    }, [
        quotes?.DEGEN?.USD?.price,
        quotes?.ETH?.USD?.price,
        table?.buyin,
    ])

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
        redirect('/' + nextTableId)
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

    const buyIn = useCallback(async () => {
        /* Initialize locals. */
        let value

        /* Set function name. */
        const functionName = 'buyIn'

        /* Set seed. */
// TODO Allow host to set their own seed.
        const seed = '0'

        /* Validate wallet connection. */
        if (!isConnected || !address) {
            return alert('Your wallet is NOT connected!')
        }

        /* Track buy-ins. */
        plausible('buyIn', {
            props: {
                user: context?.user,
                tableid,
                seed,
            },
        })

        if (typeof table === 'undefined') {
            return alert('Error: Table data.')
        }

        /* Handle buy-in value. */
        // NOTE: Only required for "native" asset buy-ins.
        if (table.token === '0x0000000000000000000000000000000000000000') {
            value = BigInt(table.buyin)
        } else {
            /* Request (token) allowance. */
            const allowance = await useReadContract({
                address: table.token,
                abi: erc20Abi,
                functionName: 'allowance',
                args: [ address, CAST_POKER_ADDRESS ],
            })
console.log('TOKEN ALLOWANCE', allowance)
alert(JSON.stringify(allowance))
return
        }

        /* Make on-chain execution request. */
        writeContract(
            {
                abi: castPokerAbi,
                address: CAST_POKER_ADDRESS,
                functionName,
                args: [
                    BigInt(tableid),    // table id
                    BigInt(seed),       // seed
                ],
                value,                  // undefined for ERC-20 tokens
            },
            {
                onSuccess: (hash) => {
console.log('TRANSACTION SUCCESSFUL', hash)
                    setTxHash(hash)
                },
            }
        )
    // }, [ table, writeContract ])
    }, [
        address,
        context?.user,
        isConnected,
        plausible,
        tableid,
        writeContract,
    ])

    return (
        <>
            {/* (Hidden) Status Bar */}
            {(txHash || isSendTxError) && <section className="px-5 w-full sm:w-[640px] mx-auto h-[35px] z-10 flex justify-between items-center bg-stone-800 border-t-[3px] border-amber-400">
                <span className="text-xs font-medium text-amber-100 tracking-wider">
                    {isSendTxError && renderError(sendTxError)}
                </span>

                {txHash && <span className="text-sm font-medium text-amber-100 tracking-wider">
                    Hash: {truncateAddress(txHash)}
                </span>}

                <span className="text-xs font-medium text-amber-100 tracking-wider">
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
                        Showdown By
                    </span>

                    {table && <span className="text-xs sm:text-sm font-bold text-amber-200 tracking-wider">
                        {moment.unix(Number(table.tts) + Number(table.createdAt)).format('lll')}
                    </span>}
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

                        <span className="animate-bounce flex flex-row mt-1 text-3xl sm:text-4xl font-bold text-lime-900 tracking-wider group-hover:text-lime-100">
                            <sup className="mt-4 pr-0.5 flex flex-col items-start text-2xl">
                                $
                            </sup>
                            {buyInValueDollars}
                            <sup className="mt-4 pl-0.5 flex flex-col items-start text-2xl">
                                {buyInValueCents}
                            </sup>
                        </span>

                        <span className="-mt-4 text-xs font-bold text-lime-600 tracking-wider group-hover:text-lime-100 uppercase">
                            ❭❭❭ click here ❬❬❬
                        </span>
                    </button>

                    {/* Next Table Button */}
                    <button onClick={handleNextTable} className="px-3 py-2 flex flex-col items-center justify-center border-2 border-r-0 border-amber-500 bg-stone-900 rounded-l-xl hover:bg-stone-700">
                        <span className="text-xs sm:text-xl font-bold text-amber-200 tracking-widest">
                            Next Table
                        </span>

                        {/* <small className="-mt-1 text-[0.6em] font-medium italic text-amber-400 tracking-widest">
                            # {nextTableId}
                        </small> */}

                        <span className="text-sm sm:text-lg font-bold text-amber-400 tracking-wider">
                            $ETH
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
