'use client'

// Import components.
import { Footer } from '~/components/ui/Footer'
import { Header } from '~/components/ui/Header'
import { Navbar } from '~/components/ui/Navbar'

// Import Help screens.
import Agent from '~/screens/help/Agent'
import Fairplay from '~/screens/help/Fairplay'
import Faq from '~/screens/help/Faq'

// Import Lounge screens.
import Events from '~/screens/lounge/Events'
import Leaderboard from '~/screens/lounge/Leaderboard'
import MySuite from '~/screens/lounge/MySuite'

// Import screens.
import Earn from '~/screens/Earn'
import Host from '~/screens/Host'
import Lobby from '~/screens/Lobby'
import Promote from '~/screens/Promote'

export default function App(
    { screenid, tableid }: { screenid: string, tableid: string } = { screenid: 'lobby', tableid: '' }
) {
    return <main className="w-screen h-screen flex flex-col justify-between bg-gradient-to-l from-slate-600 to-slate-800">
        <Header tableid={tableid} />

        <main className="w-full sm:w-[640px] mx-auto bg-gradient-to-r from-slate-50 to-slate-200 flex-1 overflow-y-scroll">
            {screenid === 'agent' && <Agent tableid={tableid} />}
            {screenid === 'earn' && <Earn tableid={tableid} />}
            {screenid === 'events' && <Events tableid={tableid} />}
            {screenid === 'fairplay' && <Fairplay tableid={tableid} />}
            {screenid === 'faq' && <Faq tableid={tableid} />}
            {screenid === 'host' && <Host tableid={tableid} />}
            {screenid === 'lobby' && <Lobby tableid={tableid} />}
            {screenid === 'leaderboard' && <Leaderboard tableid={tableid} />}
            {screenid === 'mysuite' && <MySuite tableid={tableid} />}
            {screenid === 'promote' && <Promote tableid={tableid} />}
        </main>

        <>
            <Navbar tableid={tableid} />
            <Footer tableid={tableid} />
        </>
    </main>
}
