'use client'

import { Footer } from '~/components/ui/Footer'
import { Header } from '~/components/ui/Header'
import { Navbar } from '~/components/ui/Navbar'

import Help from '~/screens/Help'
import Lobby from '~/screens/Lobby'

export default function App(
    { screenid, tableid }: { screenid: string, tableid: string } = { screenid: 'lobby', tableid: '' }
) {
    return <main className="w-screen h-screen flex flex-col justify-between bg-gradient-to-l from-slate-600 to-slate-800">
        <Header tableid={tableid} />

        <main className="w-full sm:w-[640px] mx-auto py-4 px-2 bg-gradient-to-r from-slate-50 to-slate-200 flex-1 overflow-y-scroll">
            {screenid === 'help' && <Help tableid={tableid} />}
            {screenid === 'lounge' && <Lobby tableid={tableid} />}
        </main>

        <>
            <Navbar tableid={tableid} />
            <Footer tableid={tableid} />
        </>
    </main>
}
