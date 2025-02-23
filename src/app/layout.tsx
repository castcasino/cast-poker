import type { Metadata } from 'next'
import PlausibleProvider from 'next-plausible'

import { getSession } from "../auth"
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
    title: 'Cast Poker — 100% Provably Fair Gaming',
    description: `Play Texas Hold'em poker in the ONLY provably fair casino built on Farcaster.`,
    metadataBase: new URL('https://cast.poker'),
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    /* Initialize session. */
    const session = await getSession()

    return (
        <html lang='en'>
            <head>
                <PlausibleProvider
                    domain="cast.poker"
                    customDomain="https://plausible.cast.casino"
                />
            </head>
            <body>
                <Providers session={session}>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
