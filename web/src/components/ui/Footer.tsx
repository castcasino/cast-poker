import { useCallback, useState } from 'react'

import {
    // useAccount,
    useSendTransaction,
    useWaitForTransactionReceipt,
    // useSwitchChain,
    // useChainId,
} from 'wagmi'

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

export function Footer({ tableid }: { tableid: string }) {
    const [txHash, setTxHash] = useState<string | null>(null)

    // const { address, isConnected } = useAccount()
    // const chainId = useChainId()

    const {
        sendTransaction,
        // error: sendTxError,
        // isError: isSendTxError,
        // isPending: isSendTxPending,
    } = useSendTransaction()

    const { isLoading: isConfirming, isSuccess: isConfirmed } =
        useWaitForTransactionReceipt({
            hash: txHash as `0x${string}`,
        })

    const sendTx = useCallback(() => {
        sendTransaction(
            {
                // call yoink() on Yoink contract
                to: "0x4bBFD120d9f352A0BEd7a014bd67913a2007a878",
                data: "0x9846cd9efc000023c0",
            },
            {
                onSuccess: (hash) => {
                    setTxHash(hash);
                },
            }
        )
    }, [ sendTransaction ])

    return (
        <footer className="w-full sm:w-[640px] mx-auto h-[100px] z-10 flex justify-between bg-stone-200 border-t-[3px] border-amber-400">
            {/* Game Status Window */}
            <section className="cursor-help px-3 flex flex-col items-center justify-center border-r-[3px] rounded-r-lg rounded-tr-none border-amber-400 bg-stone-400">
                <span className="text-xs sm:text-lg font-medium text-amber-200 tracking-widest">
                    Play Begins In
                </span>

                <span className="text-lg sm:text-2xl font-bold text-amber-200 tracking-wider">
                    ~ 11h:11m
                </span>

                <span className="text-xs">
                    [ {isConfirming} : {isConfirmed} ]
                </span>
            </section>

            <div className="py-2 flex flex-row gap-3">
                {/* Buy-in Button */}
                <button onClick={sendTx} className="group px-3 flex flex-col items-center justify-center border-2 border-lime-500 bg-lime-200 rounded-xl shadow hover:bg-lime-800">
                    <span className="text-xs sm:text-lg font-bold text-lime-700 tracking-widest group-hover:text-lime-100">
                        Buy-In Is Only
                    </span>

                    <span className="animate-bounce mt-1 text-3xl sm:text-4xl font-bold text-lime-900 tracking-wider group-hover:text-lime-100">
                        $8.88
                    </span>

                    {/* <span className="-mt-2 text-xs font-bold text-lime-600 tracking-wider group-hover:text-lime-100">
                        # buy-ins : 0
                    </span> */}
                </button>

                {/* Next Table Button */}
                <button className="px-3 py-2 flex flex-col items-center justify-center border-2 border-r-0 border-amber-500 bg-stone-900 rounded-l-xl hover:bg-stone-700">
                    <span className="text-xs sm:text-xl font-bold text-amber-200 tracking-widest">
                        Next Table
                    </span>

                    <small className="-mt-1 text-[0.6em] font-medium italic text-amber-400 tracking-widest">
                        {tableid}
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
    )
}
