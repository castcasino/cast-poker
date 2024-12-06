'use client'

import dynamic from 'next/dynamic'

const Lobby = dynamic(() => import('~/components/Lobby'), {
    ssr: false,
})

export default function App(
    { title }: { title?: string } = { title: 'Cast Poker — 100% Provably Fair Gaming' }
) {
    return <Lobby title={title} />
}
