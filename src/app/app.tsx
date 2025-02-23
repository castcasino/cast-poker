'use client'

import { useEffect, useState } from 'react'
import sdk, { type FrameContext } from '@farcaster/frame-sdk'
import { useAccount } from 'wagmi'

// Import components.
import { Footer } from '../components/ui/Footer'
import { Header } from '../components/ui/Header'
import { Navbar } from '../components/ui/Navbar'

// Import Help screens.
import Agent from '../screens/help/Agent'
import Fairplay from '../screens/help/Fairplay'
import Faq from '../screens/help/Faq'

// Import Lobby screens.
import Concierge from '../screens/lobby/Concierge'
import Lounge from '../screens/lobby/Lounge'
import MySuite from '../screens/lobby/MySuite'

// Import Earn screens.
import Host from '../screens/earn/Host'
import Share from '../screens/earn/Share'

// Import screens.
import Table from '../screens/Table'

/* Import session manager. */
import { sessionManager } from '../lib/sessionManager'

export default function App({
    screenid,
    tableid,
}: {
    screenid: string,
    tableid: string,
} = {
    screenid: 'table',
    tableid: '',
}) {
    const [isSDKLoaded, setIsSDKLoaded] = useState(false)
    const [context, setContext] = useState<FrameContext>()
    const { address, isConnected } = useAccount()

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
// console.log('THIS IS THE CONTEXT WE NEED TO STORE', context)
        let session = {}

        /* Validate context. */
        if (typeof context !== 'undefined' && context !== null) {
            session = {
                ...session,
                ...context,
            }
        }

        /* Validate connection. */
        if (isConnected) {
            session = {
                ...session,
                address,
            }
        }

        /* Call session manager. */
        sessionManager(JSON.stringify(session))
    }, [ address, context, isConnected ])

    return <main className="w-screen h-screen overflow-hidden flex flex-col justify-between bg-gradient-to-l from-slate-600 to-slate-800">
        <Header tableid={tableid} />

        <section className="w-full sm:w-[640px] mx-auto bg-gradient-to-r from-slate-50 to-slate-200 flex-1 overflow-y-scroll">
            {screenid === 'agent' && <Agent tableid={tableid} />}
            {screenid === 'fairplay' && <Fairplay tableid={tableid} />}
            {screenid === 'faq' && <Faq tableid={tableid} />}
            {screenid === 'host' && <Host tableid={tableid} />}
            {screenid === 'table' && <Table tableid={tableid} />}
            {screenid === 'mysuite' && <MySuite tableid={tableid} />}
            {screenid === 'lounge' && <Lounge tableid={tableid} />}
            {screenid === 'share' && <Share tableid={tableid} />}
            {screenid === 'concierge' && <Concierge tableid={tableid} />}
        </section>

        <>
            <Navbar tableid={tableid} />
            <Footer tableid={tableid} />
        </>
    </main>
}
