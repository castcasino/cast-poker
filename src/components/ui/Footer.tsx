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
// const PERMIT2_ADDRESS = '0x000000000022D473030F116dDEE9F6B43aC78BA3'
// const MAX_ALLOWANCE = BigInt(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff) // 2^256-1
const MAX_ALLOWANCE = BigInt('115792089237316195423570985008687907853269984665640564039457584007913129639935') // 2^256-1

export function Footer({ tableid }: { tableid: string }) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()
    const [txHash, setTxHash] = useState<string | null>(null)

    const [table, setTable] = useState<Table>()
    const [nextTableId, setNextTableId] = useState('4')

    const [quotes, setQuotes] = useState<Quotes>()
    const [buyInValueDollars, setBuyInValueDollars] = useState<string>('0')
    const [buyInValueCents, setBuyInValueCents] = useState<string>('.00')

    // const [allowance, setAllowance] = useState(0)

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
            const response = await axios
                .get('https://cast.casino/v1/poker/table/next/' + context?.user?.fid || '0')
            setNextTableId(response.data.tableid)
        }
        fetchData()
    }, [ context?.user?.fid])

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
    }, [ quotes, table ])

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

    const {
        data: contractAllowance,
        // error: readContractError,
        // isPending: isReadContractPending,
    } = useReadContract({
        address: table?.token,
        abi: erc20Abi,
        functionName: 'allowance',
        args: [ address || '0x', CAST_POKER_ADDRESS ],
        query: { enabled: !!address && !!table?.token },
    })

    useEffect(() => {
console.log('NEW ALLOWANCE ' + contractAllowance)
    }, [ contractAllowance ])

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash: txHash as `0x${string}`,
        })

    const buyIn = useCallback(async () => {
        /* Initialize locals. */
        // let functionName
        let value

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
            if (contractAllowance === 0n) {
console.log('REQUEST AN ALLOWANCE TO CONTINUE', MAX_ALLOWANCE)
                /* Set function name. */
                // functionName = 'approve'

                /* Make on-chain execution request. */
                writeContract(
                    {
                        abi: erc20Abi,
                        address: table.token,
                        functionName: 'approve',
                        args: [
                            CAST_POKER_ADDRESS, // spender / contract
                            MAX_ALLOWANCE,      // 2^256-1
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
return // FIXME Use useWaitForTransactionReceipt
            } else {
console.log('CONTRACT ALLOWANCE IS ' + contractAllowance)
            }
        }

        /* Set function name. */
        // functionName = 'buyIn'

        /* Make on-chain execution request. */
        writeContract(
            {
                abi: castPokerAbi,
                address: CAST_POKER_ADDRESS,
                functionName: 'buyIn',
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
    }, [
        address,
        context?.user,
        contractAllowance,
        isConnected,
        plausible,
        table,
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
                <section className="cursor-help px-3 flex flex-col items-center justify-center border-r-[3px] rounded-r-lg rounded-tr-none border-amber-400 bg-stone-900">
                    <span className="text-xs sm:text-sm font-medium text-amber-100 tracking-tight uppercase">
                        Showdown By
                    </span>

                    {table && <div className="flex flex-col gap-0 items-center">
                        <span className="text-base sm:text-lg font-bold text-amber-300 tracking-wider">
                            {moment.unix(Number(table.tts) + Number(table.createdAt)).format('MMM Do')}
                        </span>

                        <span className="text-base sm:text-lg font-bold text-amber-300 tracking-wider">
                            @ {moment.unix(Number(table.tts) + Number(table.createdAt)).format('H:mm A')}
                        </span>
                    </div>}
                </section>

                <div className="pb-2 flex">
                    {/* Buy-in Button */}
                    <button
                        onClick={buyIn}
                        className="group px-3 flex flex-col items-center justify-center border-2 border-t-0 border-lime-500 bg-lime-200 rounded-lg rounded-t-none shadow hover:bg-lime-900"
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
                </div>

                    {/* Next Table Button */}
                <button onClick={handleNextTable} className="group flex flex-row items-center gap-1 border-l-[3px] rounded-l-lg rounded-tl-none border-amber-400 bg-stone-900 hover:bg-stone-700">
                    <div className="pl-3 flex flex-col items-center justify-center">
                        <span className="text-xs sm:text-xl font-bold text-amber-100 tracking-tight">
                            Next Table
                        </span>

                        {/* <small className="-mt-1 text-[0.6em] font-medium italic text-amber-400 tracking-widest">
                            # {nextTableId}
                        </small> */}

                        <span className="text-xl sm:text-2xl font-bold text-amber-300 tracking-widest">
                            $ETH
                            <span className="-mt-1.5 block text-sm sm:text-base tracking-wider">
                                on Base
                            </span>
                        </span>
                    </div>

                    <div className="flex pr-1">
                        <svg className="size-6 text-amber-500 group-hover:text-yellow-500 group-hover:animate-pulse" data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"></path>
                        </svg>
                    </div>
                </button>
            </footer>
        </>
    )
}
