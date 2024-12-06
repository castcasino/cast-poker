import type { Metadata } from 'next'

import '~/app/globals.css'
import { Providers } from '~/app/providers'

export const metadata: Metadata = {
    title: 'Cast Poker — 100% Provably Fair Gaming',
    description: 'The first fairplay, permissionless real-money gaming network.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='en'>
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}
