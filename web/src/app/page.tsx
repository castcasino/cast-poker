import { Metadata } from 'next'
import App from './app'

const appUrl = process.env.NEXT_PUBLIC_URL

const frame = {
    version: 'next',
    imageUrl: `${appUrl}/opengraph-image`,
    button: {
        title: 'Enter Lobby',
        action: {
            type: 'launch_frame',
            name: 'Cast Poker Lobby',
            url: appUrl,
            splashImageUrl: `${appUrl}/splash.png`,
            splashBackgroundColor: '#f7f7f7',
        },
    },
}

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: 'Cast Poker',
        openGraph: {
            title: 'Cast Poker — 100% Provably Fair Gaming',
            description: 'The first fairplay, permissionless real-money gaming network.',
        },
        other: {
            'fc:frame': JSON.stringify(frame),
        },
    }
}

export default function Home() {
    return (<App />)
}
