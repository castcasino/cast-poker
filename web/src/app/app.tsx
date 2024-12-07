'use client'

import dynamic from 'next/dynamic'

import { Footer } from '~/components/ui/Footer'
import { Header } from '~/components/ui/Header'

const Lobby = dynamic(() => import('~/components/Lobby'), {
    ssr: false,
})

export default function App(
    { title }: { title?: string } = { title: 'Cast Poker — 100% Provably Fair Gaming' }
) {
    return <main className="h-screen flex flex-col justify-between">
        <Header />
        <Lobby title={title} />
        <Footer />
    </main>
}
