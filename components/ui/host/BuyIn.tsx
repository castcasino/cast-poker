'use client'

import { useEffect, useState } from 'react'

import axios from 'axios'
import numeral from 'numeral'

interface Props {
    token: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

type Tier = {
    value: string;
    display: string;
    displayUsd: string;
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

export function BuyIn({ token, value, onChange }: Props) {
    const [buyInOne, setBuyInOne] = useState<Tier>()
    const [buyInTwo, setBuyInTwo] = useState<Tier>()
    const [buyInThree, setBuyInThree] = useState<Tier>()
    const [buyInFour, setBuyInFour] = useState<Tier>()
    const [buyInFive, setBuyInFive] = useState<Tier>()
    const [buyInSix, setBuyInSix] = useState<Tier>()
    const [buyInSeven, setBuyInSeven] = useState<Tier>()
    const [quotes, setQuotes] = useState<Quotes>()

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('https://cast.casino/v1/quotes')
            setQuotes(response.data)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (quotes) {
            switch(token) {
            case '0x0000000000000000000000000000000000000000':
                setBuyInOne({
                    value: '10000000000000000',
                    display: '0.01···',
                    displayUsd: numeral(quotes?.ETH.USD.price / 100).format('0,0.00') || '0'
                })
                setBuyInTwo({
                    value: '5000000000000000',
                    display: '0.005··',
                    displayUsd: numeral(quotes?.ETH.USD.price / 200).format('0,0.00') || '0'
                })
                setBuyInThree({
                    value: '1000000000000000',
                    display: '0.001··',
                    displayUsd: numeral(quotes?.ETH.USD.price / 1000).format('0,0.00') || '0'
                })
                setBuyInFour({
                    value: '500000000000000',
                    display: '0.0005·',
                    displayUsd: numeral(quotes?.ETH.USD.price / 2000).format('0,0.00') || '0'
                })
                setBuyInFive({
                    value: '100000000000000',
                    display: '0.0001·',
                    displayUsd: numeral(quotes?.ETH.USD.price / 10000).format('0,0.00') || '0'
                })
                setBuyInSix({
                    value: '50000000000000',
                    display: '0.00005',
                    displayUsd: numeral(quotes?.ETH.USD.price / 20000).format('0,0.00') || '0'
                })
                setBuyInSeven({
                    value: '10000000000000',
                    display: '0.00001',
                    displayUsd: numeral(quotes?.ETH.USD.price / 100000).format('0,0.00') || '0'
                })
                break
            case '0x4ed4E862860beD51a9570b96d89aF5E1B0Efefed':
                setBuyInOne({
                    value: '1000000000000000000000',
                    display: '1000',
                    displayUsd: numeral(quotes?.DEGEN.USD.price * 1000).format('0,0.00') || '0'
                })
                setBuyInTwo({
                    value: '500000000000000000000',
                    display: '500·',
                    displayUsd: numeral(quotes?.DEGEN.USD.price * 500).format('0,0.00') || '0'
                })
                setBuyInThree({
                    value: '100000000000000000000',
                    display: '100·',
                    displayUsd: numeral(quotes?.DEGEN.USD.price * 100).format('0,0.00') || '0'
                })
                setBuyInFour({
                    value: '50000000000000000000',
                    display: '50··',
                    displayUsd: numeral(quotes?.DEGEN.USD.price * 50).format('0,0.00') || '0'
                })
                setBuyInFive({
                    value: '10000000000000000000',
                    display: '10··',
                    displayUsd: numeral(quotes?.DEGEN.USD.price * 10).format('0,0.00') || '0'
                })
                setBuyInSix({
                    value: '5000000000000000000',
                    display: '5···',
                    displayUsd: numeral(quotes?.DEGEN.USD.price * 5).format('0,0.00') || '0'
                })
                setBuyInSeven({
                    value: '1000000000000000000',
                    display: '1···',
                    displayUsd: numeral(quotes?.DEGEN.USD.price * 1).format('0,0.00') || '0'
                })
                break
            default:
                // TODO
            }
        }
    }, [ quotes, token ])

    return (
        <section className="my-5 px-3 flex flex-col gap-4">
            <div className="w-full sm:w-3/5">
                <label htmlFor="buy-in" className="text-base font-medium text-slate-700 tracking-widest uppercase">
                    Buy-in amount
                </label>

                <div className="mt-2">
                    <select
                        id="buy-in"
                        name="buy-in"
                        value={value}
                        onChange={onChange}
                        className="w-full appearance-none rounded-md bg-white py-2 px-3 font-mono text-2xl tracking-wider text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                    >
                        <option value={buyInOne?.value} disabled>{buyInOne?.display} | {(Number(buyInOne?.displayUsd) < 10) && <span>&nbsp;</span>}~${buyInOne?.displayUsd}</option>
                        <option value={buyInTwo?.value} disabled>{buyInTwo?.display} | {(Number(buyInTwo?.displayUsd) < 10) && <span>&nbsp;</span>}~${buyInTwo?.displayUsd}</option>
                        <option value={buyInThree?.value}>{buyInThree?.display} | {(Number(buyInThree?.displayUsd) < 10) && <span>&nbsp;</span>}~${buyInThree?.displayUsd}</option>
                        <option value={buyInFour?.value}>{buyInFour?.display} | {(Number(buyInFour?.displayUsd) < 10) && <span>&nbsp;</span>}~${buyInFour?.displayUsd}</option>
                        <option value={buyInFive?.value}>{buyInFive?.display} | {(Number(buyInFive?.displayUsd) < 10) && <span>&nbsp;</span>}~${buyInFive?.displayUsd}</option>
                        <option value={buyInSix?.value}>{buyInSix?.display} | {(Number(buyInSix?.displayUsd) < 10) && <span>&nbsp;</span>}~${buyInSix?.displayUsd}</option>
                        <option value={buyInSeven?.value}>{buyInSeven?.display} | {(Number(buyInSeven?.displayUsd) < 10) && <span>&nbsp;</span>}~${buyInSeven?.displayUsd}</option>
                    </select>
                </div>
            </div>
        </section>
    )
}
