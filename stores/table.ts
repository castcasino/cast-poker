/* Import modules. */
import { defineStore } from 'pinia'
// import { ethers } from 'ethers'

/**
 * Table Store
 */
export const useTableStore = defineStore('table', {
    state: () => ({
        /**
         * Flags
         *
         * 1. Dark mode
         * 2. Unconfirmed transactions
         */
        flags: null,

        /**
         * Locale
         *
         * Controls the localization language.
         * (default is english)
         */
        locale: null,

        /**
         * Notices
         *
         * System notices that nag/remind the user of some important action or
         * information; which can be permanently disabled ("Do Not Show Again")
         * via checkbox and confirmation.
         *
         * NOTE: Unique 1-byte (hex) codes (up to 255) are used to reduce the size
         *       of this storage field.
         */
        notices: null,
    }),

    getters: {
        // TODO
    },

    actions: {
        async buyIn() {
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
            // plausible('buyIn', {
            //     props: {
            //         user: context?.user,
            //         tableid,
            //         seed,
            //     },
            // })

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
        }
    },

    persist: true,
})
