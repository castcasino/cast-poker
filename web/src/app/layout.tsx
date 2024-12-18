import type { Metadata } from 'next'
import PlausibleProvider from 'next-plausible'

import '~/app/globals.css'
import { Providers } from '~/app/providers'

export const metadata: Metadata = {
    title: 'Cast Poker — 100% Provably Fair Gaming',
    description: `Play hold'em poker in the 1st provably fair casino built on Farcaster.`,
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <head>
                <PlausibleProvider
                    domain="cast.poker"
                    customDomain="https://plausible.cast.casino"
                />
            </head>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
