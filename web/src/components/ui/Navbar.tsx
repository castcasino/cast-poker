import Link from 'next/link'

export function Navbar({ tableid }: { tableid: string}) {
    return (
        <main className="w-full sm:w-[640px] mx-auto h-[45px] z-10 flex justify-end sm:justify-between items-center bg-slate-700 border-t-[3px] border-amber-400">
            <div className="pl-3 hidden sm:flex flex-row gap-1 items-center">
                <svg className="size-4 text-amber-200 opacity-50" data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"></path>
                </svg>

                <span className="text-sm font-medium tracking-widest text-amber-200 opacity-50 uppercase">
                    Main Menu
                </span>
            </div>

            <div className="h-full px-3 sm:px-4 py-1 flex flex-row items-center gap-3 sm:gap-4">

                <Link href={`/${tableid}/mysuite`} className={'h-full flex items-center px-3 bg-slate-200 border border-amber-400 rounded'}>
                    <span className="text-xs sm:text-sm font-bold text-slate-800 tracking-tight sm:tracking-widest uppercase">
                        Lounge
                    </span>
                </Link>

                <Link href={`/${tableid}/promoter`} className={'relative h-full flex items-center px-3 bg-slate-200 border border-amber-400 rounded'}>
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
