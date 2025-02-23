import { Metadata } from 'next'
import App from '~/app/app'

// export const runtime = 'edge'

const appUrl = process.env.NEXT_PUBLIC_URL

interface Props {
    params: Promise<{
        tableid: string
    }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { tableid } = await params

    const frame = {
        version: 'next',
        imageUrl: `${appUrl}/${tableid}/opengraph-image`,
        button: {
            title: 'My Suite',
            action: {
                type: 'launch_frame',
                name: 'My Suite — Cast Poker',
                url: `${appUrl}/${tableid}/`,
                splashImageUrl: `${appUrl}/splash.gif`,
                splashBackgroundColor: '#f7f7f7',
            },
        },
    }

    return {
        title: `My Suite — Cast Poker`,
        description: `Come play a hand of poker at table # ${tableid}`,
        openGraph: {
            title: `My Suite — Cast Poker`,
            description: `Come play a hand of poker at table # ${tableid}`,
        },
        other: {
            'fc:frame': JSON.stringify(frame),
        },
    }
}

export default async function TableFrame({ params }: Props) {
    const { tableid } = await params

    return <App screenid={'mysuite'} tableid={tableid} />
}
