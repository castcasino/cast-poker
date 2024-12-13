'use client'

'use client'

import { useEffect, useState } from 'react'
import sdk, { type FrameContext } from '@farcaster/frame-sdk'

// Import components.
import { Footer } from '~/components/ui/Footer'
import { Header } from '~/components/ui/Header'
import { Navbar } from '~/components/ui/Navbar'

// Import Help screens.
import Agent from '~/screens/help/Agent'
import Fairplay from '~/screens/help/Fairplay'
import Faq from '~/screens/help/Faq'

// Import Lounge screens.
import MySuite from '~/screens/lounge/MySuite'
import Players from '~/screens/lounge/Players'
import Tables from '~/screens/lounge/Tables'

// Import Earn screens.
import Host from '~/screens/earn/Host'
import Promote from '~/screens/earn/Promote'

// Import screens.
import Lobby from '~/screens/Lobby'

/* Import session manager. */
import { sessionManager } from '~/lib/sessionManager'

export default function App({
    screenid,
    tableid,
}: {
    screenid: string,
    tableid: string,
} = {
    screenid: 'lobby',
    tableid: '',
}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()

    useEffect(() => {
        const load = async () => {
            setContext(await sdk.context)
            sdk.actions.ready()
        }

        if (sdk && !isSDKLoaded) {
            setIsSDKLoaded(true)
            load()
        }
    }, [ isSDKLoaded ])

    useEffect(() => {
        console.log('THIS IS THE CONTEXT WE NEED TO STORE', context)
        sessionManager(JSON.stringify(context))
    }, [ context ])

    return <main className="w-screen h-screen overflow-hidden flex flex-col justify-between bg-gradient-to-l from-slate-600 to-slate-800">
        <Header tableid={tableid} />

        <main className="w-full sm:w-[640px] mx-auto bg-gradient-to-r from-slate-50 to-slate-200 flex-1 overflow-y-scroll">
            {screenid === 'agent' && <Agent tableid={tableid} />}
            {screenid === 'fairplay' && <Fairplay tableid={tableid} />}
            {screenid === 'faq' && <Faq tableid={tableid} />}
            {screenid === 'host' && <Host tableid={tableid} />}
            {screenid === 'lobby' && <Lobby tableid={tableid} />}
            {screenid === 'mysuite' && <MySuite tableid={tableid} />}
            {screenid === 'players' && <Players tableid={tableid} />}
            {screenid === 'promote' && <Promote tableid={tableid} />}
            {screenid === 'tables' && <Tables tableid={tableid} />}
        </main>

        <>
            <Navbar tableid={tableid} />
            <Footer tableid={tableid} />
        </>
    </main>
}
