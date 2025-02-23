import { createConfig, http, WagmiProvider } from 'wagmi'
import { base, degen } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { frameConnector } from '../lib/connector'

export const config = createConfig({
    chains: [ base, degen ],
    transports: {
        [base.id]: http(),
        [degen.id]: http(),
    },
    connectors: [ frameConnector() ],
})

const queryClient = new QueryClient()

export default function Provider({ children }: { children: React.ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}
