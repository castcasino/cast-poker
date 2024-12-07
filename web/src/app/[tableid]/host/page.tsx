import { Metadata } from 'next'
import App from '~/app/app'

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
            title: 'Help?',
            action: {
                type: 'launch_frame',
                name: 'Cast Poker Help',
                url: `${appUrl}/${tableid}/`,
                splashImageUrl: `${appUrl}/splash.png`,
                splashBackgroundColor: '#f7f7f7',
            },
        },
    }

    return {
        title: `Cast Poker Help`,
        description: `Come play a hand of poker at table # ${tableid}`,
        openGraph: {
            title: `Cast Poker Help`,
            description: `Come play a hand of poker at table # ${tableid}`,
        },
        other: {
            'fc:frame': JSON.stringify(frame),
        },
    }
}

export default async function TableFrame({ params }: Props) {
    const { tableid } = await params

    return <App screenid={'host'} tableid={tableid} />
}
