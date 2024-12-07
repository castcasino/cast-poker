import Image from 'next/image'
import Link from 'next/link'

import splashIcon from '~/../public/splash.png'

export function Navbar({ tableid }: { tableid: string}) {
    return (
        <main className="w-full sm:w-[640px] mx-auto h-[40px] z-10 flex justify-end sm:justify-between items-center bg-slate-700">
            <div className="pl-3 hidden sm:flex flex-row gap-2 items-center">
                <Image
                    className="inline-block size-5 rounded-full"
                    src={splashIcon}
                    alt="Splash icon"
                />

                <span className="text-sm font-medium tracking-widest text-slate-400 uppercase">
                    Main Menu
                </span>
            </div>

            <div className="h-full px-3 sm:px-4 py-1 flex flex-row items-center gap-3 sm:gap-4">

                <Link href={`/${tableid}/lounge`} className={'h-full flex items-center px-3 bg-slate-200 border border-amber-400 rounded'}>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight sm:tracking-widest uppercase">
                        Lounge
                    </span>
                </Link>

                <Link href={`/${tableid}/earn`} className={'h-full flex items-center px-3 bg-slate-200 border border-amber-400 rounded'}>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight sm:tracking-widest uppercase">
                        Earn ＄
                    </span>
                </Link>

                <Link href={`/${tableid}/faq`} className={'h-full flex items-center px-3 bg-slate-200 border border-amber-400 rounded'}>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight sm:tracking-widest uppercase">
                        Help
                    </span>
                </Link>

                <div className="h-full border-dashed border-r border-amber-400" />

                <Link href={`/${tableid}`} className={'h-full flex items-center px-3 bg-slate-200 border border-amber-400 rounded'}>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight sm:tracking-widest uppercase">
                        Lobby
                    </span>
                </Link>

            </div>
        </main>
    )
}
