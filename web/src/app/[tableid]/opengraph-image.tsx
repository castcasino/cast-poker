import { ImageResponse } from 'next/og'

import axios from 'axios'
// import numeral from 'numeral'

export const runtime = 'edge'

export const alt = 'Cast Poker'

export const size = {
    width: 764,
    height: 400,
}

export const contentType = 'image/png'

interface Props {
    params: Promise<{
        tableid: string
    }>
}

// type Table = {
//     community: Community;
// }

// type Community = {
//     flop1: Deal;
//     flop2: Deal;
//     flop3: Deal;
//     turn: Deal;
//     river: Deal;
// }

// type Deal = {
//     card: string;
//     carIdx: number;
//     blockIdx: number;
//     blockHash: string;
// }

export default async function Image({ params }: Props) {
console.log('OPENGRAPH-IMAGE')
    /* Initialize locals. */
    let table

    const { tableid } = await params

    // const [table, setTable] = useState<Table>()

        // const fetchData = async () => {
        //     const response = await axios.get('https://cast.casino/v1/poker/table/' + tableid)
        //     // setTable(response.data)
        // }
        // fetchData()
    // }, [])

    const response = await axios
        .get('https://cast.casino/v1/poker/table/' + tableid)
        .catch(err => console.error(err))
console.log('RESPONSE', response)

    if (typeof response !== 'undefined') {
        table = response.data
    }

    if (typeof table === 'undefined') {
        return new ImageResponse(
            <div tw="w-full h-full flex flex-col justify-center items-center bg-red-300">
                <h1 tw="text-6xl font-bold text-red-800 tracking-widest">
                    POKER TABLE ERROR!
                </h1>
            </div>
        )
    }

    return new ImageResponse(
        (
            <div tw="w-full h-full flex flex-col justify-center items-center bg-green-50">
                <section tw="flex items-center">
                    <img
                        src="https://assets.cast.casino/poker-table.png"
                        tw="h-20 w-20"
                    />

                    <span tw="pl-5 text-lime-600 text-4xl font-light tracking-tight">
                        Buy-In To Play Table # {tableid}
                    </span>
                </section>

                <section tw="mt-10 flex">
                    <img
                        src={`https://assets.cast.casino/cards_01/${table?.community.flop1.card || '_'}.svg`}
                        tw="mx-1 w-26 border-2 border-slate-700"
                    />

                    <img
                        src={`https://assets.cast.casino/cards_01/${table?.community.flop2.card || '_'}.svg`}
                        tw="mx-1 w-26 border-2 border-slate-700"
                    />

                    <img
                        src={`https://assets.cast.casino/cards_01/${table?.community.flop3.card || '_'}.svg`}
                        tw="mx-1 w-26 border-2 border-slate-700"
                    />

                    <img
                        src={`https://assets.cast.casino/cards_01/${table?.community.turn.card || '_'}.svg`}
                        tw="mx-1 w-26 border-2 border-slate-700"
                    />

                    <img
                        src={`https://assets.cast.casino/cards_01/${table?.community.river.card || '_'}.svg`}
                        tw="mx-1 w-26 border-2 border-slate-700"
                    />
                </section>
            </div>
        ),
        { ...size }
    )
}
