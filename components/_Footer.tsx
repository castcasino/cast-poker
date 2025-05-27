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

import castPokerAbi from '../../abi/CastPoker'
import erc20Abi from '../../abi/ERC20'

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

export function Footer({ tableid }: { tableid: string }) {
    // const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    // const [context, setContext] = useState<FrameContext>()
    // const [txHash, setTxHash] = useState<string | null>(null)

    // const [table, setTable] = useState<Table>()
    // const [nextTableId, setNextTableId] = useState('4')

    // const [quotes, setQuotes] = useState<Quotes>()
    // const [buyInValueDollars, setBuyInValueDollars] = useState<string>('0')
    // const [buyInValueCents, setBuyInValueCents] = useState<string>('.00')

    // const [allowance, setAllowance] = useState(0)

    // const plausible = usePlausible()
    // const { address, isConnected } = useAccount()
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


}
