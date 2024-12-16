import { ImageResponse } from 'next/og'

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

export default async function Image({ params }: Props) {
    const { tableid } = await params

    return new ImageResponse(
        (
            <div tw="h-full w-full flex flex-col justify-center items-center relative bg-white">
                <span tw="text-6xl">
                    Get FAQ @
                </span>

                <span tw="text-6xl">
                    Table # {tableid}
                </span>
            </div>
        ),
        { ...size }
    )
}
