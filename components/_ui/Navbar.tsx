import Link from 'next/link'

export function Navbar({ tableid }: { tableid: string}) {
    return (
        <main class="w-full sm:w-[640px] mx-auto h-[45px] z-10 flex justify-end sm:justify-between items-center bg-slate-700 border-t-[3px] border-amber-400">
            <div class="pl-3 hidden sm:flex flex-row gap-1 items-center">
                <svg class="size-3 text-amber-200 opacity-50" data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"></path>
                </svg>

                <span class="mt-0.5 text-xs font-medium tracking-widest text-amber-200 opacity-50 uppercase">
                    Main Menu
                </span>
            </div>

            <div class="h-full flex flex-row">

                <Link href={`/${tableid}/lounge`} className='group h-full flex items-center px-3 bg-slate-200 border-x border-amber-400 hover:bg-amber-600'>
                    <span class="text-lg font-bold text-slate-800 tracking-tight sm:tracking-widest uppercase group-hover:text-slate-200">
                        Lobby
                    </span>
                </Link>

                <Link href={`/${tableid}/share`} className='group h-full flex items-center px-3 bg-slate-200 border-x border-amber-400 hover:bg-amber-600'>
                    <span class="text-lg font-bold text-slate-800 tracking-tight sm:tracking-widest uppercase group-hover:text-slate-200">
                        Earn<span class="text-lime-500 font-bold">＄</span>
                    </span>
                </Link>

                <Link href={`/${tableid}/faq`} className='group h-full flex items-center px-3 bg-slate-200 border-x border-amber-400 hover:bg-amber-600'>
                    <span class="text-lg font-bold text-slate-800 tracking-tight sm:tracking-widest uppercase group-hover:text-slate-200">
                        Help?
                    </span>
                </Link>

                <div class="mx-2 h-full" />

                <Link href={`/${tableid}`} className='group h-full flex items-center px-3 bg-slate-200 border-x border-amber-400 hover:bg-amber-600'>
                    <span class="text-lg font-bold text-slate-800 tracking-tight sm:tracking-widest uppercase group-hover:text-slate-200">
                        Table
                    </span>
                </Link>

            </div>
        </main>
    )
}
