/* eslint-disable @next/next/no-img-element */

/* Import modules. */
import { ImageResponse } from 'next/og'
import axios from 'axios'

export const runtime = 'edge'

export const alt = 'Cast Poker'

export const size = {
    width: 600,
    height: 400,
}

export const contentType = 'image/png'

interface Props {
    params: Promise<{
        tableid: string
    }>
}

export default async function OgImage({ params }: Props) {
    /* Initialize locals. */
    let table

    const { tableid } = await params

    const response = await axios
        .get('https://cast.casino/v1/poker/table/' + tableid)
        .catch(err => console.error(err))
// console.log('RESPONSE', response)

    if (typeof response !== 'undefined') {
        table = response.data
    }

    if (table === null) {
        return new ImageResponse(
            (
                <div tw="w-full h-full flex flex-col justify-center items-center bg-red-300">
                    <h1 tw="text-6xl font-bold text-red-800 tracking-widest">
                        POKER TABLE ERROR!
                    </h1>
                </div>
            ),
            { ...size }
        )
    }

    if (typeof table === 'undefined') {
        return new ImageResponse(
            (
                <div tw="w-full h-full flex flex-col justify-center items-center bg-red-800">
                    <section tw="flex items-center">
                        <img
                            src="https://assets.cast.casino/poker-table.png"
                            tw="h-20 w-20"
                            alt="poker table"
                        />

                        <span tw="pl-5 text-red-200 text-4xl font-light tracking-tight">
                            Table # {tableid} Is Unset
                        </span>
                    </section>

                    <section tw="mt-10 flex">
                        <img
                            src="https://assets.cast.casino/cards_01/covers/astronaut.svg"
                            tw="mx-1 w-26 border-2 border-slate-700"
                            alt="unset card of astronaut"
                        />

                        <img
                            src="https://assets.cast.casino/cards_01/covers/astronaut.svg"
                            tw="mx-1 w-26 border-2 border-slate-700"
                            alt="unset card of astronaut"
                        />

                        <img
                            src="https://assets.cast.casino/cards_01/covers/astronaut.svg"
                            tw="mx-1 w-26 border-2 border-slate-700"
                            alt="unset card of astronaut"
                        />

                        <img
                            src="https://assets.cast.casino/cards_01/covers/astronaut.svg"
                            tw="mx-1 w-26 border-2 border-slate-700"
                            alt="unset card of astronaut"
                        />

                        <img
                            src="https://assets.cast.casino/cards_01/covers/astronaut.svg"
                            tw="mx-1 w-26 border-2 border-slate-700"
                            alt="unset card of astronaut"
                        />
                    </section>
                </div>
            ),
            { ...size }
        )
    }

    return new ImageResponse(
        (
            <div tw="w-full h-full flex flex-col justify-center items-center bg-green-700">
                <section tw="flex items-center">
                    <img
                        src="https://assets.cast.casino/poker-table.png"
                        tw="h-20 w-20"
                        alt="poker table"
                    />

                    <span tw="pl-5 text-green-100 text-4xl font-light tracking-tight">
                        Buy-In! Play Table # {tableid}
                    </span>
                </section>

                <section tw="mt-10 flex">
                    <img
                        src={`https://assets.cast.casino/cards_01/${table?.community.flop1.card || '_'}.svg`}
                        tw="mx-1 w-26 border-2 border-slate-700"
                        alt="flop card #1"
                    />

                    <img
                        src={`https://assets.cast.casino/cards_01/${table?.community.flop2.card || '_'}.svg`}
                        tw="mx-1 w-26 border-2 border-slate-700"
                        alt="flop card #2"
                    />

                    <img
                        src={`https://assets.cast.casino/cards_01/${table?.community.flop3.card || '_'}.svg`}
                        tw="mx-1 w-26 border-2 border-slate-700"
                        alt="flop card #3"
                    />

                    <img
                        src={`https://assets.cast.casino/cards_01/${table?.community.turn.card || '_'}.svg`}
                        tw="mx-1 w-26 border-2 border-slate-700"
                        alt="turn card"
                    />

                    <img
                        src={`https://assets.cast.casino/cards_01/${table?.community.river.card || '_'}.svg`}
                        tw="mx-1 w-26 border-2 border-slate-700"
                        alt="river card"
                    />
                </section>
            </div>
        ),
        { ...size }
    )
}
