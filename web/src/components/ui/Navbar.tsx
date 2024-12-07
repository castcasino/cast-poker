import Link from 'next/link'

export function Navbar({ tableid }) {
console.log('WHAT R THE PARAMS', tableid)
    return (
        <main className="w-full sm:w-[640px] mx-auto h-[40px] z-10 flex justify-between items-center bg-fuchsia-500">
            <span className="text-sm tracking-widest">
                Navigation
            </span>


            <div className="">
                <Link href={`/${tableid}`} className={'px-3 py-2 bg-slate-200'}>
                    <span class="text-slate-800">
                        Lobby
                    </span>
                </Link>

                <Link href={`/${tableid}/help`} className={''}>
                    Help
                </Link>
            </div>
        </main>
    )
}
