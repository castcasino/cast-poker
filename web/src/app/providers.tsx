'use client'

import dynamic from 'next/dynamic'
import PlausibleProvider from 'next-plausible'

const WagmiProvider = dynamic(
    () => import('~/components/providers/WagmiProvider'),
    { ssr: false }
)

export function Providers({ children }: { children: React.ReactNode }) {
    return <PlausibleProvider domain="cast.poker">
        <WagmiProvider>
            {children}
        </WagmiProvider>
    </PlausibleProvider>
}
