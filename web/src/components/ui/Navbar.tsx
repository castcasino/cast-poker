import Link from 'next/link'

export function Navbar({ tableid }) {
console.log('WHAT R THE PARAMS', tableid)
    return (
        <main className="w-full sm:w-[640px] mx-auto h-[40px] z-10 flex justify-between items-center bg-slate-700">
            <span className="pl-3 text-xs font-bold tracking-widest text-slate-500 uppercase">
                Main Menu
            </span>


            <div className="h-full px-4 py-1 flex flex-row items-center gap-4">

                <Link href={`/${tableid}/lounge`} className={'h-full flex items-center px-3 bg-slate-200 border border-amber-400 rounded'}>
                    <span className="text-sm font-bold text-slate-800 tracking-widest uppercase">
                        Lounge
                    </span>
                </Link>

                <Link href={`/${tableid}/help`} className={'h-full flex items-center px-3 bg-slate-200 border border-amber-400 rounded'}>
                    <span className="text-sm font-bold text-slate-800 tracking-widest uppercase">
                        Help
                    </span>
                </Link>

                <div className="h-full border-dashed border-r border-amber-400" />

                <Link href={`/${tableid}`} className={'h-full flex items-center px-3 bg-slate-200 border border-amber-400 rounded'}>
                    <span className="text-sm font-bold text-slate-800 tracking-widest uppercase">
                        Lobby
                    </span>
                </Link>

            </div>
        </main>
    )
}
