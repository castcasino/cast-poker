'use client'

import dynamic from 'next/dynamic'

import { Footer } from '~/components/ui/Footer'
import { Header } from '~/components/ui/Header'
import { Navbar } from '~/components/ui/Navbar'

export default function App(
    { screenid, tableid }: { screenid?: string, tableid?: string } = { screenid: 'lobby', tableid: '1337beef' }
) {
console.log('SCREEN ID', screenid)
console.log('TABLE ID', tableid)
    const Screen = dynamic(() => import('~/screens/' + screenid), { ssr: false })

    return <main className="h-screen flex flex-col justify-between">
        <Header tableid={tableid} />

        <main className="w-full sm:w-[640px] mx-auto py-4 px-2 flex-1 overflow-y-scroll">
            <Screen tableid={tableid} />
        </main>

        <>
            <Navbar tableid={tableid} />
            <Footer tableid={tableid} />
        </>
    </main>
}
