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
            title: 'Enter Lobby',
            action: {
                type: 'launch_frame',
                name: 'Cast Poker',
                url: `${appUrl}/${tableid}/`,
                splashImageUrl: `${appUrl}/splash.png`,
                splashBackgroundColor: '#f7f7f7',
            },
        },
    }

    return {
        title: `Hello, ${tableid}`,
        description: `A personalized hello frame for ${tableid}`,
        openGraph: {
            title: `Hello, ${tableid}`,
            description: `A personalized hello frame for ${tableid}`,
        },
        other: {
            'fc:frame': JSON.stringify(frame),
        },
    }
}

export default async function HelloNameFrame({ params }: Props) {
  const { tableid } = await params;

  return <App title={`Now watching @ table ${tableid}`} />;
}
