import { ImageResponse } from 'next/og'

export const alt = 'Cast Poker'
export const size = {
    width: 600,
    height: 400,
}

export const contentType = 'image/png'

const imageResponse = new ImageResponse(
    (
        <div tw="h-full w-full flex flex-col justify-center items-center relative bg-white">
            <h1 tw="text-6xl">
                Hello Player
            </h1>

            <h3 tw="text-4xl">
                Welcoem to 100% Provably Fair Gaming
            </h3>
        </div>
    ),
    { ...size }
)

export default async function Image() {
    return imageResponse
}
